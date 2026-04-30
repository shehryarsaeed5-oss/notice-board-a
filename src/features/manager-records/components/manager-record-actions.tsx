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
import type { ManagerRecord } from '../api/types';
import { archiveManager } from '../api/client';
import { ManagerMemberFormSheet } from './manager-member-form-sheet';

interface ManagerRecordActionsProps {
  manager: ManagerRecord;
}

export function ManagerRecordActions({ manager }: ManagerRecordActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveManager(manager.id),
    onSuccess: () => {
      toast.success('Manager archived');
      setArchiveOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to archive manager');
    }
  });

  return (
    <>
      <ManagerMemberFormSheet open={editOpen} onOpenChange={setEditOpen} manager={manager} />
      <Modal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        title='Archive manager?'
        description='This will move the manager record to ARCHIVED status.'
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
            <span className='sr-only'>Open manager actions</span>
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
