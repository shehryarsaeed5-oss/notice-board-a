import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  archiveStaffMember,
  deleteStaffMember,
  updateStaffMember
} from '@/features/staff-records/api/service';
import { staffMemberSchema } from '@/features/staff-records/schemas/staff-member';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
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

  const staffMember = await updateStaffMember(id, parsed.data);

  revalidatePath('/dashboard/staff-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ staffMember });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const staffMember = await archiveStaffMember(id);

  revalidatePath('/dashboard/staff-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ staffMember });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await request.json().catch(() => null);
  const staffMember = await deleteStaffMember(id);

  if (!staffMember) {
    return NextResponse.json({ message: 'Staff member not found' }, { status: 404 });
  }

  revalidatePath('/dashboard/staff-records');
  revalidatePath('/dashboard/overview');

  return NextResponse.json({ staffMember });
}
