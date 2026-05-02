'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';
import type { EventRecordItem } from '../api/types';
import { archiveEventRecord } from '../api/client';
import { EventRecordFormSheet } from './event-record-form-sheet';

interface EventRecordActionsProps {
  eventRecord: EventRecordItem;
}

export function EventRecordActions({ eventRecord }: EventRecordActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveEventRecord(eventRecord.id),
    onSuccess: () => {
      toast.success('Event archived');
      setArchiveOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to archive event');
    }
  });

  return (
    <>
      <EventRecordFormSheet open={editOpen} onOpenChange={setEditOpen} eventRecord={eventRecord} />
      <Modal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        title='Archive event?'
        description='This will move the event record to ARCHIVED status.'
      >
        <div className='flex items-center justify-end gap-2 pt-6'>
          <Button variant='outline' onClick={() => setArchiveOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            isLoading={archiveMutation.isPending}
            onClick={() => archiveMutation.mutate()}
          >
            <Icons.workspace className='mr-2 size-4' />
            Confirm
          </Button>
        </div>
      </Modal>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <span className='sr-only'>Open event actions</span>
            <Icons.ellipsis className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Icons.edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setArchiveOpen(true)} className='text-destructive'>
            <Icons.workspace className='mr-2 size-4' />
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
