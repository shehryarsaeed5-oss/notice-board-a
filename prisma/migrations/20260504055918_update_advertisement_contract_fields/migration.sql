-- AlterTable
ALTER TABLE "Advertisement" ADD COLUMN     "adLocation" TEXT,
ADD COLUMN     "contactPerson" TEXT,
ADD COLUMN     "contractAmount" DOUBLE PRECISION,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "remarks" TEXT,
ALTER COLUMN "mediaUrl" DROP NOT NULL,
ALTER COLUMN "mediaType" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Advertisement_status_idx" ON "Advertisement"("status");

-- CreateIndex
CREATE INDEX "Advertisement_title_idx" ON "Advertisement"("title");

-- CreateIndex
CREATE INDEX "Advertisement_contactPerson_idx" ON "Advertisement"("contactPerson");

-- CreateIndex
CREATE INDEX "Advertisement_phone_idx" ON "Advertisement"("phone");

-- CreateIndex
CREATE INDEX "Advertisement_adLocation_idx" ON "Advertisement"("adLocation");

-- CreateIndex
CREATE INDEX "Advertisement_startAt_idx" ON "Advertisement"("startAt");

-- CreateIndex
CREATE INDEX "Advertisement_endAt_idx" ON "Advertisement"("endAt");
