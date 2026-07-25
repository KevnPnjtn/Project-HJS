-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 25, 2026 at 03:24 AM
-- Server version: 5.7.39
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aplikasi_inventori`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-forgot_password_22', 'b:1;', 1772846964),
('laravel-cache-forgot_password_23', 'b:1;', 1772850618),
('laravel-cache-opnames_d751713988987e9331980363e24189ce', 'O:42:\"Illuminate\\Pagination\\LengthAwarePaginator\":12:{s:8:\"\0*\0items\";O:39:\"Illuminate\\Database\\Eloquent\\Collection\":2:{s:8:\"\0*\0items\";a:15:{i:0;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:19;s:10:\"product_id\";i:18;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-03-05\";s:11:\"stok_sistem\";i:15;s:10:\"stok_fisik\";i:15;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"budi\";s:7:\"catatan\";s:16:\"15 stok digudang\";s:10:\"created_at\";s:19:\"2026-03-05 08:06:11\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:19;s:10:\"product_id\";i:18;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-03-05\";s:11:\"stok_sistem\";i:15;s:10:\"stok_fisik\";i:15;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"budi\";s:7:\"catatan\";s:16:\"15 stok digudang\";s:10:\"created_at\";s:19:\"2026-03-05 08:06:11\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:18;s:11:\"kode_barang\";s:6:\"BR-126\";s:11:\"nama_barang\";s:6:\"adalah\";s:6:\"satuan\";s:4:\"Unit\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:18;s:11:\"kode_barang\";s:6:\"BR-126\";s:11:\"nama_barang\";s:6:\"adalah\";s:6:\"satuan\";s:4:\"Unit\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:1;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:18;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-28\";s:11:\"stok_sistem\";i:18;s:10:\"stok_fisik\";i:18;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"budi\";s:7:\"catatan\";s:12:\"18 di gudang\";s:10:\"created_at\";s:19:\"2026-02-28 01:30:11\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:18;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-28\";s:11:\"stok_sistem\";i:18;s:10:\"stok_fisik\";i:18;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"budi\";s:7:\"catatan\";s:12:\"18 di gudang\";s:10:\"created_at\";s:19:\"2026-02-28 01:30:11\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:6;s:11:\"kode_barang\";s:6:\"BR-106\";s:11:\"nama_barang\";s:4:\"ABCD\";s:6:\"satuan\";s:4:\"Unit\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:6;s:11:\"kode_barang\";s:6:\"BR-106\";s:11:\"nama_barang\";s:4:\"ABCD\";s:6:\"satuan\";s:4:\"Unit\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:2;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:16;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-21\";s:11:\"stok_sistem\";i:10;s:10:\"stok_fisik\";i:10;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"ayam\";s:7:\"catatan\";s:8:\"fisik 10\";s:10:\"created_at\";s:19:\"2026-02-21 02:56:09\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:16;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-21\";s:11:\"stok_sistem\";i:10;s:10:\"stok_fisik\";i:10;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"ayam\";s:7:\"catatan\";s:8:\"fisik 10\";s:10:\"created_at\";s:19:\"2026-02-21 02:56:09\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:186;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:3;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:17;s:10:\"product_id\";i:9;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-21\";s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:1;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"GABE\";s:7:\"catatan\";s:17:\"Tidak ada selisih\";s:10:\"created_at\";s:19:\"2026-02-21 03:41:28\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:17;s:10:\"product_id\";i:9;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-21\";s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:1;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"GABE\";s:7:\"catatan\";s:17:\"Tidak ada selisih\";s:10:\"created_at\";s:19:\"2026-02-21 03:41:28\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:9;s:11:\"kode_barang\";s:6:\"BR-116\";s:11:\"nama_barang\";s:4:\"AYAM\";s:6:\"satuan\";s:4:\"Unit\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:9;s:11:\"kode_barang\";s:6:\"BR-116\";s:11:\"nama_barang\";s:4:\"AYAM\";s:6:\"satuan\";s:4:\"Unit\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:4;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:15;s:10:\"product_id\";i:3;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-09\";s:11:\"stok_sistem\";i:7;s:10:\"stok_fisik\";i:7;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"habil\";s:7:\"catatan\";s:14:\"barang fisik 7\";s:10:\"created_at\";s:19:\"2026-02-09 08:16:53\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:15;s:10:\"product_id\";i:3;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-02-09\";s:11:\"stok_sistem\";i:7;s:10:\"stok_fisik\";i:7;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"habil\";s:7:\"catatan\";s:14:\"barang fisik 7\";s:10:\"created_at\";s:19:\"2026-02-09 08:16:53\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:3;s:11:\"kode_barang\";s:6:\"BR-103\";s:11:\"nama_barang\";s:6:\"Apasih\";s:6:\"satuan\";s:3:\"Box\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:3;s:11:\"kode_barang\";s:6:\"BR-103\";s:11:\"nama_barang\";s:6:\"Apasih\";s:6:\"satuan\";s:3:\"Box\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:5;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:14;s:10:\"product_id\";i:9;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-30\";s:11:\"stok_sistem\";i:20;s:10:\"stok_fisik\";i:10;s:7:\"selisih\";i:-10;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"budi\";s:7:\"catatan\";s:18:\"barang digudang 10\";s:10:\"created_at\";s:19:\"2026-01-30 02:14:04\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:14;s:10:\"product_id\";i:9;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-30\";s:11:\"stok_sistem\";i:20;s:10:\"stok_fisik\";i:10;s:7:\"selisih\";i:-10;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"budi\";s:7:\"catatan\";s:18:\"barang digudang 10\";s:10:\"created_at\";s:19:\"2026-01-30 02:14:04\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:389;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:6;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:10;s:10:\"product_id\";i:3;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:6;s:10:\"stok_fisik\";i:9;s:7:\"selisih\";i:3;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";N;s:7:\"catatan\";s:15:\"ada 9 di gudang\";s:10:\"created_at\";s:19:\"2026-01-22 08:55:16\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:10;s:10:\"product_id\";i:3;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:6;s:10:\"stok_fisik\";i:9;s:7:\"selisih\";i:3;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";N;s:7:\"catatan\";s:15:\"ada 9 di gudang\";s:10:\"created_at\";s:19:\"2026-01-22 08:55:16\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:520;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:7;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:11;s:10:\"product_id\";i:13;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:14;s:7:\"selisih\";i:14;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"Yulia\";s:7:\"catatan\";s:20:\"ada 14 stok digudang\";s:10:\"created_at\";s:19:\"2026-01-22 09:28:34\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:11;s:10:\"product_id\";i:13;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:14;s:7:\"selisih\";i:14;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"Yulia\";s:7:\"catatan\";s:20:\"ada 14 stok digudang\";s:10:\"created_at\";s:19:\"2026-01-22 09:28:34\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:13;s:11:\"kode_barang\";s:6:\"BR-120\";s:11:\"nama_barang\";s:11:\"AYAM PISANG\";s:6:\"satuan\";s:3:\"Pcs\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:13;s:11:\"kode_barang\";s:6:\"BR-120\";s:11:\"nama_barang\";s:11:\"AYAM PISANG\";s:6:\"satuan\";s:3:\"Pcs\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:8;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:12;s:10:\"product_id\";i:13;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:14;s:10:\"stok_fisik\";i:14;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"yulia\";s:7:\"catatan\";s:21:\"ada 14 stok di gudang\";s:10:\"created_at\";s:19:\"2026-01-22 09:33:06\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:12;s:10:\"product_id\";i:13;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:14;s:10:\"stok_fisik\";i:14;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"yulia\";s:7:\"catatan\";s:21:\"ada 14 stok di gudang\";s:10:\"created_at\";s:19:\"2026-01-22 09:33:06\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:795;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:9;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:13;s:10:\"product_id\";i:4;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:13;s:7:\"selisih\";i:13;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"yulia\";s:7:\"catatan\";s:18:\"ada 13 stok gudang\";s:10:\"created_at\";s:19:\"2026-01-22 09:41:28\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:13;s:10:\"product_id\";i:4;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-22\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:13;s:7:\"selisih\";i:13;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"yulia\";s:7:\"catatan\";s:18:\"ada 13 stok gudang\";s:10:\"created_at\";s:19:\"2026-01-22 09:41:28\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:4;s:11:\"kode_barang\";s:6:\"BR-104\";s:11:\"nama_barang\";s:6:\"Kenapa\";s:6:\"satuan\";s:3:\"Box\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:4;s:11:\"kode_barang\";s:6:\"BR-104\";s:11:\"nama_barang\";s:6:\"Kenapa\";s:6:\"satuan\";s:3:\"Box\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:10;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:9;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-10\";s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:4;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"abcd\";s:7:\"catatan\";s:6:\"sesuai\";s:10:\"created_at\";s:19:\"2026-01-10 04:20:18\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:9;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-10\";s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:4;s:7:\"selisih\";i:0;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"abcd\";s:7:\"catatan\";s:6:\"sesuai\";s:10:\"created_at\";s:19:\"2026-01-10 04:20:18\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:186;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:11;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:6;s:10:\"product_id\";i:12;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-08\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:5;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"ABCD\";s:7:\"catatan\";s:19:\"ada 5 pcs di gudang\";s:10:\"created_at\";s:19:\"2026-01-08 02:32:59\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:6;s:10:\"product_id\";i:12;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-08\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:5;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:4:\"ABCD\";s:7:\"catatan\";s:19:\"ada 5 pcs di gudang\";s:10:\"created_at\";s:19:\"2026-01-08 02:32:59\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";O:18:\"App\\Models\\Product\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:8:\"products\";s:13:\"\0*\0primaryKey\";s:10:\"product_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:4:{s:10:\"product_id\";i:12;s:11:\"kode_barang\";s:6:\"BR-119\";s:11:\"nama_barang\";s:3:\"APS\";s:6:\"satuan\";s:3:\"Pcs\";}s:11:\"\0*\0original\";a:4:{s:10:\"product_id\";i:12;s:11:\"kode_barang\";s:6:\"BR-119\";s:11:\"nama_barang\";s:3:\"APS\";s:6:\"satuan\";s:3:\"Pcs\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:6:{s:4:\"stok\";s:7:\"integer\";s:12:\"stok_minimal\";s:7:\"integer\";s:11:\"harga_modal\";s:9:\"decimal:2\";s:10:\"harga_jual\";s:9:\"decimal:2\";s:10:\"created_at\";s:8:\"datetime\";s:10:\"updated_at\";s:8:\"datetime\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:0:{}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:11:{i:0;s:11:\"kode_barang\";i:1;s:11:\"nama_barang\";i:2;s:12:\"jenis_barang\";i:3;s:6:\"satuan\";i:4;s:12:\"stok_minimal\";i:5;s:4:\"stok\";i:6;s:11:\"harga_modal\";i:7;s:10:\"harga_jual\";i:8;s:7:\"qr_code\";i:9;s:4:\"uuid\";i:10;s:7:\"user_id\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:12;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:7;s:10:\"product_id\";i:12;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-08\";s:11:\"stok_sistem\";i:5;s:10:\"stok_fisik\";i:6;s:7:\"selisih\";i:1;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"abcds\";s:7:\"catatan\";s:19:\"ada 6 stok digudang\";s:10:\"created_at\";s:19:\"2026-01-08 02:33:20\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:7;s:10:\"product_id\";i:12;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-08\";s:11:\"stok_sistem\";i:5;s:10:\"stok_fisik\";i:6;s:7:\"selisih\";i:1;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"abcds\";s:7:\"catatan\";s:19:\"ada 6 stok digudang\";s:10:\"created_at\";s:19:\"2026-01-08 02:33:20\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:1201;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:13;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:8;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-08\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:4;s:7:\"selisih\";i:4;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";N;s:7:\"catatan\";s:20:\"ada 4 stok di gudang\";s:10:\"created_at\";s:19:\"2026-01-08 02:36:23\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:8;s:10:\"product_id\";i:6;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2026-01-08\";s:11:\"stok_sistem\";i:0;s:10:\"stok_fisik\";i:4;s:7:\"selisih\";i:4;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";N;s:7:\"catatan\";s:20:\"ada 4 stok di gudang\";s:10:\"created_at\";s:19:\"2026-01-08 02:36:23\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:186;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}i:14;O:22:\"App\\Models\\StockOpname\":33:{s:13:\"\0*\0connection\";s:5:\"mysql\";s:8:\"\0*\0table\";s:13:\"stock_opnames\";s:13:\"\0*\0primaryKey\";s:9:\"opname_id\";s:10:\"\0*\0keyType\";s:3:\"int\";s:12:\"incrementing\";b:1;s:7:\"\0*\0with\";a:0:{}s:12:\"\0*\0withCount\";a:0:{}s:19:\"preventsLazyLoading\";b:0;s:10:\"\0*\0perPage\";i:15;s:6:\"exists\";b:1;s:18:\"wasRecentlyCreated\";b:0;s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:13:\"\0*\0attributes\";a:11:{s:9:\"opname_id\";i:5;s:10:\"product_id\";i:3;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2025-12-03\";s:11:\"stok_sistem\";i:55;s:10:\"stok_fisik\";i:53;s:7:\"selisih\";i:-2;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"Yulia\";s:7:\"catatan\";s:15:\"Ada yang kurang\";s:10:\"created_at\";s:19:\"2025-12-03 09:51:41\";}s:11:\"\0*\0original\";a:11:{s:9:\"opname_id\";i:5;s:10:\"product_id\";i:3;s:7:\"user_id\";N;s:14:\"tanggal_opname\";s:10:\"2025-12-03\";s:11:\"stok_sistem\";i:55;s:10:\"stok_fisik\";i:53;s:7:\"selisih\";i:-2;s:18:\"status_penyesuaian\";s:11:\"Disesuaikan\";s:12:\"nama_petugas\";s:5:\"Yulia\";s:7:\"catatan\";s:15:\"Ada yang kurang\";s:10:\"created_at\";s:19:\"2025-12-03 09:51:41\";}s:10:\"\0*\0changes\";a:0:{}s:11:\"\0*\0previous\";a:0:{}s:8:\"\0*\0casts\";a:4:{s:14:\"tanggal_opname\";s:4:\"date\";s:11:\"stok_sistem\";s:7:\"integer\";s:10:\"stok_fisik\";s:7:\"integer\";s:7:\"selisih\";s:7:\"integer\";}s:17:\"\0*\0classCastCache\";a:0:{}s:21:\"\0*\0attributeCastCache\";a:0:{}s:13:\"\0*\0dateFormat\";N;s:10:\"\0*\0appends\";a:0:{}s:19:\"\0*\0dispatchesEvents\";a:0:{}s:14:\"\0*\0observables\";a:0:{}s:12:\"\0*\0relations\";a:2:{s:7:\"product\";r:520;s:4:\"user\";N;}s:10:\"\0*\0touches\";a:0:{}s:27:\"\0*\0relationAutoloadCallback\";N;s:26:\"\0*\0relationAutoloadContext\";N;s:10:\"timestamps\";b:1;s:13:\"usesUniqueIds\";b:0;s:9:\"\0*\0hidden\";a:0:{}s:10:\"\0*\0visible\";a:0:{}s:11:\"\0*\0fillable\";a:9:{i:0;s:10:\"product_id\";i:1;s:7:\"user_id\";i:2;s:14:\"tanggal_opname\";i:3;s:11:\"stok_sistem\";i:4;s:10:\"stok_fisik\";i:5;s:7:\"selisih\";i:6;s:12:\"nama_petugas\";i:7;s:7:\"catatan\";i:8;s:18:\"status_penyesuaian\";}s:10:\"\0*\0guarded\";a:1:{i:0;s:1:\"*\";}}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:10:\"\0*\0perPage\";i:15;s:14:\"\0*\0currentPage\";i:1;s:7:\"\0*\0path\";s:43:\"http://localhost:8000/api/dev/stock-opnames\";s:8:\"\0*\0query\";a:0:{}s:11:\"\0*\0fragment\";N;s:11:\"\0*\0pageName\";s:4:\"page\";s:28:\"\0*\0escapeWhenCastingToString\";b:0;s:10:\"onEachSide\";i:3;s:10:\"\0*\0options\";a:2:{s:4:\"path\";s:43:\"http://localhost:8000/api/dev/stock-opnames\";s:8:\"pageName\";s:4:\"page\";}s:8:\"\0*\0total\";i:19;s:11:\"\0*\0lastPage\";i:2;}', 1780630505);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_03_040819_create_personal_access_tokens_table', 1),
(5, '2025_11_07_061941_add_role_to_users_table', 1),
(6, '2025_11_17_070114_create_products_table', 1),
(7, '2025_11_17_070141_create_stock_transactions_table', 1),
(8, '2025_11_17_070236_create_profit_reports_table', 1),
(9, '2025_11_17_070250_create_product_qr_logs_table', 1),
(10, '2025_11_24_034238_create_stock_opnames_table', 2),
(11, '2025_11_27_032649_add_performance_indexes', 3),
(12, '2025_12_17_041907_add_indexes_to_products_and_transactions', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('natanaelpanjaitan100@gmail.com', '$2y$12$l5AzLWWK8ejnXTjeD0U0f.k7XDItCllkS2kyujJLb/yznvZEsBIpm', '2025-12-15 00:54:47');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '15b8e49b98fb9739b5f483512fb1e6c19e2f7753bca1ae4194c6618d9ad96612', '[\"*\"]', NULL, NULL, '2025-11-19 23:52:56', '2025-11-19 23:52:56'),
(2, 'App\\Models\\User', 1, 'auth_token', 'e2a5afc9360c8fbdaca0cd60f4d634b36bcd00f92918d27cbdc7dbd9f1bf6be4', '[\"*\"]', NULL, NULL, '2025-11-20 18:40:05', '2025-11-20 18:40:05'),
(3, 'App\\Models\\User', 1, 'auth_token', '57f5410441ffee34795145418b5a91f7f8c015bced9d457283b182de63de64f5', '[\"*\"]', NULL, NULL, '2025-11-21 19:13:39', '2025-11-21 19:13:39'),
(4, 'App\\Models\\User', 1, 'auth_token', '448fba5f9d49c666ece07b3f092d54be4267bfbcf5c0349b53262b8d07824b91', '[\"*\"]', NULL, NULL, '2025-11-23 18:34:50', '2025-11-23 18:34:50'),
(5, 'App\\Models\\User', 1, 'auth_token', 'b2fbf0a0720de3481fc6a632c8b74beb304005c86e396a9a3f026a54a37f157f', '[\"*\"]', NULL, NULL, '2025-11-24 19:01:09', '2025-11-24 19:01:09'),
(6, 'App\\Models\\User', 1, 'auth_token', '7cde91b9b415f5de5c5cbf22f51e43e63f53d276a80a2d8688db871a358a347f', '[\"*\"]', NULL, NULL, '2025-11-25 19:07:15', '2025-11-25 19:07:15'),
(7, 'App\\Models\\User', 1, 'auth_token', '8c22e01b6c2ba560d29b9de934b2dd310ee6837ca24e120483ccf16bef55afd1', '[\"*\"]', NULL, NULL, '2025-11-25 20:48:44', '2025-11-25 20:48:44'),
(8, 'App\\Models\\User', 1, 'auth_token', '056bb792a6552c3180b2c734a97c34e2b9c5252a2069825949dc21022b4d4908', '[\"*\"]', NULL, NULL, '2025-11-25 20:49:03', '2025-11-25 20:49:03'),
(9, 'App\\Models\\User', 2, 'auth_token', 'b62fdafe53173723fbb54d4b04b8a008f06cd75256197538b277aa60dcfed7dc', '[\"*\"]', NULL, NULL, '2025-11-25 21:17:52', '2025-11-25 21:17:52'),
(10, 'App\\Models\\User', 1, 'auth_token', '93758f2dac17d031ee2c1691567e394c0d2ceb3f380670bc5dabc37b74e14b50', '[\"*\"]', NULL, NULL, '2025-11-25 21:18:11', '2025-11-25 21:18:11'),
(11, 'App\\Models\\User', 1, 'auth_token', '12c888303ef4d169605572adf9d47f1411402c0df3f8591ffca5adaa1a2ea30e', '[\"*\"]', NULL, NULL, '2025-11-26 19:58:46', '2025-11-26 19:58:46'),
(12, 'App\\Models\\User', 1, 'auth_token', '181b12632e16ffb211140f0eb69d3d263cb62293a019d048e6189e635bde2c2c', '[\"*\"]', NULL, NULL, '2025-11-26 19:59:33', '2025-11-26 19:59:33'),
(13, 'App\\Models\\User', 1, 'auth_token', '645e71832d82241af3c13e08d425e3877730d496dd58d880ceffe3aab5bbb01d', '[\"*\"]', NULL, NULL, '2025-11-26 20:42:41', '2025-11-26 20:42:41'),
(14, 'App\\Models\\User', 1, 'auth_token', 'e6d7e6e2ce2dca5962b66653e2f7b1b062d30b668e9e471c4a88253965a04cd4', '[\"*\"]', NULL, NULL, '2025-11-27 00:02:09', '2025-11-27 00:02:09'),
(15, 'App\\Models\\User', 1, 'auth_token', '803194f323282bc96f15524194e115fbb6ae0490045b5d85f6d41b56be7513a9', '[\"*\"]', NULL, NULL, '2025-11-27 00:02:11', '2025-11-27 00:02:11'),
(16, 'App\\Models\\User', 1, 'auth_token', '530c0e1cc01ed8d715529008c0e6dc7a437903e1a3cee15110fc2ee23ec23760', '[\"*\"]', NULL, NULL, '2025-11-27 01:27:01', '2025-11-27 01:27:01'),
(17, 'App\\Models\\User', 1, 'auth_token', 'e06f995ed178972e0f1956cc300db7185029ee10040fc501d30f27f9702062cf', '[\"*\"]', NULL, NULL, '2025-11-27 18:48:21', '2025-11-27 18:48:21'),
(18, 'App\\Models\\User', 1, 'auth_token', '0a9ecb4514cbb71e59788551b4e2ed8a5df035e3b1256443c232493d5a4bf279', '[\"*\"]', NULL, NULL, '2025-11-30 19:52:39', '2025-11-30 19:52:39'),
(19, 'App\\Models\\User', 1, 'auth_token', '1c23be1e474f4804a74352c94702eb83cfecc8b1fa9c325a199f641a76930684', '[\"*\"]', NULL, NULL, '2025-11-30 19:52:41', '2025-11-30 19:52:41'),
(20, 'App\\Models\\User', 1, 'auth_token', '0948dba2e623cf1aed161ae63f622774e4de4b20439f43ace475eb814786c4c5', '[\"*\"]', NULL, NULL, '2025-12-01 19:09:42', '2025-12-01 19:09:42'),
(21, 'App\\Models\\User', 1, 'auth_token', 'f037f3fd56b2c2fd6790306b11d5397f53415a3c8e6df78ce190fc769fa5a974', '[\"*\"]', NULL, NULL, '2025-12-01 19:09:47', '2025-12-01 19:09:47'),
(22, 'App\\Models\\User', 1, 'auth_token', '59467e8b9bbd501351e650fb26a4c86c6b556c7821b0bba765e84ba3e9102461', '[\"*\"]', NULL, NULL, '2025-12-01 20:36:09', '2025-12-01 20:36:09'),
(23, 'App\\Models\\User', 1, 'auth_token', 'a33a7ab01523caf457921616d8afe2e7a9f373c53ba49d7e9cbd0ef13b117c39', '[\"*\"]', NULL, NULL, '2025-12-02 00:35:04', '2025-12-02 00:35:04'),
(24, 'App\\Models\\User', 1, 'auth_token', '1b6f95cd43e145591e17340f8a965e343724d6ddf79f5046f21c272f320bcf10', '[\"*\"]', NULL, NULL, '2025-12-02 01:54:47', '2025-12-02 01:54:47'),
(25, 'App\\Models\\User', 1, 'auth_token', 'e0129bcee7b9768a0a05e090469107e44098b1512685d596378908e05806d051', '[\"*\"]', NULL, NULL, '2025-12-03 02:46:29', '2025-12-03 02:46:29'),
(26, 'App\\Models\\User', 1, 'auth_token', '08041921adc83696a30a445058f6eaf463a49140c5ac093d3553bf3ba5ca0473', '[\"*\"]', NULL, NULL, '2025-12-03 19:55:37', '2025-12-03 19:55:37'),
(27, 'App\\Models\\User', 1, 'auth_token', '0ea75c3997ea3bbfe158bb0f5165e57926d8ab86aeb65b753b95d8563a61db41', '[\"*\"]', NULL, NULL, '2025-12-04 01:21:51', '2025-12-04 01:21:51'),
(28, 'App\\Models\\User', 1, 'auth_token', '62111316be7e735eb383e1388b9eb5b1a35499ec6eddf5094dab1afd7d4b4164', '[\"*\"]', NULL, NULL, '2025-12-04 19:36:47', '2025-12-04 19:36:47'),
(29, 'App\\Models\\User', 1, 'auth_token', 'ab7cb3b7eb2df4cfb4ca6b986b135aeb651a84dda2779b40c169ca89e76dc3f1', '[\"*\"]', NULL, NULL, '2025-12-04 21:36:45', '2025-12-04 21:36:45'),
(30, 'App\\Models\\User', 1, 'auth_token', '701a84506977ea5ca7aee5d42915c2286b3072c660810a0f257f7a00076bc68a', '[\"*\"]', NULL, NULL, '2025-12-05 00:21:49', '2025-12-05 00:21:49'),
(31, 'App\\Models\\User', 1, 'auth_token', 'f7f841f489d27af73f019db2a2205889bb1ba98ca3510c12507962e096afb084', '[\"*\"]', NULL, NULL, '2025-12-05 00:50:06', '2025-12-05 00:50:06'),
(32, 'App\\Models\\User', 1, 'auth_token', '8991063a3f16c5523d816bc5388a5dd6e020508781895dac704c5162ff766bb7', '[\"*\"]', NULL, NULL, '2025-12-05 00:50:34', '2025-12-05 00:50:34'),
(33, 'App\\Models\\User', 1, 'auth_token', 'dfa71f9baf1b420f4b1aa7515486f4a6ec8a07d49df2b4eb628c719f3ba62e15', '[\"*\"]', NULL, NULL, '2025-12-05 00:57:05', '2025-12-05 00:57:05'),
(34, 'App\\Models\\User', 1, 'auth_token', '1f95d786c43fb0c0707f0621d5d39a7986d4f5f8e7c808902f1714a40d0809d6', '[\"*\"]', NULL, NULL, '2025-12-08 19:19:19', '2025-12-08 19:19:19'),
(35, 'App\\Models\\User', 1, 'auth_token', '2a6c57808bd776d98332e3ded619561280e2ecc5c1ffacd6fa8170dadb73d66a', '[\"*\"]', NULL, NULL, '2025-12-08 19:19:25', '2025-12-08 19:19:25'),
(36, 'App\\Models\\User', 1, 'auth_token', '909e2db1b39ac020eb6d8fd243c0b1bd66c06294ea9a20f0e23859ab29f2ecc1', '[\"*\"]', NULL, NULL, '2025-12-09 01:38:28', '2025-12-09 01:38:28'),
(37, 'App\\Models\\User', 1, 'auth_token', 'fb845402b416261007dfc8a2484673da5e81b5ef5ea9198f59f38f036343148b', '[\"*\"]', NULL, NULL, '2025-12-11 20:33:59', '2025-12-11 20:33:59'),
(38, 'App\\Models\\User', 1, 'auth_token', '5b590ee76a96403879a7a0391edd47a5a343298e77effdb9bdab497ebd88d1be', '[\"*\"]', NULL, NULL, '2025-12-11 20:34:12', '2025-12-11 20:34:12'),
(39, 'App\\Models\\User', 1, 'auth_token', '813d3f587c7ef297e857f690354583bbb3160317aee3d700d8bab2c30c09a3e9', '[\"*\"]', NULL, NULL, '2025-12-12 00:36:35', '2025-12-12 00:36:35'),
(40, 'App\\Models\\User', 1, 'auth_token', 'b61df220d6718a8dc11d7eb9b041234068273db52285f53fa7047e95a7bd291e', '[\"*\"]', NULL, NULL, '2025-12-12 00:49:18', '2025-12-12 00:49:18'),
(41, 'App\\Models\\User', 1, 'auth_token', '5f71c71c0b7592629965480bbebd7ea9838b0fd12375db7672fd36cbf000f9b4', '[\"*\"]', NULL, NULL, '2025-12-12 02:32:29', '2025-12-12 02:32:29'),
(42, 'App\\Models\\User', 1, 'auth_token', 'defb47a9d1017094e5533fb38187cee7e0a2fe0e431e8c3cbad3114e645c872f', '[\"*\"]', NULL, NULL, '2025-12-12 02:32:47', '2025-12-12 02:32:47'),
(43, 'App\\Models\\User', 1, 'auth_token', 'b1d6f0ee3679182d014e19c2c17c9fab00565ebd4a8f3a848110f32c3d64ac50', '[\"*\"]', NULL, NULL, '2025-12-12 20:07:04', '2025-12-12 20:07:04'),
(44, 'App\\Models\\User', 1, 'auth_token', 'b47d212df5a44976e215eefdf3b51a768fa6f13c27538ff25ccab1a01fb40ab3', '[\"*\"]', NULL, NULL, '2025-12-12 20:28:15', '2025-12-12 20:28:15'),
(45, 'App\\Models\\User', 1, 'auth_token', '99e9d4cbef41ddfd5a3cecccba66adfec751f8f64a27a63c84072246e206176c', '[\"*\"]', NULL, NULL, '2025-12-12 20:33:21', '2025-12-12 20:33:21'),
(46, 'App\\Models\\User', 1, 'auth_token', '219a7a04d6e0d3162147152bbc4e66be790ef5eee6f520cb374b798fecced56e', '[\"*\"]', NULL, NULL, '2025-12-14 19:30:21', '2025-12-14 19:30:21'),
(47, 'App\\Models\\User', 1, 'auth_token', '001c5df2e21a924687985e5e5160697ac71abb2162cabec374c93b9cc81a1e74', '[\"*\"]', NULL, NULL, '2025-12-14 19:30:25', '2025-12-14 19:30:25'),
(48, 'App\\Models\\User', 1, 'auth_token', 'f46c55d49e319e890d7c6faa307b4bc3ad97d2969f58982cb2a1e68720b3582c', '[\"*\"]', NULL, NULL, '2025-12-14 20:09:59', '2025-12-14 20:09:59'),
(49, 'App\\Models\\User', 1, 'auth_token', '29fe8d2143e55a8b995f236706e0543c61071b54537392845b5449e7dad1573f', '[\"*\"]', NULL, NULL, '2025-12-14 20:20:30', '2025-12-14 20:20:30'),
(50, 'App\\Models\\User', 1, 'auth_token', '7af3cabfb963f2438e4ab143e1cb1cb913920e933d5cbf1fe3d6f48aebbfcdff', '[\"*\"]', NULL, NULL, '2025-12-14 20:24:20', '2025-12-14 20:24:20'),
(51, 'App\\Models\\User', 1, 'auth_token', '07102e912335530c003577cef09bc3ebb2075335b20970dfd5253f4e17e53237', '[\"*\"]', NULL, NULL, '2025-12-14 20:26:02', '2025-12-14 20:26:02'),
(52, 'App\\Models\\User', 1, 'auth_token', '89cacefcf2e28c7aed645243cb28276dac1595de7128181e68c10b6fc2755148', '[\"*\"]', NULL, NULL, '2025-12-14 20:26:14', '2025-12-14 20:26:14'),
(53, 'App\\Models\\User', 1, 'auth_token', '17188eec342e5882dc8ab4ab7194edda147ab178667cd327dc3d3f1bad77bc05', '[\"*\"]', NULL, NULL, '2025-12-14 20:28:38', '2025-12-14 20:28:38'),
(54, 'App\\Models\\User', 17, 'auth_token', 'a5bee35bd4d4f1bbd5603e6817e401d4bc10f5055cd478e0d85aeadf4bedd3a6', '[\"*\"]', NULL, NULL, '2025-12-14 23:47:14', '2025-12-14 23:47:14'),
(55, 'App\\Models\\User', 17, 'auth_token', 'bedb354bc4a7b075219a0ff7a606882e71a80d9b3d264b42bfb4d10d39e3805b', '[\"*\"]', NULL, NULL, '2025-12-14 23:47:46', '2025-12-14 23:47:46'),
(56, 'App\\Models\\User', 17, 'auth_token', 'b71413b9ebf5d98f5d464426d7fe86fd04702ba2914896d4586dc6e78fec7a84', '[\"*\"]', NULL, NULL, '2025-12-15 00:00:01', '2025-12-15 00:00:01'),
(57, 'App\\Models\\User', 17, 'auth_token', '4eef5c51527ffde56c2c9cdf5ae73cdd1d5d54666e6b7b5efb6b7301936ca90c', '[\"*\"]', NULL, NULL, '2025-12-15 00:54:26', '2025-12-15 00:54:26'),
(58, 'App\\Models\\User', 1, 'auth_token', '89a137bb46717a23110fb5c2ab15ffdb7905d2517945bdd7fbe69243aa0bb7d8', '[\"*\"]', NULL, NULL, '2025-12-16 02:14:11', '2025-12-16 02:14:11'),
(59, 'App\\Models\\User', 1, 'auth_token', 'c02af1418f66091b705f7508929a8659365cb20a5d803ff4f6eb563744edc9fd', '[\"*\"]', NULL, NULL, '2025-12-16 19:18:18', '2025-12-16 19:18:18'),
(60, 'App\\Models\\User', 1, 'auth_token', '501d0f54112fc5afce3304aaf1990f2bfef19e74959f38673838697dc9a5ff48', '[\"*\"]', NULL, NULL, '2025-12-17 20:25:59', '2025-12-17 20:25:59'),
(61, 'App\\Models\\User', 1, 'auth_token', '2109299fc8a7b74595b9d7c74d870a196020012f188f3ee68b1898ce853f61ce', '[\"*\"]', NULL, NULL, '2025-12-18 00:34:09', '2025-12-18 00:34:09'),
(62, 'App\\Models\\User', 1, 'auth_token', 'b08e753352ab34ef3ce508c5ceaec0bb9a238f28db8585459e0664e5238b4d2b', '[\"*\"]', NULL, NULL, '2025-12-19 18:23:26', '2025-12-19 18:23:26'),
(63, 'App\\Models\\User', 1, 'auth_token', 'd8eb27a227e8647e6b91fd03cf478d9618fdd60292d360fa4ec99b4cd39b340b', '[\"*\"]', NULL, NULL, '2025-12-19 18:41:26', '2025-12-19 18:41:26'),
(64, 'App\\Models\\User', 1, 'auth_token', 'f1a72841e71250f55151fea140cc2472a4476a87047d80223eeff69b0f0f4eee', '[\"*\"]', NULL, NULL, '2025-12-20 23:19:44', '2025-12-20 23:19:44'),
(65, 'App\\Models\\User', 1, 'auth_token', '7bf98614e0993653ec2f4373e8fcc7409b7b0523735e98db5805958d253e102f', '[\"*\"]', NULL, NULL, '2025-12-21 08:02:53', '2025-12-21 08:02:53'),
(66, 'App\\Models\\User', 1, 'auth_token', '2800bfef1ea8a64e5eaa1cbaa5426c3dbc5c12c8432d4d75d5e1e8322b680a2d', '[\"*\"]', NULL, NULL, '2025-12-21 18:53:19', '2025-12-21 18:53:19'),
(67, 'App\\Models\\User', 1, 'auth_token', 'd25adb9d4d31616a9e809cd21854746c31166299472345da5182b96d813c1b8c', '[\"*\"]', NULL, NULL, '2025-12-21 19:11:40', '2025-12-21 19:11:40'),
(68, 'App\\Models\\User', 1, 'auth_token', 'e84892ec43b4ae5f51b043087ec0ecd61ce6f9fa7a1172039b53c65aae944087', '[\"*\"]', NULL, NULL, '2025-12-22 01:47:26', '2025-12-22 01:47:26'),
(69, 'App\\Models\\User', 1, 'auth_token', 'b049d8465686ad960d6a615f914bf4877da7e93c40dfba2443f748777560793a', '[\"*\"]', NULL, NULL, '2025-12-22 18:48:54', '2025-12-22 18:48:54'),
(70, 'App\\Models\\User', 7, 'auth_token', 'bb83cd65adc254183badf6b7120cfabf5799028e98416c69f2bfacc6e0e4e6a1', '[\"*\"]', NULL, NULL, '2025-12-26 01:07:38', '2025-12-26 01:07:38'),
(71, 'App\\Models\\User', 1, 'auth_token', 'a3766098c168c376ab31936c68f246e5058daf8bdf87bef40e7380774c095835', '[\"*\"]', NULL, NULL, '2025-12-26 01:13:06', '2025-12-26 01:13:06'),
(72, 'App\\Models\\User', 7, 'auth_token', '2cff6d8fc25ea0e41cf4e65889960965cd5ed858b37f973a31c2a0d6321aebb8', '[\"*\"]', NULL, NULL, '2025-12-26 01:15:37', '2025-12-26 01:15:37'),
(73, 'App\\Models\\User', 1, 'auth_token', 'a47f0ada8e0e14501d1ed2f944007c0c241e914df504ca4c86a7052cc72dbde4', '[\"*\"]', NULL, NULL, '2025-12-26 01:40:48', '2025-12-26 01:40:48'),
(74, 'App\\Models\\User', 7, 'auth_token', 'b41ebdb7fe323242b7453b25e33db6ac3f2288b710996bf018a2b5b4540be841', '[\"*\"]', NULL, NULL, '2025-12-26 01:58:30', '2025-12-26 01:58:30'),
(75, 'App\\Models\\User', 7, 'auth_token', '478a3b003d1cff1c0387b0f850a3e2099dd9a58e7f821884c5b1c2744a5abf41', '[\"*\"]', NULL, NULL, '2025-12-28 19:38:56', '2025-12-28 19:38:56'),
(76, 'App\\Models\\User', 7, 'auth_token', '70db90dfff7a79dd4dc7f04f5b3627c8e2e3773205efb4577f14afc05f36ea4e', '[\"*\"]', NULL, NULL, '2025-12-30 19:35:02', '2025-12-30 19:35:02'),
(77, 'App\\Models\\User', 7, 'auth_token', 'd82f2235c94e72d446361b12ab5a8d2199b1ad7423b09fca533075e7c7f7d994', '[\"*\"]', NULL, NULL, '2026-01-01 20:04:31', '2026-01-01 20:04:31'),
(78, 'App\\Models\\User', 7, 'auth_token', '8d575a523365a38d727867d4cb1a4cb4fe903b3e8aaefb77b030616fa18564a7', '[\"*\"]', NULL, NULL, '2026-01-04 20:05:21', '2026-01-04 20:05:21'),
(79, 'App\\Models\\User', 1, 'auth_token', '833b2a0c5ee4b7be42fb559cb88db506a2353a831542167f99c773418f772721', '[\"*\"]', NULL, NULL, '2026-01-04 20:39:53', '2026-01-04 20:39:53'),
(80, 'App\\Models\\User', 1, 'auth_token', '4bfa25eebd36a027e5edfc22d32ec0a0a6f14c0ba2c16cf89d69faab1642dd04', '[\"*\"]', NULL, NULL, '2026-01-05 19:49:10', '2026-01-05 19:49:10'),
(81, 'App\\Models\\User', 7, 'auth_token', '445a22c6f57eaf4c13ea247d56339c653ce2ce7892ded1cdc2573641fd2b26bb', '[\"*\"]', NULL, NULL, '2026-01-06 00:57:12', '2026-01-06 00:57:12'),
(82, 'App\\Models\\User', 1, 'auth_token', '2ad3f629e6fbc0911fd78f3615f8d57f941981095b9db5de7a12dd422d039665', '[\"*\"]', NULL, NULL, '2026-01-07 18:58:47', '2026-01-07 18:58:47'),
(83, 'App\\Models\\User', 7, 'auth_token', 'fc425819afa3ef0c891fd8a3effdb111a47c8e810ef45636e089da7a2acfc6f8', '[\"*\"]', NULL, NULL, '2026-01-08 20:13:24', '2026-01-08 20:13:24'),
(84, 'App\\Models\\User', 1, 'auth_token', '28dd3f378db4bf8e7940c09c37f734bfbaf2bdf0427b089d23544e9ca986d8fe', '[\"*\"]', NULL, NULL, '2026-01-09 20:34:57', '2026-01-09 20:34:57'),
(85, 'App\\Models\\User', 7, 'auth_token', 'f0578d5c141000c1cd243e92161b574d9332df2fdce0a81b913d885d97d3edfb', '[\"*\"]', NULL, NULL, '2026-01-09 20:40:59', '2026-01-09 20:40:59'),
(86, 'App\\Models\\User', 1, 'auth_token', '2dbdefa310be1f935cc5a4c844eb52709e52d86a08fa4afb37f1510bf1e6c267', '[\"*\"]', NULL, NULL, '2026-01-09 21:19:58', '2026-01-09 21:19:58'),
(87, 'App\\Models\\User', 7, 'auth_token', 'f0c719c3c0fa2bed2ca9334263f31dceb92b3c46eb671e0081cdedbc64ae7143', '[\"*\"]', NULL, NULL, '2026-01-09 21:22:17', '2026-01-09 21:22:17'),
(88, 'App\\Models\\User', 1, 'auth_token', '38ae966fd0a520d5275b234187d8f72d5c6c2771094c01178a8ac801f65dbf1f', '[\"*\"]', NULL, NULL, '2026-01-09 21:35:50', '2026-01-09 21:35:50'),
(89, 'App\\Models\\User', 7, 'auth_token', 'cb0ec118d7d4cb3ab81358c16ad32b4523f17dbc7db62d120eda74b70cf2c6f0', '[\"*\"]', NULL, NULL, '2026-01-11 18:51:42', '2026-01-11 18:51:42'),
(90, 'App\\Models\\User', 1, 'auth_token', '46d34a4a2f5923c13e9fefbcb4ed422e59eb17f2394a85f322961fdc4492ec0e', '[\"*\"]', NULL, NULL, '2026-01-11 19:07:04', '2026-01-11 19:07:04'),
(91, 'App\\Models\\User', 1, 'auth_token', 'ab4e1acbb798cf279a0fa28fd7d1b6a58f7fceaef57874cbd7509df1ab231bba', '[\"*\"]', NULL, NULL, '2026-01-15 02:14:05', '2026-01-15 02:14:05'),
(92, 'App\\Models\\User', 1, 'auth_token', '752b192e5b55ee4850d6a946d629668ccd7e3f61f42604827ecb1fb96c83b4cf', '[\"*\"]', NULL, NULL, '2026-01-20 19:24:33', '2026-01-20 19:24:33'),
(93, 'App\\Models\\User', 7, 'auth_token', '171e7373d14a0886d756c347fa2f2ddac0973e0820b3ba9deaa121180cd45e1f', '[\"*\"]', NULL, NULL, '2026-01-21 19:23:36', '2026-01-21 19:23:36'),
(94, 'App\\Models\\User', 7, 'auth_token', 'e1cc8ea7ef66261fadc4d011503352a388135c50b085535a9a48d10179c484e9', '[\"*\"]', NULL, NULL, '2026-01-21 19:24:22', '2026-01-21 19:24:22'),
(95, 'App\\Models\\User', 1, 'auth_token', '5ea5836c4eda74cd9196088f21797c9faccf60ab12d55813d91fed9323dbf206', '[\"*\"]', NULL, NULL, '2026-01-21 19:25:24', '2026-01-21 19:25:24'),
(96, 'App\\Models\\User', 1, 'auth_token', '99700fcaa207d6c1a01f3a9275b3fa485afc3a5b23205ebb456fb33006bd2043', '[\"*\"]', NULL, NULL, '2026-01-26 20:22:09', '2026-01-26 20:22:09'),
(97, 'App\\Models\\User', 1, 'auth_token', '742ff62c59b160c5618748a4e29c388c3b39c72db06bc51ae01a65065347f01a', '[\"*\"]', NULL, NULL, '2026-01-26 20:22:15', '2026-01-26 20:22:15'),
(98, 'App\\Models\\User', 7, 'auth_token', '3c981e58370e8564456b823f187b3ed73601e24d63e55f181664624d8bb96441', '[\"*\"]', NULL, NULL, '2026-01-27 00:36:06', '2026-01-27 00:36:06'),
(99, 'App\\Models\\User', 1, 'auth_token', 'e2e7ba74434090088325fc28cb96e97f89855bfdca487daba0e5170c965a2928', '[\"*\"]', NULL, NULL, '2026-01-27 00:59:31', '2026-01-27 00:59:31'),
(100, 'App\\Models\\User', 7, 'auth_token', 'a47115deeee53c8a5fab5cbef96b8f52001645bf53c1527a4fb879ff06cbfaf1', '[\"*\"]', NULL, NULL, '2026-01-27 01:00:17', '2026-01-27 01:00:17'),
(101, 'App\\Models\\User', 1, 'auth_token', 'a81331335d015ac14c693d556cdbae51165848881c8fb1edaece17d7edef9cd0', '[\"*\"]', NULL, NULL, '2026-01-29 19:03:09', '2026-01-29 19:03:09'),
(102, 'App\\Models\\User', 7, 'auth_token', '767e64ba9ab61bcbcf1d76274fe45fd30c806393b2de7941b07d6536bfed2310', '[\"*\"]', NULL, NULL, '2026-01-29 19:22:25', '2026-01-29 19:22:25'),
(103, 'App\\Models\\User', 1, 'auth_token', 'bf17520d57112daf16be3730ea878c95a2f375fe9fce4d4a1f4b5976883304dc', '[\"*\"]', NULL, NULL, '2026-01-29 19:40:52', '2026-01-29 19:40:52'),
(104, 'App\\Models\\User', 1, 'auth_token', '79501d331c75dbad868705c672d2000f8ec40b8d3ddd1f410c8a35b860ccc3c8', '[\"*\"]', NULL, NULL, '2026-02-05 00:26:00', '2026-02-05 00:26:00'),
(105, 'App\\Models\\User', 1, 'auth_token', '9b06085d3bfd38a5760f932e28330f5c2ee9b67bcf91fd33521357e92faabf48', '[\"*\"]', NULL, NULL, '2026-02-06 00:44:21', '2026-02-06 00:44:21'),
(106, 'App\\Models\\User', 1, 'auth_token', '3a56926f3e837acb49d215f7db6b854c98a289fbfa79e47d5cec14e80f57bd63', '[\"*\"]', NULL, NULL, '2026-02-06 02:15:55', '2026-02-06 02:15:55'),
(107, 'App\\Models\\User', 7, 'auth_token', '1ca8da47962a1f134881f5bb939806675c789cc38fd986cf30cf896170701390', '[\"*\"]', NULL, NULL, '2026-02-06 02:30:33', '2026-02-06 02:30:33'),
(108, 'App\\Models\\User', 1, 'auth_token', 'ece5c311b2d0c2cd5cb14025db03d56aab1832c26fe857094f0f30c2a181f9b2', '[\"*\"]', NULL, NULL, '2026-02-09 01:16:33', '2026-02-09 01:16:33'),
(109, 'App\\Models\\User', 1, 'auth_token', 'e943b320f8536fd4f35cf4bb09c34d032dfc98ee96f8977e9aab3c333ad9d942', '[\"*\"]', NULL, NULL, '2026-02-09 19:33:35', '2026-02-09 19:33:35'),
(110, 'App\\Models\\User', 1, 'auth_token', '0db09b1bd5d27305e44ff475c6694e3ba139f00aaedbfecb12bbba709d890e38', '[\"*\"]', NULL, NULL, '2026-02-10 02:52:35', '2026-02-10 02:52:35'),
(111, 'App\\Models\\User', 1, 'auth_token', '1b62c616fe13da1d36ae4da84cf47e5307d936220648cc600678181d2849b0dc', '[\"*\"]', NULL, NULL, '2026-02-11 02:01:20', '2026-02-11 02:01:20'),
(112, 'App\\Models\\User', 1, 'auth_token', '1fee04873d6bc0c3968a1572e8652d1ea5e5a7f0019dfd8fd87c9a747b33e3a3', '[\"*\"]', NULL, NULL, '2026-02-11 02:01:44', '2026-02-11 02:01:44'),
(113, 'App\\Models\\User', 1, 'auth_token', 'efe3258abed45f2536037c2d52a20d59e6113788ea2e898def93528d8c2d4a3d', '[\"*\"]', NULL, NULL, '2026-02-11 02:02:13', '2026-02-11 02:02:13'),
(114, 'App\\Models\\User', 7, 'auth_token', '86df178b2d0387640a19225b13c52202db059b48e8ba0fc51de9a0701951f927', '[\"*\"]', NULL, NULL, '2026-02-11 02:02:57', '2026-02-11 02:02:57'),
(115, 'App\\Models\\User', 1, 'auth_token', 'b884ed762e0c765f1e66a2791d2130013ae6f7b8bc853c8c44cb53157bf2bb82', '[\"*\"]', NULL, NULL, '2026-02-11 02:04:27', '2026-02-11 02:04:27'),
(116, 'App\\Models\\User', 7, 'auth_token', '96ea49b53d458fb97ec4ca2def77a3492fc82446f7ea4bada3cdb8a0993c4910', '[\"*\"]', NULL, NULL, '2026-02-11 02:06:41', '2026-02-11 02:06:41'),
(117, 'App\\Models\\User', 7, 'auth_token', '0f840657d9d3d01bb96bdd20bc23e40eee5a58914bc166164c195d4375690635', '[\"*\"]', NULL, NULL, '2026-02-11 19:33:17', '2026-02-11 19:33:17'),
(118, 'App\\Models\\User', 1, 'auth_token', '08cd3c157cc94a08093544529fa916221fd4de159662dc1bd0182ab5bcdab2c5', '[\"*\"]', NULL, NULL, '2026-02-11 20:13:14', '2026-02-11 20:13:14'),
(119, 'App\\Models\\User', 7, 'auth_token', '261906695f9dd52824ef43fa33424e402ab7a5a2f4e8eef9e65dfc988011d26f', '[\"*\"]', NULL, NULL, '2026-02-11 20:14:23', '2026-02-11 20:14:23'),
(120, 'App\\Models\\User', 1, 'auth_token', 'ca2590f19251c176aea1d9913bb220436e98bce08594cb2a8195560df4e96ef6', '[\"*\"]', NULL, NULL, '2026-02-11 20:15:44', '2026-02-11 20:15:44'),
(121, 'App\\Models\\User', 1, 'auth_token', '4da840aad791facf6c64600ff825e3ec39898a27b104fe00b6e9dbcfe5a7441e', '[\"*\"]', NULL, NULL, '2026-02-19 19:25:07', '2026-02-19 19:25:07'),
(122, 'App\\Models\\User', 1, 'auth_token', 'bfd26db421dee4907883f656e0a9438f39102f9adb7f96be5781c03c7c65959f', '[\"*\"]', NULL, NULL, '2026-02-20 19:23:17', '2026-02-20 19:23:17'),
(123, 'App\\Models\\User', 20, 'auth_token', '1d2bf830fc6a959cc461a513c210d20398f75cb268440ebd4bc54288de0e0038', '[\"*\"]', NULL, NULL, '2026-02-20 19:54:58', '2026-02-20 19:54:58'),
(124, 'App\\Models\\User', 1, 'auth_token', 'b01c17d7727d6ea70beb4b8c73fb6f19411fa25b5fc2eee085102b52bc9b0c1d', '[\"*\"]', NULL, NULL, '2026-02-20 19:55:22', '2026-02-20 19:55:22'),
(125, 'App\\Models\\User', 1, 'auth_token', 'cc5d48a13306be40057971866170617b318db6b2f8466ddc1d63ee9bae0f813f', '[\"*\"]', NULL, NULL, '2026-02-23 18:46:05', '2026-02-23 18:46:05'),
(126, 'App\\Models\\User', 1, 'auth_token', '146fb1a588a05a2a70ee6b285ad315253854143c06eb83daf00beaf98e5acdf5', '[\"*\"]', NULL, NULL, '2026-02-23 18:46:17', '2026-02-23 18:46:17'),
(127, 'App\\Models\\User', 1, 'auth_token', 'bc44a92a8ba6c5d71a417afafb80cf26e2c19c700b3cbc73e8605ae3f39c8ce5', '[\"*\"]', NULL, NULL, '2026-02-23 23:53:48', '2026-02-23 23:53:48'),
(128, 'App\\Models\\User', 1, 'auth_token', '7bd175fe63f1b38787ba98ae6002d4fed56f4a23ac76dcb87661e7c17935d77b', '[\"*\"]', NULL, NULL, '2026-02-24 01:56:43', '2026-02-24 01:56:43'),
(129, 'App\\Models\\User', 1, 'auth_token', 'caad2395b7569d3cefb7a2113d16a7c1646277ba372342bcc551c2cd8c748609', '[\"*\"]', NULL, NULL, '2026-02-24 01:57:19', '2026-02-24 01:57:19'),
(130, 'App\\Models\\User', 1, 'auth_token', '9a5dd97057174f2ddf611c99ee633fbce0756bd2f34f67eb8abd6f19c9a4f1ca', '[\"*\"]', NULL, NULL, '2026-02-24 19:09:31', '2026-02-24 19:09:31'),
(131, 'App\\Models\\User', 1, 'auth_token', '2f98f2e5fd6d0ca8f1f8ee8ed6b31f1e442c7988de234c2e36fdf2f01fca4e2d', '[\"*\"]', NULL, NULL, '2026-02-24 19:09:47', '2026-02-24 19:09:47'),
(132, 'App\\Models\\User', 1, 'auth_token', 'c9123ea63282f177e37764e3071d31b2b974cfc94b5849bbcbc0db1f1c019c78', '[\"*\"]', NULL, NULL, '2026-02-25 20:13:20', '2026-02-25 20:13:20'),
(133, 'App\\Models\\User', 1, 'auth_token', '6e430b273239db44c10a2d12ef47dce6ef6c87cfa0f7017e65db6e5465d5f558', '[\"*\"]', '2026-02-27 03:15:08', NULL, '2026-02-26 20:39:59', '2026-02-27 03:15:08'),
(134, 'App\\Models\\User', 1, 'auth_token', '2a857a562bc1bb3ed29ccc8858954e0dc2558ba1a2f907659e13a8b71d18e03f', '[\"*\"]', '2026-02-27 18:47:53', NULL, '2026-02-27 18:22:42', '2026-02-27 18:47:53'),
(135, 'App\\Models\\User', 1, 'auth_token', 'f1fbc1cf3c1b0d99b5aba76248a6faf669933d853525b3941f26070eee0cda52', '[\"*\"]', '2026-03-01 20:19:16', NULL, '2026-03-01 18:56:09', '2026-03-01 20:19:16'),
(136, 'App\\Models\\User', 7, 'auth_token', '1feb5bff47e9524de2f48b6bb925e1e34e27cf3fa8633887e19b678d69c8ea80', '[\"*\"]', NULL, NULL, '2026-03-01 20:22:17', '2026-03-01 20:22:17'),
(137, 'App\\Models\\User', 1, 'auth_token', '9c9ac8b3b57ab70182a2e60facc271e1dca3cb206b41e56110e5eb3dccfb409e', '[\"*\"]', '2026-03-01 23:08:11', NULL, '2026-03-01 20:23:08', '2026-03-01 23:08:11'),
(138, 'App\\Models\\User', 1, 'auth_token', '119fece32f1d8ab2c59c957912d7a43a46278efe28e102acef37ecefde2761f0', '[\"*\"]', '2026-03-01 23:17:35', NULL, '2026-03-01 23:08:48', '2026-03-01 23:17:35'),
(139, 'App\\Models\\User', 7, 'auth_token', '0d61f6cc9635dd84994e030058114eff665d43d3dcfecfce9bdcb25bbc756cde', '[\"*\"]', NULL, NULL, '2026-03-01 23:17:55', '2026-03-01 23:17:55'),
(140, 'App\\Models\\User', 21, 'auth_token', '0086907f02492e65026e5984f0befbb5575edbafd011a55267a2dce825c5bca1', '[\"*\"]', NULL, NULL, '2026-03-01 23:40:21', '2026-03-01 23:40:21'),
(141, 'App\\Models\\User', 1, 'auth_token', '6dc74ff1908d6e046bcd82dd15be24341175dc0e7361635bf0f8570deb7d199c', '[\"*\"]', '2026-03-02 01:35:28', NULL, '2026-03-01 23:57:31', '2026-03-02 01:35:28'),
(142, 'App\\Models\\User', 1, 'auth_token', '86d967dfee5d0ebd538c17383d9fc5f7864dcde6f06d9d9a2548c5efa16e0377', '[\"*\"]', '2026-03-05 00:29:13', NULL, '2026-03-04 23:51:55', '2026-03-05 00:29:13'),
(143, 'App\\Models\\User', 1, 'auth_token', '01c53a9bd1efc549bdfc3345880ca0da2f788ed4c1009af3b0d91265ed02b326', '[\"*\"]', '2026-03-06 01:44:27', NULL, '2026-03-05 18:39:17', '2026-03-06 01:44:27'),
(144, 'App\\Models\\User', 7, 'auth_token', '3fce15786356cd2e3f26267ca30c035e3ef8e2f92313185d40bde77bb3b66465', '[\"*\"]', NULL, NULL, '2026-03-06 02:16:39', '2026-03-06 02:16:39'),
(145, 'App\\Models\\User', 1, 'auth_token', '4a71a3afde810829cbc0affaa6305acfd996fb1ae946a54a46f63914f239bb69', '[\"*\"]', '2026-03-06 02:24:35', NULL, '2026-03-06 02:24:12', '2026-03-06 02:24:35'),
(146, 'App\\Models\\User', 1, 'auth_token', '4925e29dbe50d31b8dd3f7baf4228588453763ed72839efa181c120f871d62eb', '[\"*\"]', '2026-03-06 19:21:27', NULL, '2026-03-06 18:30:23', '2026-03-06 19:21:27'),
(147, 'App\\Models\\User', 7, 'auth_token', '982919c189b6ceb1b40f43f8c1cf1e5977fb21b3513b396d8af4118f6bbcdc06', '[\"*\"]', NULL, NULL, '2026-03-06 19:26:51', '2026-03-06 19:26:51'),
(148, 'App\\Models\\User', 1, 'auth_token', '7fce6a0074ca1f7aacbd14cbac8c721e840aa76ffac7825f3a37ca7508a6428b', '[\"*\"]', '2026-03-06 19:30:19', NULL, '2026-03-06 19:30:11', '2026-03-06 19:30:19'),
(149, 'App\\Models\\User', 1, 'auth_token', '7c2932c90c9e91e4209a2c1bde6ceb320863dac70cf44c8188fcb57fe9e7cb13', '[\"*\"]', NULL, NULL, '2026-03-27 01:15:35', '2026-03-27 01:15:35'),
(150, 'App\\Models\\User', 1, 'auth_token', 'fdbf23fbab44050cdaa16fac654e84669e8f0ab9542c45fecf59e1f148e30ca2', '[\"*\"]', '2026-03-27 01:16:01', NULL, '2026-03-27 01:15:55', '2026-03-27 01:16:01'),
(151, 'App\\Models\\User', 7, 'auth_token', '4d6258378afe9313a4d07230e8e28145001b959e40b4eadad68188c687248ab7', '[\"*\"]', NULL, NULL, '2026-03-27 01:16:32', '2026-03-27 01:16:32'),
(152, 'App\\Models\\User', 1, 'auth_token', 'e1e15d36593ee86e5b078d804863c2207b52819618a78e55bc037c5455200cb3', '[\"*\"]', '2026-03-30 00:06:00', NULL, '2026-03-30 00:05:51', '2026-03-30 00:06:00'),
(153, 'App\\Models\\User', 1, 'auth_token', 'd596fbf7c30a0fb04dd3f0584d2d7a975fdc6e75201015ee26ea48ff28d21f7d', '[\"*\"]', '2026-06-04 20:32:03', NULL, '2026-06-04 20:29:46', '2026-06-04 20:32:03'),
(154, 'App\\Models\\User', 1, 'auth_token', '576de2baccfa9d6d31d8d705ae931b629c023a4a21edfe524677f487e9c74b37', '[\"*\"]', '2026-06-07 08:10:22', NULL, '2026-06-07 08:10:12', '2026-06-07 08:10:22');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `kode_barang` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_barang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_barang` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `satuan` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok_minimal` int(11) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `harga_modal` decimal(15,2) NOT NULL,
  `harga_jual` decimal(15,2) NOT NULL,
  `profit` decimal(15,2) GENERATED ALWAYS AS ((`harga_jual` - `harga_modal`)) STORED,
  `qr_code` text COLLATE utf8mb4_unicode_ci,
  `status` enum('Tersedia','Habis') COLLATE utf8mb4_unicode_ci GENERATED ALWAYS AS ((case when (`stok` > 0) then 'Tersedia' else 'Habis' end)) STORED,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `user_id`, `kode_barang`, `uuid`, `nama_barang`, `jenis_barang`, `satuan`, `stok_minimal`, `stok`, `harga_modal`, `harga_jual`, `qr_code`, `created_at`, `updated_at`) VALUES
(1, NULL, 'BR-101', 'bab5ad76-4646-4549-9ab8-60c58f4c42c9', 'Rumah Kenny', 'Furniture', 'Unit', 10, 10, 15000.00, 25000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L15 4L15 3L16 3L16 4L17 4L17 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 10L1 10L1 11L0 11L0 12L1 12L1 13L0 13L0 16L1 16L1 17L0 17L0 21L1 21L1 18L2 18L2 17L3 17L3 18L4 18L4 19L2 19L2 21L3 21L3 20L6 20L6 21L8 21L8 23L9 23L9 22L10 22L10 21L11 21L11 19L10 19L10 20L9 20L9 21L8 21L8 19L7 19L7 18L6 18L6 17L8 17L8 18L11 18L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L16 21L16 22L15 22L15 23L14 23L14 24L15 24L15 25L12 25L12 23L13 23L13 22L11 22L11 24L10 24L10 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L16 29L16 28L17 28L17 29L18 29L18 28L21 28L21 27L20 27L20 26L18 26L18 25L19 25L19 24L17 24L17 23L16 23L16 22L17 22L17 21L19 21L19 23L20 23L20 25L21 25L21 26L22 26L22 27L23 27L23 29L24 29L24 28L25 28L25 26L26 26L26 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 22L29 22L29 21L28 21L28 20L29 20L29 19L27 19L27 20L25 20L25 18L26 18L26 17L27 17L27 18L29 18L29 17L28 17L28 16L26 16L26 14L25 14L25 13L24 13L24 12L26 12L26 13L27 13L27 14L29 14L29 13L28 13L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L27 10L27 12L26 12L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 9L19 9L19 8L17 8L17 9L16 9L16 8L15 8L15 6L16 6L16 7L17 7L17 5L20 5L20 7L21 7L21 4L19 4L19 3L20 3L20 2L19 2L19 1L20 1L20 0L19 0L19 1L18 1L18 0L17 0L17 1L16 1L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM17 1L17 2L16 2L16 3L18 3L18 1ZM14 2L14 3L15 3L15 2ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L9 9L9 12L8 12L8 11L6 11L6 10L7 10L7 9L6 9L6 10L5 10L5 9L3 9L3 10L2 10L2 9L1 9L1 10L2 10L2 11L1 11L1 12L2 12L2 11L4 11L4 13L6 13L6 14L7 14L7 15L6 15L6 16L5 16L5 17L4 17L4 18L5 18L5 19L6 19L6 20L7 20L7 19L6 19L6 18L5 18L5 17L6 17L6 16L7 16L7 15L8 15L8 16L9 16L9 17L10 17L10 16L11 16L11 14L13 14L13 15L12 15L12 17L15 17L15 18L18 18L18 17L19 17L19 16L20 16L20 18L19 18L19 19L14 19L14 20L16 20L16 21L17 21L17 20L21 20L21 19L22 19L22 20L23 20L23 19L24 19L24 17L26 17L26 16L24 16L24 17L23 17L23 15L25 15L25 14L24 14L24 13L23 13L23 12L22 12L22 13L23 13L23 15L22 15L22 14L21 14L21 13L20 13L20 14L19 14L19 13L14 13L14 12L18 12L18 11L19 11L19 12L21 12L21 11L24 11L24 9L23 9L23 10L22 10L22 9L21 9L21 11L20 11L20 10L19 10L19 9L17 9L17 10L16 10L16 9L15 9L15 10L16 10L16 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM10 9L10 11L11 11L11 9ZM17 10L17 11L18 11L18 10ZM5 11L5 12L6 12L6 13L7 13L7 14L9 14L9 13L11 13L11 12L9 12L9 13L7 13L7 12L6 12L6 11ZM1 13L1 14L2 14L2 15L1 15L1 16L2 16L2 15L3 15L3 16L4 16L4 15L3 15L3 14L2 14L2 13ZM15 14L15 15L14 15L14 16L15 16L15 17L18 17L18 16L19 16L19 14L18 14L18 16L17 16L17 15L16 15L16 14ZM20 14L20 16L21 16L21 17L22 17L22 18L23 18L23 17L22 17L22 16L21 16L21 14ZM9 15L9 16L10 16L10 15ZM20 18L20 19L21 19L21 18ZM21 21L21 24L24 24L24 21ZM26 21L26 22L27 22L27 21ZM22 22L22 23L23 23L23 22ZM25 23L25 24L27 24L27 23ZM8 24L8 29L11 29L11 28L10 28L10 27L9 27L9 24ZM15 25L15 26L16 26L16 27L14 27L14 28L16 28L16 27L17 27L17 28L18 28L18 26L17 26L17 25ZM22 25L22 26L23 26L23 27L24 27L24 26L25 26L25 25L24 25L24 26L23 26L23 25ZM26 25L26 26L27 26L27 25ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-11-19 23:54:42', '2026-02-24 20:12:11'),
(2, NULL, 'BR-102', '7c84a40d-e4a3-49e2-b29a-60f9ac947f6b', 'Motor Habil', 'Elektronik', 'Unit', 5, 10, 250000.00, 450000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 10L1 10L1 9L2 9L2 10L3 10L3 9L4 9L4 11L1 11L1 12L0 12L0 13L1 13L1 15L2 15L2 14L3 14L3 15L4 15L4 20L3 20L3 19L2 19L2 21L4 21L4 20L6 20L6 21L8 21L8 23L9 23L9 24L8 24L8 29L10 29L10 28L11 28L11 26L10 26L10 27L9 27L9 24L10 24L10 23L11 23L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L16 29L16 28L14 28L14 27L17 27L17 26L15 26L15 25L12 25L12 23L13 23L13 22L10 22L10 23L9 23L9 21L10 21L10 19L11 19L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L17 21L17 22L15 22L15 23L14 23L14 24L16 24L16 25L18 25L18 27L20 27L20 28L19 28L19 29L20 29L20 28L23 28L23 29L24 29L24 28L25 28L25 26L26 26L26 25L27 25L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 22L29 22L29 21L28 21L28 22L27 22L27 24L26 24L26 23L25 23L25 21L27 21L27 20L25 20L25 18L26 18L26 17L27 17L27 18L29 18L29 17L28 17L28 16L29 16L29 15L28 15L28 14L29 14L29 12L28 12L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L27 10L27 12L26 12L26 11L25 11L25 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 7L21 7L21 6L20 6L20 7L19 7L19 6L18 6L18 7L19 7L19 8L17 8L17 6L16 6L16 5L20 5L20 4L21 4L21 3L17 3L17 4L16 4L16 3L14 3L14 2L16 2L16 0L15 0L15 1L14 1L14 0ZM18 0L18 2L19 2L19 1L20 1L20 2L21 2L21 0ZM8 1L8 2L9 2L9 1ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 8L16 8L16 6ZM10 8L10 9L9 9L9 10L7 10L7 9L6 9L6 10L5 10L5 11L4 11L4 12L5 12L5 13L6 13L6 14L7 14L7 15L5 15L5 17L6 17L6 18L5 18L5 19L6 19L6 20L8 20L8 21L9 21L9 20L8 20L8 19L6 19L6 18L7 18L7 17L6 17L6 16L8 16L8 17L9 17L9 14L13 14L13 15L12 15L12 17L15 17L15 18L16 18L16 19L17 19L17 20L18 20L18 19L20 19L20 20L19 20L19 21L18 21L18 22L17 22L17 23L16 23L16 24L18 24L18 25L20 25L20 27L22 27L22 26L25 26L25 25L26 25L26 24L25 24L25 25L22 25L22 26L21 26L21 25L20 25L20 23L18 23L18 22L19 22L19 21L20 21L20 20L21 20L21 19L22 19L22 20L23 20L23 18L24 18L24 17L25 17L25 16L28 16L28 15L27 15L27 14L28 14L28 13L26 13L26 12L24 12L24 11L23 11L23 10L24 10L24 9L23 9L23 10L22 10L22 9L20 9L20 8L19 8L19 9L15 9L15 10L16 10L16 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM10 9L10 11L11 11L11 9ZM19 9L19 10L20 10L20 9ZM6 10L6 11L5 11L5 12L6 12L6 13L7 13L7 12L8 12L8 14L9 14L9 13L11 13L11 12L8 12L8 11L7 11L7 10ZM17 10L17 11L16 11L16 12L14 12L14 13L16 13L16 14L15 14L15 15L14 15L14 16L15 16L15 17L18 17L18 18L17 18L17 19L18 19L18 18L20 18L20 16L21 16L21 17L22 17L22 18L23 18L23 17L24 17L24 16L25 16L25 15L26 15L26 14L25 14L25 13L22 13L22 12L23 12L23 11L22 11L22 10L21 10L21 11L22 11L22 12L21 12L21 13L19 13L19 12L20 12L20 11L18 11L18 10ZM6 11L6 12L7 12L7 11ZM17 11L17 12L16 12L16 13L17 13L17 16L18 16L18 17L19 17L19 16L20 16L20 14L19 14L19 13L17 13L17 12L18 12L18 11ZM18 14L18 16L19 16L19 14ZM21 14L21 16L22 16L22 17L23 17L23 15L24 15L24 14L23 14L23 15L22 15L22 14ZM10 15L10 17L11 17L11 15ZM15 15L15 16L16 16L16 15ZM2 16L2 18L3 18L3 16ZM0 17L0 21L1 21L1 17ZM14 19L14 20L15 20L15 19ZM28 19L28 20L29 20L29 19ZM21 21L21 24L24 24L24 21ZM22 22L22 23L23 23L23 22ZM17 28L17 29L18 29L18 28ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-11-20 01:50:49', '2026-01-26 20:46:08'),
(3, NULL, 'BR-103', '14e93cb6-7f9f-4920-b79b-528446986db9', 'Apasih', 'Elektronik', 'Box', 10, 14, 15000.00, 15000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L15 4L15 3L16 3L16 4L17 4L17 5L20 5L20 7L19 7L19 6L18 6L18 7L19 7L19 8L17 8L17 9L16 9L16 8L15 8L15 6L16 6L16 7L17 7L17 6L16 6L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 14L1 14L1 15L4 15L4 16L5 16L5 18L4 18L4 17L3 17L3 16L2 16L2 17L3 17L3 18L4 18L4 19L2 19L2 20L3 20L3 21L4 21L4 19L5 19L5 21L8 21L8 23L9 23L9 24L8 24L8 29L9 29L9 27L10 27L10 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L19 29L19 28L23 28L23 29L24 29L24 28L25 28L25 26L26 26L26 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 22L29 22L29 21L28 21L28 20L26 20L26 19L28 19L28 18L29 18L29 17L28 17L28 18L25 18L25 17L22 17L22 16L21 16L21 14L22 14L22 15L23 15L23 16L26 16L26 17L27 17L27 16L28 16L28 15L27 15L27 14L29 14L29 13L27 13L27 12L25 12L25 13L24 13L24 12L23 12L23 11L26 11L26 10L27 10L27 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 5L20 5L20 4L21 4L21 3L19 3L19 1L20 1L20 2L21 2L21 0L18 0L18 1L16 1L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM16 2L16 3L18 3L18 2ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM10 8L10 9L6 9L6 10L5 10L5 11L4 11L4 9L1 9L1 10L2 10L2 11L1 11L1 13L2 13L2 14L4 14L4 15L5 15L5 16L7 16L7 17L6 17L6 18L5 18L5 19L6 19L6 20L7 20L7 19L6 19L6 18L9 18L9 19L8 19L8 21L11 21L11 22L10 22L10 23L11 23L11 22L13 22L13 23L12 23L12 25L15 25L15 26L16 26L16 27L14 27L14 28L16 28L16 27L17 27L17 28L18 28L18 27L22 27L22 26L23 26L23 27L24 27L24 26L25 26L25 25L24 25L24 26L23 26L23 25L22 25L22 26L20 26L20 23L19 23L19 21L20 21L20 20L21 20L21 19L22 19L22 20L23 20L23 18L22 18L22 17L21 17L21 16L20 16L20 14L19 14L19 13L21 13L21 11L23 11L23 10L21 10L21 9L20 9L20 8L19 8L19 9L17 9L17 10L16 10L16 9L15 9L15 10L16 10L16 11L17 11L17 12L16 12L16 13L14 13L14 12L15 12L15 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM10 9L10 11L11 11L11 9ZM19 9L19 10L20 10L20 9ZM25 9L25 10L26 10L26 9ZM27 9L27 10L28 10L28 9ZM6 10L6 11L7 11L7 12L4 12L4 11L3 11L3 13L4 13L4 14L6 14L6 15L7 15L7 16L9 16L9 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L15 21L15 20L16 20L16 21L19 21L19 18L20 18L20 16L19 16L19 14L17 14L17 13L19 13L19 12L20 12L20 11L19 11L19 12L17 12L17 13L16 13L16 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L11 14L11 15L10 15L10 13L11 13L11 12L8 12L8 11L9 11L9 10ZM7 12L7 13L6 13L6 14L8 14L8 15L9 15L9 14L8 14L8 12ZM22 12L22 13L23 13L23 15L25 15L25 14L27 14L27 13L25 13L25 14L24 14L24 13L23 13L23 12ZM16 14L16 15L15 15L15 16L16 16L16 15L17 15L17 16L18 16L18 15L17 15L17 14ZM26 15L26 16L27 16L27 15ZM0 17L0 21L1 21L1 17ZM15 17L15 18L16 18L16 20L18 20L18 18L19 18L19 17L18 17L18 18L17 18L17 17ZM10 18L10 19L9 19L9 20L10 20L10 19L11 19L11 18ZM24 18L24 19L25 19L25 18ZM14 19L14 20L15 20L15 19ZM25 20L25 24L27 24L27 23L26 23L26 22L28 22L28 21L26 21L26 20ZM21 21L21 24L24 24L24 21ZM15 22L15 23L14 23L14 24L16 24L16 25L19 25L19 23L18 23L18 24L16 24L16 23L17 23L17 22ZM22 22L22 23L23 23L23 22ZM9 24L9 25L10 25L10 24ZM26 25L26 26L27 26L27 25ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-11-26 02:49:28', '2026-02-25 01:51:25'),
(4, NULL, 'BR-104', 'ed20dbe8-6f0f-4cb4-b011-d59fa69d20f1', 'Kenapa', 'Alat Tulis', 'Box', 10, 10, 20000.00, 30000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L17 4L17 5L20 5L20 4L21 4L21 3L20 3L20 4L19 4L19 3L16 3L16 2L17 2L17 1L16 1L16 0L15 0L15 1L14 1L14 0ZM19 0L19 1L18 1L18 2L19 2L19 1L20 1L20 2L21 2L21 1L20 1L20 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 11L2 11L2 12L1 12L1 13L2 13L2 14L1 14L1 15L2 15L2 14L3 14L3 15L4 15L4 10L5 10L5 12L6 12L6 13L7 13L7 12L8 12L8 11L9 11L9 10L8 10L8 9L10 9L10 11L11 11L11 9L12 9L12 10L13 10L13 11L12 11L12 13L13 13L13 12L14 12L14 13L19 13L19 14L20 14L20 16L15 16L15 15L16 15L16 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L10 14L10 15L11 15L11 16L10 16L10 17L8 17L8 16L9 16L9 15L7 15L7 14L6 14L6 15L7 15L7 16L6 16L6 17L4 17L4 18L5 18L5 19L3 19L3 16L1 16L1 17L0 17L0 21L1 21L1 18L2 18L2 19L3 19L3 20L2 20L2 21L3 21L3 20L4 20L4 21L5 21L5 19L7 19L7 18L6 18L6 17L8 17L8 18L9 18L9 19L10 19L10 20L11 20L11 19L10 19L10 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L16 21L16 22L15 22L15 23L14 23L14 24L16 24L16 25L18 25L18 27L19 27L19 25L18 25L18 24L19 24L19 23L20 23L20 26L21 26L21 27L20 27L20 28L17 28L17 27L16 27L16 26L15 26L15 25L12 25L12 23L13 23L13 22L11 22L11 21L10 21L10 22L11 22L11 25L10 25L10 23L9 23L9 21L8 21L8 20L6 20L6 21L8 21L8 23L9 23L9 24L8 24L8 29L9 29L9 25L10 25L10 27L11 27L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L20 29L20 28L22 28L22 29L24 29L24 28L25 28L25 26L24 26L24 25L26 25L26 26L27 26L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 24L25 24L25 23L26 23L26 21L27 21L27 22L29 22L29 21L27 21L27 20L26 20L26 19L27 19L27 18L29 18L29 17L27 17L27 16L28 16L28 14L29 14L29 13L28 13L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L27 10L27 12L26 12L26 11L25 11L25 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 9L18 9L18 8L17 8L17 6L16 6L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 8L16 8L16 9L15 9L15 10L16 10L16 12L18 12L18 11L20 11L20 12L19 12L19 13L21 13L21 11L23 11L23 12L22 12L22 13L23 13L23 15L22 15L22 14L21 14L21 16L20 16L20 18L19 18L19 17L18 17L18 18L17 18L17 17L15 17L15 18L16 18L16 19L17 19L17 20L16 20L16 21L17 21L17 22L18 22L18 23L16 23L16 24L18 24L18 23L19 23L19 22L18 22L18 21L20 21L20 19L22 19L22 20L23 20L23 19L26 19L26 18L27 18L27 17L26 17L26 16L27 16L27 14L28 14L28 13L26 13L26 12L24 12L24 10L21 10L21 9L20 9L20 10L18 10L18 9L17 9L17 8L16 8L16 6ZM18 6L18 7L19 7L19 6ZM20 6L20 7L21 7L21 6ZM10 8L10 9L11 9L11 8ZM1 9L1 10L2 10L2 11L3 11L3 9ZM6 9L6 10L7 10L7 11L6 11L6 12L7 12L7 11L8 11L8 10L7 10L7 9ZM16 9L16 10L17 10L17 9ZM14 11L14 12L15 12L15 11ZM2 12L2 13L3 13L3 12ZM9 12L9 13L8 13L8 14L9 14L9 13L11 13L11 12ZM23 12L23 13L24 13L24 14L26 14L26 13L24 13L24 12ZM23 15L23 16L26 16L26 15ZM21 16L21 17L22 17L22 18L25 18L25 17L22 17L22 16ZM18 18L18 19L19 19L19 18ZM14 19L14 20L15 20L15 19ZM17 20L17 21L18 21L18 20ZM25 20L25 21L26 21L26 20ZM21 21L21 24L24 24L24 21ZM22 22L22 23L23 23L23 22ZM21 25L21 26L23 26L23 27L22 27L22 28L23 28L23 27L24 27L24 26L23 26L23 25ZM14 27L14 28L16 28L16 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-11-26 02:49:59', '2026-03-06 18:56:36'),
(5, NULL, 'BR-105', 'f339c2c8-7a83-4465-a2aa-3d0305e98643', 'Popeye', 'Lainnya', 'Liter', 10, 15, 40000.00, 60000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M8 0L8 1L9 1L9 2L8 2L8 5L9 5L9 4L11 4L11 5L10 5L10 10L8 10L8 9L9 9L9 8L8 8L8 9L7 9L7 8L6 8L6 9L7 9L7 10L6 10L6 11L7 11L7 12L5 12L5 11L3 11L3 12L5 12L5 13L7 13L7 12L8 12L8 14L9 14L9 15L10 15L10 13L11 13L11 16L5 16L5 15L7 15L7 14L5 14L5 15L4 15L4 14L3 14L3 13L0 13L0 15L2 15L2 17L1 17L1 18L0 18L0 19L1 19L1 18L2 18L2 19L3 19L3 20L1 20L1 21L8 21L8 22L11 22L11 20L12 20L12 19L11 19L11 18L10 18L10 19L9 19L9 20L8 20L8 18L6 18L6 19L5 19L5 20L4 20L4 18L5 18L5 17L11 17L11 16L12 16L12 17L13 17L13 16L12 16L12 14L13 14L13 15L14 15L14 18L13 18L13 21L16 21L16 20L15 20L15 19L17 19L17 21L18 21L18 19L19 19L19 17L21 17L21 18L20 18L20 19L21 19L21 18L22 18L22 17L21 17L21 15L22 15L22 14L23 14L23 15L24 15L24 16L23 16L23 19L24 19L24 17L25 17L25 18L26 18L26 19L25 19L25 20L19 20L19 23L18 23L18 24L17 24L17 25L16 25L16 24L15 24L15 22L14 22L14 23L9 23L9 25L8 25L8 29L9 29L9 26L12 26L12 28L10 28L10 29L12 29L12 28L14 28L14 27L15 27L15 28L16 28L16 29L17 29L17 27L15 27L15 26L19 26L19 24L20 24L20 25L24 25L24 26L25 26L25 27L23 27L23 28L24 28L24 29L25 29L25 27L26 27L26 26L25 26L25 25L27 25L27 24L26 24L26 22L25 22L25 21L27 21L27 23L28 23L28 24L29 24L29 23L28 23L28 22L29 22L29 19L28 19L28 17L27 17L27 18L26 18L26 16L25 16L25 15L24 15L24 12L25 12L25 11L27 11L27 12L26 12L26 15L27 15L27 14L28 14L28 16L29 16L29 13L28 13L28 11L27 11L27 8L24 8L24 10L23 10L23 9L22 9L22 8L21 8L21 6L20 6L20 4L19 4L19 3L20 3L20 2L18 2L18 1L21 1L21 0L18 0L18 1L16 1L16 0L15 0L15 1L16 1L16 2L15 2L15 3L14 3L14 5L13 5L13 3L12 3L12 4L11 4L11 2L14 2L14 0L12 0L12 1L11 1L11 0L10 0L10 1L9 1L9 0ZM17 2L17 3L18 3L18 2ZM16 4L16 5L14 5L14 6L13 6L13 5L12 5L12 6L11 6L11 8L12 8L12 6L13 6L13 8L14 8L14 9L15 9L15 10L14 10L14 11L11 11L11 13L12 13L12 12L13 12L13 14L14 14L14 15L16 15L16 16L17 16L17 19L18 19L18 17L19 17L19 16L20 16L20 15L19 15L19 16L18 16L18 14L19 14L19 13L20 13L20 14L22 14L22 13L23 13L23 12L24 12L24 11L25 11L25 10L26 10L26 9L25 9L25 10L24 10L24 11L23 11L23 10L22 10L22 9L20 9L20 10L19 10L19 8L18 8L18 9L17 9L17 8L16 8L16 5L17 5L17 7L18 7L18 5L19 5L19 4ZM8 6L8 7L9 7L9 6ZM14 6L14 7L15 7L15 6ZM19 6L19 7L20 7L20 6ZM0 8L0 10L1 10L1 11L0 11L0 12L1 12L1 11L2 11L2 10L5 10L5 9L4 9L4 8ZM28 8L28 10L29 10L29 8ZM11 9L11 10L12 10L12 9ZM7 10L7 11L8 11L8 10ZM15 11L15 12L14 12L14 14L16 14L16 15L17 15L17 14L18 14L18 12L20 12L20 11L18 11L18 12L16 12L16 11ZM21 11L21 13L22 13L22 11ZM16 13L16 14L17 14L17 13ZM2 14L2 15L3 15L3 14ZM4 16L4 17L5 17L5 16ZM6 19L6 20L7 20L7 19ZM10 19L10 20L11 20L11 19ZM27 19L27 20L28 20L28 19ZM21 21L21 24L24 24L24 21ZM16 22L16 23L17 23L17 22ZM22 22L22 23L23 23L23 22ZM12 24L12 26L13 26L13 27L14 27L14 26L15 26L15 24ZM13 25L13 26L14 26L14 25ZM28 25L28 27L27 27L27 29L28 29L28 27L29 27L29 25ZM21 26L21 27L18 27L18 28L20 28L20 29L21 29L21 27L22 27L22 26ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-11-26 02:50:32', '2026-02-24 20:28:49'),
(6, NULL, 'BR-106', 'd8b6192a-4449-4d25-af69-9c7dda285f84', 'ABCD', 'Elektronik', 'Unit', 10, 15, 100.00, 1000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L17 4L17 5L20 5L20 4L21 4L21 2L19 2L19 1L20 1L20 0L19 0L19 1L18 1L18 0L17 0L17 1L18 1L18 2L19 2L19 3L17 3L17 2L16 2L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 10L1 10L1 11L0 11L0 12L2 12L2 10L1 10L1 9L3 9L3 10L4 10L4 11L3 11L3 12L4 12L4 13L3 13L3 15L2 15L2 13L1 13L1 15L2 15L2 16L1 16L1 17L0 17L0 21L1 21L1 17L3 17L3 18L2 18L2 19L3 19L3 18L4 18L4 16L3 16L3 15L5 15L5 14L6 14L6 15L7 15L7 16L6 16L6 17L8 17L8 18L6 18L6 19L4 19L4 21L8 21L8 23L9 23L9 24L8 24L8 29L11 29L11 28L10 28L10 26L9 26L9 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L16 29L16 27L17 27L17 26L15 26L15 25L18 25L18 26L19 26L19 25L18 25L18 24L19 24L19 23L20 23L20 26L21 26L21 27L18 27L18 28L17 28L17 29L18 29L18 28L21 28L21 29L22 29L22 28L21 28L21 27L23 27L23 29L24 29L24 28L25 28L25 27L26 27L26 26L24 26L24 25L25 25L25 24L26 24L26 25L27 25L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 22L29 22L29 21L27 21L27 20L28 20L28 18L29 18L29 16L28 16L28 15L27 15L27 16L25 16L25 15L26 15L26 14L25 14L25 13L27 13L27 14L29 14L29 13L28 13L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 6L20 6L20 7L19 7L19 6L18 6L18 7L19 7L19 8L16 8L16 7L17 7L17 6L16 6L16 5L15 5L15 6L14 6L14 8L16 8L16 9L17 9L17 10L18 10L18 11L19 11L19 10L20 10L20 11L23 11L23 13L22 13L22 12L21 12L21 13L18 13L18 12L17 12L17 11L16 11L16 10L15 10L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3ZM19 3L19 4L20 4L20 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 7L16 7L16 6ZM10 8L10 9L6 9L6 10L7 10L7 11L5 11L5 12L7 12L7 11L8 11L8 13L9 13L9 15L8 15L8 17L9 17L9 18L10 18L10 19L8 19L8 21L9 21L9 20L10 20L10 21L11 21L11 22L10 22L10 24L11 24L11 22L13 22L13 23L12 23L12 25L15 25L15 24L18 24L18 23L19 23L19 22L18 22L18 21L20 21L20 18L21 18L21 19L22 19L22 20L23 20L23 19L24 19L24 17L25 17L25 18L26 18L26 19L25 19L25 20L27 20L27 18L28 18L28 17L27 17L27 18L26 18L26 17L25 17L25 16L24 16L24 17L23 17L23 15L24 15L24 13L25 13L25 12L27 12L27 11L26 11L26 10L25 10L25 12L24 12L24 13L23 13L23 15L22 15L22 14L21 14L21 16L20 16L20 14L19 14L19 15L17 15L17 16L20 16L20 18L19 18L19 17L15 17L15 16L14 16L14 15L15 15L15 14L16 14L16 13L17 13L17 14L18 14L18 13L17 13L17 12L16 12L16 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM19 8L19 9L18 9L18 10L19 10L19 9L21 9L21 10L22 10L22 9L21 9L21 8ZM10 9L10 11L11 11L11 9ZM23 9L23 11L24 11L24 9ZM9 12L9 13L11 13L11 12ZM14 12L14 13L16 13L16 12ZM6 13L6 14L7 14L7 13ZM11 14L11 16L10 16L10 15L9 15L9 17L10 17L10 18L11 18L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L15 21L15 20L16 20L16 21L18 21L18 20L16 20L16 18L15 18L15 17L12 17L12 15L13 15L13 14ZM21 16L21 17L22 17L22 18L23 18L23 17L22 17L22 16ZM17 18L17 19L18 19L18 18ZM6 19L6 20L7 20L7 19ZM14 19L14 20L15 20L15 19ZM21 21L21 24L24 24L24 21ZM25 21L25 23L26 23L26 24L27 24L27 23L26 23L26 22L27 22L27 21ZM15 22L15 23L14 23L14 24L15 24L15 23L16 23L16 22ZM22 22L22 23L23 23L23 22ZM21 25L21 26L23 26L23 27L24 27L24 26L23 26L23 25ZM14 27L14 28L15 28L15 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-02 01:35:44', '2026-03-06 00:38:10'),
(7, NULL, 'BR-111', 'a8ad57ae-1a2b-49ec-8eba-13e872ca2db8', 'Rumah Rikardo', 'Furniture', 'Unit', 5, 17, 1000.00, 2000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L15 4L15 3L16 3L16 4L17 4L17 5L20 5L20 8L21 8L21 9L19 9L19 8L17 8L17 9L16 9L16 8L15 8L15 6L16 6L16 7L17 7L17 6L16 6L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L7 9L7 10L5 10L5 8L0 8L0 10L1 10L1 9L2 9L2 10L3 10L3 11L2 11L2 12L3 12L3 11L4 11L4 10L5 10L5 12L6 12L6 13L7 13L7 14L4 14L4 16L3 16L3 18L4 18L4 19L3 19L3 20L2 20L2 21L3 21L3 20L4 20L4 19L5 19L5 17L7 17L7 16L8 16L8 17L9 17L9 16L10 16L10 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L16 21L16 22L15 22L15 23L14 23L14 24L15 24L15 25L12 25L12 23L13 23L13 22L11 22L11 18L10 18L10 19L9 19L9 18L6 18L6 19L7 19L7 20L5 20L5 21L8 21L8 23L9 23L9 22L10 22L10 24L11 24L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L20 29L20 28L23 28L23 29L24 29L24 28L25 28L25 27L26 27L26 25L27 25L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 24L26 24L26 22L25 22L25 20L26 20L26 21L27 21L27 22L29 22L29 21L28 21L28 20L26 20L26 19L28 19L28 18L29 18L29 16L28 16L28 15L27 15L27 16L25 16L25 15L26 15L26 13L27 13L27 14L29 14L29 13L28 13L28 12L25 12L25 11L24 11L24 12L23 12L23 11L22 11L22 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 4L19 4L19 3L20 3L20 2L19 2L19 1L21 1L21 0L18 0L18 2L19 2L19 3L16 3L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L9 9L9 12L7 12L7 11L6 11L6 12L7 12L7 13L9 13L9 12L11 12L11 13L10 13L10 15L11 15L11 14L13 14L13 15L12 15L12 17L15 17L15 18L17 18L17 19L16 19L16 21L17 21L17 20L19 20L19 21L18 21L18 22L17 22L17 23L15 23L15 24L16 24L16 25L15 25L15 26L16 26L16 27L14 27L14 28L20 28L20 27L22 27L22 26L23 26L23 27L24 27L24 26L25 26L25 25L26 25L26 24L25 24L25 25L24 25L24 26L23 26L23 25L22 25L22 26L21 26L21 25L20 25L20 24L19 24L19 25L17 25L17 24L18 24L18 22L20 22L20 20L21 20L21 19L22 19L22 20L24 20L24 19L23 19L23 18L22 18L22 17L25 17L25 16L24 16L24 15L22 15L22 14L21 14L21 13L20 13L20 14L19 14L19 13L17 13L17 12L21 12L21 10L19 10L19 9L17 9L17 10L16 10L16 9L15 9L15 10L16 10L16 11L17 11L17 12L16 12L16 13L14 13L14 12L15 12L15 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM27 8L27 10L29 10L29 9L28 9L28 8ZM10 9L10 11L11 11L11 9ZM18 10L18 11L19 11L19 10ZM22 12L22 13L23 13L23 14L24 14L24 13L25 13L25 12L24 12L24 13L23 13L23 12ZM2 13L2 14L0 14L0 15L3 15L3 13ZM16 13L16 14L15 14L15 15L14 15L14 16L15 16L15 17L18 17L18 18L20 18L20 19L19 19L19 20L20 20L20 19L21 19L21 18L20 18L20 16L21 16L21 17L22 17L22 16L21 16L21 14L20 14L20 16L19 16L19 17L18 17L18 16L15 16L15 15L16 15L16 14L17 14L17 15L19 15L19 14L17 14L17 13ZM8 14L8 16L9 16L9 14ZM5 15L5 16L7 16L7 15ZM1 16L1 17L0 17L0 21L1 21L1 17L2 17L2 16ZM26 17L26 18L28 18L28 17ZM14 19L14 20L15 20L15 19ZM21 21L21 24L24 24L24 21ZM22 22L22 23L23 23L23 22ZM8 24L8 29L10 29L10 28L11 28L11 27L10 27L10 28L9 28L9 26L10 26L10 25L9 25L9 24ZM16 25L16 26L17 26L17 27L18 27L18 26L17 26L17 25ZM19 25L19 27L20 27L20 25ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-04 20:37:01', '2026-03-06 00:46:40'),
(8, NULL, 'BR-112', '72740618-e422-48e5-a203-024dbce9597e', 'RSSS', 'Elektronik', 'Pcs', 2, 7, 50000.00, 120000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L8 9L8 10L5 10L5 8L0 8L0 10L1 10L1 11L0 11L0 12L2 12L2 10L3 10L3 9L4 9L4 11L5 11L5 12L3 12L3 13L5 13L5 14L6 14L6 15L5 15L5 16L4 16L4 14L2 14L2 13L0 13L0 14L1 14L1 15L0 15L0 16L1 16L1 15L2 15L2 17L0 17L0 21L1 21L1 18L2 18L2 17L3 17L3 18L4 18L4 17L5 17L5 16L6 16L6 17L7 17L7 18L6 18L6 19L4 19L4 20L2 20L2 21L4 21L4 20L6 20L6 21L8 21L8 23L9 23L9 22L11 22L11 23L10 23L10 24L11 24L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L16 29L16 28L14 28L14 27L18 27L18 28L17 28L17 29L18 29L18 28L19 28L19 29L20 29L20 28L21 28L21 29L22 29L22 28L23 28L23 29L24 29L24 28L25 28L25 26L22 26L22 25L26 25L26 26L27 26L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 22L29 22L29 21L28 21L28 22L27 22L27 24L25 24L25 23L26 23L26 22L25 22L25 21L27 21L27 20L25 20L25 18L26 18L26 19L28 19L28 20L29 20L29 19L28 19L28 18L29 18L29 17L28 17L28 16L29 16L29 15L28 15L28 14L29 14L29 13L28 13L28 14L27 14L27 16L25 16L25 13L27 13L27 12L25 12L25 11L24 11L24 12L23 12L23 11L22 11L22 10L23 10L23 9L24 9L24 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 7L21 7L21 6L20 6L20 7L19 7L19 6L18 6L18 7L19 7L19 8L17 8L17 5L20 5L20 4L21 4L21 3L20 3L20 4L19 4L19 3L17 3L17 2L19 2L19 1L20 1L20 0L19 0L19 1L16 1L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM16 3L16 4L17 4L17 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 8L16 8L16 6ZM10 8L10 9L9 9L9 12L8 12L8 11L6 11L6 12L5 12L5 13L6 13L6 14L7 14L7 13L8 13L8 14L9 14L9 15L8 15L8 16L7 16L7 15L6 15L6 16L7 16L7 17L9 17L9 18L10 18L10 19L8 19L8 18L7 18L7 19L6 19L6 20L7 20L7 19L8 19L8 20L10 20L10 21L11 21L11 22L13 22L13 23L12 23L12 25L15 25L15 26L16 26L16 25L17 25L17 26L18 26L18 25L20 25L20 27L19 27L19 28L20 28L20 27L22 27L22 26L21 26L21 25L20 25L20 23L19 23L19 22L18 22L18 21L20 21L20 18L21 18L21 19L22 19L22 20L23 20L23 18L24 18L24 17L25 17L25 16L24 16L24 17L23 17L23 15L24 15L24 13L25 13L25 12L24 12L24 13L23 13L23 12L22 12L22 13L23 13L23 15L22 15L22 14L21 14L21 16L20 16L20 14L19 14L19 13L21 13L21 11L20 11L20 10L22 10L22 9L20 9L20 8L19 8L19 9L15 9L15 10L17 10L17 11L16 11L16 12L15 12L15 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM27 8L27 9L28 9L28 10L27 10L27 11L28 11L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8ZM10 9L10 11L11 11L11 9ZM19 9L19 10L18 10L18 12L16 12L16 13L19 13L19 10L20 10L20 9ZM6 12L6 13L7 13L7 12ZM9 12L9 14L10 14L10 15L9 15L9 16L10 16L10 15L11 15L11 17L10 17L10 18L11 18L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L15 21L15 20L16 20L16 21L18 21L18 20L19 20L19 19L18 19L18 20L16 20L16 19L17 19L17 18L15 18L15 17L19 17L19 18L20 18L20 16L19 16L19 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L10 14L10 13L11 13L11 12ZM14 12L14 13L15 13L15 12ZM17 15L17 16L18 16L18 15ZM3 16L3 17L4 17L4 16ZM21 16L21 17L22 17L22 18L23 18L23 17L22 17L22 16ZM26 17L26 18L28 18L28 17ZM10 19L10 20L11 20L11 19ZM14 19L14 20L15 20L15 19ZM21 21L21 24L24 24L24 21ZM15 22L15 23L14 23L14 24L15 24L15 25L16 25L16 24L17 24L17 25L18 25L18 24L19 24L19 23L18 23L18 24L17 24L17 22ZM22 22L22 23L23 23L23 22ZM8 24L8 29L11 29L11 28L9 28L9 26L10 26L10 27L11 27L11 26L10 26L10 25L9 25L9 24ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-04 20:47:00', '2026-01-22 02:43:23'),
(9, NULL, 'BR-116', '7f6f8515-c57b-4fc7-b9d1-9afe61e790da', 'AYAM', 'Lainnya', 'Unit', 5, 10, 10000.00, 25000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L8 9L8 10L9 10L9 9L10 9L10 11L11 11L11 9L12 9L12 10L13 10L13 11L12 11L12 13L13 13L13 12L14 12L14 13L18 13L18 15L19 15L19 14L20 14L20 16L19 16L19 17L18 17L18 16L16 16L16 15L17 15L17 14L15 14L15 15L14 15L14 16L16 16L16 17L18 17L18 18L15 18L15 17L12 17L12 15L13 15L13 14L11 14L11 15L10 15L10 16L9 16L9 15L7 15L7 14L8 14L8 13L7 13L7 12L5 12L5 11L7 11L7 10L5 10L5 8L0 8L0 13L1 13L1 15L0 15L0 21L1 21L1 17L2 17L2 16L5 16L5 17L4 17L4 18L2 18L2 20L5 20L5 21L7 21L7 20L8 20L8 23L10 23L10 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L20 29L20 28L21 28L21 29L24 29L24 28L25 28L25 27L26 27L26 25L27 25L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 22L29 22L29 21L28 21L28 22L27 22L27 24L25 24L25 23L26 23L26 22L25 22L25 21L27 21L27 20L25 20L25 19L26 19L26 17L27 17L27 18L29 18L29 17L27 17L27 16L29 16L29 15L28 15L28 14L29 14L29 13L28 13L28 14L27 14L27 12L29 12L29 11L27 11L27 10L29 10L29 9L28 9L28 8L27 8L27 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L17 8L17 6L16 6L16 5L20 5L20 7L21 7L21 4L19 4L19 3L17 3L17 4L16 4L16 2L17 2L17 1L16 1L16 0L15 0L15 1L14 1L14 0ZM19 0L19 1L18 1L18 2L19 2L19 1L20 1L20 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM20 2L20 3L21 3L21 2ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 7L16 7L16 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L11 9L11 8ZM16 8L16 9L15 9L15 10L16 10L16 12L18 12L18 13L21 13L21 9L20 9L20 10L19 10L19 9L18 9L18 10L16 10L16 9L17 9L17 8ZM2 9L2 10L1 10L1 11L2 11L2 12L1 12L1 13L2 13L2 12L3 12L3 13L4 13L4 9ZM18 10L18 11L19 11L19 12L20 12L20 11L19 11L19 10ZM22 10L22 11L23 11L23 10ZM24 10L24 11L25 11L25 12L24 12L24 13L23 13L23 12L22 12L22 13L23 13L23 14L24 14L24 13L25 13L25 16L24 16L24 17L23 17L23 15L22 15L22 14L21 14L21 16L20 16L20 18L18 18L18 19L17 19L17 20L18 20L18 21L14 21L14 20L16 20L16 19L14 19L14 20L13 20L13 21L12 21L12 19L13 19L13 18L12 18L12 17L11 17L11 16L10 16L10 18L11 18L11 21L10 21L10 19L8 19L8 20L9 20L9 21L10 21L10 23L11 23L11 22L13 22L13 23L12 23L12 25L15 25L15 26L16 26L16 25L17 25L17 26L18 26L18 27L16 27L16 28L18 28L18 27L19 27L19 28L20 28L20 27L21 27L21 28L23 28L23 27L21 27L21 26L25 26L25 25L21 25L21 26L19 26L19 25L20 25L20 23L19 23L19 22L18 22L18 21L20 21L20 20L18 20L18 19L20 19L20 18L21 18L21 19L22 19L22 20L24 20L24 19L25 19L25 18L24 18L24 17L25 17L25 16L27 16L27 14L26 14L26 13L25 13L25 12L27 12L27 11L26 11L26 10ZM8 11L8 12L9 12L9 13L11 13L11 12L9 12L9 11ZM14 11L14 12L15 12L15 11ZM5 13L5 16L7 16L7 17L6 17L6 18L7 18L7 17L8 17L8 16L7 16L7 15L6 15L6 14L7 14L7 13ZM2 14L2 15L1 15L1 16L2 16L2 15L3 15L3 14ZM21 16L21 17L22 17L22 18L23 18L23 19L24 19L24 18L23 18L23 17L22 17L22 16ZM6 19L6 20L7 20L7 19ZM28 19L28 20L29 20L29 19ZM21 21L21 24L24 24L24 21ZM15 22L15 23L14 23L14 24L15 24L15 25L16 25L16 24L17 24L17 25L19 25L19 24L17 24L17 22ZM22 22L22 23L23 23L23 22ZM8 24L8 29L9 29L9 27L10 27L10 26L9 26L9 24ZM14 27L14 28L15 28L15 27ZM10 28L10 29L11 29L11 28ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-19 18:56:08', '2026-02-23 21:36:15'),
(10, NULL, 'BR-117', '0d371886-80b6-4a34-9931-24816e77b374', 'NICE', 'Furniture', 'Pcs', 4, 11, 25000.00, 40000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L17 4L17 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 10L1 10L1 12L0 12L0 13L2 13L2 14L3 14L3 15L5 15L5 14L3 14L3 13L5 13L5 12L6 12L6 13L8 13L8 14L6 14L6 15L7 15L7 16L2 16L2 17L0 17L0 21L1 21L1 18L2 18L2 19L3 19L3 20L2 20L2 21L3 21L3 20L4 20L4 19L3 19L3 18L2 18L2 17L4 17L4 18L5 18L5 19L7 19L7 20L5 20L5 21L8 21L8 23L9 23L9 24L8 24L8 29L9 29L9 25L10 25L10 26L11 26L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L16 29L16 28L17 28L17 29L18 29L18 28L22 28L22 27L23 27L23 29L24 29L24 28L25 28L25 26L26 26L26 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 22L29 22L29 21L28 21L28 19L27 19L27 20L22 20L22 19L20 19L20 21L19 21L19 18L20 18L20 16L21 16L21 17L22 17L22 18L23 18L23 17L24 17L24 19L25 19L25 17L26 17L26 18L29 18L29 17L27 17L27 16L28 16L28 14L29 14L29 13L28 13L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L17 8L17 5L20 5L20 7L21 7L21 5L20 5L20 4L21 4L21 3L20 3L20 2L21 2L21 1L20 1L20 0L19 0L19 1L18 1L18 2L19 2L19 3L17 3L17 2L16 2L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM19 1L19 2L20 2L20 1ZM14 2L14 3L15 3L15 2ZM19 3L19 4L20 4L20 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 8L16 8L16 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L6 9L6 10L4 10L4 9L3 9L3 10L2 10L2 9L1 9L1 10L2 10L2 11L3 11L3 10L4 10L4 11L6 11L6 12L8 12L8 10L9 10L9 12L11 12L11 13L9 13L9 14L8 14L8 15L9 15L9 16L10 16L10 14L13 14L13 15L12 15L12 17L10 17L10 18L9 18L9 19L10 19L10 20L8 20L8 21L9 21L9 23L10 23L10 24L11 24L11 23L10 23L10 20L11 20L11 22L13 22L13 23L12 23L12 25L15 25L15 26L18 26L18 27L17 27L17 28L18 28L18 27L21 27L21 26L23 26L23 27L24 27L24 26L25 26L25 25L24 25L24 26L23 26L23 25L21 25L21 26L19 26L19 25L20 25L20 23L18 23L18 22L19 22L19 21L14 21L14 20L16 20L16 19L14 19L14 20L13 20L13 21L12 21L12 19L13 19L13 18L12 18L12 17L15 17L15 18L16 18L16 17L17 17L17 16L18 16L18 15L19 15L19 16L20 16L20 14L21 14L21 16L22 16L22 17L23 17L23 16L24 16L24 17L25 17L25 16L27 16L27 14L28 14L28 13L25 13L25 12L28 12L28 11L25 11L25 10L24 10L24 9L23 9L23 10L22 10L22 9L20 9L20 10L19 10L19 9L15 9L15 10L19 10L19 12L21 12L21 11L23 11L23 12L22 12L22 13L25 13L25 14L26 14L26 15L25 15L25 16L24 16L24 14L23 14L23 15L22 15L22 14L21 14L21 13L20 13L20 14L19 14L19 13L14 13L14 12L18 12L18 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM10 9L10 11L11 11L11 9ZM6 10L6 11L7 11L7 10ZM20 10L20 11L21 11L21 10ZM24 11L24 12L25 12L25 11ZM0 14L0 15L1 15L1 14ZM15 14L15 15L14 15L14 16L15 16L15 17L16 17L16 16L15 16L15 15L16 15L16 14ZM7 16L7 17L5 17L5 18L7 18L7 19L8 19L8 16ZM18 17L18 18L17 18L17 20L18 20L18 18L19 18L19 17ZM21 21L21 24L24 24L24 21ZM25 21L25 24L27 24L27 22L28 22L28 21L27 21L27 22L26 22L26 21ZM15 22L15 23L14 23L14 24L15 24L15 25L19 25L19 24L17 24L17 22ZM22 22L22 23L23 23L23 22ZM15 23L15 24L16 24L16 23ZM26 25L26 26L27 26L27 25ZM10 27L10 29L11 29L11 27ZM14 27L14 28L15 28L15 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-19 18:56:39', '2026-01-26 20:53:38'),
(11, NULL, 'BR-118', 'abde32b3-4618-446e-9c87-39cf572946a8', 'BEE', 'Furniture', 'Unit', 5, 10, 30000.00, 55000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M8 0L8 1L9 1L9 2L8 2L8 5L9 5L9 4L11 4L11 5L10 5L10 10L9 10L9 8L8 8L8 9L7 9L7 8L6 8L6 9L4 9L4 8L0 8L0 10L1 10L1 15L0 15L0 17L1 17L1 18L0 18L0 19L1 19L1 18L3 18L3 20L1 20L1 21L3 21L3 20L4 20L4 21L5 21L5 19L7 19L7 18L6 18L6 17L8 17L8 18L10 18L10 17L11 17L11 16L12 16L12 17L13 17L13 16L12 16L12 14L13 14L13 15L14 15L14 18L13 18L13 21L16 21L16 20L15 20L15 19L17 19L17 21L18 21L18 23L20 23L20 25L24 25L24 26L25 26L25 25L26 25L26 27L27 27L27 29L28 29L28 27L29 27L29 25L28 25L28 27L27 27L27 24L26 24L26 23L25 23L25 21L27 21L27 23L28 23L28 24L29 24L29 23L28 23L28 22L29 22L29 20L28 20L28 19L27 19L27 18L26 18L26 16L25 16L25 14L24 14L24 12L23 12L23 9L22 9L22 8L21 8L21 3L20 3L20 2L21 2L21 1L20 1L20 0L19 0L19 1L18 1L18 3L17 3L17 2L16 2L16 4L15 4L15 3L14 3L14 5L13 5L13 3L12 3L12 4L11 4L11 2L14 2L14 0L12 0L12 1L11 1L11 0L10 0L10 1L9 1L9 0ZM15 0L15 1L16 1L16 0ZM19 1L19 2L20 2L20 1ZM16 4L16 5L14 5L14 6L13 6L13 5L12 5L12 6L11 6L11 8L12 8L12 6L13 6L13 8L14 8L14 9L15 9L15 10L14 10L14 11L11 11L11 13L10 13L10 14L11 14L11 13L12 13L12 12L13 12L13 14L14 14L14 15L16 15L16 14L17 14L17 18L19 18L19 20L25 20L25 19L26 19L26 18L25 18L25 17L24 17L24 16L23 16L23 15L24 15L24 14L22 14L22 13L23 13L23 12L22 12L22 9L21 9L21 8L20 8L20 9L21 9L21 10L19 10L19 8L18 8L18 9L17 9L17 10L16 10L16 8L17 8L17 7L18 7L18 5L19 5L19 4ZM8 6L8 7L9 7L9 6ZM14 6L14 7L15 7L15 6ZM16 6L16 7L17 7L17 6ZM19 6L19 7L20 7L20 6ZM24 8L24 10L25 10L25 13L26 13L26 15L27 15L27 16L29 16L29 13L28 13L28 14L27 14L27 12L26 12L26 11L28 11L28 12L29 12L29 11L28 11L28 10L29 10L29 8L28 8L28 9L27 9L27 8ZM3 9L3 10L2 10L2 11L3 11L3 12L5 12L5 13L6 13L6 14L4 14L4 13L3 13L3 14L2 14L2 16L1 16L1 17L6 17L6 16L9 16L9 17L10 17L10 15L8 15L8 14L7 14L7 13L6 13L6 12L7 12L7 11L8 11L8 13L9 13L9 10L7 10L7 9L6 9L6 10L7 10L7 11L5 11L5 10L4 10L4 9ZM11 9L11 10L12 10L12 9ZM26 9L26 10L27 10L27 9ZM15 11L15 12L14 12L14 14L16 14L16 13L18 13L18 14L19 14L19 15L20 15L20 16L18 16L18 17L21 17L21 18L20 18L20 19L21 19L21 18L22 18L22 17L21 17L21 15L22 15L22 14L21 14L21 13L22 13L22 12L20 12L20 11L18 11L18 12L16 12L16 11ZM3 14L3 15L4 15L4 16L5 16L5 15L4 15L4 14ZM6 14L6 15L7 15L7 14ZM15 16L15 17L16 17L16 16ZM24 18L24 19L25 19L25 18ZM11 19L11 20L9 20L9 21L8 21L8 20L6 20L6 21L8 21L8 22L9 22L9 21L10 21L10 23L11 23L11 24L9 24L9 25L8 25L8 29L9 29L9 26L10 26L10 25L11 25L11 26L12 26L12 28L11 28L11 27L10 27L10 29L12 29L12 28L14 28L14 27L15 27L15 26L16 26L16 25L17 25L17 26L18 26L18 27L19 27L19 28L20 28L20 29L21 29L21 27L22 27L22 26L21 26L21 27L19 27L19 24L17 24L17 23L15 23L15 22L14 22L14 23L11 23L11 20L12 20L12 19ZM27 20L27 21L28 21L28 20ZM19 21L19 22L20 22L20 21ZM21 21L21 24L24 24L24 21ZM22 22L22 23L23 23L23 22ZM12 24L12 26L13 26L13 27L14 27L14 26L15 26L15 24ZM13 25L13 26L14 26L14 25ZM16 27L16 29L17 29L17 27ZM23 27L23 28L24 28L24 29L25 29L25 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-19 18:57:07', '2026-02-24 19:37:58'),
(12, NULL, 'BR-119', 'a2015ee3-018e-4d53-818e-79235d6ee36d', 'APS', 'Elektronik', 'Pcs', 5, 10, 10000.00, 25000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L7 9L7 10L4 10L4 9L5 9L5 8L0 8L0 9L3 9L3 10L1 10L1 11L0 11L0 12L1 12L1 13L3 13L3 14L2 14L2 16L0 16L0 21L1 21L1 17L2 17L2 21L4 21L4 20L6 20L6 21L8 21L8 23L9 23L9 22L11 22L11 23L10 23L10 25L9 25L9 24L8 24L8 29L9 29L9 28L10 28L10 27L11 27L11 26L10 26L10 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L16 29L16 28L17 28L17 29L18 29L18 28L17 28L17 27L16 27L16 26L15 26L15 25L19 25L19 28L21 28L21 29L22 29L22 28L21 28L21 27L23 27L23 29L24 29L24 28L25 28L25 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 24L25 24L25 23L26 23L26 21L27 21L27 22L29 22L29 21L28 21L28 20L26 20L26 17L28 17L28 18L27 18L27 19L28 19L28 18L29 18L29 17L28 17L28 16L29 16L29 15L28 15L28 14L29 14L29 13L28 13L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L27 10L27 12L25 12L25 13L24 13L24 12L23 12L23 13L22 13L22 12L14 12L14 11L18 11L18 10L15 10L15 9L19 9L19 10L20 10L20 9L21 9L21 10L24 10L24 11L26 11L26 10L25 10L25 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 9L19 9L19 8L17 8L17 6L16 6L16 5L20 5L20 7L21 7L21 5L20 5L20 4L21 4L21 3L17 3L17 2L16 2L16 0L15 0L15 1L14 1L14 0ZM18 0L18 1L21 1L21 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM16 3L16 4L17 4L17 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 8L16 8L16 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L9 9L9 11L8 11L8 12L7 12L7 11L5 11L5 12L4 12L4 10L3 10L3 12L4 12L4 17L3 17L3 20L4 20L4 18L5 18L5 19L6 19L6 20L7 20L7 19L8 19L8 18L10 18L10 19L9 19L9 21L11 21L11 22L13 22L13 23L12 23L12 25L15 25L15 24L16 24L16 23L17 23L17 24L19 24L19 25L20 25L20 27L21 27L21 26L23 26L23 27L24 27L24 26L27 26L27 25L24 25L24 26L23 26L23 25L20 25L20 23L17 23L17 22L19 22L19 21L20 21L20 20L21 20L21 19L22 19L22 20L24 20L24 17L26 17L26 16L27 16L27 14L28 14L28 13L26 13L26 16L24 16L24 15L22 15L22 14L21 14L21 13L20 13L20 14L19 14L19 13L18 13L18 14L17 14L17 13L14 13L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM10 9L10 11L11 11L11 9ZM1 11L1 12L2 12L2 11ZM6 12L6 13L5 13L5 14L6 14L6 15L5 15L5 17L7 17L7 16L6 16L6 15L8 15L8 14L10 14L10 16L11 16L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L16 21L16 22L15 22L15 23L14 23L14 24L15 24L15 23L16 23L16 22L17 22L17 21L19 21L19 20L20 20L20 19L21 19L21 18L20 18L20 16L21 16L21 17L22 17L22 18L23 18L23 17L24 17L24 16L23 16L23 17L22 17L22 16L21 16L21 14L20 14L20 16L17 16L17 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L10 14L10 13L11 13L11 12L9 12L9 13L8 13L8 14L6 14L6 13L7 13L7 12ZM23 13L23 14L24 14L24 13ZM0 14L0 15L1 15L1 14ZM18 14L18 15L19 15L19 14ZM8 16L8 17L9 17L9 16ZM16 16L16 17L15 17L15 18L16 18L16 17L17 17L17 18L19 18L19 19L20 19L20 18L19 18L19 17L17 17L17 16ZM6 18L6 19L7 19L7 18ZM10 19L10 20L11 20L11 19ZM14 19L14 20L15 20L15 19ZM17 19L17 20L16 20L16 21L17 21L17 20L18 20L18 19ZM25 20L25 21L26 21L26 20ZM21 21L21 24L24 24L24 21ZM22 22L22 23L23 23L23 22ZM14 27L14 28L15 28L15 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2025-12-21 08:05:06', '2026-02-24 20:26:00'),
(13, NULL, 'BR-120', 'cfb3ef39-bf29-417c-accd-0a0a43d3089e', 'AYAM PISANG', 'Elektronik', 'Pcs', 5, 20, 50000.00, 75000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L16 8L16 9L19 9L19 10L18 10L18 12L16 12L16 10L15 10L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L7 9L7 10L3 10L3 9L5 9L5 8L0 8L0 9L1 9L1 10L0 10L0 11L1 11L1 12L0 12L0 13L1 13L1 12L3 12L3 11L7 11L7 12L6 12L6 13L7 13L7 14L6 14L6 15L5 15L5 12L4 12L4 14L3 14L3 15L2 15L2 14L0 14L0 15L2 15L2 17L1 17L1 16L0 16L0 21L1 21L1 18L3 18L3 19L2 19L2 20L3 20L3 21L5 21L5 20L4 20L4 19L5 19L5 18L6 18L6 19L7 19L7 20L6 20L6 21L8 21L8 23L9 23L9 21L8 21L8 19L7 19L7 18L9 18L9 19L10 19L10 18L11 18L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L18 21L18 23L19 23L19 24L17 24L17 23L16 23L16 22L15 22L15 23L14 23L14 24L15 24L15 25L12 25L12 23L13 23L13 22L11 22L11 21L10 21L10 22L11 22L11 24L8 24L8 29L9 29L9 28L10 28L10 29L11 29L11 27L9 27L9 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L19 29L19 28L22 28L22 27L23 27L23 29L24 29L24 28L25 28L25 27L26 27L26 26L27 26L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 22L29 22L29 21L28 21L28 20L29 20L29 19L28 19L28 20L25 20L25 19L24 19L24 20L22 20L22 19L21 19L21 18L20 18L20 16L21 16L21 17L22 17L22 18L26 18L26 19L27 19L27 18L29 18L29 17L27 17L27 16L29 16L29 15L27 15L27 16L26 16L26 13L27 13L27 14L29 14L29 13L28 13L28 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L25 10L25 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 9L19 9L19 8L20 8L20 7L21 7L21 4L19 4L19 3L20 3L20 2L21 2L21 0L18 0L18 1L20 1L20 2L18 2L18 3L17 3L17 1L16 1L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM16 3L16 4L17 4L17 3ZM17 5L17 7L16 7L16 6L15 6L15 7L16 7L16 8L19 8L19 7L20 7L20 5ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L8 9L8 10L9 10L9 12L8 12L8 13L9 13L9 12L11 12L11 13L10 13L10 14L8 14L8 15L9 15L9 16L11 16L11 15L10 15L10 14L13 14L13 15L12 15L12 17L15 17L15 18L17 18L17 19L14 19L14 20L18 20L18 21L19 21L19 22L20 22L20 20L21 20L21 19L20 19L20 18L19 18L19 17L15 17L15 16L14 16L14 15L15 15L15 14L16 14L16 16L20 16L20 14L19 14L19 15L18 15L18 13L21 13L21 12L22 12L22 13L23 13L23 15L22 15L22 14L21 14L21 16L22 16L22 17L26 17L26 18L27 18L27 17L26 17L26 16L23 16L23 15L25 15L25 14L24 14L24 13L26 13L26 12L27 12L27 11L26 11L26 12L24 12L24 11L25 11L25 10L24 10L24 9L23 9L23 11L20 11L20 10L19 10L19 12L18 12L18 13L16 13L16 12L15 12L15 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM10 9L10 11L11 11L11 9ZM21 9L21 10L22 10L22 9ZM14 12L14 13L15 13L15 12ZM23 12L23 13L24 13L24 12ZM6 15L6 16L7 16L7 15ZM3 16L3 18L5 18L5 16ZM6 17L6 18L7 18L7 17ZM18 18L18 20L20 20L20 19L19 19L19 18ZM21 21L21 24L24 24L24 21ZM25 21L25 22L27 22L27 21ZM22 22L22 23L23 23L23 22ZM25 23L25 24L27 24L27 23ZM16 24L16 25L15 25L15 26L16 26L16 25L17 25L17 27L14 27L14 28L18 28L18 27L19 27L19 25L20 25L20 24L19 24L19 25L17 25L17 24ZM22 25L22 26L20 26L20 27L22 27L22 26L26 26L26 25ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2026-01-08 00:13:42', '2026-03-06 02:23:56');
INSERT INTO `products` (`product_id`, `user_id`, `kode_barang`, `uuid`, `nama_barang`, `jenis_barang`, `satuan`, `stok_minimal`, `stok`, `harga_modal`, `harga_jual`, `qr_code`, `created_at`, `updated_at`) VALUES
(14, NULL, 'BR-121', 'f7457938-9b37-48e3-aca4-53ae4568b0c5', 'Pisang Goreng', 'Furniture', 'Unit', 5, 15, 40000.00, 70000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L17 4L17 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L8 9L8 11L9 11L9 9L10 9L10 11L11 11L11 9L12 9L12 10L13 10L13 11L12 11L12 13L13 13L13 12L14 12L14 13L19 13L19 14L17 14L17 15L19 15L19 14L20 14L20 16L19 16L19 17L18 17L18 16L17 16L17 17L16 17L16 16L15 16L15 15L16 15L16 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L10 14L10 15L9 15L9 13L11 13L11 12L8 12L8 13L7 13L7 12L6 12L6 11L7 11L7 10L5 10L5 8L0 8L0 9L1 9L1 10L2 10L2 9L4 9L4 10L3 10L3 11L4 11L4 10L5 10L5 14L4 14L4 15L3 15L3 14L2 14L2 13L4 13L4 12L2 12L2 11L1 11L1 12L0 12L0 13L1 13L1 14L0 14L0 15L1 15L1 14L2 14L2 16L1 16L1 17L0 17L0 21L1 21L1 17L2 17L2 18L3 18L3 19L5 19L5 20L6 20L6 21L8 21L8 23L11 23L11 24L10 24L10 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L20 29L20 28L21 28L21 29L22 29L22 28L23 28L23 29L24 29L24 28L25 28L25 26L24 26L24 25L26 25L26 26L27 26L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 22L29 22L29 21L27 21L27 20L29 20L29 19L28 19L28 18L29 18L29 17L28 17L28 18L27 18L27 16L25 16L25 15L28 15L28 16L29 16L29 15L28 15L28 14L29 14L29 13L28 13L28 14L26 14L26 13L27 13L27 12L28 12L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L27 10L27 12L25 12L25 11L26 11L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 9L19 9L19 8L20 8L20 7L21 7L21 4L19 4L19 2L18 2L18 3L17 3L17 1L16 1L16 0L15 0L15 1L14 1L14 0ZM19 0L19 1L20 1L20 2L21 2L21 1L20 1L20 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM17 5L17 7L16 7L16 6L15 6L15 8L16 8L16 9L15 9L15 10L16 10L16 12L19 12L19 13L21 13L21 12L22 12L22 13L23 13L23 15L22 15L22 14L21 14L21 16L20 16L20 18L19 18L19 19L18 19L18 17L17 17L17 18L16 18L16 17L15 17L15 18L16 18L16 20L15 20L15 19L14 19L14 20L13 20L13 21L12 21L12 19L13 19L13 18L12 18L12 17L11 17L11 16L10 16L10 17L11 17L11 20L10 20L10 19L9 19L9 16L8 16L8 14L7 14L7 13L6 13L6 14L7 14L7 15L5 15L5 17L6 17L6 18L7 18L7 19L6 19L6 20L7 20L7 19L8 19L8 20L9 20L9 22L13 22L13 23L12 23L12 25L15 25L15 26L17 26L17 28L18 28L18 27L19 27L19 28L20 28L20 27L22 27L22 26L23 26L23 27L24 27L24 26L23 26L23 25L22 25L22 26L21 26L21 25L20 25L20 23L19 23L19 22L18 22L18 21L20 21L20 20L21 20L21 19L22 19L22 20L27 20L27 18L26 18L26 17L25 17L25 16L24 16L24 15L25 15L25 14L24 14L24 13L25 13L25 12L24 12L24 11L25 11L25 10L24 10L24 9L23 9L23 10L22 10L22 9L21 9L21 11L20 11L20 10L19 10L19 9L17 9L17 8L19 8L19 7L20 7L20 5ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L11 9L11 8ZM16 9L16 10L17 10L17 9ZM23 10L23 11L22 11L22 12L23 12L23 13L24 13L24 12L23 12L23 11L24 11L24 10ZM14 11L14 12L15 12L15 11ZM2 16L2 17L3 17L3 18L4 18L4 16ZM6 16L6 17L7 17L7 18L8 18L8 17L7 17L7 16ZM21 16L21 17L22 17L22 18L23 18L23 19L26 19L26 18L25 18L25 17L22 17L22 16ZM20 18L20 19L19 19L19 20L20 20L20 19L21 19L21 18ZM2 20L2 21L4 21L4 20ZM14 20L14 21L15 21L15 20ZM16 20L16 21L18 21L18 20ZM21 21L21 24L24 24L24 21ZM25 21L25 22L27 22L27 21ZM15 22L15 23L14 23L14 24L15 24L15 25L19 25L19 27L20 27L20 25L19 25L19 24L17 24L17 23L16 23L16 22ZM22 22L22 23L23 23L23 22ZM15 23L15 24L16 24L16 23ZM25 23L25 24L27 24L27 23ZM8 24L8 29L10 29L10 28L9 28L9 27L11 27L11 26L9 26L9 24ZM14 27L14 28L15 28L15 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2026-01-08 00:16:36', '2026-03-06 01:45:39'),
(15, NULL, 'BR-123', 'f36865d6-431c-417d-a162-292d03606ce9', 'Pisang molen', 'Elektronik', 'Unit', 5, 15, 40000.00, 70000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L15 4L15 3L16 3L16 4L17 4L17 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L10 9L10 11L11 11L11 9L12 9L12 10L13 10L13 11L12 11L12 13L13 13L13 12L14 12L14 13L16 13L16 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L10 14L10 13L11 13L11 12L9 12L9 11L8 11L8 10L5 10L5 8L0 8L0 9L1 9L1 10L0 10L0 14L1 14L1 16L0 16L0 21L1 21L1 16L2 16L2 17L3 17L3 18L2 18L2 19L3 19L3 20L5 20L5 19L7 19L7 20L6 20L6 21L7 21L7 20L8 20L8 23L9 23L9 21L10 21L10 22L11 22L11 23L10 23L10 24L8 24L8 29L11 29L11 28L9 28L9 26L10 26L10 27L11 27L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L19 29L19 28L22 28L22 27L23 27L23 29L24 29L24 28L25 28L25 26L26 26L26 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 24L25 24L25 22L26 22L26 21L27 21L27 22L29 22L29 21L27 21L27 20L29 20L29 19L28 19L28 18L29 18L29 17L28 17L28 16L29 16L29 15L28 15L28 14L29 14L29 13L28 13L28 14L26 14L26 13L27 13L27 12L29 12L29 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L26 9L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 9L19 9L19 8L17 8L17 5L20 5L20 7L21 7L21 5L20 5L20 4L21 4L21 2L19 2L19 1L20 1L20 0L19 0L19 1L16 1L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM16 2L16 3L18 3L18 2ZM19 3L19 4L20 4L20 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 7L16 7L16 6ZM18 6L18 7L19 7L19 6ZM10 8L10 9L11 9L11 8ZM16 8L16 9L15 9L15 10L16 10L16 9L17 9L17 10L19 10L19 13L18 13L18 14L16 14L16 15L15 15L15 16L16 16L16 15L17 15L17 16L20 16L20 18L19 18L19 17L15 17L15 18L16 18L16 20L18 20L18 21L14 21L14 20L15 20L15 19L14 19L14 20L13 20L13 21L12 21L12 19L13 19L13 18L12 18L12 17L11 17L11 16L10 16L10 14L9 14L9 12L7 12L7 11L6 11L6 12L7 12L7 13L6 13L6 14L5 14L5 12L3 12L3 13L2 13L2 14L3 14L3 13L4 13L4 14L5 14L5 15L2 15L2 16L5 16L5 17L4 17L4 18L7 18L7 19L11 19L11 20L10 20L10 21L11 21L11 22L13 22L13 23L12 23L12 25L15 25L15 26L17 26L17 27L14 27L14 28L18 28L18 26L19 26L19 25L20 25L20 24L19 24L19 25L15 25L15 24L16 24L16 23L17 23L17 24L18 24L18 23L19 23L19 22L20 22L20 19L22 19L22 20L23 20L23 19L24 19L24 17L25 17L25 16L28 16L28 15L26 15L26 14L24 14L24 13L25 13L25 12L27 12L27 10L28 10L28 9L27 9L27 10L26 10L26 9L25 9L25 12L24 12L24 11L23 11L23 10L22 10L22 11L20 11L20 10L21 10L21 9L20 9L20 10L19 10L19 9L17 9L17 8ZM3 9L3 10L4 10L4 11L5 11L5 10L4 10L4 9ZM1 10L1 12L2 12L2 10ZM14 11L14 12L16 12L16 13L17 13L17 12L18 12L18 11ZM22 11L22 12L21 12L21 13L19 13L19 14L18 14L18 15L19 15L19 14L20 14L20 16L21 16L21 17L22 17L22 18L23 18L23 17L24 17L24 16L25 16L25 15L24 15L24 14L23 14L23 13L24 13L24 12L23 12L23 11ZM22 12L22 13L23 13L23 12ZM6 14L6 15L7 15L7 16L6 16L6 17L8 17L8 15L9 15L9 14ZM21 14L21 16L22 16L22 17L23 17L23 16L24 16L24 15L22 15L22 14ZM9 17L9 18L10 18L10 17ZM26 17L26 20L25 20L25 21L26 21L26 20L27 20L27 18L28 18L28 17ZM17 18L17 19L18 19L18 20L19 20L19 18ZM18 21L18 22L19 22L19 21ZM21 21L21 24L24 24L24 21ZM15 22L15 23L14 23L14 24L15 24L15 23L16 23L16 22ZM22 22L22 23L23 23L23 22ZM22 25L22 26L20 26L20 27L22 27L22 26L23 26L23 27L24 27L24 26L25 26L25 25L24 25L24 26L23 26L23 25ZM26 25L26 26L27 26L27 25ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2026-01-09 21:20:51', '2026-03-06 00:35:47'),
(16, NULL, 'BR-124', 'a6171ea8-630a-49ce-ac7e-e9e401831c4d', 'Portable', 'Elektronik', 'Unit', 5, 15, 75000.00, 115000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L16 4L16 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 10L1 10L1 9L5 9L5 10L6 10L6 11L4 11L4 12L6 12L6 13L7 13L7 14L4 14L4 13L3 13L3 12L2 12L2 11L0 11L0 12L2 12L2 13L1 13L1 15L0 15L0 16L2 16L2 17L0 17L0 21L1 21L1 18L2 18L2 19L3 19L3 21L5 21L5 20L6 20L6 21L8 21L8 23L9 23L9 24L8 24L8 29L9 29L9 28L10 28L10 29L11 29L11 28L10 28L10 27L11 27L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L20 29L20 28L23 28L23 29L24 29L24 28L25 28L25 26L24 26L24 25L26 25L26 26L27 26L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 24L25 24L25 23L26 23L26 22L25 22L25 20L26 20L26 21L27 21L27 22L29 22L29 21L28 21L28 20L26 20L26 17L27 17L27 16L29 16L29 15L28 15L28 14L29 14L29 13L28 13L28 12L25 12L25 11L28 11L28 10L29 10L29 9L28 9L28 8L27 8L27 9L28 9L28 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L21 8L21 9L18 9L18 8L17 8L17 6L16 6L16 5L20 5L20 7L19 7L19 6L18 6L18 7L19 7L19 8L20 8L20 7L21 7L21 5L20 5L20 4L21 4L21 0L18 0L18 1L20 1L20 2L19 2L19 3L17 3L17 2L16 2L16 0L15 0L15 1L14 1L14 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM16 3L16 4L17 4L17 3ZM19 3L19 4L20 4L20 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 7L16 7L16 6ZM10 8L10 9L9 9L9 12L11 12L11 13L10 13L10 14L9 14L9 13L8 13L8 14L9 14L9 16L10 16L10 17L11 17L11 19L10 19L10 18L9 18L9 19L8 19L8 20L11 20L11 22L13 22L13 23L12 23L12 25L15 25L15 26L17 26L17 27L16 27L16 28L18 28L18 26L19 26L19 28L20 28L20 27L22 27L22 26L23 26L23 27L24 27L24 26L23 26L23 25L22 25L22 26L19 26L19 25L20 25L20 24L19 24L19 25L16 25L16 24L18 24L18 23L19 23L19 22L20 22L20 18L21 18L21 19L22 19L22 20L23 20L23 19L25 19L25 18L24 18L24 17L26 17L26 16L27 16L27 14L28 14L28 13L25 13L25 12L24 12L24 10L22 10L22 11L20 11L20 10L18 10L18 9L15 9L15 10L17 10L17 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM6 9L6 10L7 10L7 11L6 11L6 12L8 12L8 9ZM10 9L10 11L11 11L11 9ZM14 12L14 13L16 13L16 14L15 14L15 15L14 15L14 16L15 16L15 17L12 17L12 15L13 15L13 14L11 14L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L19 21L19 20L14 20L14 19L17 19L17 18L15 18L15 17L18 17L18 18L20 18L20 16L21 16L21 17L22 17L22 18L23 18L23 17L24 17L24 16L26 16L26 14L25 14L25 13L24 13L24 12L23 12L23 13L22 13L22 12L21 12L21 13L19 13L19 12L17 12L17 13L16 13L16 12ZM2 13L2 16L3 16L3 19L4 19L4 16L5 16L5 18L7 18L7 17L8 17L8 16L7 16L7 15L4 15L4 14L3 14L3 13ZM18 13L18 14L17 14L17 15L16 15L16 16L18 16L18 17L19 17L19 16L20 16L20 14L19 14L19 13ZM23 13L23 14L24 14L24 15L22 15L22 14L21 14L21 16L22 16L22 17L23 17L23 16L24 16L24 15L25 15L25 14L24 14L24 13ZM18 14L18 15L19 15L19 14ZM6 16L6 17L7 17L7 16ZM28 17L28 18L27 18L27 19L28 19L28 18L29 18L29 17ZM6 19L6 20L7 20L7 19ZM9 21L9 23L10 23L10 24L9 24L9 25L11 25L11 23L10 23L10 21ZM21 21L21 24L24 24L24 21ZM15 22L15 23L14 23L14 24L16 24L16 22ZM22 22L22 23L23 23L23 22ZM9 26L9 27L10 27L10 26ZM14 27L14 28L15 28L15 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2026-01-26 20:33:40', '2026-03-01 23:31:39'),
(17, NULL, 'BR-125', 'b54d57b2-1d2b-462b-9266-c213c3fa9115', 'ABDD', 'Elektronik', 'Unit', 10, 16, 2000.00, 3000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M10 0L10 2L11 2L11 0ZM12 0L12 1L13 1L13 2L12 2L12 4L13 4L13 3L14 3L14 4L17 4L17 5L15 5L15 6L14 6L14 8L15 8L15 9L12 9L12 7L13 7L13 5L11 5L11 6L10 6L10 4L11 4L11 3L8 3L8 4L9 4L9 5L8 5L8 7L9 7L9 8L6 8L6 9L5 9L5 8L0 8L0 9L1 9L1 10L2 10L2 9L4 9L4 10L3 10L3 11L0 11L0 14L1 14L1 15L0 15L0 21L1 21L1 18L3 18L3 15L4 15L4 14L5 14L5 12L6 12L6 13L7 13L7 14L6 14L6 15L5 15L5 18L4 18L4 20L3 20L3 19L2 19L2 20L3 20L3 21L7 21L7 20L6 20L6 19L7 19L7 18L8 18L8 19L9 19L9 18L11 18L11 17L12 17L12 18L13 18L13 19L12 19L12 21L13 21L13 20L14 20L14 21L16 21L16 22L15 22L15 23L14 23L14 24L15 24L15 25L12 25L12 23L13 23L13 22L11 22L11 20L8 20L8 23L10 23L10 24L11 24L11 25L10 25L10 26L11 26L11 25L12 25L12 26L13 26L13 27L12 27L12 29L13 29L13 28L14 28L14 29L19 29L19 28L21 28L21 29L24 29L24 28L25 28L25 26L24 26L24 25L27 25L27 26L26 26L26 27L27 27L27 28L26 28L26 29L27 29L27 28L28 28L28 26L29 26L29 25L27 25L27 24L28 24L28 23L27 23L27 22L29 22L29 21L28 21L28 20L29 20L29 19L28 19L28 18L29 18L29 17L28 17L28 18L26 18L26 17L27 17L27 16L25 16L25 15L26 15L26 13L27 13L27 12L28 12L28 11L27 11L27 12L25 12L25 11L24 11L24 12L23 12L23 11L22 11L22 10L26 10L26 8L25 8L25 9L24 9L24 8L23 8L23 9L22 9L22 8L20 8L20 7L21 7L21 6L20 6L20 7L19 7L19 6L18 6L18 7L19 7L19 8L20 8L20 9L18 9L18 8L16 8L16 7L17 7L17 5L20 5L20 4L21 4L21 2L18 2L18 1L16 1L16 0L15 0L15 1L14 1L14 0ZM19 0L19 1L20 1L20 0ZM8 1L8 2L9 2L9 1ZM14 2L14 3L15 3L15 2ZM17 2L17 3L18 3L18 2ZM19 3L19 4L20 4L20 3ZM9 6L9 7L10 7L10 6ZM11 6L11 7L12 7L12 6ZM15 6L15 7L16 7L16 6ZM10 8L10 9L8 9L8 10L7 10L7 9L6 9L6 10L5 10L5 11L6 11L6 12L7 12L7 13L9 13L9 12L11 12L11 13L10 13L10 14L13 14L13 15L12 15L12 17L15 17L15 18L17 18L17 19L16 19L16 21L17 21L17 22L16 22L16 23L15 23L15 24L16 24L16 25L15 25L15 26L16 26L16 25L17 25L17 26L18 26L18 25L19 25L19 27L14 27L14 28L19 28L19 27L21 27L21 28L23 28L23 27L24 27L24 26L23 26L23 25L22 25L22 26L20 26L20 24L19 24L19 23L17 23L17 22L20 22L20 20L21 20L21 19L22 19L22 20L24 20L24 19L23 19L23 18L22 18L22 17L25 17L25 16L23 16L23 15L24 15L24 13L25 13L25 12L24 12L24 13L23 13L23 12L22 12L22 13L23 13L23 15L22 15L22 14L21 14L21 13L20 13L20 14L19 14L19 13L14 13L14 12L15 12L15 11L14 11L14 12L13 12L13 13L12 13L12 11L13 11L13 10L12 10L12 9L11 9L11 8ZM27 8L27 10L29 10L29 9L28 9L28 8ZM10 9L10 11L11 11L11 9ZM15 9L15 10L18 10L18 9ZM20 9L20 10L19 10L19 11L16 11L16 12L21 12L21 11L20 11L20 10L21 10L21 9ZM6 10L6 11L7 11L7 10ZM8 10L8 12L9 12L9 10ZM28 13L28 14L27 14L27 15L28 15L28 14L29 14L29 13ZM7 14L7 15L6 15L6 16L7 16L7 17L6 17L6 18L5 18L5 19L6 19L6 18L7 18L7 17L8 17L8 18L9 18L9 17L10 17L10 15L9 15L9 14ZM15 14L15 15L14 15L14 16L16 16L16 17L19 17L19 18L18 18L18 19L19 19L19 20L17 20L17 21L19 21L19 20L20 20L20 19L19 19L19 18L20 18L20 16L21 16L21 17L22 17L22 16L21 16L21 14L20 14L20 16L19 16L19 14ZM1 15L1 17L2 17L2 15ZM8 15L8 16L9 16L9 15ZM16 15L16 16L18 16L18 15ZM14 19L14 20L15 20L15 19ZM26 19L26 20L25 20L25 24L27 24L27 23L26 23L26 22L27 22L27 21L26 21L26 20L27 20L27 19ZM9 21L9 22L10 22L10 21ZM21 21L21 24L24 24L24 21ZM22 22L22 23L23 23L23 22ZM16 23L16 24L17 24L17 25L18 25L18 24L17 24L17 23ZM8 24L8 29L11 29L11 28L9 28L9 24ZM22 26L22 27L23 27L23 26ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2026-02-27 01:26:09', '2026-03-06 00:37:39'),
(18, NULL, 'BR-126', '474281ea-320a-4b4d-ab83-d6e124a78b6c', 'adalah', 'Elektronik', 'Unit', 10, 25, 13000.00, 20000.00, '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"300\" height=\"300\" viewBox=\"0 0 300 300\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"300\" fill=\"#ffffff\"/><g transform=\"scale(10.345)\"><g transform=\"translate(0,0)\"><path fill-rule=\"evenodd\" d=\"M8 0L8 1L9 1L9 2L8 2L8 5L9 5L9 4L11 4L11 5L10 5L10 10L5 10L5 9L4 9L4 8L0 8L0 9L1 9L1 10L0 10L0 12L1 12L1 14L2 14L2 15L4 15L4 16L1 16L1 15L0 15L0 16L1 16L1 17L4 17L4 18L3 18L3 19L2 19L2 20L1 20L1 21L2 21L2 20L3 20L3 21L4 21L4 20L6 20L6 21L8 21L8 22L9 22L9 23L10 23L10 24L11 24L11 26L12 26L12 28L11 28L11 27L10 27L10 26L9 26L9 25L8 25L8 29L12 29L12 28L14 28L14 27L15 27L15 28L16 28L16 29L17 29L17 27L18 27L18 28L20 28L20 29L21 29L21 28L22 28L22 29L23 29L23 28L24 28L24 29L25 29L25 27L23 27L23 28L22 28L22 27L18 27L18 26L19 26L19 23L20 23L20 26L22 26L22 25L24 25L24 26L25 26L25 23L27 23L27 22L26 22L26 21L28 21L28 22L29 22L29 20L27 20L27 19L28 19L28 16L29 16L29 13L27 13L27 12L26 12L26 11L25 11L25 13L27 13L27 14L28 14L28 16L27 16L27 19L26 19L26 16L25 16L25 15L26 15L26 14L24 14L24 12L23 12L23 11L24 11L24 10L25 10L25 9L27 9L27 8L24 8L24 9L22 9L22 8L21 8L21 6L20 6L20 5L21 5L21 3L20 3L20 2L21 2L21 1L20 1L20 0L19 0L19 1L20 1L20 2L18 2L18 3L17 3L17 1L16 1L16 0L15 0L15 1L16 1L16 2L15 2L15 3L14 3L14 5L13 5L13 3L12 3L12 4L11 4L11 2L14 2L14 0L12 0L12 1L11 1L11 0L10 0L10 1L9 1L9 0ZM16 3L16 4L17 4L17 7L18 7L18 5L19 5L19 4L17 4L17 3ZM12 5L12 6L11 6L11 8L12 8L12 6L13 6L13 8L14 8L14 9L15 9L15 10L14 10L14 11L11 11L11 13L10 13L10 14L9 14L9 15L8 15L8 16L7 16L7 15L6 15L6 16L4 16L4 17L6 17L6 18L7 18L7 19L6 19L6 20L9 20L9 21L10 21L10 22L11 22L11 23L14 23L14 22L15 22L15 24L12 24L12 26L13 26L13 27L14 27L14 26L15 26L15 27L16 27L16 26L15 26L15 24L16 24L16 25L17 25L17 24L18 24L18 23L19 23L19 22L20 22L20 21L19 21L19 20L23 20L23 18L24 18L24 20L25 20L25 17L24 17L24 14L22 14L22 13L23 13L23 12L22 12L22 13L21 13L21 11L23 11L23 10L19 10L19 11L17 11L17 10L18 10L18 9L17 9L17 8L15 8L15 7L16 7L16 5L14 5L14 6L13 6L13 5ZM8 6L8 7L9 7L9 6ZM14 6L14 7L15 7L15 6ZM19 6L19 7L20 7L20 6ZM6 8L6 9L7 9L7 8ZM8 8L8 9L9 9L9 8ZM20 8L20 9L21 9L21 8ZM28 8L28 10L29 10L29 8ZM2 9L2 10L1 10L1 11L2 11L2 10L3 10L3 11L4 11L4 9ZM11 9L11 10L12 10L12 9ZM5 11L5 12L7 12L7 13L6 13L6 14L8 14L8 13L9 13L9 12L7 12L7 11ZM15 11L15 12L14 12L14 14L13 14L13 12L12 12L12 13L11 13L11 15L10 15L10 16L8 16L8 17L7 17L7 16L6 16L6 17L7 17L7 18L8 18L8 17L9 17L9 19L10 19L10 18L11 18L11 17L10 17L10 16L12 16L12 17L13 17L13 16L12 16L12 14L13 14L13 15L14 15L14 18L13 18L13 21L15 21L15 20L17 20L17 21L18 21L18 20L19 20L19 19L17 19L17 16L16 16L16 15L18 15L18 17L21 17L21 18L22 18L22 17L21 17L21 15L22 15L22 14L20 14L20 13L19 13L19 12L20 12L20 11L19 11L19 12L17 12L17 11ZM28 11L28 12L29 12L29 11ZM2 12L2 14L4 14L4 15L5 15L5 13L4 13L4 12ZM16 12L16 13L17 13L17 12ZM14 14L14 15L16 15L16 14ZM19 15L19 16L20 16L20 15ZM0 18L0 19L1 19L1 18ZM3 19L3 20L4 20L4 19ZM11 19L11 20L12 20L12 19ZM21 21L21 24L24 24L24 21ZM16 22L16 24L17 24L17 23L18 23L18 22ZM22 22L22 23L23 23L23 22ZM28 23L28 24L29 24L29 23ZM26 24L26 26L27 26L27 24ZM13 25L13 26L14 26L14 25ZM28 25L28 27L27 27L27 29L28 29L28 27L29 27L29 25ZM9 27L9 28L10 28L10 27ZM0 0L0 7L7 7L7 0ZM1 1L1 6L6 6L6 1ZM2 2L2 5L5 5L5 2ZM22 0L22 7L29 7L29 0ZM23 1L23 6L28 6L28 1ZM24 2L24 5L27 5L27 2ZM0 22L0 29L7 29L7 22ZM1 23L1 28L6 28L6 23ZM2 24L2 27L5 27L5 24Z\" fill=\"#000000\"/></g></g></svg>\n', '2026-03-04 23:53:06', '2026-03-06 19:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `product_qr_logs`
--

CREATE TABLE `product_qr_logs` (
  `log_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `scanned_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scanned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_qr_logs`
