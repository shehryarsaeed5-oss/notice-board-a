export interface SalesRowBreakdownInput {
  totalQty?: number | string | null;
  discountAmount?: number | string | null;
  paidAmount?: number | string | null;
  netValue?: number | string | null;
  taxValue?: number | string | null;
  salesValue?: number | string | null;
  costValue?: number | string | null;
  marginValue?: number | string | null;
  percentTotalSales?: number | string | null;
}

export interface StoredSalesRowBreakdownInput {
  totalQty?: number | null;
  paidQty?: number | null;
  focQty?: number | null;
  quantitySold?: number | null;
  amountPaid?: number | null;
  discountAmount?: number | null;
  paidAmount?: number | null;
  netValue?: number | null;
  taxValue?: number | null;
  salesValue?: number | null;
  costValue?: number | null;
  marginValue?: number | null;
  percentTotalSales?: number | null;
}

export interface SalesRowBreakdown {
  totalQty: number;
  paidQty: number;
  focQty: number;
  discountAmount: number | null;
  paidAmount: number | null;
  netValue: number | null;
  taxValue: number | null;
  salesValue: number | null;
  costValue: number | null;
  marginValue: number | null;
  percentTotalSales: number | null;
  quantitySold: number;
  amountPaid: number | null;
}

function normalizeNumericInput(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = typeof value === 'string' ? Number(value.replace(/,/g, '')) : value;

  return Number.isFinite(parsed) ? parsed : null;
}

function roundQuantity(value: number): number {
  return Math.max(0, Math.round(value * 1000) / 1000);
}

function normalizeMoney(value: number | null): number | null {
  return value === null ? null : Math.round(value * 1000) / 1000;
}

export function deriveSalesRowBreakdown(values: SalesRowBreakdownInput): SalesRowBreakdown {
  const totalQty = roundQuantity(normalizeNumericInput(values.totalQty) ?? 0);
  const discountAmount = normalizeMoney(normalizeNumericInput(values.discountAmount));
  const paidAmount = normalizeMoney(normalizeNumericInput(values.paidAmount));
  const netValue = normalizeMoney(normalizeNumericInput(values.netValue));
  const taxValue = normalizeMoney(normalizeNumericInput(values.taxValue));
  const salesValue = normalizeMoney(normalizeNumericInput(values.salesValue));
  const costValue = normalizeMoney(normalizeNumericInput(values.costValue));
  const marginValue = normalizeMoney(normalizeNumericInput(values.marginValue));
  const percentTotalSales = normalizeMoney(normalizeNumericInput(values.percentTotalSales));
  const grossValue =
    discountAmount !== null || paidAmount !== null
      ? (discountAmount ?? 0) + (paidAmount ?? 0)
      : null;
  const unitPrice = totalQty > 0 && grossValue !== null ? grossValue / totalQty : null;

  let paidQty = totalQty;
  let focQty = 0;

  if (unitPrice !== null && unitPrice > 0 && paidAmount !== null) {
    paidQty = roundQuantity(paidAmount / unitPrice);
    focQty = roundQuantity(Math.max(0, totalQty - paidQty));
  }

  if (!Number.isFinite(paidQty) || paidQty < 0) {
    paidQty = totalQty;
  }

  if (!Number.isFinite(focQty) || focQty < 0) {
    focQty = roundQuantity(Math.max(0, totalQty - paidQty));
  }

  return {
    totalQty,
    paidQty: roundQuantity(paidQty),
    focQty: roundQuantity(focQty),
    discountAmount,
    paidAmount,
    netValue,
    taxValue,
    salesValue,
    costValue,
    marginValue,
    percentTotalSales,
    quantitySold: totalQty,
    amountPaid: paidAmount
  };
}

export function resolveStoredSalesRowBreakdown(
  values: StoredSalesRowBreakdownInput
): SalesRowBreakdown {
  const totalQty = roundQuantity(values.totalQty ?? values.quantitySold ?? 0);
  const paidQty = roundQuantity(values.paidQty ?? values.quantitySold ?? totalQty);
  const focQty = roundQuantity(values.focQty ?? Math.max(0, totalQty - paidQty));
  const paidAmount = values.paidAmount ?? values.amountPaid ?? null;

  return {
    totalQty,
    paidQty,
    focQty,
    discountAmount: values.discountAmount ?? null,
    paidAmount,
    netValue: values.netValue ?? null,
    taxValue: values.taxValue ?? null,
    salesValue: values.salesValue ?? null,
    costValue: values.costValue ?? null,
    marginValue: values.marginValue ?? null,
    percentTotalSales: values.percentTotalSales ?? null,
    quantitySold: totalQty,
    amountPaid: paidAmount
  };
}
