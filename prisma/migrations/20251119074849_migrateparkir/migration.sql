-- AlterTable
ALTER TABLE `parkir` MODIFY `plat_nomor` VARCHAR(50) NOT NULL,
    MODIFY `jenis_kendaraan` VARCHAR(191) NOT NULL,
    ALTER COLUMN `durasi` DROP DEFAULT,
    ALTER COLUMN `total` DROP DEFAULT;
