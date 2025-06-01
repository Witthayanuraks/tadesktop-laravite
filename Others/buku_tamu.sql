-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 09 Bulan Mei 2025 pada 11.44
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buku_tamu`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `janji_temu`
--

CREATE TABLE `janji_temu` (
  `id_janji_temu` int NOT NULL,
  `id_tamu` int NOT NULL,
  `id_pengguna` int NOT NULL,
  `tanggal_kunjungan` datetime NOT NULL,
  `keperluan` varchar(100) NOT NULL,
  `status` enum('Belum','Menunggu','Sedang berlangsung','Selesai') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `janji_temu`
--

INSERT INTO `janji_temu` (`id_janji_temu`, `id_tamu`, `id_pengguna`, `tanggal_kunjungan`, `keperluan`, `status`) VALUES
(1021, 1234, 21937, '2025-05-01 10:23:18', 'Bertemu Bu Dian', 'Sedang berlangsung'),
(1827, 4321, 21937, '2025-05-31 08:23:18', 'Rapat Dengan Guru Rpl', 'Menunggu');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Penerima Tamu','Guru') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama`, `email`, `password`, `role`) VALUES
(6432, 'Petugas 1', 'haloPetugas1@gmail.com', 'sayaPetugas1', 'Penerima Tamu'),
(21937, 'Alifah Diantebes', 'AlifahDiantebes@gmail.com', 'rplDone', 'Guru');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tamu`
--

CREATE TABLE `tamu` (
  `id_tamu` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `instansi` varchar(50) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `tanggal_kunjungan` datetime NOT NULL,
  `kode_qr` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tamu`
--

INSERT INTO `tamu` (`id_tamu`, `nama`, `instansi`, `telepon`, `password`, `tanggal_kunjungan`, `kode_qr`) VALUES
(1234, 'Joko santoso', 'SMKN 8 Malang', '08123456789', 'helloworld123', '2025-05-01 00:00:00', 'Hjqwe45j'),
(4321, 'Maulidya ', 'SMA 9 Malang', '0897654321', 'iniSaya98oke', '2025-05-31 00:00:00', 'KyGKJ9127');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `janji_temu`
--
ALTER TABLE `janji_temu`
  ADD PRIMARY KEY (`id_janji_temu`),
  ADD KEY `id_guru` (`id_pengguna`),
  ADD KEY `id_tamu` (`id_tamu`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`);

--
-- Indeks untuk tabel `tamu`
--
ALTER TABLE `tamu`
  ADD PRIMARY KEY (`id_tamu`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `janji_temu`
--
ALTER TABLE `janji_temu`
  MODIFY `id_janji_temu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1828;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21938;

--
-- AUTO_INCREMENT untuk tabel `tamu`
--
ALTER TABLE `tamu`
  MODIFY `id_tamu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4322;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `janji_temu`
--
ALTER TABLE `janji_temu`
  ADD CONSTRAINT `janji_temu_ibfk_1` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `janji_temu_ibfk_2` FOREIGN KEY (`id_tamu`) REFERENCES `tamu` (`id_tamu`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
