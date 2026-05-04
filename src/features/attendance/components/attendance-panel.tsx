'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { SortableTableHead } from '@/components/ui/sortable-table-head';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { saveAttendance } from '../api/client';
import type { AttendanceStatus, AttendanceType } from '../api/types';
import { sortRows, toggleSort, type SortState } from '@/lib/table-sort';

const STATUS_OPTIONS: AttendanceStatus[] = ['PRESENT', 'ABSENT', 'LEAVE', 'LATE'];

type AttendanceRow = {
  id: string;
  name: string;
  designation: string | null;
  department?: string | null;
  shift: string;
  status: AttendanceStatus;
  remarks: string;
};

type AttendanceSortKey = 'name' | 'designation' | 'department' | 'shift' | 'status' | 'remarks';

interface AttendancePanelProps {
  type: AttendanceType;
  title: string;
  description: string;
  rows: AttendanceRow[];
  date: string;
}

interface FeedbackState {
  kind: 'success' | 'error';
  message: string;
}

function statusBadgeClass(status: AttendanceStatus) {
  switch (status) {
    case 'PRESENT':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    case 'ABSENT':
      return 'border-rose-500/30 bg-rose-500/10 text-rose-300';
    case 'LEAVE':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
    case 'LATE':
      return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
  }
}

export function AttendancePanel({ type, title, description, rows, date }: AttendancePanelProps) {
  const router = useRouter();
  const [draftRows, setDraftRows] = useState(rows);
  const [sort, setSort] = useState<SortState<AttendanceSortKey> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const empty = draftRows.length === 0;
  const sortedRows = useMemo(
    () =>
      sortRows(draftRows, sort, (row, key) => {
        switch (key) {
          case 'name':
            return row.name;
          case 'designation':
            return row.designation;
          case 'department':
            return row.department;
          case 'shift':
            return row.shift;
          case 'status':
            return row.status;
          case 'remarks':
            return row.remarks;
        }
      }),
    [draftRows, sort]
  );

  const heading = useMemo(
    () => (type === 'staff' ? 'Staff attendance records' : 'Manager attendance records'),
    [type]
  );

  const updateRow = (id: string, field: 'shift' | 'status' | 'remarks', value: string) => {
    setDraftRows((current) =>
      current.map((row) => {
        if (row.id !== id) {
          return row;
        }

        if (field === 'status') {
          return { ...row, status: value as AttendanceStatus };
        }

        return { ...row, [field]: value };
      })
    );
  };

  const handleSort = (key: AttendanceSortKey) => {
    setSort((current) => toggleSort(current, key));
  };

  const handleSave = async () => {
    if (empty) {
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      const payloadRows = draftRows.map((row) => ({
        personId: row.id,
        shift: row.shift,
        status: row.status,
        remarks: row.remarks
      }));

      const response = await saveAttendance({
        type,
        date,
        rows: payloadRows
      });

      toast.success(`${title} saved`);
      setFeedback({
        kind: 'success',
        message: `Saved ${response.saved} ${type} attendance record(s) for ${date}.`
      });
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save attendance';
      toast.error(message);
      setFeedback({
        kind: 'error',
        message
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='space-y-4'>
      <Card className='border-border/60 bg-card/90 shadow-sm'>
        <CardHeader>
          <CardDescription>{heading}</CardDescription>
          <CardTitle>{title}</CardTitle>
          <p className='text-muted-foreground text-sm'>{description}</p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {feedback && (
            <Alert variant={feedback.kind === 'error' ? 'destructive' : 'default'}>
              {feedback.kind === 'success' ? (
                <Icons.circleCheck className='text-emerald-400' />
              ) : (
                <Icons.alertCircle />
              )}
              <AlertTitle>{feedback.kind === 'success' ? 'Saved' : 'Save failed'}</AlertTitle>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}

          {empty ? (
            <Card className='border-dashed'>
              <CardContent className='text-muted-foreground py-10 text-center text-sm'>
                No active {type} records found.
              </CardContent>
            </Card>
          ) : (
            <div className='overflow-hidden rounded-lg border'>
              <Table>
                <TableHeader className='bg-muted/50'>
                  <TableRow>
                    <SortableTableHead
                      label='Name'
                      sortKey='name'
                      sort={sort}
                      onSort={handleSort}
                    />
                    <SortableTableHead
                      label='Designation'
                      sortKey='designation'
                      sort={sort}
                      onSort={handleSort}
                    />
                    {type === 'staff' && (
                      <SortableTableHead
                        label='Department'
                        sortKey='department'
                        sort={sort}
                        onSort={handleSort}
                      />
                    )}
                    <SortableTableHead
                      label='Shift'
                      sortKey='shift'
                      sort={sort}
                      onSort={handleSort}
                    />
                    <SortableTableHead
                      label='Status'
                      sortKey='status'
                      sort={sort}
                      onSort={handleSort}
                    />
                    <SortableTableHead
                      label='Remarks'
                      sortKey='remarks'
                      sort={sort}
                      onSort={handleSort}
                    />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className='font-medium'>{row.name}</TableCell>
                      <TableCell>{row.designation ?? '—'}</TableCell>
                      {type === 'staff' && <TableCell>{row.department ?? '—'}</TableCell>}
                      <TableCell className='min-w-40'>
                        <Input
                          value={row.shift}
                          onChange={(event) => updateRow(row.id, 'shift', event.target.value)}
                          placeholder='Morning / Evening / Night'
                        />
                      </TableCell>
                      <TableCell className='min-w-44'>
                        <Select
                          value={row.status}
                          onValueChange={(value) => updateRow(row.id, 'status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                <span className='flex items-center gap-2'>
                                  <Badge variant='outline' className={statusBadgeClass(status)}>
                                    {status}
                                  </Badge>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className='min-w-64'>
                        <Textarea
                          value={row.remarks}
                          onChange={(event) => updateRow(row.id, 'remarks', event.target.value)}
                          placeholder='Optional remarks'
                          rows={2}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className='flex items-center justify-between gap-3'>
            <p className='text-muted-foreground text-sm'>
              Attendance date: <span className='text-foreground font-medium'>{date}</span>
            </p>
            <Button type='button' onClick={handleSave} isLoading={isSaving} disabled={empty}>
              <Icons.check />
              Save {type === 'staff' ? 'Staff' : 'Manager'} Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
