-- AlterTable
ALTER TABLE "ItemSalesTarget" ADD COLUMN     "calculationMode" TEXT,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "itemCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "startDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ItemSalesImportSetting" (
    "id" TEXT NOT NULL,
    "sharedFolderPath" TEXT,
    "autoImportEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lastScanAt" TIMESTAMP(3),
    "lastImportAt" TIMESTAMP(3),
    "lastImportStatus" TEXT,
    "lastImportMessage" TEXT,
    "lastImportCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemSalesImportSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSalesImportBatch" (
    "id" TEXT NOT NULL,
    "sourceFilename" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "businessDateKey" TEXT NOT NULL,
    "fileHash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "rowCount" INTEGER NOT NULL DEFAULT 0,
    "rawMetadata" JSONB,
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemSalesImportBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSalesImportRow" (
    "id" TEXT NOT NULL,
    "importBatchId" TEXT NOT NULL,
    "businessDateKey" TEXT NOT NULL,
    "itemCode" TEXT,
    "itemName" TEXT NOT NULL,
    "categoryName" TEXT,
    "uom" TEXT,
    "quantitySold" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amountPaid" DOUBLE PRECISION,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemSalesImportRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemSalesImportBatch_fileHash_key" ON "ItemSalesImportBatch"("fileHash");

-- CreateIndex
CREATE INDEX "ItemSalesImportBatch_businessDateKey_idx" ON "ItemSalesImportBatch"("businessDateKey");

-- CreateIndex
CREATE INDEX "ItemSalesImportBatch_reportDate_idx" ON "ItemSalesImportBatch"("reportDate");

-- CreateIndex
CREATE INDEX "ItemSalesImportBatch_status_idx" ON "ItemSalesImportBatch"("status");

-- CreateIndex
CREATE INDEX "ItemSalesImportBatch_rowCount_idx" ON "ItemSalesImportBatch"("rowCount");

-- CreateIndex
CREATE INDEX "ItemSalesImportRow_businessDateKey_idx" ON "ItemSalesImportRow"("businessDateKey");

-- CreateIndex
CREATE INDEX "ItemSalesImportRow_itemCode_idx" ON "ItemSalesImportRow"("itemCode");

-- CreateIndex
CREATE INDEX "ItemSalesImportRow_itemName_idx" ON "ItemSalesImportRow"("itemName");

-- CreateIndex
CREATE INDEX "ItemSalesImportRow_importBatchId_idx" ON "ItemSalesImportRow"("importBatchId");

-- CreateIndex
CREATE INDEX "ItemSalesTarget_displayOrder_idx" ON "ItemSalesTarget"("displayOrder");

-- CreateIndex
CREATE INDEX "ItemSalesTarget_itemName_idx" ON "ItemSalesTarget"("itemName");

-- CreateIndex
CREATE INDEX "ItemSalesTarget_itemCode_idx" ON "ItemSalesTarget"("itemCode");

-- CreateIndex
CREATE INDEX "ItemSalesTarget_status_idx" ON "ItemSalesTarget"("status");

-- AddForeignKey
ALTER TABLE "ItemSalesImportRow" ADD CONSTRAINT "ItemSalesImportRow_importBatchId_fkey" FOREIGN KEY ("importBatchId") REFERENCES "ItemSalesImportBatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