--

INSERT INTO `product_qr_logs` (`log_id`, `product_id`, `scanned_by`, `scanned_at`, `created_at`, `updated_at`) VALUES
(1, 12, 'Guest', '2025-12-29 01:23:46', '2025-12-29 01:23:46', '2025-12-29 01:23:46'),
(2, 12, 'Guest', '2025-12-29 01:24:26', '2025-12-29 01:24:26', '2025-12-29 01:24:26'),
(3, 1, 'Guest', '2025-12-29 01:28:14', '2025-12-29 01:28:14', '2025-12-29 01:28:14'),
(4, 5, 'Guest', '2025-12-29 01:28:26', '2025-12-29 01:28:26', '2025-12-29 01:28:26'),
(5, 12, 'Guest', '2026-01-01 20:07:01', '2026-01-01 20:07:01', '2026-01-01 20:07:01'),
(6, 12, 'Guest', '2026-01-04 20:21:47', '2026-01-04 20:21:47', '2026-01-04 20:21:47'),
(7, 12, 'Guest', '2026-01-04 20:22:22', '2026-01-04 20:22:22', '2026-01-04 20:22:22'),
(8, 12, 'Guest', '2026-01-04 20:22:51', '2026-01-04 20:22:51', '2026-01-04 20:22:51'),
(9, 12, 'Guest', '2026-01-04 20:23:26', '2026-01-04 20:23:26', '2026-01-04 20:23:26'),
(10, 12, 'Guest', '2026-01-06 01:35:39', '2026-01-06 01:35:39', '2026-01-06 01:35:39'),
(11, 12, 'Guest', '2026-01-09 21:23:10', '2026-01-09 21:23:10', '2026-01-09 21:23:10'),
(12, 11, 'Guest', '2026-01-09 21:23:47', '2026-01-09 21:23:47', '2026-01-09 21:23:47'),
(13, 12, 'Guest', '2026-01-09 21:26:31', '2026-01-09 21:26:31', '2026-01-09 21:26:31'),
(14, 12, 'Guest', '2026-01-22 02:09:22', '2026-01-22 02:09:22', '2026-01-22 02:09:22'),
(15, 13, 'Guest', '2026-01-27 01:00:33', '2026-01-27 01:00:33', '2026-01-27 01:00:33'),
(16, 12, 'Guest', '2026-01-29 19:23:16', '2026-01-29 19:23:16', '2026-01-29 19:23:16'),
(17, 12, 'Guest', '2026-01-29 19:23:49', '2026-01-29 19:23:49', '2026-01-29 19:23:49'),
(18, 12, 'Guest', '2026-02-11 19:34:12', '2026-02-11 19:34:12', '2026-02-11 19:34:12'),
(19, 18, 'Guest', '2026-03-06 02:16:59', '2026-03-06 02:16:59', '2026-03-06 02:16:59'),
(20, 17, 'Guest', '2026-03-06 02:17:14', '2026-03-06 02:17:14', '2026-03-06 02:17:14'),
(21, 16, 'Guest', '2026-03-06 02:17:30', '2026-03-06 02:17:30', '2026-03-06 02:17:30'),
(22, 18, 'Guest', '2026-03-06 19:27:05', '2026-03-06 19:27:05', '2026-03-06 19:27:05');

