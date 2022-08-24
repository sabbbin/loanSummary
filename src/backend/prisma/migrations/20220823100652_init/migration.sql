-- CreateTable
CREATE TABLE `LoanSummary` (
    `SDName` VARCHAR(15) NULL,
    `PName` VARCHAR(20) NULL,
    `Accno` VARCHAR(19) NULL,
    `Aname` VARCHAR(24) NULL,
    `O_Prin` INTEGER NULL,
    `PrinDr` DECIMAL(9, 2) NULL,
    `PrinCr` DECIMAL(9, 2) NULL,
    `C_Prin` DECIMAL(9, 2) NULL,
    `O_Other` INTEGER NULL,
    `OtherDr` INTEGER NULL,
    `OtherCr` INTEGER NULL,
    `C_Other` INTEGER NULL,
    `O_IntOut` INTEGER NULL,
    `CCalcInt` DECIMAL(8, 2) NULL,
    `IntPd` DECIMAL(8, 2) NULL,
    `LastYrIntPd` INTEGER NULL,
    `ThisYrIntPd` DECIMAL(8, 2) NULL,
    `C_IntOut` DECIMAL(20, 14) NULL,
    `O_PenaltyOut` INTEGER NULL,
    `CCalcPenalty` DECIMAL(18, 13) NULL,
    `PenaltyPd` DECIMAL(7, 2) NULL,
    `C_PenaltyOut` DECIMAL(22, 18) NULL,
    `IntRebate` DECIMAL(6, 2) NULL,
    `PenaltyRebate` DECIMAL(6, 2) NULL,
    `TotAmtPd` DECIMAL(9, 2) NULL,
    `ReportDate` DATETIME(0) NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;