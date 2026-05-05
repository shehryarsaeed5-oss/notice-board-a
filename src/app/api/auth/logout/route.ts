import { AUTH_SESSION_COOKIE_NAME } from '@/lib/auth-session';
import { NextResponse } from 'next/server';

function isRequestSecure(request: Request): boolean {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  if (forwardedProto) {
    const firstProto = forwardedProto.split(',')[0]?.trim().toLowerCase();
    if (firstProto) {
      return firstProto === 'https';
    }
  }

  return new URL(request.url).protocol === 'https:';
}

export async function POST(request: Request) {
  const response = NextResponse.json({
    ok: true,
    redirectTo: '/auth/sign-in'
  });

  response.cookies.set(AUTH_SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: isRequestSecure(request),
    path: '/',
    expires: new Date(0),
    maxAge: 0
  });

  return response;
}
