export const ITEM_SALES_TARGET_STATUSES = ['ACTIVE', 'INACTIVE', 'ARCHIVED'] as const;

export type ItemSalesTargetStatus = (typeof ITEM_SALES_TARGET_STATUSES)[number];

export interface ItemSalesTargetRecord {
  id: string;
  itemName: string;
  itemCode: string | null;
  itemCodes: string[];
  dailyTarget: number | null;
  weeklyTarget: number | null;
  monthlyTarget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  displayOrder: number;
  calculationMode: string | null;
  status: ItemSalesTargetStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemSalesTargetFormValues {
  itemName: string;
  itemCode?: string;
  itemCodesText?: string;
  dailyTarget?: number | string | null;
  weeklyTarget?: number | string | null;
  monthlyTarget?: number | string | null;
  startDate?: string;
  endDate?: string;
  displayOrder?: number | string;
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
