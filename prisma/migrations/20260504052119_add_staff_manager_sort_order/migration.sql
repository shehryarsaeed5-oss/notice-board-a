-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "StaffMember" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Manager_sortOrder_idx" ON "Manager"("sortOrder");

-- CreateIndex
CREATE INDEX "StaffMember_sortOrder_idx" ON "StaffMember"("sortOrder");
