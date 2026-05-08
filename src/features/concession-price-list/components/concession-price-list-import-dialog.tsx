'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { importConcessionPriceItemsCsv } from '../api/client';
import {
  buildConcessionImportTemplateCsv,
  prepareConcessionImportRows,
  type ConcessionImportPreparedResult,
  type ConcessionImportPreviewRow
} from '../lib/concession-import';

const MAX_CSV_BYTES = 1_000_000;

function createEmptyPreview(): ConcessionImportPreparedResult {
  return {
    rows: [],
    readyRows: [],
    totalRows: 0,
    validCount: 0,
    invalidCount: 0,
    duplicateCount: 0,
    emptyCount: 0,
    headerErrors: []
  };
}

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

function formatPrice(value: number) {
  return `Rs. ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 2
  }).format(value)}`;
}

function getValidationBadgeClass(state: 'ready' | 'warning' | 'error') {
  switch (state) {
    case 'ready':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
    case 'warning':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300';
    case 'error':
    default:
      return 'border-destructive/30 bg-destructive/10 text-destructive';
  }
}

interface ConcessionImportPreviewTableRowProps {
  row: ConcessionImportPreviewRow;
}

function ConcessionImportPreviewTableRow({ row }: ConcessionImportPreviewTableRowProps) {
  const validationState =
    row.validationMessages.length > 0 ? 'error' : row.isDuplicate ? 'warning' : 'ready';

  return (
    <TableRow>
      <TableCell className='whitespace-nowrap'>{row.rowNumber}</TableCell>
      <TableCell className='font-medium'>{row.itemName}</TableCell>
      <TableCell>{row.category ?? '—'}</TableCell>
      <TableCell className='whitespace-nowrap'>{formatPrice(row.price)}</TableCell>
      <TableCell className='whitespace-nowrap'>{row.sortOrder}</TableCell>
      <TableCell>
        <Badge variant='outline' className='border-border/60 bg-muted/30'>
          {row.status}
        </Badge>
      </TableCell>
      <TableCell>
        <span className={cn('text-xs font-medium', getValidationBadgeClass(validationState))}>
          {row.validationMessages.length > 0
            ? row.validationMessages.join(' • ')
            : row.isDuplicate
              ? 'Duplicate row - will be skipped'
              : 'Ready'}
        </span>
      </TableCell>
    </TableRow>
  );
}

