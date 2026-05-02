import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import { createUser, getUsers, UsersServiceError } from '@/features/users/api/service';
import { userCreateSchema } from '@/features/users/schemas/user';
import type { UserStatus } from '@/features/users/api/types';

function buildErrorResponse(error: unknown) {
  if (error instanceof UsersServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: 'Unexpected user operation error' }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/users', request.method);
  if (forbidden) {
    return forbidden;
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getUsers({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
        ? (status as UserStatus)
        : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/users', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = userCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid user payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const user = await createUser(parsed.data);

    revalidatePath('/dashboard/users');

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
