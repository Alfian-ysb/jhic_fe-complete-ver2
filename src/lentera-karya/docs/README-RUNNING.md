# Cara Menjalankan Project

##  PENTING: Jalankan 2 Terminal

Project ini butuh **2 terminal berjalan bersamaan**:
1. **Backend (JSON Server)** - Port 3001
2. **Frontend (Vite)** - Port 5173

---

##  Langkah-langkah

### Terminal Pertama - Backend (JSON Server)

```bash
npm run server
```

✅ **Cek berhasil:** Harus muncul pesan:
```
JSON Server started on PORT :3001
Endpoints:
http://localhost:3001/karya
```

❌ **Jika error "port already in use":**
```bash
# Windows - cari dan matikan proses di port 3001
netstat -ano | findstr :3001
taskkill /PID <nomor_PID> /F
```

---

### 2️Terminal Kedua - Frontend (Vite)

**Buka terminal baru**, lalu jalankan:

```bash
npm run dev
```

✅ **Cek berhasil:** Harus muncul:
```
VITE v7.x.x ready in xxx ms
Local: http://localhost:5173/
```

---

## Test Koneksi

1. Buka browser: `http://localhost:5173`
2. Buka halaman **Upload Karya**
3. Klik button **"Test Koneksi"**
4. Harus muncul: ✅ **"Backend terhubung! JSON Server siap di port 3001"**

---

## Troubleshooting

### Problem: "Failed to fetch" atau test connection gagal

**Solusi:**
1. Pastikan `npm run server` masih berjalan di terminal pertama
2. Buka `http://localhost:3001/karya` di browser - harus muncul `[]`
3. Restart frontend:
   ```bash
   # Stop dengan Ctrl+C, lalu
   npm run dev
   ```

### Problem: Port 3001 sudah dipakai

**Ganti port di 3 file:**

1. `.env`:
   ```
   VITE_API_URL=http://localhost:3002
   ```

2. `vite.config.ts`:
   ```typescript
   target: 'http://localhost:3002',
   ```

3. `package.json`:
   ```json
   "server": "json-server --watch db.json --port 3002"
   ```

---

## File Penting

- **Backend data:** `db.json` - Menyimpan data karya
- **API config:** `src/api/karyaServices.ts`
- **Environment:** `.env` - Port configuration

---

## Checklist Sebelum Upload

- [ ] `npm run server` berjalan (terminal 1)
- [ ] `npm run dev` berjalan (terminal 2)
- [ ] Test Koneksi berhasil ✅
- [ ] Bisa upload file

---

## Install Dependencies (Hanya Sekali)

```bash
npm install
```
