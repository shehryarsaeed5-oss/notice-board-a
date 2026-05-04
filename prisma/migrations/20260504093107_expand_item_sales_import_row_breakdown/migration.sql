-- AlterTable
ALTER TABLE "ItemSalesImportRow" ADD COLUMN     "costValue" DOUBLE PRECISION,
ADD COLUMN     "discountAmount" DOUBLE PRECISION,
ADD COLUMN     "focQty" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "marginValue" DOUBLE PRECISION,
ADD COLUMN     "netValue" DOUBLE PRECISION,
ADD COLUMN     "paidAmount" DOUBLE PRECISION,
ADD COLUMN     "paidQty" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "percentTotalSales" DOUBLE PRECISION,
ADD COLUMN     "salesValue" DOUBLE PRECISION,
ADD COLUMN     "taxValue" DOUBLE PRECISION,
ADD COLUMN     "totalQty" DOUBLE PRECISION NOT NULL DEFAULT 0;

UPDATE "ItemSalesImportRow"
SET
  "totalQty" = COALESCE("quantitySold", 0),
  "paidQty" = COALESCE("quantitySold", 0),
  "focQty" = 0,
  "paidAmount" = COALESCE("amountPaid", "paidAmount")
WHERE
  "totalQty" = 0
  AND "paidQty" = 0
  AND "focQty" = 0;
