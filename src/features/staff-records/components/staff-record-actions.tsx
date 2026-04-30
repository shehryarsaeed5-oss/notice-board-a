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
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';
import type { StaffMemberRecord } from '../api/types';
import { archiveStaffMember, deleteStaffMember } from '../api/client';
import { StaffMemberFormSheet } from './staff-member-form-sheet';

interface StaffRecordActionsProps {
  staffMember: StaffMemberRecord;
}

export function StaffRecordActions({ staffMember }: StaffRecordActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveStaffMember(staffMember.id),
    onSuccess: () => {
      toast.success('Staff member archived');
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to archive staff member');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteStaffMember(staffMember.id),
    onSuccess: () => {
      toast.success(
        staffMember.status === 'ARCHIVED'
          ? 'Staff member deleted permanently'
          : 'Staff member moved to archive'
      );
      setDeleteOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to delete staff member');
    }
  });

  const deleteLabel =
    staffMember.status === 'ARCHIVED' ? 'Delete permanently' : 'Delete / Archive safely';

  return (
    <>
      <StaffMemberFormSheet open={editOpen} onOpenChange={setEditOpen} staffMember={staffMember} />
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title={staffMember.status === 'ARCHIVED' ? 'Delete permanently?' : 'Archive this record?'}
        description={
          staffMember.status === 'ARCHIVED'
            ? 'This archived staff record will be removed permanently.'
            : 'Active staff records will be moved to ARCHIVED first. If the record is already archived, it will be deleted permanently.'
        }
      >
        <div className='flex items-center justify-end gap-2 pt-6'>
          <Button variant='outline' onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            isLoading={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate()}
          >
            <Icons.trash />
            Confirm
          </Button>
        </div>
      </Modal>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <span className='sr-only'>Open staff actions</span>
            <Icons.ellipsis className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Icons.edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          {staffMember.status !== 'ARCHIVED' && (
            <DropdownMenuItem
              onClick={() => archiveMutation.mutate()}
              disabled={archiveMutation.isPending}
            >
              <Icons.workspace className='mr-2 size-4' />
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteOpen(true)} className='text-destructive'>
            <Icons.trash className='mr-2 size-4' />
            {deleteLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
