CREATE TABLE pengguna (
  id_pengguna SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('admin','operator','guru'))
  -- role VARCHAR(20) CHECK (role IN ('Admin','Penerima Tamu','Guru'))
);

CREATE TABLE tamu (
  id_tamu SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  instansi VARCHAR(50) NOT NULL,
  telepon VARCHAR(20) NOT NULL,
  password VARCHAR(50) NOT NULL,
  tanggal_kunjungan TIMESTAMP NOT NULL,
  kode_qr VARCHAR(50) NOT NULL
);

CREATE TABLE janji_temu (
  id_janji_temu SERIAL PRIMARY KEY,
  id_tamu INT NOT NULL,
  id_pengguna INT NOT NULL,
  tanggal_kunjungan TIMESTAMP NOT NULL,
  keperluan VARCHAR(100) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Belum','Menunggu','Sedang berlangsung','Selesai')),
  FOREIGN KEY (id_pengguna) REFERENCES pengguna(id_pengguna) ON DELETE RESTRICT ON UPDATE RESTRICT,
  FOREIGN KEY (id_tamu) REFERENCES tamu(id_tamu) ON DELETE RESTRICT ON UPDATE RESTRICT
);