import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// Erstelle ein interaktives Video (möglicherweise mit Authentifizierung)
export const POST = async (req: Request) => {
  const { title, videoId } = await req.json();

  try {
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

// Alle interaktiven Videos abrufen (ohne Authentifizierung)
export const GET = async () => {
  try {
    const interactiveVideos = await prismadb.interactiveVideo.findMany({
      include: {
        buttons: true, // Buttons einbinden
      },
    });

    return NextResponse.json(interactiveVideos, { status: 200 });
  } catch (error) {
    console.error('Error fetching interactive videos:', error);
    return NextResponse.json({ error: 'Error fetching interactive videos' }, { status: 500 });
  }
};
