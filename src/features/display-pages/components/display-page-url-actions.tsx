'use client';

import Link from 'next/link';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { createDisplayPageUrl } from '../lib/slug';

interface DisplayPageUrlActionsProps {
  slug: string;
}

export function DisplayPageUrlActions({ slug }: DisplayPageUrlActionsProps) {
  const displayUrl = createDisplayPageUrl(slug);

  const copyDisplayUrl = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
      toast.success('Display URL copied');
    } catch {
      toast.error('Failed to copy display URL');
    }
  };

  return (
    <div className='flex items-center gap-1'>
      <Button type='button' variant='ghost' size='icon' className='size-8' onClick={copyDisplayUrl}>
        <span className='sr-only'>Copy display URL</span>
        <Icons.copy className='size-4' />
      </Button>
      <Button asChild variant='ghost' size='icon' className='size-8'>
        <Link href={displayUrl} target='_blank' rel='noreferrer'>
          <span className='sr-only'>Open display URL</span>
          <Icons.externalLink className='size-4' />
        </Link>
      </Button>
    </div>
  );
}
