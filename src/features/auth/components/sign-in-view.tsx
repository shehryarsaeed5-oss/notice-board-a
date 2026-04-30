'use client';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppForm } from '@/components/ui/tanstack-form';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from 'zod';
import { toast } from 'sonner';
import { InteractiveGridPattern } from './interactive-grid';

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

export default function SignInViewPage() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      email: 'admin@notice.local',
      password: ''
    },
    validators: {
      onSubmit: loginSchema as any
    },
    onSubmit: async ({ value }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
        redirectTo?: string;
      } | null;

      if (!response.ok) {
        toast.error(data?.message ?? 'Unable to sign in.');
        return;
      }

      toast.success('Signed in.');
      router.replace(data?.redirectTo ?? '/dashboard');
      router.refresh();
    }
  });

  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden bg-background md:grid lg:grid-cols-2 lg:px-0'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Notice Board
      </Link>
      <div className='relative hidden h-full flex-col overflow-hidden border-r p-10 lg:flex'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.18),transparent_35%),linear-gradient(135deg,hsl(var(--sidebar))_0%,hsl(var(--background))_65%)]' />
        <div className='relative z-10 flex items-center text-lg font-semibold tracking-wide text-sidebar-foreground'>
          <Icons.dashboard className='mr-2 size-6 text-amber-400' />
          Cinema Notice Board
        </div>
        <InteractiveGridPattern
          className={cn(
            'mask-[radial-gradient(420px_circle_at_center,white,transparent)]',
            'absolute inset-x-0 inset-y-[0%] h-full skew-y-12 opacity-35'
          )}
        />
        <div className='relative z-10 mt-auto max-w-md space-y-4 text-sidebar-foreground'>
          <p className='text-3xl font-semibold tracking-tight'>
            Admin access for cinema operations, notices, and future display workflows.
          </p>
          <p className='text-sidebar-foreground/75 text-sm leading-6'>
            Sign in with the local PostgreSQL admin account. The dashboard shell stays intact; only
            authentication is now local.
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center p-4 lg:p-8'>
        <div className='w-full max-w-md space-y-6'>
          <div className='space-y-2 text-center'>
            <div className='bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium'>
              <Icons.lock className='size-3.5' />
              Local admin login
            </div>
            <h1 className='text-3xl font-semibold tracking-tight'>Welcome back</h1>
            <p className='text-muted-foreground text-sm'>
              Use the default admin account to enter the Notice Board admin system.
            </p>
          </div>

          <form.AppForm>
            <form.Form className='space-y-4 rounded-2xl border bg-card/90 p-6 shadow-sm backdrop-blur'>
              <form.AppField
                name='email'
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <field.FieldSet>
                      <field.Field>
                        <field.FieldLabel htmlFor={field.name}>Email</field.FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type='email'
                          autoComplete='email'
                          autoCapitalize='none'
                          autoCorrect='off'
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          placeholder='admin@notice.local'
                          aria-invalid={isInvalid}
                        />
                      </field.Field>
                      <field.FieldError />
                    </field.FieldSet>
                  );
                }}
              />

              <form.AppField
                name='password'
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <field.FieldSet>
                      <div className='flex items-center justify-between'>
                        <field.FieldLabel htmlFor={field.name}>Password</field.FieldLabel>
                        <span className='text-muted-foreground text-xs'>Required</span>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        type='password'
                        autoComplete='current-password'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        placeholder='Enter your password'
                        aria-invalid={isInvalid}
                      />
                      <field.FieldError />
                    </field.FieldSet>
                  );
                }}
              />

              <form.SubmitButton className='mt-2 w-full'>
                <Icons.login className='size-4' />
                Sign in
              </form.SubmitButton>
            </form.Form>
          </form.AppForm>

          <div className='rounded-2xl border border-dashed bg-muted/40 p-4 text-sm'>
            <div className='font-medium'>Default credentials</div>
            <div className='text-muted-foreground mt-1'>
              <div>Email: admin@notice.local</div>
              <div>Password: Admin@12345</div>
            </div>
          </div>

          <p className='text-muted-foreground text-center text-xs leading-5'>
            This phase replaces cloud auth with a local PostgreSQL session flow. Public display
            routes remain untouched for later work.
          </p>
        </div>
      </div>
    </div>
  );
}
