'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { StaffMemberFormSheetTrigger } from './staff-member-form-sheet';
import { StaffImportDialogTrigger } from './staff-import-dialog';
import { buildStaffImportTemplateCsv } from '../lib/staff-import';

function downloadStaffImportTemplate() {
  const csv = buildStaffImportTemplateCsv();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'staff-import-template.csv';
  anchor.rel = 'noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function StaffRecordsPageActions() {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <StaffMemberFormSheetTrigger />
      <Button type='button' variant='outline' onClick={downloadStaffImportTemplate}>
        <Icons.fileTypeXls className='mr-2 size-4' />
        Download CSV Template
      </Button>
      <StaffImportDialogTrigger />
    </div>
  );
}
