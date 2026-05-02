'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { resetUserPassword } from '../api/client';
import type { UserRecord } from '../api/types';

interface UserResetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserRecord | null;
}

export function UserResetPasswordModal({ open, onOpenChange, user }: UserResetPasswordModalProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (open) {
      setPassword('');
      setConfirmPassword('');
    }
  }, [open]);

  const mutation = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      resetUserPassword(id, { password }),
    onSuccess: () => {
      toast.success('Password reset successfully');
      onOpenChange(false);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reset password');
    }
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = z
      .object({
        password: z.string().trim().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().trim().min(8, 'Confirm the new password')
      })
      .refine((value) => value.password === value.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
      })
      .safeParse({ password, confirmPassword });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Fix the password fields';
      toast.error(message);
      return;
    }

    if (!user) {
      return;
    }

    await mutation.mutateAsync({ id: user.id, password: parsed.data.password });
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title='Reset password'
      description={user ? `Set a new password for ${user.name}.` : 'Set a new password.'}
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 pt-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='reset-password' className='text-sm font-medium'>
            New password
          </label>
          <Input
            id='reset-password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Minimum 8 characters'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='reset-password-confirm' className='text-sm font-medium'>
            Confirm password
          </label>
          <Input
            id='reset-password-confirm'
            type='password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder='Repeat the new password'
          />
        </div>

        <div className='flex justify-end gap-2 pt-2'>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type='submit' isLoading={mutation.isPending} disabled={!user}>
            Reset Password
          </Button>
        </div>
      </form>
    </Modal>
  );
}
