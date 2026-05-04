import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { AlertFormSheetTrigger } from './alert-form-sheet';

export function AlertsEmptyState() {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>No alerts found</CardDescription>
        <CardTitle>Start with a live alert banner</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-muted-foreground max-w-2xl text-sm'>
          Create live alerts to highlight urgent notices, warnings, or success messages on the
          public display board. Alerts update instantly when saved.
        </p>
        <div className='shrink-0'>
          <AlertFormSheetTrigger />
        </div>
      </CardContent>
    </Card>
  );
}
