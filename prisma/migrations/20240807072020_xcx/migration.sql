/*
  Warnings:

  - You are about to alter the column `image` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL;
