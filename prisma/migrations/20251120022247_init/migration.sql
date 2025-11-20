-- CreateTable
CREATE TABLE `Parkir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plat_nomor` VARCHAR(191) NOT NULL,
    `jenis_kendaraan` ENUM('roda2', 'roda4') NOT NULL,
    `durasi` INTEGER NOT NULL,
    `total_biaya` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Parkir_plat_nomor_key`(`plat_nomor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
