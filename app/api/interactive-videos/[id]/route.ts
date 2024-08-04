import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// API für ein einzelnes interaktives Video
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
        label: button.label,
        link: button.type === 'video' ? button.link : null,
        url: button.type === 'link' ? button.url : null,
        width: button.width,
        height: button.height,
        top: button.top,
        left: button.left,
        videoId: id,
        backgroundColor: button.backgroundColor,
        textColor: button.textColor,
        icon: button.icon,
      },
    });

    return NextResponse.json(createdButton, { status: 200 });
  } catch (error) {
    console.error('Error saving button:', error);
    return NextResponse.json({ error: 'Error saving button' }, { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { shareUrl } = await req.json();

  try {
    const updatedVideo = await prismadb.interactiveVideo.update({
      where: { id },
      data: { shareUrl },
    });

    return NextResponse.json(updatedVideo, { status: 200 });
  } catch (error) {
    console.error('Error updating share URL:', error);
    return NextResponse.json({ error: 'Error updating share URL' }, { status: 500 });
  }
};
