-- CreateTable
CREATE TABLE `Parking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `totalSpaces` INTEGER NOT NULL,
    `availableSpaces` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `feePerHour` DOUBLE NOT NULL,

    UNIQUE INDEX `Parking_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
