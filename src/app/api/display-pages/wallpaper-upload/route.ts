import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';

import { requireApiAccess } from '@/lib/access';

const MAX_WALLPAPER_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

export async function POST(request: NextRequest) {
  const forbidden = await requireApiAccess('/api/display-pages', request.method);
  if (forbidden) {
    return forbidden;
  }

  const formData = await request.formData().catch(() => null);
  const fileEntry = formData?.get('file');

  if (!(fileEntry instanceof File)) {
    return NextResponse.json({ message: 'Wallpaper file is required' }, { status: 400 });
  }

  if (!(fileEntry.type in ALLOWED_TYPES)) {
    return NextResponse.json(
      {
        message: 'Wallpaper must be a JPG, PNG, or WEBP image'
      },
      { status: 415 }
    );
  }

  if (fileEntry.size > MAX_WALLPAPER_BYTES) {
    return NextResponse.json(
      {
        message: 'Wallpaper image must be 5MB or smaller'
      },
      { status: 413 }
    );
  }

  const extension = ALLOWED_TYPES[fileEntry.type];
  const fileName = `${randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'display-wallpapers');
  const filePath = path.join(uploadDir, fileName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, Buffer.from(await fileEntry.arrayBuffer()));

  return NextResponse.json({
    imageUrl: `/uploads/display-wallpapers/${fileName}`
  });
}
