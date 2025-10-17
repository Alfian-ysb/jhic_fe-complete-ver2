# Setup Guide - JHIC Frontend

## Prerequisites
- Node.js (v16 atau lebih baru)
- Backend API harus berjalan di `http://localhost:8000`

## Installation

```bash
# Install dependencies
npm install

# Copy environment file (jika belum ada)
cp .env.example .env
```

## Development

### 1. Start Backend (PENTING!)
Pastikan backend API sudah berjalan di `http://localhost:8000` sebelum menjalankan frontend.

Untuk cek apakah backend sudah running:
```bash
# Windows (PowerShell)
Test-NetConnection localhost -Port 8000

# Linux/Mac
curl http://localhost:8000
```

### 2. Start Frontend & server(testing)

##frontend
```bash
npm run dev 

##server
npm run server
```

Frontend akan berjalan di `http://localhost:5173`

## Troubleshooting

### Error: "Failed to fetch" atau "Tidak dapat terhubung ke server"

**Penyebab:** Backend tidak berjalan atau berjalan di port yang berbeda

**Solusi:**
1. Pastikan backend sudah dijalankan
2. Cek port backend di file `.env`:
   ```
   VITE_API_URL=http://localhost:8000
   ```
3. Sesuaikan port jika backend berjalan di port lain

### Error: CORS

Jika masih ada error CORS:
1. Pastikan backend mengizinkan CORS dari `http://localhost:5173`
2. Vite proxy sudah dikonfigurasi di `vite.config.ts` untuk development

### Upload File Gagal

1. Cek ukuran file (maksimal 10MB)
2. Pastikan semua field required sudah diisi
3. Cek console browser untuk error detail (F12 → Console)

## Configuration

### API URL
Edit file `.env`:
```
VITE_API_URL=http://localhost:8000
```

Atau jika backend di server lain:
```
VITE_API_URL=https://api.example.com
```

## Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`
