/*
  Warnings:

  - You are about to alter the column `authorId` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `avatarUrl` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `coverPhoto` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `profile` table. All the data in the column will be lost.
  - You are about to alter the column `userId` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `post` MODIFY `authorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `avatarUrl`,
    DROP COLUMN `birthdate`,
    DROP COLUMN `coverPhoto`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `location`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `website`,
    ADD COLUMN `image` LONGBLOB NULL,
    MODIFY `bio` VARCHAR(191) NOT NULL,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `profilePicture` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Article` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
