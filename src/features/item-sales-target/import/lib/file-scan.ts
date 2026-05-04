import 'server-only';

import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

export interface ItemSalesImportFileCandidate {
  filePath: string;
  fileName: string;
  mtimeMs: number;
  preferred: boolean;
}

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? '';
}

function isExcelFileName(fileName: string) {
  return /\.(xls|xlsx)$/i.test(fileName.trim());
}

function isSignatureSalesFile(fileName: string) {
  return /_SignatureSales\.(xls|xlsx)$/i.test(fileName.trim());
}

export function getItemSalesBusinessFolderName(businessDateKey: string) {
  return normalizeText(businessDateKey).replace(/-/g, '');
}

export function getItemSalesBusinessFolderPath(rootFolderPath: string, businessDateKey: string) {
  const root = normalizeText(rootFolderPath);
  const folder = getItemSalesBusinessFolderName(businessDateKey);

  if (!root || !folder) {
    return '';
  }

  return join(root, folder);
}

export async function getLatestItemSalesImportFile(
  folderPath: string
): Promise<ItemSalesImportFileCandidate | null> {
  const entries = await readdir(folderPath, { withFileTypes: true });

  const candidates = await Promise.all(
    entries.map(async (entry) => {
      if (!entry.isFile() || !isExcelFileName(entry.name)) {
        return null;
      }

      const filePath = join(folderPath, entry.name);
      const stats = await stat(filePath);

      return {
        filePath,
        fileName: entry.name,
        mtimeMs: stats.mtimeMs,
        preferred: isSignatureSalesFile(entry.name)
      } satisfies ItemSalesImportFileCandidate;
    })
  );

  const validCandidates = candidates.filter(
    (candidate): candidate is ItemSalesImportFileCandidate => candidate !== null
  );
  const preferred = validCandidates.filter((candidate) => candidate.preferred);
  const selected = preferred.length > 0 ? preferred : validCandidates;

  return (
    selected.sort(
      (left, right) => right.mtimeMs - left.mtimeMs || left.fileName.localeCompare(right.fileName)
    )[0] ?? null
  );
}

export async function readItemSalesImportFileBuffer(filePath: string) {
  return readFile(filePath);
}

export async function computeItemSalesFileHash(fileBuffer: Buffer) {
  return createHash('sha256').update(fileBuffer).digest('hex');
}
