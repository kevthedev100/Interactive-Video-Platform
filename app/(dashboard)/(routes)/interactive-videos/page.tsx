"use client";

import { useState, useRef, useEffect } from "react";
import { MonitorPlay } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";
import * as lucideIcons from "lucide-react";

const InteractiveVideos = () => {
  const proModal = useProModal();
  const [videos, setVideos] = useState([]);
  const [interactiveVideoId, setInteractiveVideoId] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [buttons, setButtons] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [isInteractiveVideoCreated, setIsInteractiveVideoCreated] = useState(false);
  const [isButtonTypeSelectionVisible, setIsButtonTypeSelectionVisible] = useState(false);
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

  const createInteractiveVideo = async () => {
    if (!videoTitle || !selectedVideo) {
      alert("Bitte alle Felder ausfüllen.");
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
          videoId: selectedVideo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create interactive video');
      }

      const data = await response.json();
      setInteractiveVideoId(data.id);
      setPlayingVideo(selectedVideo);
      setIsInteractiveVideoCreated(true);
      console.log('Interaktives Video erstellt:', data);
    } catch (error) {
      console.error('Error creating interactive video:', error);
    }
  };

  const addNewButton = (type: 'video' | 'link') => {
    setButtons([...buttons, {
      id: Date.now(),
      label: 'Neuer Button',
      link: '',
      url: '',
      type,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Standard-Hintergrundfarbe halb-transparent Schwarz
      textColor: '#ffffff', // Standard-Textfarbe Weiß
      icon: '',
      width: 45, // Standard-Breite
      height: 8, // Standard-Höhe
      top: 84, // Standard-Position von oben
      left: 2, // Standard-Position von links
    }]);
    setIsButtonTypeSelectionVisible(false); // Ausblendung der Auswahl nach der Erstellung
  };

  const updateButton = (id, newProperties) => {
    setButtons(buttons.map(button => 
      button.id === id ? { ...button, ...newProperties } : button
    ));
  };

  const handleInputChange = (id, property, value) => {
    updateButton(id, { [property]: value });
  };

  const handleButtonClick = (button) => {
    if (button.url) {
      window.open(button.url, '_blank');
    } else {
      handlePlayVideo(button.link);
    }
    updateButton(button.id, { isVisible: false });
  };

  const saveButton = async (id) => {
    const button = buttons.find(button => button.id === id);
    if (!button.label || button.width <= 0 || button.height <= 0 || button.top < 0 || button.left < 0) {
      alert("Bitte alle Felder für den Button ausfüllen.");
      return;
    }

    try {
      const response = await fetch(`/api/interactive-videos/${interactiveVideoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(button),
      });

      if (!response.ok) {
        throw new Error('Failed to save button');
      }

      const data = await response.json();
      console.log('Button gespeichert:', data);
    } catch (error) {
      console.error('Error saving button:', error);
    }
  };

  const saveButtons = async () => {
    if (!interactiveVideoId) {
      alert("Bitte erstellen Sie zuerst ein interaktives Video.");
      return;
    }

    try {
      const response = await fetch(`/api/interactive-videos/${interactiveVideoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buttons),
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

  const renderIcon = (iconName) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
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

      {!isInteractiveVideoCreated && (
        <>
          <input
            type="text"
            placeholder="Video Titel"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="mb-4 w-full p-2 border rounded-md"
          />

          <select
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
            className="mb-4 w-full p-2 border rounded-md"
          >
            <option value="">Wähle ein Startvideo</option>
            {videos.map(video => (
              <option key={video.guid} value={video.guid}>
                {video.title}
              </option>
            ))}
          </select>

          <button onClick={createInteractiveVideo} className="bg-blue-500 text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Interaktives Video erstellen
          </button>
        </>
      )}

      {playingVideo && (
        <div className="relative mb-4">
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              ref={iframeRef}
              src={`https://iframe.mediadelivery.net/embed/275360/${playingVideo}?autoplay=true`}
              loading="lazy"
              style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
            {buttons.map(button => (
              button.isVisible !== false && (
                <div 
                  key={button.id} 
                  className="absolute flex items-center justify-center rounded-md"
                  style={{
                    width: `${button.width}%`,
                    height: `${button.height}%`,
                    top: `${button.top}%`,
                    left: `${button.left}%`,
                    backgroundColor: button.backgroundColor,
                    color: button.textColor,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleButtonClick(button)}
                >
                  {button.icon && renderIcon(button.icon)}
                  {button.label}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Keine Videos verfügbar.</p>
      )}

      {interactiveVideoId && !isButtonTypeSelectionVisible && (
        <button onClick={() => setIsButtonTypeSelectionVisible(true)} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
          + Neuen Button erstellen
        </button>
      )}

      {isButtonTypeSelectionVisible && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => addNewButton('video')} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Neues Video auswählen
          </button>
          <button onClick={() => addNewButton('link')} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Link auswählen
          </button>
        </div>
      )}

      {buttons.map((button, index) => (
        <div key={button.id} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2 text-center">
            <h2 className="text-lg font-semibold text-white bg-gray-800 w-full py-2">Button {index + 1}</h2>
          </div>
          <div>
            <label className="font-bold">
              Beschriftung:
              <input 
                type="text" 
                value={button.label} 
                onChange={(e) => handleInputChange(button.id, 'label', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          {button.type === 'video' && (
            <div>
              <label className="font-bold">
                Video:
                <select 
                  value={button.link} 
                  onChange={(e) => handleInputChange(button.id, 'link', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                  disabled={button.url !== ''}
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
          )}
          {button.type === 'link' && (
            <div>
              <label className="font-bold">
                URL:
                <input 
                  type="text" 
                  value={button.url} 
                  onChange={(e) => handleInputChange(button.id, 'url', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
          )}
          <div>
            <label className="font-bold">
              Hintergrundfarbe (Hex):
              <input 
                type="text" 
                value={button.backgroundColor} 
                onChange={(e) => handleInputChange(button.id, 'backgroundColor', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label className="font-bold">
              Textfarbe (Hex):
              <input 
                type="text" 
                value={button.textColor} 
                onChange={(e) => handleInputChange(button.id, 'textColor', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label className="font-bold">
              Icon:
              <input 
                type="text" 
                value={button.icon} 
                onChange={(e) => handleInputChange(button.id, 'icon', e.target.value)} 
                className="ml-2 px-2 py-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div>
            <label className="font-bold">
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
            <label className="font-bold">
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
            <label className="font-bold">
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
            <label className="font-bold">
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
