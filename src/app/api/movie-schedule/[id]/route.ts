import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { archiveMovieSchedule, updateMovieSchedule } from '@/features/movie-schedule/api/service';
import { movieScheduleSchema } from '@/features/movie-schedule/schemas/movie-schedule';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = movieScheduleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid movie schedule payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const movieSchedule = await updateMovieSchedule(id, parsed.data);

  revalidatePath('/dashboard/movie-schedule');

  return NextResponse.json({ movieSchedule });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const movieSchedule = await archiveMovieSchedule(id);

  revalidatePath('/dashboard/movie-schedule');

  return NextResponse.json({ movieSchedule });
}
