'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import type { ConcessionPriceItemStatus } from '../api/types';

interface ConcessionPriceListFiltersProps {
  search?: string;
  status?: ConcessionPriceItemStatus;
  category?: string;
  categories: string[];
}

export function ConcessionPriceListFilters({
  search = '',
  status,
  category,
  categories
}: ConcessionPriceListFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search);
  const [statusValue, setStatusValue] = useState<ConcessionPriceItemStatus | 'ALL'>(
    status ?? 'ALL'
  );
  const [categoryValue, setCategoryValue] = useState<string>('ALL');

  useEffect(() => {
    setSearchValue(search);
    setStatusValue(status ?? 'ALL');
    setCategoryValue(category ?? 'ALL');
  }, [search, status, category]);

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }

    if (statusValue !== 'ALL') {
      params.set('status', statusValue);
    } else {
      params.delete('status');
    }

    if (categoryValue !== 'ALL') {
      params.set('category', categoryValue);
    } else {
      params.delete('category');
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const resetFilters = () => {
    setSearchValue('');
    setStatusValue('ALL');
    setCategoryValue('ALL');
    router.replace(pathname);
  };

  return (
    <form
      onSubmit={applyFilters}
      className='border-border/60 bg-card/80 flex flex-col gap-3 rounded-xl border p-4 shadow-sm xl:flex-row xl:items-end xl:justify-between'
    >
      <div className='grid gap-3 md:grid-cols-3 xl:flex-1'>
        <div className='space-y-2'>
          <Label htmlFor='concession-price-list-search'>Search</Label>
          <div className='relative'>
            <Icons.search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              id='concession-price-list-search'
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder='Item name or category'
              className='pl-9'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='concession-price-list-status'>Status</Label>
          <Select
            value={statusValue}
            onValueChange={(value) => setStatusValue(value as ConcessionPriceItemStatus | 'ALL')}
          >
            <SelectTrigger id='concession-price-list-status'>
              <SelectValue placeholder='All statuses' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All statuses</SelectItem>
              <SelectItem value='ACTIVE'>Active</SelectItem>
              <SelectItem value='INACTIVE'>Inactive</SelectItem>
              <SelectItem value='ARCHIVED'>Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='concession-price-list-category'>Category</Label>
          <Select value={categoryValue} onValueChange={(value) => setCategoryValue(value)}>
            <SelectTrigger id='concession-price-list-category'>
              <SelectValue placeholder='All categories' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All categories</SelectItem>
              {categories.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex gap-2'>
        <Button type='submit'>
          <Icons.search />
          Apply
        </Button>
        <Button type='button' variant='outline' onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </form>
  );
}
