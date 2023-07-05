-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false;
