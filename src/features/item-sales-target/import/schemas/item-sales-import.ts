import { z } from 'zod';

export const itemSalesImportSettingsSchema = z.object({
  sharedFolderPath: z.string().trim().optional(),
  autoImportEnabled: z.boolean().default(false)
});

export const itemSalesImportDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a valid date')
});

export const itemSalesImportRangeSchema = z
  .object({
    fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a valid start date'),
    toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a valid end date')
  })
  .refine((value) => value.fromDate <= value.toDate, {
    message: 'End date cannot be before start date',
    path: ['toDate']
  });

export type ItemSalesImportSettingsFormValues = z.infer<typeof itemSalesImportSettingsSchema>;
export type ItemSalesImportRangeFormValues = z.infer<typeof itemSalesImportRangeSchema>;
