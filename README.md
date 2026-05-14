# CMS Gereja - Version 1 (MVP)

Sistem informasi gereja berbasis **Node.js + Express + React + Vite + Google Sheets**.

## Scope MVP

- Data jemaat
- Jadwal ibadah
- Pengumuman
- Halaman website editable via CMS

## Struktur Proyek

```
cms-gereja/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/googleSheets.js
│   ├── routes/
│   ├── middleware/
│   └── controllers/
└── frontend/
    ├── package.json
    └── src/
```

## Setup Google Sheets

Buat spreadsheet dengan sheet berikut:

1. `jemaat`: `id, nama, alamat, no_hp, status, tanggal_bergabung`
2. `jadwal`: `id, kegiatan, tanggal, jam, lokasi, deskripsi`
3. `pengumuman`: `id, judul, isi, tanggal, status`
4. `halaman`: `key, value`

Pastikan spreadsheet dibagikan ke email service account.

## Konfigurasi Backend

1. Masuk ke folder backend:

```bash
cd backend
cp .env.example .env
```

2. Isi `.env`:

- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

3. Jalankan backend:

```bash
npm install
npm start
```

Backend default di `http://localhost:5000`.

## Konfigurasi Frontend

1. Masuk ke folder frontend:

```bash
cd frontend
npm install
```

2. Buat `.env` frontend:

```bash
VITE_API_URL=http://localhost:5000/api
```

3. Jalankan frontend:

```bash
npm run dev
```

Frontend default di `http://localhost:5173`.

## API Endpoint Utama

### Auth
- `POST /api/auth/login`
- `GET /api/auth/verify`

### Jemaat (admin token)
- `GET /api/jemaat`
- `POST /api/jemaat`
- `PUT /api/jemaat/:id`
- `DELETE /api/jemaat/:id`

### Jadwal
- `GET /api/jadwal`
- `POST /api/jadwal` (admin)
- `PUT /api/jadwal/:id` (admin)
- `DELETE /api/jadwal/:id` (admin)

### Pengumuman
- `GET /api/pengumuman`
- `POST /api/pengumuman` (admin)
- `PUT /api/pengumuman/:id` (admin)
- `DELETE /api/pengumuman/:id` (admin)

### Halaman CMS
- `GET /api/halaman`
- `POST /api/halaman` (admin)

## Login Admin Default

Gunakan nilai dari `.env`:
- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`
