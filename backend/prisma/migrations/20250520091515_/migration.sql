-- CreateTable
CREATE TABLE `CarEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plateNumber` VARCHAR(191) NOT NULL,
    `parkingCode` VARCHAR(191) NOT NULL,
    `entryDateTime` DATETIME(3) NOT NULL,
    `exitDateTime` DATETIME(3) NULL,
    `chargedAmount` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
