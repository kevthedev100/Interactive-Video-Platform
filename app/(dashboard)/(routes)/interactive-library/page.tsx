"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MonitorPlay } from "lucide-react";
import { Heading } from "@/components/heading";

const InteractiveLibrary = () => {
  const router = useRouter();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchInteractiveVideos = async () => {
      try {
        const response = await fetch("/api/interactive-videos");
        if (!response.ok) {
          throw new Error("Failed to fetch interactive videos");
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching interactive videos:", error);
      }
    };

    fetchInteractiveVideos();
  }, []);

  const handleEdit = (id) => {
    router.push(`/interactive-videos/${id}/edit`);
  };

  const handleShare = (videoId) => {
    router.push(`/interactive-videos/${videoId}/view`);
  };

  return (
    <div className="p-4">
      <Heading
        title="Interaktive Videos"
        description="Übersicht über deine interaktiven Videos"
        icon={MonitorPlay}
        iconColor="text-amber-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
        {videos.map((video) => (
          <div key={video.id} className="border border-gray-300 p-4 rounded-md bg-gray-900">
            <h3 className="text-lg font-bold pb-4 text-center text-white">{video.title}</h3>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={`https://iframe.mediadelivery.net/embed/275360/${video.videoId}?autoplay=false`}
                loading="lazy"
                style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center text-white">Video ID: {video.videoId}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(video.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Bearbeiten
              </button>
              <button
                onClick={() => handleShare(video.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Teilen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveLibrary;
