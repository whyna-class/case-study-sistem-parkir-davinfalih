-- CreateTable
CREATE TABLE `parkir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plat_nomor` VARCHAR(20) NOT NULL,
    `jenis_kendaraan` VARCHAR(10) NOT NULL,
    `durasi` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
