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

import { archiveUser } from '../api/client';
import type { UserRecord } from '../api/types';
import { UserFormSheet } from './user-form-sheet';
import { UserResetPasswordModal } from './user-reset-password-modal';

interface UserActionsProps {
  user: UserRecord;
  currentUserId: string;
}

export function UserActions({ user, currentUserId }: UserActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveUser(user.id),
    onSuccess: () => {
      toast.success('User archived successfully');
      setArchiveOpen(false);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to archive user');
    }
  });

  const isCurrentUser = user.id === currentUserId;

  return (
    <>
      <UserFormSheet open={editOpen} onOpenChange={setEditOpen} user={user} />
      <UserResetPasswordModal open={passwordOpen} onOpenChange={setPasswordOpen} user={user} />
      <Modal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        title='Archive user?'
        description='This will mark the account as archived and remove access.'
      >
        <div className='flex items-center justify-end gap-2 pt-6'>
          <Button variant='outline' onClick={() => setArchiveOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            isLoading={archiveMutation.isPending}
            onClick={() => archiveMutation.mutate()}
            disabled={isCurrentUser}
          >
            <Icons.slash className='mr-2 size-4' />
            Confirm
          </Button>
        </div>
      </Modal>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <span className='sr-only'>Open user actions</span>
            <Icons.ellipsis className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Icons.edit className='mr-2 size-4' />
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPasswordOpen(true)}>
            <Icons.lock className='mr-2 size-4' />
            Reset password
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setArchiveOpen(true)}
            className='text-destructive'
            disabled={isCurrentUser}
          >
            <Icons.slash className='mr-2 size-4' />
            Archive user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
