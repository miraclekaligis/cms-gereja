# 🏰 Church Information System (CMS) - Version 1

Sistem informasi gereja berbasis **Node.js + React + Google Sheets** untuk mengelola jemaat, jadwal ibadah, pengumuman, dan konten website.

## Fitur

### Website Publik
- Beranda dengan hero section editable dari sheet `halaman`
- Jadwal ibadah dengan filter tanggal
- Pengumuman dengan pagination
- Halaman tentang gereja yang editable
- Responsive navbar dan footer

### Admin Dashboard
- Login JWT
- Dashboard statistik
- CRUD jemaat
- CRUD jadwal
- CRUD pengumuman
- CMS key-value editor untuk konten halaman
- Logout

## Struktur Proyek

```
backend/   # Express API + Google Sheets integration
frontend/  # React 18 + Vite UI
docs/      # Setup, database, dan API docs
```

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

Backend (`backend/.env`):
- `PORT`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`

Frontend (`frontend/.env`):
- `VITE_API_URL`

## API Endpoints

### Auth
- `POST /api/auth/login`

### Jemaat
- `GET /api/jemaat`
- `POST /api/jemaat`
- `PUT /api/jemaat/:id`
- `DELETE /api/jemaat/:id`

### Jadwal
- `GET /api/jadwal`
- `POST /api/jadwal`
- `PUT /api/jadwal/:id`
- `DELETE /api/jadwal/:id`

### Pengumuman
- `GET /api/pengumuman`
- `POST /api/pengumuman`
- `PUT /api/pengumuman/:id`
- `DELETE /api/pengumuman/:id`

### Halaman
- `GET /api/halaman`
- `GET /api/halaman/:key`
- `PUT /api/halaman/:key`

## Dokumentasi
- `docs/INSTALLATION.md`
- `docs/DATABASE_SETUP.md`
- `docs/API_DOCS.md`
