/*
  Warnings:

  - You are about to alter the column `jenis_kendaraan` on the `parkir` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `parkir` MODIFY `jenis_kendaraan` ENUM('roda_2', 'roda_4') NOT NULL;
