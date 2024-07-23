"use client";

import { useState, useRef, useEffect } from "react";
import { MonitorPlay } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

const InteractiveVideos = () => {
  const proModal = useProModal();
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
    <div className="p-4">
      <div className="mb-6">
        <Heading
          title="Interaktive Videos"
          description="Übersicht über deine Videos"
          icon={MonitorPlay}
          iconColor="text-amber-500"
          bgColor="bg-orange-700/10"
        />
      </div>

      {videos.length > 0 && (
        <div className="relative">
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              ref={iframeRef}
              src={`https://iframe.mediadelivery.net/embed/275360/${videos[0].guid}?autoplay=false`}
              loading="lazy"
              style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }}
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
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Keine Videos verfügbar.</p>
      )}
    </div>
  );
};

export default InteractiveVideos;