export function ConcessionPriceImportDialogTrigger() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ConcessionImportPreparedResult>(() =>
    createEmptyPreview()
  );

  const importMutation = useMutation({
    mutationFn: () => importConcessionPriceItemsCsv({ csvText }),
    onSuccess: (result) => {
      const message = `Imported ${result.importedCount} concession items. Skipped ${result.skippedCount} duplicates. Failed ${result.failedCount} rows.`;
      toast.success(message);

      router.refresh();
      resetState();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to import concession CSV');
    }
  });

  const hasValidationErrors = useMemo(
    () =>
      preview.rows.some((row) => row.validationMessages.length > 0) ||
      preview.headerErrors.length > 0,
    [preview]
  );

  const canImport = Boolean(
    csvText &&
    preview.readyRows.length > 0 &&
    !hasValidationErrors &&
    !isParsing &&
    !importMutation.isPending
  );

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open]);

  function resetState() {
    setCsvText('');
    setFileName('');
    setIsParsing(false);
    setParseError(null);
    setPreview(createEmptyPreview());
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      const message = 'Please select a CSV file.';
      setCsvText('');
      setFileName('');
      setPreview(createEmptyPreview());
      setParseError(message);
      toast.error(message);
      event.currentTarget.value = '';
      return;
    }

    if (file.size > MAX_CSV_BYTES) {
      const message = 'CSV file must be 1MB or smaller.';
      setCsvText('');
      setFileName('');
      setPreview(createEmptyPreview());
      setParseError(message);
      toast.error(message);
      event.currentTarget.value = '';
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setCsvText('');
    setFileName('');
    setPreview(createEmptyPreview());

    try {
      const text = await file.text();
      const prepared = prepareConcessionImportRows(text);
      setCsvText(text);
      setFileName(file.name);
      setPreview(prepared);

      if (prepared.headerErrors.length > 0) {
        setParseError(prepared.headerErrors.join(' '));
      } else if (prepared.rows.length === 0) {
        setParseError('CSV must contain at least one concession price row.');
      }
    } catch (error) {
      setParseError(error instanceof Error ? error.message : 'Failed to read CSV file');
      toast.error('Failed to read CSV file');
      event.currentTarget.value = '';
    } finally {
      setIsParsing(false);
    }
  }

  async function handleImport() {
    if (!canImport) {
      toast.error('Fix the CSV errors before importing.');
      return;
    }

    await importMutation.mutateAsync();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type='button' variant='outline' onClick={() => setOpen(true)}>
        <Icons.upload className='mr-2 size-4' />
        Import CSV
      </Button>
      <DialogContent className='sm:max-w-6xl'>
        <DialogHeader>
          <DialogTitle>Import Concession Items from CSV</DialogTitle>
          <DialogDescription>
            Download the template first, fill in concession item details, then upload the completed
            CSV to preview and import records.
          </DialogDescription>
        </DialogHeader>

        <div className='flex max-h-[78vh] flex-col gap-4 overflow-hidden'>
          <div className='grid gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 md:grid-cols-3'>
            <div className='space-y-1'>
              <div className='text-sm font-medium text-foreground'>Instructions</div>
              <p className='text-xs leading-5 text-muted-foreground'>
                Use the CSV template, keep the header row intact, and upload a file under 1 MB.
              </p>
            </div>
            <div className='space-y-1'>
              <div className='text-sm font-medium text-foreground'>Template note</div>
              <p className='text-xs leading-5 text-muted-foreground'>
                Required columns: itemName, price. Category, sortOrder, and status are optional.
              </p>
            </div>
            <div className='space-y-2'>
              <div className='flex flex-wrap gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={downloadConcessionImportTemplate}
                >
                  <Icons.fileTypeXls className='mr-2 size-4' />
                  Download Template
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isParsing || importMutation.isPending}
                >
                  <Icons.upload className='mr-2 size-4' />
                  Choose CSV
                </Button>
              </div>
              <p className='text-xs text-muted-foreground'>
                {fileName ? `Selected file: ${fileName}` : 'No CSV selected yet.'}
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type='file'
            accept='.csv,text/csv'
            className='hidden'
            onChange={handleFileChange}
          />

          {parseError ? (
            <div className='rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive'>
              {parseError}
            </div>
          ) : null}

          <div className='grid gap-3 md:grid-cols-4'>
            <div className='rounded-xl border border-border/60 bg-card px-4 py-3'>
              <div className='text-xs uppercase tracking-[0.08em] text-muted-foreground'>
                Parsed Rows
              </div>
              <div className='mt-1 text-2xl font-semibold text-foreground'>{preview.totalRows}</div>
            </div>
            <div className='rounded-xl border border-border/60 bg-card px-4 py-3'>
              <div className='text-xs uppercase tracking-[0.08em] text-muted-foreground'>
                Valid Rows
              </div>
              <div className='mt-1 text-2xl font-semibold text-foreground'>
                {preview.validCount}
              </div>
            </div>
            <div className='rounded-xl border border-border/60 bg-card px-4 py-3'>
              <div className='text-xs uppercase tracking-[0.08em] text-muted-foreground'>
                Invalid Rows
              </div>
              <div className='mt-1 text-2xl font-semibold text-destructive'>
                {preview.invalidCount}
              </div>
            </div>
            <div className='rounded-xl border border-border/60 bg-card px-4 py-3'>
              <div className='text-xs uppercase tracking-[0.08em] text-muted-foreground'>
                Ready to Import
              </div>
              <div className='mt-1 text-2xl font-semibold text-foreground'>
                {preview.readyRows.length > 0 && !hasValidationErrors ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className='flex min-h-0 flex-1 flex-col rounded-xl border border-border/60 bg-card shadow-sm'>
            <div className='flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3'>
              <div>
                <div className='text-sm font-medium text-foreground'>Preview</div>
                <p className='text-xs text-muted-foreground'>
                  Review every row before importing. Rows with validation issues are blocked.
                </p>
              </div>
              <Badge
                variant='outline'
                className={cn(
                  'border-border/60',
                  hasValidationErrors
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                )}
              >
                {hasValidationErrors ? 'Needs attention' : 'Ready'}
              </Badge>
            </div>

            <ScrollArea className='min-h-0 flex-1'>
              <div className='min-w-[1024px]'>
                <Table>
                  <TableHeader className='sticky top-0 z-10 bg-muted/50'>
                    <TableRow>
                      <TableHead className='w-16'>Row</TableHead>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className='w-28'>Price</TableHead>
                      <TableHead className='w-28'>Sort Order</TableHead>
                      <TableHead className='w-24'>Status</TableHead>
                      <TableHead>Validation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className='text-muted-foreground h-28 text-center'>
                          Upload a CSV file to preview imported concession rows.
                        </TableCell>
                      </TableRow>
                    ) : (
                      preview.rows.map((row) => (
                        <ConcessionImportPreviewTableRow
                          key={`${row.rowNumber}-${row.itemName}-${row.sortOrder}`}
                          row={row}
                        />
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type='button'
            isLoading={importMutation.isPending}
            onClick={handleImport}
            disabled={!canImport}
          >
            <Icons.upload />
            Import Concession Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
