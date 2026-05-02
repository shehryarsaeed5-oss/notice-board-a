import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';
import {
  archiveConcessionPriceItem,
  ConcessionPriceItemNotFoundError,
  getConcessionPriceItemById,
  updateConcessionPriceItem
} from '@/features/concession-price-list/api/service';
import { concessionPriceItemSchema } from '@/features/concession-price-list/schemas/concession-price-item';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/concession-price-list', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;

  try {
    const concessionPriceItem = await getConcessionPriceItemById(id);
    return NextResponse.json({ concessionPriceItem });
  } catch (error) {
    if (error instanceof ConcessionPriceItemNotFoundError) {
      return NextResponse.json({ message: 'Concession price item not found' }, { status: 404 });
    }

    throw error;
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/concession-price-list', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
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

  try {
    const concessionPriceItem = await updateConcessionPriceItem(id, parsed.data);

    revalidatePath('/dashboard/concession-price-list');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ concessionPriceItem });
  } catch (error) {
    if (error instanceof ConcessionPriceItemNotFoundError) {
      return NextResponse.json({ message: 'Concession price item not found' }, { status: 404 });
    }

    throw error;
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/concession-price-list', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  await request.json().catch(() => null);

  try {
    const concessionPriceItem = await archiveConcessionPriceItem(id);

    revalidatePath('/dashboard/concession-price-list');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ concessionPriceItem });
  } catch (error) {
    if (error instanceof ConcessionPriceItemNotFoundError) {
      return NextResponse.json({ message: 'Concession price item not found' }, { status: 404 });
    }

    throw error;
  }
}
