-- CreateTable
CREATE TABLE `ApiKey` (
    `id` VARCHAR(45) NOT NULL,
    `apiKey` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attachment` (
    `id` VARCHAR(45) NOT NULL,
    `handle` VARCHAR(45) NULL,
    `attachedTo` VARCHAR(45) NULL,
    `mimetype` VARCHAR(45) NULL,
    `filename` VARCHAR(500) NULL,
    `userId` VARCHAR(45) NULL,
    `url` VARCHAR(500) NULL,
    `weight` SMALLINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` VARCHAR(45) NOT NULL,
    `postId` VARCHAR(45) NULL,
    `title` VARCHAR(200) NULL,
    `body` TEXT NULL,
    `locale` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` VARCHAR(45) NOT NULL,
    `workId` VARCHAR(45) NOT NULL,
    `titleLocal` VARCHAR(200) NULL,
    `titleEn` VARCHAR(200) NULL,
    `weight` SMALLINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distribution` (
    `id` VARCHAR(45) NOT NULL,
    `year` VARCHAR(45) NULL,
    `regionLocal` VARCHAR(100) NULL,
    `regionEn` VARCHAR(100) NULL,
    `workId` VARCHAR(45) NOT NULL,
    `weight` SMALLINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entity` (
    `id` VARCHAR(45) NOT NULL,
    `nameLocal` VARCHAR(500) NULL,
    `nameEn` VARCHAR(500) NULL,
    `slug` VARCHAR(200) NULL,
    `category` VARCHAR(45) NULL,
    `descriptionLocal` TEXT NULL,
    `descriptionEn` TEXT NULL,
    `imdbURL` VARCHAR(500) NULL,
    `officialWebsiteURL` VARCHAR(500) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoodJob` (
    `id` VARCHAR(45) NOT NULL,
    `hasEntityId` VARCHAR(45) NULL,
    `userId` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `id` VARCHAR(45) NOT NULL,
    `action` VARCHAR(45) NULL,
    `target` VARCHAR(45) NULL,
    `userId` VARCHAR(45) NULL,
    `workId` VARCHAR(45) NOT NULL,
    `propertyId` VARCHAR(45) NOT NULL,
    `entityId` VARCHAR(45) NOT NULL,
    `propertyHasEntityId` VARCHAR(45) NOT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fromValue` TEXT NULL,
    `toValue` TEXT NULL,
    `departmentId` VARCHAR(45) NOT NULL,
    `targetId` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `publicAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` VARCHAR(45) NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(45) NOT NULL,
    `keyLocal` VARCHAR(45) NULL,
    `keyEn` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL,
    `departmentId` VARCHAR(45) NOT NULL,
    `weight` SMALLINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyHasEntity` (
    `entityId` VARCHAR(45) NOT NULL,
    `propertyId` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NULL,
    `id` VARCHAR(45) NOT NULL,
    `subtextLocal` VARCHAR(200) NULL,
    `subtextEn` VARCHAR(200) NULL,
    `weight` SMALLINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(45) NOT NULL,
    `nickname` VARCHAR(45) NULL,
    `picture` VARCHAR(500) NULL,
    `subscription` VARCHAR(45) NULL,
    `entityId` VARCHAR(45) NULL,

    UNIQUE INDEX `User_entityId_key`(`entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeightForEntity` (
    `id` VARCHAR(45) NOT NULL,
    `weight` SMALLINT NULL,
    `entityId` VARCHAR(45) NULL,
    `attachedTo` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` VARCHAR(45) NOT NULL,
    `titleEn` VARCHAR(500) NULL,
    `titleLocal` VARCHAR(500) NULL,
    `descriptionLocal` TEXT NULL,
    `formatLocal` VARCHAR(500) NULL,
    `formatEn` VARCHAR(500) NULL,
    `slug` VARCHAR(200) NULL,
    `status` VARCHAR(45) NULL,
    `descriptionEn` TEXT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `videoURL` VARCHAR(500) NULL,
    `officialWebsiteURL` VARCHAR(500) NULL,
    `imdbURL` VARCHAR(500) NULL,
    `category` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distribution` ADD CONSTRAINT `Distribution_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodJob` ADD CONSTRAINT `GoodJob_hasEntityId_fkey` FOREIGN KEY (`hasEntityId`) REFERENCES `PropertyHasEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodJob` ADD CONSTRAINT `GoodJob_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyHasEntity` ADD CONSTRAINT `PropertyHasEntity_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyHasEntity` ADD CONSTRAINT `PropertyHasEntity_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

