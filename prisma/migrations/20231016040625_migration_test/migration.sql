/*
  Warnings:

  - You are about to drop the column `publicAt` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_entityId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `publicAt`,
    ADD COLUMN `publicOn` DATE NULL;
