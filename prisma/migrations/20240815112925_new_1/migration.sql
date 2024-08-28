/*
  Warnings:

  - You are about to drop the column `bookMarkId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `Author` on the `bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `BookId` on the `bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `bookMarkId` on the `user` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `BookMark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BookMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_bookMarkId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_bookMarkId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `bookMarkId`;

-- AlterTable
ALTER TABLE `bookmark` DROP COLUMN `Author`,
    DROP COLUMN `BookId`,
    ADD COLUMN `bookId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bookMarkId`;

-- AddForeignKey
ALTER TABLE `BookMark` ADD CONSTRAINT `BookMark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookMark` ADD CONSTRAINT `BookMark_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
