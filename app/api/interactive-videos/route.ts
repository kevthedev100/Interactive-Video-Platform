import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// API für alle interaktiven Videos
export const GET = async () => {
  try {
    // Alle interaktiven Videos abrufen
    const interactiveVideos = await prismadb.interactiveVideo.findMany({
      include: {
        buttons: true,
      },
    });

    return NextResponse.json(interactiveVideos, { status: 200 });
  } catch (error) {
    console.error('Error fetching interactive videos:', error);
    return NextResponse.json({ error: 'Error fetching interactive videos' }, { status: 500 });
  }
};

// API zum Erstellen eines neuen interaktiven Videos
export const POST = async (req: Request) => {
  const { title, videoId } = await req.json();

  try {
    // Neues interaktives Video erstellen
    const interactiveVideo = await prismadb.interactiveVideo.create({
      data: {
        title,
        videoId,
      },
    });

    return NextResponse.json(interactiveVideo, { status: 201 });
  } catch (error) {
    console.error('Error creating interactive video:', error);
    return NextResponse.json({ error: 'Error creating interactive video' }, { status: 500 });
  }
};
