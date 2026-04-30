require('dotenv/config');
const { randomBytes, pbkdf2Sync } = require('node:crypto');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../src/generated/prisma');

const connectionString = process.env.DATABASE_URL && process.env.DATABASE_URL.trim();

if (!connectionString) {
  throw new Error('DATABASE_URL is required for seeding.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString
  })
});

const PASSWORD_SCHEME = 'pbkdf2_sha256';
const PASSWORD_ITERATIONS = 310000;
const PASSWORD_KEY_LENGTH = 32;

function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEY_LENGTH, 'sha256');

  return [
    PASSWORD_SCHEME,
    PASSWORD_ITERATIONS,
    salt.toString('base64url'),
    hash.toString('base64url')
  ].join('$');
}

async function main() {
  const email = 'admin@notice.local';
  const password = 'Admin@12345';
  const passwordHash = hashPassword(password);

  await prisma.user.upsert({
    where: {
      email
    },
    update: {
      name: 'Admin User',
      password: passwordHash,
      role: 'admin',
      status: 'ACTIVE'
    },
    create: {
      name: 'Admin User',
      email,
      password: passwordHash,
      role: 'admin',
      status: 'ACTIVE'
    }
  });

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
