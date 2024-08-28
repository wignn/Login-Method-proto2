-- AlterTable
ALTER TABLE `book` ADD COLUMN `bookMarkId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `BookMark` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_bookMarkId_fkey` FOREIGN KEY (`bookMarkId`) REFERENCES `BookMark`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
