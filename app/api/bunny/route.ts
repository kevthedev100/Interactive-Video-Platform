import { NextResponse } from "next/server";
import fetch from 'node-fetch';
import { Readable } from 'stream';

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const thumbnailTime = formData.get("thumbnailTime") as string;
  const collectionId = formData.get("collectionId") as string;
  const videoFile = formData.get("videoFile") as File;

  const createVideoUrl = 'https://video.bunnycdn.com/library/275360/videos';
  const createVideoOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      AccessKey: '65d55a22-1994-4959-99b373b69a4b-ca0f-4cd5'
    },
    body: JSON.stringify({ title, thumbnailTime, collectionId })
  };

  try {
    // Schritt 1: Video erstellen
    const createResponse = await fetch(createVideoUrl, createVideoOptions);
    const createText = await createResponse.text();  // Antwort als Text lesen
    let createData;

    try {
      createData = JSON.parse(createText);  // Versuch, die Antwort als JSON zu parsen
    } catch (err) {
      console.error('Failed to parse JSON response:', createText);
      throw err;
    }

    if (!createResponse.ok) {
      return new NextResponse(`Error creating video: ${createData.message}`, { status: createResponse.status });
    }

    const videoId = createData.guid;

    // Schritt 2: Video hochladen
    const uploadUrl = `https://video.bunnycdn.com/library/275360/videos/${videoId}?skipEncoding=false`;
    const uploadOptions = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        AccessKey: '65d55a22-1994-4959-99b373b69a4b-ca0f-4cd5'
      },
      body: Readable.from(videoFile.stream())
    };

    const uploadResponse = await fetch(uploadUrl, uploadOptions);
    const uploadText = await uploadResponse.text();  // Antwort als Text lesen
    let uploadData;

    try {
      uploadData = JSON.parse(uploadText);  // Versuch, die Antwort als JSON zu parsen
    } catch (err) {
      console.error('Failed to parse JSON response:', uploadText);
      throw err;
    }

    if (!uploadResponse.ok) {
      return new NextResponse(`Error uploading video: ${uploadData.message}`, { status: uploadResponse.status });
    }

    return new NextResponse(JSON.stringify({ createData, uploadData }), { status: 200 });
  } catch (err) {
    console.error('error:', err);
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
};
