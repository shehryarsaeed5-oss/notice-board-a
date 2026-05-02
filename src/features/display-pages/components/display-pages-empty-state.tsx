import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { DisplayPageFormSheetTrigger } from './display-page-form-sheet';

export function DisplayPagesEmptyState() {
  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>No display pages found</CardDescription>
        <CardTitle>Create the first display page</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-muted-foreground max-w-2xl text-sm'>
          Add display page definitions now so the public display screen can be wired up later
          without changing your dashboard records.
        </p>
        <div className='shrink-0'>
          <DisplayPageFormSheetTrigger />
        </div>
      </CardContent>
    </Card>
  );
}
