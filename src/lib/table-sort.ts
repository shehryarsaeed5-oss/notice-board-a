export type SortDirection = 'asc' | 'desc';

export interface SortState<TKey extends string> {
  key: TKey;
  direction: SortDirection;
}

export type SortValue = string | number | Date | null | undefined;

export function toggleSort<TKey extends string>(
  currentSort: SortState<TKey> | null,
  key: TKey
): SortState<TKey> | null {
  if (!currentSort || currentSort.key !== key) {
    return { key, direction: 'asc' };
  }

  if (currentSort.direction === 'asc') {
    return { key, direction: 'desc' };
  }

  return null;
}

function comparePrimitiveValues(left: SortValue, right: SortValue): number {
  const leftEmpty = left === null || left === undefined || left === '';
  const rightEmpty = right === null || right === undefined || right === '';

  if (leftEmpty && rightEmpty) {
    return 0;
  }

  if (leftEmpty) {
    return 1;
  }

  if (rightEmpty) {
    return -1;
  }

  const leftValue = left instanceof Date ? left.getTime() : left;
  const rightValue = right instanceof Date ? right.getTime() : right;

  if (typeof leftValue === 'number' && typeof rightValue === 'number') {
    return leftValue - rightValue;
  }

  return String(leftValue).localeCompare(String(rightValue), undefined, {
    sensitivity: 'base',
    numeric: true
  });
}

export function sortRows<T, TKey extends string>(
  rows: T[],
  sort: SortState<TKey> | null,
  getValue: (row: T, key: TKey) => SortValue
): T[] {
  if (!sort) {
    return rows;
  }

  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const comparison = comparePrimitiveValues(
        getValue(left.row, sort.key),
        getValue(right.row, sort.key)
      );

      if (comparison === 0) {
        return left.index - right.index;
      }

      return sort.direction === 'asc' ? comparison : -comparison;
    })
    .map(({ row }) => row);
}
