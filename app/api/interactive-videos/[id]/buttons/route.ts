import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// POST request handler: Create a new button for an interactive video
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const button = await req.json();

  try {
    // Check if the interactive video exists
    const interactiveVideo = await prismadb.interactiveVideo.findUnique({
      where: { id },
    });

    if (!interactiveVideo) {
      // If the video is not found, return a 404 error
      return NextResponse.json({ error: 'Interactive video not found' }, { status: 404 });
    }

    // Create a new button associated with the interactive video
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
        isVisible: button.isVisible,  // Handle button visibility
      },
    });

    // Return the created button with a 201 status
    return NextResponse.json(createdButton, { status: 201 });
  } catch (error: any) {
    // Log the error and return a 500 error response
    console.error('Error saving button:', error.message);
    return NextResponse.json({ error: 'Error saving button', details: error.message }, { status: 500 });
  }
};

// GET request handler: Fetch all buttons for a specific interactive video
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    // Fetch all buttons associated with the interactive video
    const buttons = await prismadb.button.findMany({
      where: { videoId: id },
    });

    if (buttons.length === 0) {
      // If no buttons are found, return a 404 error
      return NextResponse.json({ error: 'No buttons found for this video' }, { status: 404 });
    }

    // Return the found buttons with a 200 status
    return NextResponse.json(buttons, { status: 200 });
  } catch (error: any) {
    // Log the error and return a 500 error response
    console.error('Error fetching buttons:', error.message);
    return NextResponse.json({ error: 'Error fetching buttons', details: error.message }, { status: 500 });
  }
};
