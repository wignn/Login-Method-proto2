/*
  Warnings:

  - You are about to drop the column `bookName` on the `chapter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `chapter` DROP FOREIGN KEY `Chapter_bookName_fkey`;

-- DropIndex
DROP INDEX `Book_title_key` ON `book`;

-- DropIndex
DROP INDEX `Chapter_bookId_fkey` ON `chapter`;

-- AlterTable
ALTER TABLE `chapter` DROP COLUMN `bookName`;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
