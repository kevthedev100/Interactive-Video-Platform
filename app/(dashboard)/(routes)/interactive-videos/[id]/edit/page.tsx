"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus, MonitorPlay } from "lucide-react";
import { Heading } from "@/components/heading";
import * as lucideIcons from "lucide-react";

const EditInteractiveVideo = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [interactiveVideoId, setInteractiveVideoId] = useState(id);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [buttons, setButtons] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [isInteractiveVideoCreated, setIsInteractiveVideoCreated] = useState(false);
  const [isButtonTypeSelectionVisible, setIsButtonTypeSelectionVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    const fetchInteractiveVideo = async () => {
      try {
        const response = await fetch(`/api/interactive-videos/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interactive video");
        }
        const data = await response.json();
        setVideoTitle(data.title);
        setSelectedVideo(data.videoId);
        setPlayingVideo(data.videoId);
        setButtons(data.buttons || []);
        setIsInteractiveVideoCreated(true);
      } catch (error) {
        console.error("Error fetching interactive video:", error);
      }
    };

    fetchVideos();
    fetchInteractiveVideo();
  }, [id]);

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  const addNewButton = (type: 'video' | 'link') => {
    setButtons([...buttons, {
      id: Date.now().toString(),
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

  const updateButton = (index, newProperties) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], ...newProperties };
    setButtons(newButtons);
  };

  const handleInputChange = (index, property, value) => {
    updateButton(index, { [property]: value });
  };

  const handleButtonClick = (index) => {
    const button = buttons[index];
    if (!button.label || (button.type === 'video' && !button.link) || (button.type === 'link' && !button.url)) {
      setErrorMessage("Du musst alle Felder ausfüllen.");
      return;
    }

    if (button.url) {
      window.open(button.url, '_blank');
    } else {
      handlePlayVideo(button.link);
    }
    updateButton(index, { isVisible: false });
    setErrorMessage('');
  };

  const saveButton = async (index) => {
    const button = buttons[index];
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
      <Heading
        title="Bearbeite dein interaktives Video"
        description="Hier kannst du dein interaktives Video bearbeiten"
        icon={Plus}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      {isInteractiveVideoCreated && (
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

          <div className="relative mb-4">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={`https://iframe.mediadelivery.net/embed/275360/${playingVideo}?autoplay=true`}
                loading="lazy"
                style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
              {buttons.map((button, index) => (
                button.isVisible !== false && (
                  <div 
                    key={index} 
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
                    onClick={() => handleButtonClick(index)}
                  >
                    {button.icon && renderIcon(button.icon)}
                    {button.label}
                  </div>
                )
              ))}
            </div>
          </div>
        </>
      )}

      {interactiveVideoId && !isButtonTypeSelectionVisible && (
        <button onClick={() => setIsButtonTypeSelectionVisible(true)} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
          + Neuen Button erstellen
        </button>
      )}

      {isButtonTypeSelectionVisible && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => addNewButton('video')} className="bg-blue-800 text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Neues Video auswählen
          </button>
          <button onClick={() => addNewButton('link')} className="bg-orange-800 text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Link auswählen
          </button>
        </div>
      )}

      {buttons.map((button, index) => (
        <div key={index}>
          <h2 className="text-center text-white bg-gray-500 py-2 rounded-md mb-4">
            Button {index + 1} - {button.type === 'video' ? 'Video wechseln' : 'Link'}
          </h2>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">Beschriftung:
                <input 
                  type="text" 
                  value={button.label} 
                  onChange={(e) => handleInputChange(index, 'label', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            {button.type === 'video' && (
              <div>
                <label className="font-bold">Video:
                  <select 
                    value={button.link} 
                    onChange={(e) => handleInputChange(index, 'link', e.target.value)} 
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
                <label className="font-bold">URL:
                  <input 
                    type="text" 
                    value={button.url} 
                    onChange={(e) => handleInputChange(index, 'url', e.target.value)} 
                    className="ml-2 px-2 py-1 border rounded-md w-full"
                  />
                </label>
              </div>
            )}
            <div>
              <label className="font-bold">Hintergrundfarbe (Hex):
                <input 
                  type="text" 
                  value={button.backgroundColor} 
                  onChange={(e) => handleInputChange(index, 'backgroundColor', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Textfarbe (Hex):
                <input 
                  type="text" 
                  value={button.textColor} 
                  onChange={(e) => handleInputChange(index, 'textColor', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Icon:
                <input 
                  type="text" 
                  value={button.icon} 
                  onChange={(e) => handleInputChange(index, 'icon', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Breite (%):
                <input 
                  type="number" 
                  value={button.width} 
                  onChange={(e) => handleInputChange(index, 'width', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Höhe (%):
                <input 
                  type="number" 
                  value={button.height} 
                  onChange={(e) => handleInputChange(index, 'height', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Oben (%):
                <input 
                  type="number" 
                  value={button.top} 
                  onChange={(e) => handleInputChange(index, 'top', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Links (%):
                <input 
                  type="number" 
                  value={button.left} 
                  onChange={(e) => handleInputChange(index, 'left', e.target.value)} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <button
                onClick={() => saveButton(index)}
                className="bg-green-500 text-white px-2 py-1 rounded-md mt-2 w-full"
              >
                Diesen Button speichern
              </button>
            </div>
          </div>
        </div>
      ))}

      {buttons.length > 0 && (
        <button onClick={saveButtons} className="bg-green-800 text-white px-4 py-4 rounded-md mt-4 w-full">
          Alle Buttons speichern
        </button>
      )}

      {errorMessage && (
        <div className="text-red-500 font-bold text-center mt-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EditInteractiveVideo;
