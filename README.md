<div align="center">

# PROJECT HJS
### Warehouse Management System (WMS)

**Aplikasi digitalisasi operasional gudang berbasis web**
*Fullstack — React (Frontend) & Laravel (Backend API)*

</div>

---

## Tentang Proyek

**Warehouse Management System (WMS)** adalah aplikasi web yang dirancang khusus untuk mendigitalisasi operasional departemen gudang (*warehouse*). Sistem ini dibangun untuk menggantikan proses pencatatan manual, meminimalkan *human error*, serta mempercepat dan menyinkronkan alur logistik perusahaan.

Proyek ini dibangun menggunakan arsitektur **Decoupled (terpisah)**, di mana **Frontend (React)** dan **Backend (Laravel)** beroperasi secara independen dan saling berkomunikasi melalui **RESTful API**. Struktur ini ideal untuk skalabilitas sistem dan memudahkan kolaborasi antar tim pengembang.

---

## Fitur Utama

| Fitur | Deskripsi |
|---|---|
| **Manajemen Barang Masuk (Incoming)** | Pencatatan material masuk dengan sistem *Auto-Generate Serial Number* (S/N) berbasis tanggal. |
| **Pemrosesan Material (Split)** | Pemotongan material dengan perhitungan sisa (*remnant*) presisi tanpa mengurangi saldo utama stok. |
| **Pengeluaran Material (MTF)** | Pengeluaran barang secara sah melalui *Material Transfer Form* yang terintegrasi dengan deteksi duplikasi dokumen. |
| **Integrasi Barcode** | Fitur *generate*, cetak, dan *scan* barcode rak menggunakan kamera perangkat (*webcam/smartphone*) untuk pelacakan *real-time*. |
| **Pelacakan & Pelaporan** | Pencatatan riwayat pergerakan barang otomatis melalui *Stock Card* dan ekspor laporan dalam format Excel/PDF. |

---

## Aktor Sistem

| Role | Hak Akses |
|---|---|
| **Admin** | Akses penuh untuk mengelola data *master* (supplier, pengguna), mengeksekusi alur gudang (masuk, proses, keluar), serta mencetak *barcode*. |
| **Member** | Akses terbatas (*read-only*) untuk melakukan *scan* barcode rak, memantau *dashboard*, dan melihat riwayat Stock Card atau laporan. |

---

## Teknologi yang Digunakan

- **Backend Framework:** [Laravel](https://laravel.com/) (RESTful API)
- **Frontend:** React (Single Page Application)
- **Database:** MySQL
- **Styling & Interaksi:** HTML, CSS, JavaScript (termasuk integrasi *Barcode Scanner*)

---

## Struktur Proyek

Proyek diorganisir ke dalam dua direktori utama yang merupakan repositori mandiri:

```
Project-HJS/
├── backend/        # Laravel RESTful API Source Code
├── frontend/       # React Single Page Application (SPA) Source Code
├── .gitignore       # Mengabaikan vendor/ dan node_modules/
└── README.md        # File ini
```

---

## Persiapan Awal (Pre-requisites)

Pastikan lingkungan berikut sudah terinstal secara global sebelum menjalankan proyek:

- PHP (Versi 8.1+)
- Composer (Manajer paket PHP)
- Node.js (Versi 18+) & npm (Manajer paket JavaScript)
- Database (MySQL atau PostgreSQL)
- Git

---

## Cara Menjalankan Proyek

Proyek ini perlu dijalankan dalam dua terminal terpisah — satu untuk backend, satu untuk frontend.

### 1. Setup Backend (API Server)

```bash
cd backend
```
Ikuti langkah-langkah instalasi detail pada [`backend/README.md`](./backend/README.md).

### 2. Setup Frontend (Client App)

```bash
cd frontend
```
Ikuti langkah-langkah instalasi detail pada [`frontend/README.md`](./frontend/README.md).

---

## Kontributor

| Nama | Peran |
|---|---|
| Kevin Reynaldi Panjaitan | Developer |

---

## Status Proyek

<div align="center">

**Development — V1.0**

</div>