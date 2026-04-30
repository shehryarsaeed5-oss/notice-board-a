import { AUTH_SESSION_COOKIE_NAME } from '@/lib/auth-session';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    redirectTo: '/auth/sign-in'
  });

  response.cookies.set(AUTH_SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
    maxAge: 0
  });

  return response;
}
