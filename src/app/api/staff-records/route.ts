import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createStaffMember, getStaffMembers } from '@/features/staff-records/api/service';
import { staffMemberSchema } from '@/features/staff-records/schemas/staff-member';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const data = await getStaffMembers({
    search,
    status:
      status === 'ACTIVE' || status === 'INACTIVE' || status === 'ARCHIVED' ? status : undefined
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = staffMemberSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Invalid staff payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const staffMember = await createStaffMember(parsed.data);

  revalidatePath('/dashboard/staff-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ staffMember }, { status: 201 });
}
