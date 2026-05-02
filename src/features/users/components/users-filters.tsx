'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
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

import type { UserStatus } from '../api/types';

interface UsersFiltersProps {
  search?: string;
  status?: UserStatus;
}

export function UsersFilters({ search = '', status }: UsersFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search);
  const [statusValue, setStatusValue] = useState<UserStatus | 'ALL'>(status ?? 'ALL');

  useEffect(() => {
    setSearchValue(search);
    setStatusValue(status ?? 'ALL');
  }, [search, status]);

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

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const resetFilters = () => {
    setSearchValue('');
    setStatusValue('ALL');
    router.replace(pathname);
  };

  return (
    <form
      onSubmit={applyFilters}
      className='border-border/60 bg-card/80 flex flex-col gap-3 rounded-xl border p-4 shadow-sm xl:flex-row xl:items-end xl:justify-between'
    >
      <div className='grid gap-3 md:grid-cols-2 xl:flex-1'>
        <div className='space-y-2'>
          <Label htmlFor='users-search'>Search</Label>
          <div className='relative'>
            <Icons.search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              id='users-search'
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder='Name or email'
              className='pl-9'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='users-status'>Status</Label>
          <Select
            value={statusValue}
            onValueChange={(value) => setStatusValue(value as UserStatus | 'ALL')}
          >
            <SelectTrigger id='users-status'>
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
