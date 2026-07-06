# 🚀 Tutorial Instalasi di VPS

Panduan lengkap untuk mendeploy project Mockup Canvas (pnpm monorepo) ke VPS Linux (Ubuntu 22.04 / Debian 12).

---

## Daftar Isi

1. [Persiapan VPS](#1-persiapan-vps)
2. [Instalasi Node.js & pnpm](#2-instalasi-nodejs--pnpm)
3. [Clone Repository](#3-clone-repository)
4. [Instalasi Dependensi](#4-instalasi-dependensi)
5. [Setup Environment Variables](#5-setup-environment-variables)
6. [Setup Database PostgreSQL](#6-setup-database-postgresql)
7. [Build & Jalankan App](#7-build--jalankan-app)
8. [Setup PM2 (Process Manager)](#8-setup-pm2-process-manager)
9. [Setup Nginx (Reverse Proxy)](#9-setup-nginx-reverse-proxy)
10. [SSL dengan Let's Encrypt](#10-ssl-dengan-lets-encrypt)
11. [Update App](#11-update-app)

---

## 1. Persiapan VPS

### Spesifikasi Minimum
| Komponen | Minimum | Rekomendasi |
|----------|---------|-------------|
| CPU      | 1 vCPU  | 2 vCPU      |
| RAM      | 1 GB    | 2 GB        |
| Storage  | 20 GB   | 40 GB SSD   |
| OS       | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |

### Update sistem & install tools dasar

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget unzip build-essential
```

### Buat user non-root (opsional tapi direkomendasikan)

```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

---

## 2. Instalasi Node.js & pnpm

### Install Node.js 20 LTS via nvm

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verifikasi
node --version   # v20.x.x
npm --version    # 10.x.x
```

### Install pnpm

```bash
npm install -g pnpm@latest

# Verifikasi
pnpm --version   # 9.x.x atau lebih baru
```

---

## 3. Clone Repository

```bash
# Ganti dengan URL repo kamu
git clone https://github.com/username/nama-repo.git
cd nama-repo
```

Jika repo private, generate SSH key dulu:

```bash
ssh-keygen -t ed25519 -C "deploy@vps"
cat ~/.ssh/id_ed25519.pub
# Tambahkan public key ini ke GitHub → Settings → SSH Keys
```

---

## 4. Instalasi Dependensi

```bash
# Install semua dependensi workspace
pnpm install

# Verifikasi workspace packages terdeteksi
pnpm list -r --depth=0
```

> **Catatan:** File `.npmrc` sudah dikonfigurasi dengan `minimumReleaseAge: 1440` untuk keamanan supply-chain. Ini normal.

---

## 5. Setup Environment Variables

Buat file `.env` di root project:

```bash
cp .env.example .env 2>/dev/null || touch .env
nano .env
```

Isi dengan variabel berikut:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nama_database

# Session
SESSION_SECRET=ganti_dengan_random_string_panjang_minimal_64_karakter

# Node environment
NODE_ENV=production
```

Generate `SESSION_SECRET` yang aman:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 6. Setup Database PostgreSQL

### Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Buat database & user

```bash
sudo -u postgres psql
```

Di dalam prompt psql:

```sql
CREATE USER appuser WITH PASSWORD 'password_kuat_di_sini';
CREATE DATABASE nama_database OWNER appuser;
GRANT ALL PRIVILEGES ON DATABASE nama_database TO appuser;
\q
```

### Push schema database

```bash
pnpm --filter @workspace/db run push
```

---

## 7. Build & Jalankan App

### Build API Server

```bash
pnpm --filter @workspace/api-server run build
```

### Build Frontend (Mockup Sandbox)

```bash
pnpm --filter @workspace/mockup-sandbox run build
```

### Test jalankan manual

```bash
# Test API server
PORT=8080 NODE_ENV=production node --enable-source-maps artifacts/api-server/dist/index.mjs

# Di terminal lain, cek health endpoint
curl http://localhost:8080/api/healthz
# Response: {"status":"ok"} ✓
```

Tekan `Ctrl+C` untuk stop setelah test.

---

## 8. Setup PM2 (Process Manager)

PM2 memastikan app terus berjalan dan auto-restart saat crash atau reboot.

### Install PM2

```bash
npm install -g pm2
```

### Buat konfigurasi PM2

Buat file `ecosystem.config.cjs` di root project:

```javascript
module.exports = {
  apps: [
    {
      name: 'api-server',
      script: 'artifacts/api-server/dist/index.mjs',
      interpreter: 'node',
      interpreter_args: '--enable-source-maps',
      env: {
        PORT: 8080,
        NODE_ENV: 'production',
        DATABASE_URL: process.env.DATABASE_URL,
        SESSION_SECRET: process.env.SESSION_SECRET,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: 'logs/api-error.log',
      out_file: 'logs/api-out.log',
    },
  ],
};
```

Buat folder logs:

```bash
mkdir -p logs
```

### Load environment variables ke PM2

```bash
# Ekspor variabel dari .env ke shell
export $(grep -v '^#' .env | xargs)
```

### Jalankan dengan PM2

```bash
pm2 start ecosystem.config.cjs

# Cek status
pm2 status

# Cek logs real-time
pm2 logs api-server
```

### Setup auto-start saat reboot

```bash
pm2 startup
# Ikuti instruksi yang muncul (jalankan perintah sudo yang ditampilkan)

pm2 save
```

---

## 9. Setup Nginx (Reverse Proxy)

### Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Konfigurasi Nginx

```bash
sudo nano /etc/nginx/sites-available/nama-app
```

Isi dengan konfigurasi berikut (ganti `domain.com` dengan domain kamu):

```nginx
server {
    listen 80;
    server_name domain.com www.domain.com;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 256;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # API routes → API Server (port 8080)
    location /api {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    # Static frontend files (Mockup Sandbox)
    # Catatan: trailing slash pada location dan alias wajib ada untuk SPA subpath
    location /__mockup/ {
        alias /home/deploy/nama-repo/artifacts/mockup-sandbox/dist/;
        try_files $uri $uri/ /__mockup/index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Redirect /__mockup (tanpa slash) ke /__mockup/
    location = /__mockup {
        return 301 /__mockup/;
    }

    # Default root
    location / {
        return 301 /__mockup/;
    }
}
```

### Aktifkan konfigurasi

```bash
sudo ln -s /etc/nginx/sites-available/nama-app /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## 10. SSL dengan Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Dapatkan sertifikat SSL (ganti domain.com)
sudo certbot --nginx -d domain.com -d www.domain.com

# Ikuti prompt: masukkan email, setujui ToS, pilih redirect HTTP→HTTPS
```

Certbot akan otomatis memperbarui sertifikat setiap 90 hari. Test auto-renewal:

```bash
sudo certbot renew --dry-run
```

---

## 11. Update App

Setiap kali ada update kode:

```bash
cd ~/nama-repo

# Pull kode terbaru
git pull

# Install dependensi baru (jika ada)
pnpm install

# Build ulang
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/mockup-sandbox run build

# Push DB schema (jika ada perubahan)
pnpm --filter @workspace/db run push

# Restart app
pm2 restart api-server

# Verifikasi running
pm2 status
```

---

## Troubleshooting

### App tidak bisa konek ke database
```bash
# Cek status PostgreSQL
sudo systemctl status postgresql

# Test koneksi
psql $DATABASE_URL -c "SELECT 1;"
```

### Port sudah dipakai
```bash
sudo lsof -i :8080
sudo kill -9 <PID>
```

### Cek logs error
```bash
pm2 logs api-server --lines 100
sudo tail -f /var/log/nginx/error.log
```

### Firewall
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

---

## Checklist Sebelum Go-Live

- [ ] `NODE_ENV=production` sudah diset
- [ ] `SESSION_SECRET` sudah diganti (bukan nilai default)
- [ ] `DATABASE_URL` menggunakan password kuat
- [ ] HTTPS aktif dan redirect dari HTTP
- [ ] PM2 startup sudah dikonfigurasi (`pm2 startup && pm2 save`)
- [ ] Firewall aktif (hanya port 22, 80, 443 terbuka)
- [ ] Health endpoint merespons: `curl https://domain.com/api/healthz`
- [ ] Auto-renewal SSL ditest: `sudo certbot renew --dry-run`

---

*Dibuat untuk project pnpm Workspace · Node.js 20 · Express 5 · PostgreSQL · Drizzle ORM*
