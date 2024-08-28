/*
  Warnings:

  - You are about to drop the column `author` on the `article` table. All the data in the column will be lost.
  - Added the required column `BookId` to the `BookMark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `author`,
    ADD COLUMN `authorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `bookmark` ADD COLUMN `BookId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