-- --------------------------------------------------------

--
-- Table structure for table `profit_reports`
--

CREATE TABLE `profit_reports` (
  `report_id` bigint(20) UNSIGNED NOT NULL,
  `period_type` enum('DAILY','WEEKLY','MONTHLY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_start` date NOT NULL,
  `period_end` date NOT NULL,
  `total_modal` decimal(20,2) NOT NULL,
  `total_penjualan` decimal(20,2) NOT NULL,
  `total_profit` decimal(20,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profit_reports`
--

INSERT INTO `profit_reports` (`report_id`, `period_type`, `period_start`, `period_end`, `total_modal`, `total_penjualan`, `total_profit`, `created_at`, `updated_at`) VALUES
(1, 'MONTHLY', '2026-02-01', '2026-02-28', 1120900.00, 2349000.00, 1228100.00, '2026-02-27 02:16:49', '2026-02-27 02:16:49'),
(2, 'MONTHLY', '2026-02-01', '2026-02-28', 1120900.00, 2349000.00, 1228100.00, '2026-02-27 02:17:29', '2026-02-27 02:17:29'),
(3, 'DAILY', '2026-02-27', '2026-02-27', 0.00, 0.00, 0.00, '2026-02-27 02:17:40', '2026-02-27 02:17:40'),
(4, 'WEEKLY', '2026-02-23', '2026-03-01', 540400.00, 974000.00, 433600.00, '2026-02-27 02:17:42', '2026-02-27 02:17:42'),
(5, 'MONTHLY', '2026-02-01', '2026-02-28', 1120900.00, 2349000.00, 1228100.00, '2026-02-27 02:17:43', '2026-02-27 02:17:43'),
(6, 'MONTHLY', '2026-01-01', '2026-12-31', 6742000.00, 13120000.00, 6378000.00, '2026-02-27 02:17:46', '2026-02-27 02:17:46'),
(7, 'MONTHLY', '2026-01-01', '2026-12-31', 6742000.00, 13120000.00, 6378000.00, '2026-02-27 02:17:49', '2026-02-27 02:17:49'),
(8, 'MONTHLY', '2026-02-01', '2026-02-28', 1120900.00, 2349000.00, 1228100.00, '2026-02-27 02:17:57', '2026-02-27 02:17:57'),
(9, 'WEEKLY', '2026-02-23', '2026-03-01', 540400.00, 974000.00, 433600.00, '2026-02-27 02:18:01', '2026-02-27 02:18:01'),
(10, 'DAILY', '2026-02-27', '2026-02-27', 0.00, 0.00, 0.00, '2026-02-27 02:18:03', '2026-02-27 02:18:03'),
(11, 'MONTHLY', '2026-01-01', '2026-12-31', 6742000.00, 13120000.00, 6378000.00, '2026-02-27 02:18:06', '2026-02-27 02:18:06'),
(12, 'MONTHLY', '2026-02-01', '2026-02-28', 1120900.00, 2349000.00, 1228100.00, '2026-02-27 02:19:03', '2026-02-27 02:19:03'),
(13, 'DAILY', '2026-02-27', '2026-02-27', 0.00, 0.00, 0.00, '2026-02-27 02:19:29', '2026-02-27 02:19:29'),
(14, 'WEEKLY', '2026-02-23', '2026-03-01', 540400.00, 974000.00, 433600.00, '2026-02-27 02:19:33', '2026-02-27 02:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_opnames`
--

CREATE TABLE `stock_opnames` (
  `opname_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tanggal_opname` date NOT NULL,
  `stok_sistem` int(11) NOT NULL,
  `stok_fisik` int(11) NOT NULL,
  `selisih` int(11) NOT NULL,
  `nama_petugas` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci,
  `status_penyesuaian` enum('Belum Disesuaikan','Disesuaikan') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Belum Disesuaikan',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock_opnames`
--

INSERT INTO `stock_opnames` (`opname_id`, `product_id`, `user_id`, `tanggal_opname`, `stok_sistem`, `stok_fisik`, `selisih`, `nama_petugas`, `catatan`, `status_penyesuaian`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '2025-11-24', 25, 21, -4, 'Mira', 'Ada kesalahan', 'Disesuaikan', '2025-11-23 21:02:17', '2025-11-23 21:02:17'),
(2, 2, NULL, '2025-11-24', 12, 1, -11, 'Yulia Nabila', 'adaaa ', 'Disesuaikan', '2025-11-23 21:03:15', '2025-11-24 00:50:37'),
(3, 3, NULL, '2025-11-26', 26, 26, 0, 'Kevin', 'Pas', 'Disesuaikan', '2025-11-26 02:54:57', '2025-11-26 02:54:57'),
(4, 1, NULL, '2025-12-02', 42, 35, -7, NULL, 'BAHAN KURANG', 'Disesuaikan', '2025-12-02 01:40:14', '2025-12-02 01:40:39'),
(5, 3, NULL, '2025-12-03', 55, 53, -2, 'Yulia', 'Ada yang kurang', 'Disesuaikan', '2025-12-03 02:51:41', '2025-12-03 02:52:00'),
(6, 12, NULL, '2026-01-08', 0, 5, 5, 'ABCD', 'ada 5 pcs di gudang', 'Disesuaikan', '2026-01-07 19:32:59', '2026-01-07 19:32:59'),
(7, 12, NULL, '2026-01-08', 5, 6, 1, 'abcds', 'ada 6 stok digudang', 'Disesuaikan', '2026-01-07 19:33:20', '2026-01-07 19:33:20'),
(8, 6, NULL, '2026-01-08', 0, 4, 4, NULL, 'ada 4 stok di gudang', 'Disesuaikan', '2026-01-07 19:36:23', '2026-01-07 19:36:23'),
(9, 6, NULL, '2026-01-10', 4, 4, 0, 'abcd', 'sesuai', 'Disesuaikan', '2026-01-09 21:20:18', '2026-01-09 21:20:18'),
(10, 3, NULL, '2026-01-22', 6, 9, 3, NULL, 'ada 9 di gudang', 'Disesuaikan', '2026-01-22 01:55:16', '2026-01-22 01:55:16'),
(11, 13, NULL, '2026-01-22', 0, 14, 14, 'Yulia', 'ada 14 stok digudang', 'Disesuaikan', '2026-01-22 02:28:34', '2026-01-22 02:28:34'),
(12, 13, NULL, '2026-01-22', 14, 14, 0, 'yulia', 'ada 14 stok di gudang', 'Disesuaikan', '2026-01-22 02:33:06', '2026-01-22 02:33:06'),
(13, 4, NULL, '2026-01-22', 0, 13, 13, 'yulia', 'ada 13 stok gudang', 'Disesuaikan', '2026-01-22 02:41:28', '2026-01-22 02:41:28'),
(14, 9, NULL, '2026-01-30', 20, 10, -10, 'budi', 'barang digudang 10', 'Disesuaikan', '2026-01-29 19:14:04', '2026-01-29 19:14:27'),
(15, 3, NULL, '2026-02-09', 7, 7, 0, 'habil', 'barang fisik 7', 'Disesuaikan', '2026-02-09 01:16:53', '2026-02-09 01:16:53'),
(16, 6, NULL, '2026-02-21', 10, 10, 0, 'ayam', 'fisik 10', 'Disesuaikan', '2026-02-20 19:56:09', '2026-02-20 19:56:09'),
(17, 9, NULL, '2026-02-21', 4, 5, 1, 'GABE', 'Tidak ada selisih', 'Disesuaikan', '2026-02-20 20:41:28', '2026-02-20 20:41:28'),
(18, 6, NULL, '2026-02-28', 18, 18, 0, 'budi', '18 di gudang', 'Disesuaikan', '2026-02-27 18:30:11', '2026-02-27 18:30:11'),
(19, 18, NULL, '2026-03-05', 15, 15, 0, 'budi', '15 stok digudang', 'Disesuaikan', '2026-03-05 01:06:11', '2026-03-05 01:06:11');

-- --------------------------------------------------------

--
-- Table structure for table `stock_transactions`
--

CREATE TABLE `stock_transactions` (
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `jenis_transaksi` enum('IN','OUT','ADJUST') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int(11) NOT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci,
  `penanggung_jawab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock_transactions`
--

INSERT INTO `stock_transactions` (`transaction_id`, `product_id`, `user_id`, `jenis_transaksi`, `jumlah`, `catatan`, `penanggung_jawab`, `created_at`, `updated_at`) VALUES
(7, 1, NULL, 'ADJUST', 21, 'Stok Opname - Penyesuaian (Selisih: -4). Ada kesalahan', NULL, '2025-11-23 21:02:17', '2025-11-23 21:02:17'),
(8, 2, NULL, 'ADJUST', 1, 'Penyesuaian Stok Opname (Selisih: -11)', NULL, '2025-11-24 00:50:37', '2025-11-24 00:50:37'),
(24, 1, NULL, 'ADJUST', 35, 'Penyesuaian Stok Opname (Selisih: -7)', NULL, '2025-12-02 01:40:39', '2025-12-02 01:40:39'),
(26, 3, NULL, 'ADJUST', 53, 'Penyesuaian Stok Opname (Selisih: -2)', NULL, '2025-12-03 02:52:00', '2025-12-03 02:52:00'),
(27, 11, NULL, 'IN', 25, 'Barang masuk - BEE', NULL, '2025-12-19 21:09:30', '2025-12-19 21:09:30'),
(28, 9, NULL, 'IN', 15, 'Barang masuk - AYAM', NULL, '2025-12-19 21:10:49', '2025-12-19 21:10:49'),
(29, 8, NULL, 'IN', 12, 'Barang masuk - RSSS', NULL, '2025-12-19 21:11:03', '2025-12-19 21:11:03'),
(30, 11, NULL, 'OUT', 2, 'Barang keluar - BEE', 'dhafin', '2025-12-19 21:32:49', '2025-12-19 21:32:49'),
(31, 8, NULL, 'IN', 15, 'Barang masuk - RSSS', NULL, '2025-12-21 18:54:29', '2025-12-21 18:54:29'),
(32, 8, NULL, 'OUT', 5, 'Barang keluar - RSSS', 'abcd', '2025-12-21 18:55:04', '2025-12-21 18:55:04'),
(33, 1, NULL, 'IN', 11, 'Barang masuk - Rumah Kenny', NULL, '2025-12-22 19:02:23', '2025-12-22 19:02:23'),
(34, 2, NULL, 'IN', 20, 'Barang masuk - Motor Habil', NULL, '2025-12-22 19:02:37', '2025-12-22 19:02:37'),
(35, 9, NULL, 'IN', 10, NULL, 'Zulkifli', '2026-01-06 01:36:11', '2026-01-06 01:36:11'),
(36, 12, NULL, 'IN', 5, 'Stok Opname - ada 5 pcs di gudang (Selisih: 5)', NULL, '2026-01-07 19:32:59', '2026-01-07 19:32:59'),
(37, 12, NULL, 'IN', 1, 'Stok Opname - ada 6 stok digudang (Selisih: 1)', NULL, '2026-01-07 19:33:20', '2026-01-07 19:33:20'),
(38, 6, NULL, 'IN', 4, 'Stok Opname - ada 4 stok di gudang (Selisih: 4)', NULL, '2026-01-07 19:36:23', '2026-01-07 19:36:23'),
(39, 2, NULL, 'IN', 15, NULL, 'Habil', '2026-01-08 20:14:04', '2026-01-08 20:14:04'),
(40, 2, NULL, 'OUT', 2, NULL, 'Habil', '2026-01-08 20:14:54', '2026-01-08 20:14:54'),
(41, 9, NULL, 'IN', 10, NULL, 'Habil', '2026-01-09 21:24:47', '2026-01-09 21:24:47'),
(42, 11, NULL, 'OUT', 13, NULL, 'Zulkifli', '2026-01-09 21:25:32', '2026-01-09 21:25:32'),
(43, 8, NULL, 'IN', 5, NULL, 'gabe', '2026-01-09 21:30:40', '2026-01-09 21:30:40'),
(44, 9, NULL, 'IN', 10, NULL, 'gabe', '2026-01-09 21:31:30', '2026-01-09 21:31:30'),
(45, 6, NULL, 'OUT', 2, NULL, 'gabe', '2026-01-09 21:32:29', '2026-01-09 21:32:29'),
(46, 3, NULL, 'IN', 8, 'Barang masuk - Apasih', NULL, '2026-01-11 20:30:37', '2026-01-11 20:30:37'),
(47, 15, NULL, 'IN', 8, 'Barang masuk - Pisang molen', NULL, '2026-01-11 20:31:01', '2026-01-11 20:31:01'),
(48, 9, NULL, 'OUT', 15, 'Barang keluar - AYAM', 'Yulia', '2026-01-20 21:04:03', '2026-01-20 21:04:03'),
(49, 3, NULL, 'IN', 3, 'Stok Opname - ada 9 di gudang (Selisih: 3)', NULL, '2026-01-22 01:55:16', '2026-01-22 01:55:16'),
(50, 13, NULL, 'IN', 14, 'Stok Opname - ada 14 stok digudang (Selisih: 14)', NULL, '2026-01-22 02:28:34', '2026-01-22 02:28:34'),
(51, 4, NULL, 'IN', 13, 'Stok Opname - ada 13 stok gudang (Selisih: 13)', NULL, '2026-01-22 02:41:28', '2026-01-22 02:41:28'),
(52, 8, NULL, 'OUT', 20, 'Barang keluar - RSSS', 'habil', '2026-01-22 02:42:22', '2026-01-22 02:42:22'),
(53, 16, NULL, 'IN', 15, 'Barang masuk - Portable', NULL, '2026-01-26 20:37:45', '2026-01-26 20:37:45'),
(54, 16, NULL, 'OUT', 6, 'Barang keluar - Portable', 'apin', '2026-01-26 20:39:00', '2026-01-26 20:39:00'),
(55, 2, NULL, 'OUT', 12, 'Barang keluar - Motor Habil', 'billy', '2026-01-26 20:46:08', '2026-01-26 20:46:08'),
(56, 14, NULL, 'IN', 12, 'Barang masuk - Pisang Goreng', 'asni', '2026-01-26 20:46:46', '2026-02-09 01:37:40'),
(57, 6, NULL, 'IN', 7, 'Barang masuk - ABCD', 'anna', '2026-01-26 20:52:50', '2026-02-09 01:37:33'),
(58, 3, NULL, 'OUT', 2, 'Barang keluar - Apasih', 'yuu', '2026-01-26 20:53:05', '2026-01-26 20:53:05'),
(59, 10, NULL, 'IN', 11, 'Barang masuk - NICE', 'dere', '2026-01-26 20:53:38', '2026-02-09 01:37:22'),
(60, 11, NULL, 'IN', 10, 'Barang masuk - BEE', 'habil', '2026-01-29 19:10:56', '2026-02-09 01:37:14'),
(61, 9, NULL, 'OUT', 10, 'Barang keluar - AYAM', 'BUDI', '2026-01-29 19:11:39', '2026-01-29 19:11:39'),
(62, 9, NULL, 'ADJUST', 10, 'Penyesuaian Stok Opname (Selisih: -10)', NULL, '2026-01-29 19:14:27', '2026-01-29 19:14:27'),
(63, 6, NULL, 'IN', 10, NULL, 'gabe', '2026-01-29 19:29:58', '2026-01-29 19:29:58'),
(64, 6, NULL, 'OUT', 9, NULL, 'gabe', '2026-01-29 19:30:39', '2026-01-29 19:30:39'),
(65, 5, NULL, 'IN', 10, 'Barang masuk - Popeye', 'sina', '2026-02-09 01:41:32', '2026-02-09 01:41:32'),
(66, 6, NULL, 'IN', 5, 'Barang masuk - ABCD', 'heli', '2026-02-09 19:56:29', '2026-02-09 19:56:29'),
(67, 6, NULL, 'OUT', 5, 'Barang keluar - ABCD', 'beri', '2026-02-09 20:19:12', '2026-02-09 20:19:12'),
(68, 11, NULL, 'OUT', 4, 'Barang keluar - BEE', 'nana', '2026-02-09 20:19:35', '2026-02-09 20:19:35'),
(69, 7, NULL, 'IN', 7, 'Barang masuk - Rumah Rikardo', 'riko', '2026-02-10 02:47:47', '2026-02-10 02:47:47'),
(70, 9, NULL, 'IN', 20, 'Barang masuk - AYAM', 'Gabe', '2026-02-20 20:31:23', '2026-02-20 20:31:23'),
(71, 9, NULL, 'IN', 20, 'Barang masuk - AYAM', 'Gabe', '2026-02-20 20:34:03', '2026-02-20 20:34:03'),
(72, 9, NULL, 'OUT', 40, 'Barang keluar - AYAM', 'Gabe', '2026-02-20 20:35:10', '2026-02-20 20:35:10'),
(73, 9, NULL, 'OUT', 6, 'Barang keluar - AYAM', 'GABE', '2026-02-20 20:36:12', '2026-02-20 20:36:12'),
(74, 9, NULL, 'IN', 1, 'Stok Opname - Tidak ada selisih (Selisih: 1)', NULL, '2026-02-20 20:41:28', '2026-02-20 20:41:28'),
(75, 9, NULL, 'IN', 5, 'Barang masuk - AYAM', 'billy', '2026-02-23 21:36:15', '2026-02-23 21:36:15'),
(76, 11, NULL, 'OUT', 6, 'Barang keluar - BEE', 'budi', '2026-02-24 19:37:58', '2026-02-24 19:37:58'),
(77, 13, NULL, 'OUT', 4, 'Barang keluar - AYAM PISANG', 'budi', '2026-02-24 20:10:25', '2026-02-24 20:10:25'),
(78, 14, NULL, 'OUT', 2, 'Barang keluar - Pisang Goreng', 'budi', '2026-02-24 20:10:53', '2026-02-24 20:10:53'),
(79, 12, NULL, 'IN', 12, 'Barang masuk - APS', 'budi', '2026-02-24 20:11:28', '2026-02-24 20:11:28'),
(80, 12, NULL, 'OUT', 4, 'Barang keluar - APS', 'budi', '2026-02-24 20:11:48', '2026-02-24 20:11:48'),
(81, 1, NULL, 'IN', 10, 'Barang masuk - Rumah Kenny', 'budi', '2026-02-24 20:12:11', '2026-02-24 20:12:11'),
(82, 12, NULL, 'OUT', 4, 'Barang keluar - APS', 'budi', '2026-02-24 20:26:00', '2026-02-24 20:26:00'),
(83, 6, NULL, 'IN', 5, 'Barang masuk - ABCD', 'budi', '2026-02-24 20:27:39', '2026-02-24 20:27:39'),
(84, 5, NULL, 'IN', 5, 'Barang masuk - Popeye', 'budi', '2026-02-24 20:28:49', '2026-02-24 20:28:49'),
(85, 3, NULL, 'IN', 7, 'Barang masuk - Apasih', 'budi', '2026-02-25 01:51:25', '2026-02-25 01:51:25'),
(86, 6, NULL, 'OUT', 4, 'Barang keluar - ABCD', 'budi', '2026-02-26 00:52:58', '2026-02-26 00:52:58'),
(87, 6, NULL, 'IN', 7, 'Barang masuk - ABCD', 'budi', '2026-02-26 00:53:49', '2026-02-26 00:53:49'),
(88, 17, NULL, 'IN', 10, 'Barang masuk - ABDD', 'budi', '2026-02-27 01:51:20', '2026-02-27 01:51:20'),
(89, 17, NULL, 'IN', 4, 'Barang masuk - ABDD', 'budi', '2026-02-27 01:51:56', '2026-02-27 01:51:56'),
(90, 16, NULL, 'IN', 5, 'Barang masuk - Portable', 'budi', '2026-02-27 18:25:04', '2026-02-27 18:25:04'),
(91, 16, NULL, 'OUT', 4, 'Barang keluar - Portable', 'budi', '2026-02-27 18:29:02', '2026-02-27 18:29:02'),
(92, 17, NULL, 'IN', 5, NULL, 'budi', '2026-03-01 23:31:09', '2026-03-01 23:31:09'),
(93, 16, NULL, 'IN', 5, NULL, 'budi', '2026-03-01 23:31:39', '2026-03-01 23:31:39'),
(94, 17, NULL, 'OUT', 10, 'Barang keluar - ABDD', 'budi', '2026-03-02 00:11:57', '2026-03-02 00:11:57'),
(95, 17, NULL, 'IN', 10, 'Barang masuk - ABDD', 'budi', '2026-03-02 00:26:16', '2026-03-02 00:26:16'),
(98, 15, NULL, 'IN', 15, 'Barang masuk - Pisang molen', 'budi', '2026-03-05 00:25:43', '2026-03-05 00:25:43'),
(99, 18, NULL, 'IN', 45, 'Barang masuk - adalah', 'budi', '2026-03-05 00:29:04', '2026-03-05 00:29:04'),
(100, 18, NULL, 'IN', 15, 'Barang masuk - adalah', 'budi', '2026-03-05 00:42:09', '2026-03-05 00:42:09'),
(101, 18, NULL, 'OUT', 15, 'Barang keluar - adalah', 'budi', '2026-03-05 00:42:24', '2026-03-05 00:42:24'),
(102, 15, NULL, 'IN', 15, 'Barang masuk - Pisang molen', 'budi', '2026-03-06 00:35:33', '2026-03-06 00:35:33'),
(103, 15, NULL, 'OUT', 23, 'Barang keluar - Pisang molen', 'budi', '2026-03-06 00:35:47', '2026-03-06 00:35:47'),
(104, 17, NULL, 'OUT', 3, 'Barang keluar - ABDD', 'budi', '2026-03-06 00:37:39', '2026-03-06 00:37:39'),
(105, 6, NULL, 'OUT', 3, 'Barang keluar - ABCD', 'budi', '2026-03-06 00:38:10', '2026-03-06 00:38:10'),
(106, 7, NULL, 'IN', 15, 'Barang masuk - Rumah Rikardo', 'budi', '2026-03-06 00:46:19', '2026-03-06 00:46:19'),
(107, 7, NULL, 'OUT', 5, 'Barang keluar - Rumah Rikardo', 'budi', '2026-03-06 00:46:40', '2026-03-06 00:46:40'),
(108, 14, NULL, 'IN', 10, 'Barang masuk - Pisang Goreng', 'budi', '2026-03-06 01:45:18', '2026-03-06 01:45:18'),
(109, 14, NULL, 'OUT', 5, 'Barang keluar - Pisang Goreng', 'budi', '2026-03-06 01:45:39', '2026-03-06 01:45:39'),
(110, 4, NULL, 'OUT', 3, NULL, 'aceng', '2026-03-06 02:21:47', '2026-03-06 02:21:47'),
(111, 13, NULL, 'IN', 10, NULL, 'aceng', '2026-03-06 02:23:56', '2026-03-06 02:23:56'),
(112, 4, NULL, 'IN', 10, 'Barang masuk - Kenapa', 'budi', '2026-03-06 18:55:59', '2026-03-06 18:56:09'),
(113, 4, NULL, 'OUT', 10, 'Barang keluar - Kenapa', 'andi', '2026-03-06 18:56:25', '2026-03-06 18:56:36'),
(114, 18, NULL, 'IN', 10, 'Barang masuk - adalah', 'budi', '2026-03-06 19:22:56', '2026-03-06 19:22:56'),
(116, 18, NULL, 'IN', 15, NULL, 'andi', '2026-03-06 19:27:32', '2026-03-06 19:27:32'),
(117, 18, NULL, 'OUT', 15, NULL, 'andi', '2026-03-06 19:27:50', '2026-03-06 19:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'kevin.3312301037', 'mualhutagalung7@gmail.com', '2025-11-19 23:52:16', '$2y$12$hs6RDFNMVb3PT.6WzahBQugtwlenagWzHuUHO7ZYN68k9Ddm5nJS.', 'aPRdzPV4kGpCGkAFyixCOddYBWmPcqCnV6GRfvglr39YfgqNerpg82hrEZT6', '2025-11-19 23:50:49', '2026-01-29 19:40:26', 'admin'),
(7, 'rikardohama1234545', 'rikardohama1122@gmail.com', '2025-12-03 02:36:10', '$2y$12$DGAcqN21D9AxUOULXf6itO3s.GIMMygh.nh623Q4tDljb8/HAplNi', 'msahLMOlJ7AEMoGYJtUM0xNzAaLsz8xyKRMcJQui4skKohiVVZxaohpOdl0p', '2025-12-03 02:35:34', '2026-01-27 01:42:29', 'user'),
(23, 'NATANs', 'kevinpanjaitan09@gmail.com', '2026-03-06 19:29:07', '$2y$12$3GdF0MKbECrtcZ6yq.FAMOY7EBWTjYnvYp429HVVWI9P7q4wpox2u', 'KdeRsuSJAZ7z9ew5JoPzOb7qUB0Taf2RvpTBI21MUo2Gy4DgoPOHDd425HqG', '2026-03-06 19:28:32', '2026-03-06 19:29:54', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `products_kode_barang_unique` (`kode_barang`),
  ADD UNIQUE KEY `products_uuid_unique` (`uuid`),
  ADD KEY `products_user_id_foreign` (`user_id`),
  ADD KEY `products_kode_barang_index` (`kode_barang`),
  ADD KEY `products_nama_barang_index` (`nama_barang`),
  ADD KEY `products_jenis_barang_index` (`jenis_barang`),
  ADD KEY `products_stok_index` (`stok`),
  ADD KEY `products_stok_stok_minimal_index` (`stok`,`stok_minimal`),
  ADD KEY `products_created_at_index` (`created_at`);

--
-- Indexes for table `product_qr_logs`
--
ALTER TABLE `product_qr_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `product_qr_logs_product_id_foreign` (`product_id`);

--
-- Indexes for table `profit_reports`
--
ALTER TABLE `profit_reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `profit_reports_period_type_index` (`period_type`),
  ADD KEY `profit_reports_period_start_index` (`period_start`),
  ADD KEY `profit_reports_period_end_index` (`period_end`),
  ADD KEY `profit_reports_period_start_period_end_index` (`period_start`,`period_end`),
  ADD KEY `profit_reports_created_at_index` (`created_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `1` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `stock_opnames`
--
ALTER TABLE `stock_opnames`
  ADD PRIMARY KEY (`opname_id`),
  ADD KEY `stock_opnames_user_id_foreign` (`user_id`),
  ADD KEY `stock_opnames_product_id_index` (`product_id`),
  ADD KEY `stock_opnames_tanggal_opname_index` (`tanggal_opname`),
  ADD KEY `stock_opnames_status_penyesuaian_index` (`status_penyesuaian`),
  ADD KEY `stock_opnames_tanggal_opname_status_penyesuaian_index` (`tanggal_opname`,`status_penyesuaian`),
  ADD KEY `stock_opnames_created_at_index` (`created_at`);

--
-- Indexes for table `stock_transactions`
--
ALTER TABLE `stock_transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `stock_transactions_user_id_foreign` (`user_id`),
  ADD KEY `stock_transactions_product_id_index` (`product_id`),
  ADD KEY `stock_transactions_jenis_transaksi_index` (`jenis_transaksi`),
  ADD KEY `stock_transactions_created_at_index` (`created_at`),
  ADD KEY `stock_transactions_product_id_jenis_transaksi_index` (`product_id`,`jenis_transaksi`),
  ADD KEY `stock_transactions_jenis_transaksi_created_at_index` (`jenis_transaksi`,`created_at`),
  ADD KEY `stock_transactions_penanggung_jawab_index` (`penanggung_jawab`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `product_qr_logs`
--
ALTER TABLE `product_qr_logs`
  MODIFY `log_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `profit_reports`
--
ALTER TABLE `profit_reports`
  MODIFY `report_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `stock_opnames`
--
ALTER TABLE `stock_opnames`
  MODIFY `opname_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `stock_transactions`
--
ALTER TABLE `stock_transactions`
  MODIFY `transaction_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_qr_logs`
--
ALTER TABLE `product_qr_logs`
  ADD CONSTRAINT `product_qr_logs_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `stock_opnames`
--
ALTER TABLE `stock_opnames`
  ADD CONSTRAINT `stock_opnames_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_opnames_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `stock_transactions`
--
ALTER TABLE `stock_transactions`
  ADD CONSTRAINT `stock_transactions_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
