import 'server-only';

import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

import { getCurrentAdminSession } from '@/lib/auth';
import { canAccessApi, canAccessRoute } from '@/lib/permissions';

export async function requireRouteAccess(pathname: string) {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect('/auth/sign-in');
  }

  if (!canAccessRoute(session.user, pathname)) {
    redirect('/dashboard/overview');
  }

  return session;
}

export async function requireApiAccess(pathname: string, method: string) {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!canAccessApi(session.user, pathname, method)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  return null;
}
