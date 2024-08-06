-- AlterTable
ALTER TABLE "InteractiveVideo" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "InteractiveVideo" ADD CONSTRAINT "InteractiveVideo_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "InteractiveVideo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
