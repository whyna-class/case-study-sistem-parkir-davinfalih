# 🚘 Parking Management API — NestJS x Prisma x MySQL

API ini dirancang untuk mengelola aktivitas parkir kendaraan secara efisien. Mulai dari mencatat kendaraan masuk, menghitung tarif otomatis, mencari data berdasarkan filter tertentu, hingga merekap total pemasukan parkiran.

---
## ⭐ Fitur yang Tersedia

* CRUD data parkir (Create, Read, Update, Delete)
* Perhitungan tarif otomatis berdasarkan lama parkir
* Pencarian data menggunakan search, filter, dan pagination
* Rekap total pendapatan parkiran
* Terintegrasi dengan NestJS, Prisma ORM, dan MySQL

---
## 🛠️ Teknologi yang Digunakan

* **NestJS** — Framework backend modular & scalable
* **Prisma ORM** — Query database cepat & type-safe
* **MySQL** — Penyimpanan data
* **Postman** — Testing endpoint API

---
# 🧩 Struktur Data (Schema Prisma)

```prisma
model Parkir {
  id              Int              @id @default(autoincrement())
  plat_nomor      String
  jenis_kendaraan JenisKendaraan
  durasi          Int
  totalTarif      Int
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum JenisKendaraan {
  roda2
  roda4
}
```
# 📡 Endpoint API

🔵 1. Tambah Data Parkir

POST /parkir

Menambahkan data parkir baru, sekaligus menghitung tarif otomatis.

🟢 2. Ambil Semua Data Parkir

GET /parkir

Mendukung:

Search plat nomor

Filter jenis kendaraan

Pagination (page & limit)

🟡 3. Ambil Data Berdasarkan ID

GET /parkir/:id

Menampilkan detail satu data parkiran.

4. Update Data Parkir

PATCH /parkir/:id

Memperbarui data tertentu dan menghitung ulang total tarif jika durasi berubah.

🔴 5. Hapus Data Parkir

DELETE /parkir/:id

Menghapus data berdasarkan ID.

🟣 6. Ambil Total Pendapatan

GET /parkir/total/pendapatan

Menjumlahkan seluruh tarif parkir yang telah masuk.

🟩 Ringkasan Akhir

API ini cocok untuk belajar backend modern menggunakan:

NestJS sebagai arsitektur modular,

Prisma ORM untuk akses database elegan dan aman,

MySQL sebagai penyimpanan data.

Fitur CRUD, tarif otomatis, pencarian, filtering, pagination, dan laporan pendapatan membuat API ini cukup lengkap untuk project sederhana maupun pengembangan lanjut.