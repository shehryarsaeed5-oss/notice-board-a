import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import { importStaffMembers } from '@/features/staff-records/api/service';
import { prepareStaffImportRows } from '@/features/staff-records/lib/staff-import';

const MAX_CSV_BYTES = 1_000_000;

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/staff-records/import', request.method);
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

  const prepared = prepareStaffImportRows(csvText);

  if (prepared.headerErrors.length > 0) {
    return NextResponse.json(
      {
        message: 'Invalid staff CSV',
        issues: prepared.headerErrors
      },
      { status: 400 }
    );
  }

  const importResult = await importStaffMembers(prepared.validRows);
  const failedCount = prepared.invalidCount + importResult.failedCount;

  revalidatePath('/dashboard/staff-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({
    importedCount: importResult.importedCount,
    skippedCount: importResult.skippedCount,
    failedCount
  });
}
