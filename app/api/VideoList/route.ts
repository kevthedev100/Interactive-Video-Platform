import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function GET() {
  const libraryUrl = 'https://video.bunnycdn.com/library/275360/videos';
  const libraryOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      AccessKey: '65d55a22-1994-4959-99b373b69a4b-ca0f-4cd5'
    }
  };

  try {
    const libraryResponse = await fetch(libraryUrl, libraryOptions);
    const libraryText = await libraryResponse.text();  // Antwort als Text lesen
    let libraryData;

    try {
      libraryData = JSON.parse(libraryText);  // Versuch, die Antwort als JSON zu parsen
    } catch (err) {
      console.error('Failed to parse JSON response:', libraryText);
      throw err;
    }

    if (!libraryResponse.ok) {
      return new NextResponse(`Error fetching video library: ${libraryData.message}`, { status: libraryResponse.status });
    }

    // Für jedes Video die URL abrufen
    const videosWithUrls = await Promise.all(libraryData.items.map(async (video) => {
      const videoUrl = `https://video.bunnycdn.com/library/275360/videos/${video.guid}`;
      const videoOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          AccessKey: '65d55a22-1994-4959-99b373b69a4b-ca0f-4cd5'
        }
      };

      try {
        const videoResponse = await fetch(videoUrl, videoOptions);
        const videoData = await videoResponse.json();
        video.url = videoData.url;  // Nehmen wir an, dass die URL des Videos in videoData.url enthalten ist
      } catch (err) {
        console.error(`Failed to fetch video URL for ${video.guid}`, err);
      }

      return video;
    }));

    return new NextResponse(JSON.stringify({ items: videosWithUrls }), { status: 200 });
  } catch (err) {
    console.error('error:', err);
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
};
