"use client";

import { useState, useRef, useEffect } from "react";

const FullScreenVideo = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

  const handlePlayVideo = (videoId: string) => {
    if (iframeRef.current) {
      iframeRef.current.src = `https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`;
      setPlayingVideo(videoId);
    }
  };

  return (
    <div className="w-screen h-screen">
      {videos.length > 0 && (
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            src={`https://iframe.mediadelivery.net/embed/275360/${videos[0].guid}?autoplay=false`}
            loading="lazy"
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            onClick={() => handlePlayVideo(videos[1].guid)}
            className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-md"
          >
            Play Next Video
          </button>
          <button
            onClick={() => handlePlayVideo(videos[2].guid)}
            className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md"
          >
            Play Another Video
          </button>
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Keine Videos verfügbar.</p>
      )}
    </div>
  );
};

export default FullScreenVideo;
