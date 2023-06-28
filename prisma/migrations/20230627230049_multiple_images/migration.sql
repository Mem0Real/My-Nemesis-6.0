/*
  Warnings:

  - You are about to drop the column `image` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
