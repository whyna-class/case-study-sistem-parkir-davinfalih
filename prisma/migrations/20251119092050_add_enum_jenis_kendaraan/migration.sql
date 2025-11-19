/*
  Warnings:

  - The values [roda_2,roda_4] on the enum `parkir_jenis_kendaraan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `parkir` MODIFY `jenis_kendaraan` ENUM('roda2', 'roda4') NOT NULL;
