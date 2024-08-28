-- AlterTable
ALTER TABLE `user` ADD COLUMN `bookMarkId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_bookMarkId_fkey` FOREIGN KEY (`bookMarkId`) REFERENCES `BookMark`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
