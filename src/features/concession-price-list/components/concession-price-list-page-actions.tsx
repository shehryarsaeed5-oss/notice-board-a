'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { ConcessionPriceItemFormSheetTrigger } from './concession-price-list-form-sheet';
import { ConcessionPriceImportDialogTrigger } from './concession-price-list-import-dialog';
import { buildConcessionImportTemplateCsv } from '../lib/concession-import';

function downloadConcessionImportTemplate() {
  const csv = buildConcessionImportTemplateCsv();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'concession-price-import-template.csv';
  anchor.rel = 'noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ConcessionPriceListPageActions() {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <ConcessionPriceItemFormSheetTrigger />
      <Button type='button' variant='outline' onClick={downloadConcessionImportTemplate}>
        <Icons.fileTypeXls className='mr-2 size-4' />
        Download CSV Template
      </Button>
      <ConcessionPriceImportDialogTrigger />
    </div>
  );
}
