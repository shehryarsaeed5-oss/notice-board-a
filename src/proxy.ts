import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth-session';

async function readSession(req: NextRequest) {
  const token = req.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await readSession(req);

  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const signInUrl = new URL('/auth/sign-in', req.url);
      signInUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  if ((pathname === '/auth' || pathname.startsWith('/auth/sign-in')) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
