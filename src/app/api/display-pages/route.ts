import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import {
  createDisplayPage,
  getDisplayPages,
  DisplayPageSlugConflictError
} from '@/features/display-pages/api/service';
import { displayPageSchema } from '@/features/display-pages/schemas/display-page';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getDisplayPages({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
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
    const displayPage = await createDisplayPage(parsed.data);

    revalidatePath('/dashboard/display-pages');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ displayPage }, { status: 201 });
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
