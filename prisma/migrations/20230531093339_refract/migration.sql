/*
  Warnings:

  - The primary key for the `Categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shortName` on the `Categories` table. All the data in the column will be lost.
  - The primary key for the `Children` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shortName` on the `Children` table. All the data in the column will be lost.
  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shortName` on the `Items` table. All the data in the column will be lost.
  - The primary key for the `Parents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shortName` on the `Parents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_ParentId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_ChildId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_ParentId_fkey";

-- DropForeignKey
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_CategoryId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_pkey",
DROP COLUMN "shortName",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Categories_id_seq";

-- AlterTable
ALTER TABLE "Children" DROP CONSTRAINT "Children_pkey",
DROP COLUMN "shortName",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "CategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "ParentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Children_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Children_id_seq";

-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
DROP COLUMN "shortName",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "CategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "ParentId" SET DATA TYPE TEXT,
ALTER COLUMN "ChildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Items_id_seq";

-- AlterTable
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_pkey",
DROP COLUMN "shortName",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "CategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Parents_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Parents_id_seq";

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_ChildId_fkey" FOREIGN KEY ("ChildId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
