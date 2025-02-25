import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// API für alle interaktiven Videos
export const GET = async () => {
  try {
    // Alle interaktiven Videos abrufen, einschließlich der zugehörigen Buttons
    const interactiveVideos = await prismadb.interactiveVideo.findMany({
      include: {
        buttons: true,
      },
    });

    // Erfolgreiche Rückgabe aller interaktiven Videos mit Status 200
    return NextResponse.json(interactiveVideos, { status: 200 });
  } catch (error: any) {
    // Fehlerbehandlung mit detaillierter Protokollierung
    console.error('Error fetching interactive videos:', error.message);
    return NextResponse.json({ error: 'Error fetching interactive videos', details: error.message }, { status: 500 });
  }
};

// API zum Erstellen eines neuen interaktiven Videos
export const POST = async (req: Request) => {
  try {
    const { title, videoId } = await req.json();

    // Überprüfen, ob die erforderlichen Daten vorhanden sind
    if (!title || !videoId) {
      return NextResponse.json({ error: 'Title and Video ID are required' }, { status: 400 });
    }

    // Neues interaktives Video erstellen
    const interactiveVideo = await prismadb.interactiveVideo.create({
      data: {
        title,
        videoId,
      },
    });

    // Erfolgreiche Rückgabe des erstellten interaktiven Videos mit Status 201
    return NextResponse.json(interactiveVideo, { status: 201 });
  } catch (error: any) {
    // Fehlerbehandlung mit detaillierter Protokollierung
    console.error('Error creating interactive video:', error.message);
    return NextResponse.json({ error: 'Error creating interactive video', details: error.message }, { status: 500 });
  }
};
