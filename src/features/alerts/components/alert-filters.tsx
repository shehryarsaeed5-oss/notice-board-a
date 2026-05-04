'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

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

import type { AlertStatus, AlertType } from '../api/types';
import { ALERT_STATUS_OPTIONS, ALERT_TYPE_OPTIONS } from '../constants';

interface AlertsFiltersProps {
  search?: string;
  status?: AlertStatus;
  alertType?: AlertType;
}

export function AlertsFilters({ search = '', status, alertType }: AlertsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search);
  const [statusValue, setStatusValue] = useState<AlertStatus | 'ALL'>(status ?? 'ALL');
  const [alertTypeValue, setAlertTypeValue] = useState<AlertType | 'ALL'>(alertType ?? 'ALL');

  useEffect(() => {
    setSearchValue(search);
    setStatusValue(status ?? 'ALL');
    setAlertTypeValue(alertType ?? 'ALL');
  }, [alertType, search, status]);

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

    if (alertTypeValue !== 'ALL') {
      params.set('alertType', alertTypeValue);
    } else {
      params.delete('alertType');
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const resetFilters = () => {
    setSearchValue('');
    setStatusValue('ALL');
    setAlertTypeValue('ALL');
    router.replace(pathname);
  };

  return (
    <form
      onSubmit={applyFilters}
      className='border-border/60 bg-card/80 flex flex-col gap-3 rounded-xl border p-4 shadow-sm xl:flex-row xl:items-end xl:justify-between'
    >
      <div className='grid gap-3 md:grid-cols-3 xl:flex-1'>
        <div className='space-y-2'>
          <Label htmlFor='alert-search'>Search</Label>
          <div className='relative'>
            <Icons.search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              id='alert-search'
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder='Title or message'
              className='pl-9'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='alert-status'>Status</Label>
          <Select
            value={statusValue}
            onValueChange={(value) => setStatusValue(value as AlertStatus | 'ALL')}
          >
            <SelectTrigger id='alert-status'>
              <SelectValue placeholder='All statuses' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All statuses</SelectItem>
              {ALERT_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='alert-type'>Alert Type</Label>
          <Select
            value={alertTypeValue}
            onValueChange={(value) => setAlertTypeValue(value as AlertType | 'ALL')}
          >
            <SelectTrigger id='alert-type'>
              <SelectValue placeholder='All types' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All types</SelectItem>
              {ALERT_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
