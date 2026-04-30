import { base64UrlDecode, base64UrlEncode } from '@/lib/encoding';

const PASSWORD_SCHEME = 'pbkdf2_sha256';
const PASSWORD_ITERATIONS = 310000;
const PASSWORD_KEY_LENGTH = 32;
const PASSWORD_SALT_LENGTH = 16;

const textEncoder = new TextEncoder();

async function derivePasswordBytes(
  password: string,
  salt: Uint8Array,
  iterations: number
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, [
    'deriveBits'
  ]);

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt,
      iterations
    },
    key,
    PASSWORD_KEY_LENGTH * 8
  );

  return new Uint8Array(bits);
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left[index] ^ right[index];
  }

  return mismatch === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(PASSWORD_SALT_LENGTH));
  const hash = await derivePasswordBytes(password, salt, PASSWORD_ITERATIONS);

  return [PASSWORD_SCHEME, PASSWORD_ITERATIONS, base64UrlEncode(salt), base64UrlEncode(hash)].join(
    '$'
  );
}

export async function verifyPassword(password: string, storedPassword: string): Promise<boolean> {
  const [scheme, iterationsValue, saltValue, hashValue] = storedPassword.split('$');

  if (scheme !== PASSWORD_SCHEME || !iterationsValue || !saltValue || !hashValue) {
    return false;
  }

  const iterations = Number(iterationsValue);
  if (!Number.isInteger(iterations) || iterations < 1) {
    return false;
  }

  try {
    const salt = base64UrlDecode(saltValue);
    const expectedHash = base64UrlDecode(hashValue);
    const actualHash = await derivePasswordBytes(password, salt, iterations);

    return constantTimeEqual(actualHash, expectedHash);
  } catch {
    return false;
  }
}
