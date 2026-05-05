import { createAdminSessionCookie, getAdminCookieOptions } from '@/lib/auth';
import { AUTH_SESSION_COOKIE_NAME } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { getSafeInternalRedirectPath } from '@/lib/redirect';
import { verifyPassword } from '@/lib/password';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  redirectTo: z.string().optional()
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: 'Invalid request payload.'
      },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Enter a valid email and password.'
      },
      { status: 400 }
    );
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user || user.status !== 'ACTIVE') {
    return NextResponse.json(
      {
        message: 'Invalid email or password.'
      },
      { status: 401 }
    );
  }

  const isPasswordValid = await verifyPassword(parsed.data.password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        message: 'Invalid email or password.'
      },
      { status: 401 }
    );
  }

  const { token, expiresAt } = await createAdminSessionCookie(user.id);
  const redirectTo = getSafeInternalRedirectPath(parsed.data.redirectTo);
  const response = NextResponse.json({
    ok: true,
    redirectTo
  });

  response.cookies.set(AUTH_SESSION_COOKIE_NAME, token, getAdminCookieOptions(request, expiresAt));

  return response;
}
