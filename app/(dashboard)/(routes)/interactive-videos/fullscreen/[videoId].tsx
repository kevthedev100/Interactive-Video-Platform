"use client";

import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const FullScreenVideo = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/VideoList");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.items.slice(0, 3)); // Nehmen wir die ersten 3 Videos für die Interaktivität
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (iframeRef.current && videoId) {
      iframeRef.current.src = `https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`;
      setPlayingVideo(videoId as string);
    }
  }, [videoId]);

  const handlePlayVideo = (videoId: string) => {
    if (iframeRef.current) {
      iframeRef.current.src = `https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`;
      setPlayingVideo(videoId);
    }
  };

  return (
    <div className="h-screen w-screen relative">
      <iframe
        ref={iframeRef}
        loading="lazy"
        style={{ border: 'none', height: '100%', width: '100%' }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <button
          onClick={() => handlePlayVideo(videos[1].guid)}
          className="bg-amber-500 text-white px-4 py-2 rounded-md text-lg"
        >
          Play Next Video
        </button>
        <button
          onClick={() => handlePlayVideo(videos[2].guid)}
          className="bg-amber-500 text-white px-4 py-2 rounded-md text-lg"
        >
          Play Another Video
        </button>
      </div>
    </div>
  );
};

export default FullScreenVideo;
