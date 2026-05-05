import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  AUTH_SESSION_COOKIE_NAME,
  AdminSessionPayload,
  buildSessionCookieOptions,
  createSessionToken,
  verifySessionToken
} from '@/lib/auth-session';
import { normalizeUserRole } from '@/lib/permissions';

export interface AdminSessionUser {
  id: string;
  name: string;
  email: string;
  role: ReturnType<typeof normalizeUserRole>;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminSession {
  payload: AdminSessionPayload;
  user: AdminSessionUser;
}

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

export async function getCurrentAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.sub
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
      createdAt: true,
      updatedAt: true,
      status: true
    }
  });

  if (!user || user.status !== 'ACTIVE') {
    return null;
  }

  return {
    payload,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: normalizeUserRole(user.role),
      permissions: user.permissions,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  };
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect('/auth/sign-in');
  }

  return session;
}

export async function createAdminSessionCookie(userId: string): Promise<{
  token: string;
  expiresAt: Date;
}> {
  const { token, expiresAt } = await createSessionToken(userId);

  return {
    token,
    expiresAt
  };
}

export function getAdminCookieOptions(request: Request, expiresAt: Date) {
  return buildSessionCookieOptions(expiresAt, isRequestSecure(request));
}

export { AUTH_SESSION_COOKIE_NAME };
