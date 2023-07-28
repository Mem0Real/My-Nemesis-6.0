-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "CategoryId" TEXT,
ALTER COLUMN "ParentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "CategoryId" TEXT,
ADD COLUMN     "ParentId" TEXT,
ALTER COLUMN "ChildId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parents" ALTER COLUMN "CategoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
