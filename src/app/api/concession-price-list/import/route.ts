import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import { importConcessionPriceItems } from '@/features/concession-price-list/api/service';
import {
  getConcessionImportRowErrors,
  prepareConcessionImportRows
} from '@/features/concession-price-list/lib/concession-import';

const MAX_CSV_BYTES = 1_000_000;

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/concession-price-list/import', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = (await request.json().catch(() => null)) as { csvText?: unknown } | null;
  const csvText = typeof body?.csvText === 'string' ? body.csvText : '';

  if (!csvText.trim()) {
    return NextResponse.json({ message: 'CSV content is required' }, { status: 400 });
  }

  if (Buffer.byteLength(csvText, 'utf8') > MAX_CSV_BYTES) {
    return NextResponse.json({ message: 'CSV file must be 1MB or smaller' }, { status: 413 });
  }

  const prepared = prepareConcessionImportRows(csvText);

  if (prepared.headerErrors.length > 0) {
    return NextResponse.json(
      {
        message: 'Invalid concession price CSV',
        issues: prepared.headerErrors
      },
      { status: 400 }
    );
  }

  const importResult = await importConcessionPriceItems(prepared.readyRows);
  const failedCount = prepared.invalidCount + importResult.failedCount;
  const skippedCount = prepared.duplicateCount + importResult.skippedCount;
  const rowErrors = getConcessionImportRowErrors(prepared.rows);

  revalidatePath('/dashboard/concession-price-list');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({
    importedCount: importResult.importedCount,
    skippedCount,
    failedCount,
    rowErrors
  });
}
