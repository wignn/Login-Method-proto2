/*
  Warnings:

  - You are about to drop the column `userId` on the `article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `Article_userId_fkey`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
