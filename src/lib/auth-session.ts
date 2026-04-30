import { base64UrlDecode, base64UrlEncode } from '@/lib/encoding';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export const AUTH_SESSION_COOKIE_NAME = 'notice_admin_session';
export const AUTH_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export interface AdminSessionPayload {
  sub: string;
  exp: number;
}

function getSessionSecret(): string {
  return process.env.AUTH_SESSION_SECRET ?? 'notice-board-local-session-secret';
}

async function importSessionKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    {
      name: 'HMAC',
      hash: 'SHA-256'
    },
    false,
    ['sign', 'verify']
  );
}

export async function createSessionToken(userId: string): Promise<{
  token: string;
  expiresAt: Date;
  payload: AdminSessionPayload;
}> {
  const payload: AdminSessionPayload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + AUTH_SESSION_MAX_AGE
  };
  const payloadJson = JSON.stringify(payload);
  const payloadPart = base64UrlEncode(textEncoder.encode(payloadJson));
  const sessionKey = await importSessionKey(getSessionSecret());
  const signature = new Uint8Array(
    await crypto.subtle.sign('HMAC', sessionKey, textEncoder.encode(payloadPart))
  );

  return {
    token: `${payloadPart}.${base64UrlEncode(signature)}`,
    expiresAt: new Date(payload.exp * 1000),
    payload
  };
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  const [payloadPart, signaturePart] = token.split('.');
  if (!payloadPart || !signaturePart) {
    return null;
  }

  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(textDecoder.decode(base64UrlDecode(payloadPart))) as AdminSessionPayload;
  } catch {
    return null;
  }

  if (
    typeof payload.sub !== 'string' ||
    typeof payload.exp !== 'number' ||
    payload.exp * 1000 <= Date.now()
  ) {
    return null;
  }

  try {
    const sessionKey = await importSessionKey(getSessionSecret());
    const signature = base64UrlDecode(signaturePart);
    const valid = await crypto.subtle.verify(
      'HMAC',
      sessionKey,
      signature,
      textEncoder.encode(payloadPart)
    );

    return valid ? payload : null;
  } catch {
    return null;
  }
}

export function buildSessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
    maxAge: AUTH_SESSION_MAX_AGE
  };
}
