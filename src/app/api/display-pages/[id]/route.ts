import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import {
  archiveDisplayPage,
  DisplayPageSlugConflictError,
  updateDisplayPage
} from '@/features/display-pages/api/service';
import { displayPageSchema } from '@/features/display-pages/schemas/display-page';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/display-pages', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = displayPageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid display page payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const displayPage = await updateDisplayPage(id, parsed.data);

    revalidatePath('/dashboard/display-pages');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ displayPage });
  } catch (error) {
    if (error instanceof DisplayPageSlugConflictError) {
      return NextResponse.json(
        {
          message: 'Display page slug already exists'
        },
        { status: 409 }
      );
    }

    throw error;
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/display-pages', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  await request.json().catch(() => null);
  const displayPage = await archiveDisplayPage(id);

  revalidatePath('/dashboard/display-pages');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ displayPage });
}
