import { format } from 'date-fns';

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
import { cn } from '@/lib/utils';
import type { StaffMemberRecord } from '../api/types';
import { StaffRecordActions } from './staff-record-actions';

interface StaffRecordsTableProps {
  staffMembers: StaffMemberRecord[];
}

function getStatusClass(status: StaffMemberRecord['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    case 'INACTIVE':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
    case 'ARCHIVED':
      return 'border-muted-foreground/20 bg-muted/40 text-muted-foreground';
    default:
      return '';
  }
}

function formatField(value: string | null) {
  return value?.trim() ? value : '—';
}

export function StaffRecordsTable({ staffMembers }: StaffRecordsTableProps) {
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
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-muted-foreground h-24 text-center'>
                    No staff records found.
                  </TableCell>
                </TableRow>
              ) : (
                staffMembers.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className='font-medium'>{staff.name}</TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>{formatField(staff.department)}</TableCell>
                    <TableCell>{formatField(staff.phone)}</TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={cn('gap-1.5', getStatusClass(staff.status))}
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
