import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { archiveAdvertisement, updateAdvertisement } from '@/features/advertisements/api/service';
import { advertisementSchema } from '@/features/advertisements/schemas/advertisement';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = advertisementSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid advertisement payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const advertisement = await updateAdvertisement(id, parsed.data);

  revalidatePath('/dashboard/advertisements');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ advertisement });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const advertisement = await archiveAdvertisement(id);

  revalidatePath('/dashboard/advertisements');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ advertisement });
}
