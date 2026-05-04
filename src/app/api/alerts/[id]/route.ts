import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import {
  archiveAlert,
  AlertNotFoundError,
  AlertsServiceError,
  updateAlert
} from '@/features/alerts/api/service';
import { alertSchema } from '@/features/alerts/schemas/alert';

type Params = { params: Promise<{ id: string }> };

function buildErrorResponse(error: unknown) {
  if (error instanceof AlertsServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: 'Unexpected alert operation error' }, { status: 500 });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/alerts', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = alertSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid alert payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const alert = await updateAlert(id, parsed.data);

    revalidatePath('/dashboard/alerts');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ alert });
  } catch (error) {
    if (error instanceof AlertNotFoundError) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    return buildErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const forbidden = await requireApiAccess('/api/alerts', request.method);
  if (forbidden) {
    return forbidden;
  }

  const { id } = await params;
  await request.json().catch(() => null);

  try {
    const alert = await archiveAlert(id);

    revalidatePath('/dashboard/alerts');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ alert });
  } catch (error) {
    if (error instanceof AlertNotFoundError) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    return buildErrorResponse(error);
  }
}
