/*
  Warnings:

  - You are about to drop the column `images` on the `Items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_ParentId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_ChildId_fkey";

-- DropForeignKey
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_CategoryId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "images",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_ChildId_fkey" FOREIGN KEY ("ChildId") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
