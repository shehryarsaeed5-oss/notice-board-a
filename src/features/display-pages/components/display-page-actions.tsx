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

import type { DisplayPageRecord } from '../api/types';
import { archiveDisplayPage } from '../api/client';
import { DisplayPageFormSheet } from './display-page-form-sheet';

interface DisplayPageActionsProps {
  displayPage: DisplayPageRecord;
}

export function DisplayPageActions({ displayPage }: DisplayPageActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveDisplayPage(displayPage.id),
    onSuccess: () => {
      toast.success('Display page archived');
      setArchiveOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to archive display page');
    }
  });

  return (
    <>
      <DisplayPageFormSheet open={editOpen} onOpenChange={setEditOpen} displayPage={displayPage} />
      <Modal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        title='Archive display page?'
        description='This will move the display page record to ARCHIVED status.'
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
            <Icons.slash className='mr-2 size-4' />
            Confirm
          </Button>
        </div>
      </Modal>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <span className='sr-only'>Open display page actions</span>
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
            <Icons.slash className='mr-2 size-4' />
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
