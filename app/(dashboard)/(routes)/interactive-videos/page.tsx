"use client";

import { useState, useRef, useEffect } from "react";
import { MonitorPlay } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

const InteractiveVideos = () => {
  const proModal = useProModal();
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [buttons, setButtons] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/VideoList");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.items); // Lade alle Videos für die Dropdowns
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

  const addNewButton = () => {
    setButtons([...buttons, {
      id: Date.now(),
      label: 'Neuer Button',
      link: '',
      width: 10,
      height: 5,
      top: 10,
      left: 10,
    }]);
  };

  const updateButton = (id, newProperties) => {
    setButtons(buttons.map(button => 
      button.id === id ? { ...button, ...newProperties } : button
    ));
  };

  const handleInputChange = (id, property, value) => {
    updateButton(id, { [property]: value });
  };

  const saveButton = (id) => {
    const button = buttons.find(button => button.id === id);
    if (!button.label || !button.link || button.width <= 0 || button.height <= 0 || button.top < 0 || button.left < 0) {
      alert("Bitte alle Felder für den Button ausfüllen.");
      return;
    }

    console.log("Button gespeichert:", button);
  };

  const saveButtons = async () => {
    if (!videoTitle || !playingVideo || buttons.length === 0) {
      alert("Bitte alle Felder ausfüllen und mindestens einen Button hinzufügen.");
      return;
    }

    try {
      const response = await fetch('/api/interactive-videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: videoTitle,
          videoId: playingVideo,
          buttons,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save buttons');
      }

      const data = await response.json();
      console.log('Buttons gespeichert:', data);
    } catch (error) {
      console.error('Error saving buttons:', error);
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

      <input
        type="text"
        placeholder="Video Titel"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
        className="mb-4 w-full p-2 border rounded-md"
      />


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
            {buttons.map(button => (
              <div 
                key={button.id} 
                className="absolute bg-amber-500 text-white flex items-center justify-center rounded-md"
                style={{
                  width: `${button.width}%`,
                  height: `${button.height}%`,
                  top: `${button.top}%`,
                  left: `${button.left}%`,
                  cursor: 'pointer',
                }}
                onClick={() => handlePlayVideo(button.link)}
              >
                {button.label}
              </div>
            ))}
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

      <button onClick={addNewButton} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
        + Neuen Button erstellen
      </button>


      {buttons.map(button => (
        <div key={button.id} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>
              Beschriftung:
              <input 
                type="text" 
                value={button.label} 
                onChange={(e) => handleInputChange(button.id, 'label', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Video:
              <select 
                value={button.link} 
                onChange={(e) => handleInputChange(button.id, 'link', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              >
                <option value="">Wähle ein Video</option>
                {videos.map(video => (
                  <option key={video.guid} value={video.guid}>
                    {video.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Breite (%):
              <input 
                type="number" 
                value={button.width} 
                onChange={(e) => handleInputChange(button.id, 'width', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Höhe (%):
              <input 
                type="number" 
                value={button.height} 
                onChange={(e) => handleInputChange(button.id, 'height', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Oben (%):
              <input 
                type="number" 
                value={button.top} 
                onChange={(e) => handleInputChange(button.id, 'top', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Links (%):
              <input 
                type="number" 
                value={button.left} 
                onChange={(e) => handleInputChange(button.id, 'left', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <button
              onClick={() => saveButton(button.id)}
              className="bg-green-500 text-white px-2 py-1 rounded-md mt-2 w-full"
            >
              Diesen Button speichern
            </button>
          </div>
        </div>
      ))}

      {buttons.length > 0 && (
        <button onClick={saveButtons} className="bg-green-800 text-white px-4 py-4 rounded-md mt-4 w-full">
          Alle Buttons speichern
        </button>
      )}
    </div>
  );
};

export default InteractiveVideos;
