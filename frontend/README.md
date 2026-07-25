# Frontend — React Application

Aplikasi tampilan ini dibuat menggunakan **React** dan **Vite**. Frontend berfungsi sebagai *Single Page Application* (SPA) yang fokus pada presentasi data, interaksi pengguna, dan routing di sisi klien untuk **Project HJS — Warehouse Management System (WMS)**.

---

## Teknologi Utama

| Komponen | Teknologi |
|---|---|
| Framework | React.js (Hooks & Functional Components) |
| Bundler | Vite |
| Styling | Tailwind CSS / CSS Modules |
| HTTP Client | Axios atau Fetch API |
| State Management | React Hooks (`useState`, `useContext`) |

---

## Instalasi dan Menjalankan

Langkah-langkah berikut dilakukan di dalam direktori `/frontend`.

### 1. Instal Dependensi JavaScript

Pastikan **Node.js (v18+)** dan **npm** sudah terinstal, lalu jalankan:

```bash
npm install
```

### 2. Konfigurasi Variabel Lingkungan

Buat file `.env.local` (atau `.env`) di direktori `/frontend`, lalu tambahkan URL API backend berikut. Pastikan nilai ini menunjuk ke server Laravel yang sedang berjalan (lihat [backend/README.md](../backend/README.md)):

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### 3. Jalankan Aplikasi Development

```bash
npm run dev
```

Aplikasi akan terbuka di browser, umumnya pada `http://localhost:5173`.

---

## Koneksi API

Semua permintaan data (`GET`, `POST`, `PUT`, `DELETE`) dari aplikasi React diarahkan ke *base URL* yang didefinisikan dalam `VITE_API_URL`. Pastikan server **Backend** sudah berjalan terlebih dahulu sebelum menjalankan **Frontend** — lihat langkah instalasi backend di [backend/README.md](../backend/README.md).

---

## Terkait

Dokumentasi utama proyek beserta gambaran umum sistem, fitur, dan arsitektur keseluruhan dapat dilihat pada [README utama](../README.md).