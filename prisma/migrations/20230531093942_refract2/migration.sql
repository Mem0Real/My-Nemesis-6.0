/*
  Warnings:

  - You are about to drop the column `CategoryId` on the `Children` table. All the data in the column will be lost.
  - You are about to drop the column `CategoryId` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `ParentId` on the `Items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_ParentId_fkey";

-- AlterTable
ALTER TABLE "Children" DROP COLUMN "CategoryId";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "CategoryId",
DROP COLUMN "ParentId";
