export const ITEM_SALES_TARGET_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type ItemSalesTargetStatus = (typeof ITEM_SALES_TARGET_STATUSES)[number];

export interface ItemSalesTargetRecord {
  id: string;
  itemName: string;
  itemCode: string | null;
  dailyTarget: number | null;
  weeklyTarget: number | null;
  monthlyTarget: number | null;
  status: ItemSalesTargetStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemSalesTargetFormValues {
  itemName: string;
  itemCode?: string;
  dailyTarget?: number | string | null;
  weeklyTarget?: number | string | null;
  monthlyTarget?: number | string | null;
  status: ItemSalesTargetStatus;
}

export interface ItemSalesTargetListFilters {
  search?: string;
  status?: ItemSalesTargetStatus;
}

export interface ItemSalesTargetListResult {
  itemSalesTargets: ItemSalesTargetRecord[];
  total: number;
}
