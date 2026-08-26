#!/usr/bin/env bash
set -euo pipefail

# Deploy web portofolio (static Vite SPA) ke VPS.
# Jalankan TANPA sudo:  DOMAIN=domain.com ./deploy.sh
# Tanpa DOMAIN: hanya update build (asumsi nginx sudah terkonfigurasi).

cd "$(dirname "$0")"

command -v git   >/dev/null || { echo "ERROR: git tidak ada. apt install -y git" >&2; exit 1; }
command -v node  >/dev/null || { echo "ERROR: node tidak ada. Install via nvm (lihat VPS_INSTALL.md langkah 1)." >&2; exit 1; }
command -v pnpm  >/dev/null || { echo "ERROR: pnpm tidak ada. npm install -g pnpm@9" >&2; exit 1; }

DOMAIN="${DOMAIN:-}"
WWWROOT="$PWD/dist/public"

echo "==> Pull kode terbaru"
git pull --ff-only

echo "==> Install dependensi"
pnpm install --no-frozen-lockfile || pnpm install

echo "==> Build"
pnpm build

if [ -n "$DOMAIN" ]; then
  # Pakai config nginx yang sudah ada kalau ada (cocok server_name),
  # kalau tidak buat baru bernama revdstore.
  EXISTING="$(sudo grep -rl "server_name $DOMAIN" /etc/nginx/sites-available/ 2>/dev/null | head -1 || true)"
  NGINX_AVAILABLE="${EXISTING:-/etc/nginx/sites-available/revdstore}"
  NGINX_ENABLED="/etc/nginx/sites-enabled/$(basename "$NGINX_AVAILABLE")"
  echo "==> Setup nginx -> $NGINX_AVAILABLE ($DOMAIN)"
  sudo apt-get install -y nginx
  sudo tee "$NGINX_AVAILABLE" >/dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    root $WWWROOT;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 256;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
}
EOF
  sudo ln -sf "$NGINX_AVAILABLE" "$NGINX_ENABLED"
  sudo nginx -t
  sudo systemctl enable --now nginx

  echo "==> Setup SSL (Certbot)"
  sudo apt-get install -y certbot python3-certbot-nginx
  sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" || true
fi

echo "==> Reload nginx"
sudo systemctl reload nginx 2>/dev/null || true

echo "==> Selesai. Static ada di $WWWROOT"
