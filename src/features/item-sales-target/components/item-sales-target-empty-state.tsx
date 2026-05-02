import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemSalesTargetFormSheetTrigger } from './item-sales-target-form-sheet';

export function ItemSalesTargetEmptyState() {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>No item sales targets found</CardDescription>
        <CardTitle>Start with a target record</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-muted-foreground max-w-2xl text-sm'>
          Add item-level sales targets for the cinema dashboard. Provide at least one target value
          for daily, weekly, or monthly planning.
        </p>
        <div className='shrink-0'>
          <ItemSalesTargetFormSheetTrigger />
        </div>
      </CardContent>
    </Card>
  );
}
