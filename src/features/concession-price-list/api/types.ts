export const CONCESSION_PRICE_ITEM_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type ConcessionPriceItemStatus = (typeof CONCESSION_PRICE_ITEM_STATUSES)[number];

export interface ConcessionPriceItemRecord {
  id: string;
  itemName: string;
  category: string | null;
  price: number;
  sortOrder: number;
  status: ConcessionPriceItemStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConcessionPriceItemFormValues {
  itemName: string;
  category?: string;
  price?: number | string | null;
  sortOrder?: number | string | null;
  status: ConcessionPriceItemStatus;
}

export interface ConcessionPriceItemListFilters {
  search?: string;
  status?: ConcessionPriceItemStatus;
  category?: string;
}

export interface ConcessionPriceItemListResult {
  concessionPriceItems: ConcessionPriceItemRecord[];
  categories: string[];
  total: number;
}
