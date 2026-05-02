'use client';

import { useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ConcessionPriceItemFormSheet } from './concession-price-list-form-sheet';

export function ConcessionPriceItemEmptyState() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConcessionPriceItemFormSheet open={open} onOpenChange={setOpen} />
      <Card className='border-dashed border-border/60 bg-card/60 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-base'>No concession price items yet</CardTitle>
          <CardDescription>
            Add item names, categories, and prices for the public concession list. Changes update
            the live display automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setOpen(true)}>
            <Icons.add className='mr-2 h-4 w-4' />
            Add Price Item
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
