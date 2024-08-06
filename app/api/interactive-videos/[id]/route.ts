import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    // Abrufen des interaktiven Videos anhand der ID
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id },
      include: { buttons: true },
    });

    if (!interactiveVideo) {
      // Fehlerbehandlung für den Fall, dass das Video nicht gefunden wird
      return NextResponse.json({ error: 'Interactive video not found' }, { status: 404 });
    }

    // Rückgabe des gefundenen Videos
    return NextResponse.json(interactiveVideo, { status: 200 });
  } catch (error: any) {
    // Fehlerbehandlung mit detailliertem Fehlerbericht
    console.error('Error fetching interactive video:', error.message);
    return NextResponse.json({ error: 'Error fetching interactive video', details: error.message }, { status: 500 });
  }
};

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const button = await req.json();

  try {
    // Prüfen, ob das interaktive Video existiert
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id },
    });

    if (!interactiveVideo) {
      return NextResponse.json({ error: 'Interactive video not found' }, { status: 404 });
    }

    // Erstellen eines neuen Buttons
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

    // Erfolgreiche Erstellung eines Buttons
    return NextResponse.json(createdButton, { status: 201 });
  } catch (error: any) {
    // Fehlerbehandlung mit detaillierter Protokollierung
    console.error('Error saving button:', error.message);
    return NextResponse.json({ error: 'Error saving button', details: error.message }, { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { shareUrl } = await req.json();

  try {
    // Aktualisieren der Share-URL des interaktiven Videos
    const updatedVideo = await prismadb.interactiveVideo.update({
      where: { id },
      data: { shareUrl },
    });

    // Erfolgreiche Aktualisierung der Share-URL
    return NextResponse.json(updatedVideo, { status: 200 });
  } catch (error: any) {
    // Fehlerbehandlung mit detailliertem Fehlerbericht
    console.error('Error updating share URL:', error.message);
    return NextResponse.json({ error: 'Error updating share URL', details: error.message }, { status: 500 });
  }
};
