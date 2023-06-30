/*
  Warnings:

  - Added the required column `customerid` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
