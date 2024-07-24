import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const button = await req.json();

  try {
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id },
    });

    if (!interactiveVideo) {
      return NextResponse.json({ error: 'Interactive video not found' }, { status: 404 });
    }

    const createdButton = await prismadb.button.create({
      data: {
        ...button,
        videoId: id,
      },
    });

    return NextResponse.json(createdButton, { status: 200 });
  } catch (error) {
    console.error('Error saving button:', error);
    return NextResponse.json({ error: 'Error saving button' }, { status: 500 });
  }
};

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id },
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
