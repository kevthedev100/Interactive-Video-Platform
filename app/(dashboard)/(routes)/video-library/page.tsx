"use client";

import { useState, useEffect } from "react";
import { ListVideo } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => {
  const proModal = useProModal();
  const [title, setTitle] = useState("");
  const [thumbnailTime, setThumbnailTime] = useState(1);
  const [collectionId, setCollectionId] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videos, setVideos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/VideoList");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.items);  // Angenommen, die Videos befinden sich im `items`-Feld
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnailTime", thumbnailTime.toString());
    formData.append("collectionId", collectionId);
    formData.append("videoFile", videoFile);

    try {
      const response = await fetch("/api/bunny", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Fehlertext auslesen
        throw new Error(`Failed to upload video: ${errorText}`);
      }

      const data = await response.json();
      alert("Video uploaded successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert(`Error uploading video: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <Heading
          title="Video hinzufügen"
          description="Übersicht über deine Einzelvideos"
          icon={ListVideo}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-500/10"
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="px-8">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="px-8">
          <label htmlFor="thumbnailTime" className="block text-sm font-medium text-gray-700">
            Thumbnail Time
          </label>
          <input
            id="thumbnailTime"
            name="thumbnailTime"
            type="number"
            required
            value={thumbnailTime}
            onChange={(e) => setThumbnailTime(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="px-8">
          <label htmlFor="collectionId" className="block text-sm font-medium text-gray-700">
            Collection ID
          </label>
          <input
            id="collectionId"
            name="collectionId"
            type="text"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="px-8">
          <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
            Video File
          </label>
          <input
            id="videoFile"
            name="videoFile"
            type="file"
            required
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="px-8 flex items-center">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Upload Video
          </button>
          {isUploading && (
            <div className="ml-4 flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              <span className="ml-2 text-gray-700">Wir optimieren dein Video - Dauer 1-2 Minuten</span>
            </div>
          )}
        </div>
      </form>

      <div className="mt-8">
        <div className="mb-6">
          <Heading
            title="Video-Mediathek"
            description="Übersicht über deine Einzelvideos"
            icon={ListVideo}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
          {videos.map((video) => (
            <div key={video.guid} className="border border-gray-300 p-4 rounded-md bg-gray-900">
              <h3 className="text-lg font-bold pb-4 text-center text-white">{video.title}</h3>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src={`https://iframe.mediadelivery.net/embed/275360/${video.guid}?autoplay=false`}
                  loading="lazy"
                  style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center text-white">Video ID: {video.guid}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
