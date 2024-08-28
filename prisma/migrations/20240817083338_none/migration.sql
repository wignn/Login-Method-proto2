/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookName` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chapter` DROP FOREIGN KEY `Chapter_bookId_fkey`;

-- AlterTable
ALTER TABLE `chapter` ADD COLUMN `bookName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Book_title_key` ON `Book`(`title`);

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_bookName_fkey` FOREIGN KEY (`bookName`) REFERENCES `Book`(`title`) ON DELETE RESTRICT ON UPDATE CASCADE;
