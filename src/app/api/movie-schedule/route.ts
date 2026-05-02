import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { createMovieSchedule, getMovieSchedules } from '@/features/movie-schedule/api/service';
import { movieScheduleSchema } from '@/features/movie-schedule/schemas/movie-schedule';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const showDate = searchParams.get('showDate') ?? undefined;

  const data = await getMovieSchedules({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined,
    showDate
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
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

  const movieSchedule = await createMovieSchedule(parsed.data);

  revalidatePath('/dashboard/movie-schedule');

  return NextResponse.json({ movieSchedule }, { status: 201 });
}
