/*
  Warnings:

  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `avatarUrl` VARCHAR(255) NULL,
    ADD COLUMN `birthdate` DATETIME(3) NULL,
    ADD COLUMN `coverPhoto` VARCHAR(255) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `location` VARCHAR(100) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `website` VARCHAR(255) NULL,
    MODIFY `bio` TEXT NOT NULL;
