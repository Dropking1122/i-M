# 🚀 Deploy Web Portofolio (Static SPA)

Repo ini sekarang **aplikasi Vite murni tanpa backend**. Tidak ada database, tidak ada API server — cukup build file static lalu sajikan folder `dist/public/`.

---

## Opsi A — Static Host (Termudah, Rekomendasi)

Bila sebelumnya Anda pakai Replit Artifacts, opsi ini paling mirip (managed). Hubungkan repo GitHub ke salah satu:

| Platform | Build Command | Output Directory |
|----------|---------------|------------------|
| Cloudflare Pages | `pnpm build` | `dist/public` |
| Netlify | `pnpm build` | `dist/public` |
| Vercel | `pnpm build` | `dist/public` |
| GitHub Pages* | `pnpm build` | `dist/public` |

*(GitHub Pages perlu base path `/<repo>/` — set env `BASE_PATH` saat build atau ubah `vite.config.ts`.)*

Set `NODE_VERSION=22` di environment platform bila diminta.

---

## Opsi B — VPS (Nginx, ada SSL)

Cocok kalau VPS sudah jalan dengan nginx + Certbot seperti setup lama.

### 1. Persiapan

```bash
sudo apt update && sudo apt install -y git curl nginx
# Node 22 + pnpm (sama seperti sebelumnya)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22 && nvm alias default 22
npm install -g pnpm@9
```

### 2. Clone & Build

```bash
git clone https://github.com/Dropking1122/i-M.git
cd i-M
pnpm install
pnpm build          # hasil di dist/public/
```

### 3. Nginx — sajikan static

```bash
sudo nano /etc/nginx/sites-available/revdstore
```

```nginx
server {
    listen 80;
    server_name domain.com www.domain.com;

    root /home/deploy/i-M/dist/public;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 256;

    # Cache aset build (hash unik di nama file)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA: semua route fallback ke index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/revdstore /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 4. SSL (reuse Certbot lama)

```bash
sudo certbot --nginx -d domain.com -d www.domain.com
```

### 5. Update Rutin

```bash
cd ~/i-M
git pull
pnpm install
pnpm build        # nginx langsung sajikan file baru (static)
```

Tidak perlu PM2/process manager — nginx menayangkan file statis.

---

## Troubleshooting

- **Halaman kosong / 404 saat refresh:** pastikan `try_files ... /index.html;` ada (routing client-side wouter).
- **Assets 404:** cek `base` di `vite.config.ts` sesuai domain/subpath (`BASE_PATH`).
- **Build gagal:** pastikan Node ≥ 22 (`node -v`) dan `pnpm install` sukses.
