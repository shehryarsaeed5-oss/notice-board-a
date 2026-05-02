import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { createAdvertisement, getAdvertisements } from '@/features/advertisements/api/service';
import { advertisementSchema } from '@/features/advertisements/schemas/advertisement';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const mediaType = searchParams.get('mediaType') ?? undefined;

  const data = await getAdvertisements({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined,
    mediaType: mediaType === 'IMAGE' || mediaType === 'VIDEO' ? mediaType : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
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

  const advertisement = await createAdvertisement(parsed.data);

  revalidatePath('/dashboard/advertisements');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ advertisement }, { status: 201 });
}
