import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// GET request handler: Fetch an interactive video by its ID along with its associated buttons
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    // Fetch the interactive video by its ID, including the associated buttons
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id },
      include: { buttons: true },
    });

    if (!interactiveVideo) {
      // If the video is not found, return a 404 error
      return NextResponse.json({ error: 'Interactive video not found' }, { status: 404 });
    }

    // Return the found video with a 200 status
    return NextResponse.json(interactiveVideo, { status: 200 });
  } catch (error: any) {
    // Log the error and return a 500 error response
    console.error('Error fetching interactive video:', error.message);
    return NextResponse.json({ error: 'Error fetching interactive video', details: error.message }, { status: 500 });
  }
};

// PATCH request handler: Update the share URL of an interactive video
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { shareUrl } = await req.json();

  try {
    // Update the share URL of the interactive video
    const updatedVideo = await prismadb.interactiveVideo.update({
      where: { id },
      data: { shareUrl },
    });

    // Return the updated video with a 200 status
    return NextResponse.json(updatedVideo, { status: 200 });
  } catch (error: any) {
    // Log the error and return a 500 error response
    console.error('Error updating share URL:', error.message);
    return NextResponse.json({ error: 'Error updating share URL', details: error.message }, { status: 500 });
  }
};
