import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getCurrentAdminSession } from '@/lib/auth';
import { requireApiAccess } from '@/lib/access';

import {
  archiveUser,
  resetUserPassword,
  updateUser,
  UsersServiceError
} from '@/features/users/api/service';
import { userPasswordResetSchema, userUpdateSchema } from '@/features/users/schemas/user';

type Params = {
  params: Promise<{ id: string }>;
};

function buildErrorResponse(error: unknown) {
  if (error instanceof UsersServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: 'Unexpected user operation error' }, { status: 500 });
}

export async function PUT(request: NextRequest, context: Params) {
  const forbidden = await requireApiAccess('/api/users', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await context.params;
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = userUpdateSchema.safeParse(body);

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
    const user = await updateUser(id, parsed.data, session.user.id);
    revalidatePath('/dashboard/users');
    return NextResponse.json({ user });
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest, context: Params) {
  const forbidden = await requireApiAccess('/api/users', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await context.params;
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = userPasswordResetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid password payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const user = await resetUserPassword(id, parsed.data, session.user.id);
    revalidatePath('/dashboard/users');
    return NextResponse.json({ user });
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: Params) {
  const forbidden = await requireApiAccess('/api/users', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await context.params;
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await archiveUser(id, session.user.id);
    revalidatePath('/dashboard/users');
    return NextResponse.json({ user });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
