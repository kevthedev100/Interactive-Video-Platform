import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id: id as string },
      include: { buttons: true },
    });

    if (!interactiveVideo) {
      return NextResponse.json({ error: 'Interactive video not found' }, { status: 404 });
    }

    return NextResponse.json(interactiveVideo, { status: 200 });
  } catch (error) {
    console.error('Error fetching interactive video:', error);
    return NextResponse.json({ error: 'Error fetching interactive video' }, { status: 500 });
  }
};
