import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import { createAlert, getAlerts, AlertsServiceError } from '@/features/alerts/api/service';
import type { AlertStatus, AlertType } from '@/features/alerts/api/types';
import { alertSchema } from '@/features/alerts/schemas/alert';

function buildErrorResponse(error: unknown) {
  if (error instanceof AlertsServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: 'Unexpected alert operation error' }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/alerts', request.method);
  if (forbidden) {
    return forbidden;
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const alertType = searchParams.get('alertType') ?? undefined;

  const data = await getAlerts({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED'
        ? (status as AlertStatus)
        : undefined,
    alertType:
      alertType === 'INFO' ||
      alertType === 'WARNING' ||
      alertType === 'URGENT' ||
      alertType === 'SUCCESS'
        ? (alertType as AlertType)
        : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/alerts', request.method);
  if (forbidden) {
    return forbidden;
  }

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
    const alert = await createAlert(parsed.data);

    revalidatePath('/dashboard/alerts');
    revalidatePath('/dashboard/overview');

    return NextResponse.json({ alert }, { status: 201 });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
