-- CreateTable
CREATE TABLE "ConcessionPriceItem" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "category" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConcessionPriceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConcessionPriceItem_status_idx" ON "ConcessionPriceItem"("status");

-- CreateIndex
CREATE INDEX "ConcessionPriceItem_category_idx" ON "ConcessionPriceItem"("category");

-- CreateIndex
CREATE INDEX "ConcessionPriceItem_sortOrder_idx" ON "ConcessionPriceItem"("sortOrder");
