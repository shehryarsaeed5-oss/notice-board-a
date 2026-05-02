'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

async function refreshAllDisplays() {
  const response = await fetch('/api/display/refresh-token', {
    method: 'POST',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to refresh display screens');
  }

  return response.json() as Promise<{ token?: string }>;
}

export function BoardsDisplaysRefreshButton() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: refreshAllDisplays,
    onSuccess: () => {
      toast.success('Display screens refreshed');
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to refresh display screens');
    }
  });

  return (
    <Button isLoading={mutation.isPending} onClick={() => mutation.mutate()}>
      Refresh All Displays
    </Button>
  );
}
