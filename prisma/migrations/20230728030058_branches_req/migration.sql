/*
  Warnings:

  - Made the column `ParentId` on table `Children` required. This step will fail if there are existing NULL values in that column.
  - Made the column `CategoryId` on table `Children` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ChildId` on table `Items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `CategoryId` on table `Items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ParentId` on table `Items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `CategoryId` on table `Parents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Children" ALTER COLUMN "ParentId" SET NOT NULL,
ALTER COLUMN "CategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "ChildId" SET NOT NULL,
ALTER COLUMN "CategoryId" SET NOT NULL,
ALTER COLUMN "ParentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Parents" ALTER COLUMN "CategoryId" SET NOT NULL;
