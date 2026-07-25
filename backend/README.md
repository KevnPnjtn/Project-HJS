# Backend — Laravel RESTful API

Direktori ini berisi kode sumber untuk RESTful API yang dibuat dengan Laravel. Backend ini adalah lapisan service yang bertanggung jawab atas logika bisnis, otentikasi, dan manajemen database pada **Project HJS — Warehouse Management System (WMS)**.

---

## Teknologi Utama

| Komponen | Teknologi |
|---|---|
| Framework | Laravel (PHP) |
| Database | MySQL |
| Autentikasi | Laravel Sanctum (disarankan untuk SPA) atau Passport |
| Server | PHP Built-in Server / Nginx / Apache |

---

## Instalasi dan Menjalankan

Langkah-langkah berikut dilakukan di dalam direktori `/backend`.

### 1. Instal Dependensi PHP

Pastikan **PHP (v8.1+)** dan **Composer** sudah terinstal, lalu jalankan:

```bash
composer install
```

### 2. Konfigurasi Database dan Lingkungan

Salin file `.env.example` menjadi `.env`, lalu generate kunci aplikasi:

```bash
cp .env.example .env
php artisan key:generate
```

Atur variabel `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` dengan kredensial database Anda di file `.env`.

### 3. Migrasi dan Seeding Database

```bash
php artisan migrate --seed
```

### 4. Jalankan Server Development

```bash
php artisan serve
```

API akan berjalan pada `http://127.0.0.1:8000`.

---

## Autentikasi dan Endpoint

| Metode | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/register` | Pendaftaran pengguna baru. |
| POST | `/api/login` | Otentikasi dan pemberian token. |
| GET | `/api/user` | Mendapatkan data pengguna yang sedang login (membutuhkan Token Bearer). |

---

## Terkait

Dokumentasi utama proyek beserta gambaran umum sistem, fitur, dan cara menjalankan Frontend dapat dilihat pada [README utama](../README.md).