import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL?.trim();

let redisClient: Redis | null = null;
let redisUnavailable = false;

function createRedisClient(): Redis {
  if (!REDIS_URL) {
    throw new Error('REDIS_URL is not configured');
  }

  return new Redis(REDIS_URL, {
    connectTimeout: 1000,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null
  });
}

export function getRedisClient(): Redis | null {
  if (!REDIS_URL || redisUnavailable) {
    return null;
  }

  if (!redisClient) {
    redisClient = createRedisClient();
  }

  return redisClient;
}

async function runRedis<T>(operation: (client: Redis) => Promise<T>): Promise<T | null> {
  const client = getRedisClient();

  if (!client) {
    return null;
  }

  try {
    return await operation(client);
  } catch {
    redisUnavailable = true;

    try {
      client.disconnect();
    } catch {
      // Ignore disconnect errors. We fall back to PostgreSQL.
    }

    if (redisClient === client) {
      redisClient = null;
    }

    return null;
  }
}

export async function redisGet(key: string): Promise<string | null> {
  return runRedis((client) => client.get(key));
}

export async function redisSet(
  key: string,
  value: string,
  ttlSeconds?: number
): Promise<string | null> {
  return runRedis((client) => {
    if (ttlSeconds) {
      return client.set(key, value, 'EX', ttlSeconds);
    }

    return client.set(key, value);
  });
}

export async function redisDel(key: string): Promise<number | null> {
  return runRedis((client) => client.del(key));
}

export async function redisIncr(key: string): Promise<number | null> {
  return runRedis((client) => client.incr(key));
}
