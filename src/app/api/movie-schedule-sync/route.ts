import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

import {
  clearMovieScheduleSyncedRows,
  getMovieScheduleSyncOverview,
  runMovieScheduleSync,
  updateMovieScheduleSyncSetting,
  MovieScheduleSyncServiceError
} from '@/features/movie-schedule-sync/api/service';
import {
  movieScheduleSyncRunSchema,
  movieScheduleSyncSettingSchema
} from '@/features/movie-schedule-sync/schemas/movie-schedule-sync';

function buildErrorResponse(error: unknown) {
  if (error instanceof MovieScheduleSyncServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: 'Unexpected movie schedule sync error' }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/movie-schedule-sync', request.method);
  if (forbidden) {
    return forbidden;
  }

  const date =
    request.nextUrl.searchParams.get('date') ??
    request.nextUrl.searchParams.get('showDate') ??
    undefined;

  const overview = await getMovieScheduleSyncOverview(date ?? undefined);

  return NextResponse.json({ overview });
}

export async function PATCH(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/movie-schedule-sync', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = movieScheduleSyncSettingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid movie schedule sync settings payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const setting = await updateMovieScheduleSyncSetting(parsed.data);
    const overview = await getMovieScheduleSyncOverview();

    revalidatePath('/dashboard/movie-schedule-sync');

    return NextResponse.json({ overview: { ...overview, setting } });
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/movie-schedule-sync', request.method);
  if (forbidden) {
    return forbidden;
  }

  const body = await request.json();
  const parsed = movieScheduleSyncRunSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid movie schedule sync run payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const overview = await runMovieScheduleSync(parsed.data);

    revalidatePath('/dashboard/movie-schedule-sync');

    return NextResponse.json({ overview });
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/movie-schedule-sync', request.method);
  if (forbidden) {
    return forbidden;
  }

  try {
    await clearMovieScheduleSyncedRows();
    const overview = await getMovieScheduleSyncOverview();

    revalidatePath('/dashboard/movie-schedule-sync');

    return NextResponse.json({ overview });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
