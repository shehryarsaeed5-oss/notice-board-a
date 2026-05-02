import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import {
  createConcessionPriceItem,
  getConcessionPriceItems
} from '@/features/concession-price-list/api/service';
import { concessionPriceItemSchema } from '@/features/concession-price-list/schemas/concession-price-item';

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/concession-price-list', request.method);
  if (forbidden) {
    return forbidden;
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  const data = await getConcessionPriceItems({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined,
    category
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/concession-price-list', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = concessionPriceItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid concession price item payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const concessionPriceItem = await createConcessionPriceItem(parsed.data);

  revalidatePath('/dashboard/concession-price-list');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ concessionPriceItem }, { status: 201 });
}
