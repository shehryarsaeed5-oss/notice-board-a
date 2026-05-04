-- CreateTable
CREATE TABLE "MovieScheduleSyncSetting" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "sourceType" TEXT NOT NULL DEFAULT 'digital_signage_api',
    "apiUrl" TEXT,
    "apiToken" TEXT,
    "lastSyncAt" TIMESTAMP(3),
    "lastSyncStatus" TEXT,
    "lastSyncMessage" TEXT,
    "lastSyncCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieScheduleSyncSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieScheduleSyncedRow" (
    "id" TEXT NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "movieName" TEXT NOT NULL,
    "normalizedMovieName" TEXT,
    "screenName" TEXT NOT NULL,
    "showDate" TEXT NOT NULL,
    "showTime" TEXT NOT NULL,
    "showDateTime" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "syncBatchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieScheduleSyncedRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieScheduleSyncLog" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "rowCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieScheduleSyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieScheduleSyncedRow_sourceKey_key" ON "MovieScheduleSyncedRow"("sourceKey");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncedRow_showDate_idx" ON "MovieScheduleSyncedRow"("showDate");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncedRow_showDateTime_idx" ON "MovieScheduleSyncedRow"("showDateTime");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncedRow_isActive_idx" ON "MovieScheduleSyncedRow"("isActive");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncedRow_movieName_idx" ON "MovieScheduleSyncedRow"("movieName");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncedRow_screenName_idx" ON "MovieScheduleSyncedRow"("screenName");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncedRow_syncBatchId_idx" ON "MovieScheduleSyncedRow"("syncBatchId");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncLog_status_idx" ON "MovieScheduleSyncLog"("status");

-- CreateIndex
CREATE INDEX "MovieScheduleSyncLog_startedAt_idx" ON "MovieScheduleSyncLog"("startedAt");
