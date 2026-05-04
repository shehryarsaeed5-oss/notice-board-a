'use client';

import { format } from 'date-fns';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { SortableTableHead } from '@/components/ui/sortable-table-head';
import { statusBadgeClass } from '@/lib/status-badge';
import { cn } from '@/lib/utils';
import { sortRows, toggleSort, type SortState } from '@/lib/table-sort';
import type { StaffMemberRecord } from '../api/types';
import { StaffRecordActions } from './staff-record-actions';

interface StaffRecordsTableProps {
  staffMembers: StaffMemberRecord[];
}

type StaffSortKey =
  | 'name'
  | 'sortOrder'
  | 'designation'
  | 'department'
  | 'phone'
  | 'status'
  | 'createdAt';

function formatField(value: string | null) {
  return value?.trim() ? value : '—';
}

export function StaffRecordsTable({ staffMembers }: StaffRecordsTableProps) {
  const [sort, setSort] = useState<SortState<StaffSortKey> | null>(null);

  const sortedStaffMembers = useMemo(
    () =>
      sortRows(staffMembers, sort, (staff, key) => {
        switch (key) {
          case 'name':
            return staff.name;
          case 'sortOrder':
            return staff.sortOrder;
          case 'designation':
            return staff.designation;
          case 'department':
            return staff.department;
          case 'phone':
            return staff.phone;
          case 'status':
            return staff.status;
          case 'createdAt':
            return staff.createdAt;
        }
      }),
    [sort, staffMembers]
  );

  const handleSort = (key: StaffSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  return (
    <Card className='border-border/60 bg-card/90 shadow-sm'>
      <CardHeader>
        <CardDescription>Staff records</CardDescription>
        <CardTitle>{staffMembers.length.toLocaleString()} record(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <SortableTableHead label='Name' sortKey='name' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Sort Order'
                  sortKey='sortOrder'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Designation'
                  sortKey='designation'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Department'
                  sortKey='department'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead label='Phone' sortKey='phone' sort={sort} onSort={handleSort} />
                <SortableTableHead
                  label='Status'
                  sortKey='status'
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label='Created'
                  sortKey='createdAt'
                  sort={sort}
                  onSort={handleSort}
                />
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStaffMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='text-muted-foreground h-24 text-center'>
                    No staff records found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedStaffMembers.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className='font-medium'>{staff.name}</TableCell>
                    <TableCell className='whitespace-nowrap'>{staff.sortOrder}</TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>{formatField(staff.department)}</TableCell>
                    <TableCell>{formatField(staff.phone)}</TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', statusBadgeClass(staff.status))}
                      >
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(staff.createdAt, 'MMM d, yyyy')}</TableCell>
                    <TableCell className='text-right'>
                      <div className='inline-flex justify-end'>
                        <StaffRecordActions staffMember={staff} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
