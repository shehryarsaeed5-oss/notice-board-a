'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { SortState } from '@/lib/table-sort';

interface SortableTableHeadProps<TKey extends string> extends Omit<
  ComponentPropsWithoutRef<typeof TableHead>,
  'children'
> {
  label: ReactNode;
  sortKey: TKey;
  sort: SortState<TKey> | null;
  onSort: (key: TKey) => void;
}

function getSortIndicator<TKey extends string>(sort: SortState<TKey> | null, sortKey: TKey) {
  if (!sort || sort.key !== sortKey) {
    return '↕';
  }

  return sort.direction === 'asc' ? '↑' : '↓';
}

export function SortableTableHead<TKey extends string>({
  label,
  sortKey,
  sort,
  onSort,
  className,
  ...props
}: SortableTableHeadProps<TKey>) {
  const active = sort?.key === sortKey;
  const indicator = getSortIndicator(sort, sortKey);

  return (
    <TableHead className={cn('align-middle', className)} {...props}>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='-ml-2 h-8 px-2 text-left font-medium text-inherit hover:bg-transparent'
        onClick={() => onSort(sortKey)}
      >
        <span>{label}</span>
        <span
          className={cn(
            'ml-1 text-[10px] leading-none',
            active ? 'text-primary' : 'text-muted-foreground'
          )}
          aria-hidden='true'
        >
          {indicator}
        </span>
      </Button>
    </TableHead>
  );
}
