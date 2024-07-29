"use client";

import { useState, useRef, useEffect } from "react";
import { MonitorPlay, Plus } from "lucide-react";
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
  const [errorMessage, setErrorMessage] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);
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
      id: '',
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
    // Convert numerical properties to numbers
    const numericalProperties = ['width', 'height', 'top', 'left'];
    const updatedValue = numericalProperties.includes(property) ? parseFloat(value) : value;
    updateButton(index, { [property]: updatedValue });
  };

  const handleButtonClick = (index) => {
    const button = buttons[index];
    if (!button.label || (button.type === 'video' && !button.link)) {
      setErrorMessage("Du musst alle Felder ausfüllen.");
      return;
    }

    if (button.link) {
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

    const { url, ...buttonToSave } = button; // Exclude the 'url' field

    try {
      const response = await fetch(`/api/interactive-videos/${interactiveVideoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buttonToSave),
      });

      if (!response.ok) {
        throw new Error('Failed to save button');
      }

      const data = await response.json();
      console.log('Button gespeichert:', data);
      updateButton(index, { id: data.id }); // Update button with returned ID
      setSavedMessage(true);

      setTimeout(() => {
        setSavedMessage(false);
      }, 3000); // Blendet die Erfolgsnachricht nach 3 Sekunden aus
    } catch (error) {
      console.error('Error saving button:', error);
    }
  };

  const saveButtons = async () => {
    if (!interactiveVideoId) {
      alert("Bitte erstellen Sie zuerst ein interaktives Video.");
      return;
    }

    const buttonsToSave = buttons.map(({ url, ...rest }) => rest); // Exclude the 'url' field from all buttons

    try {
      const response = await fetch(`/api/interactive-videos/${interactiveVideoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buttonsToSave),
      });

      if (!response.ok) {
        throw new Error('Failed to save buttons');
      }

      const data = await response.json();
      console.log('Buttons gespeichert:', data);
      setButtons(data); // Update buttons with returned data
      setSavedMessage(true);

      setTimeout(() => {
        setSavedMessage(false);
      }, 3000); // Blendet die Erfolgsnachricht nach 3 Sekunden aus
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
        title="Neues Video erstellen"
        description="Hier kannst du ein neues interaktives Videos erstellen"
        icon={Plus}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

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

          <button onClick={createInteractiveVideo} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
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
            {buttons.map((button, index) => (
              button.isVisible !== false && (
                <div 
                  key={index} 
                  className="absolute flex items-center justify-center rounded-md"
                  style={{
                    backgroundColor: button.backgroundColor,
                    color: button.textColor,
                    width: `${button.width}%`,
                    height: `${button.height}%`,
                    top: `${button.top}%`,
                    left: `${button.left}%`,
                  }}
                >
                  {button.icon && renderIcon(button.icon)}
                  <span>{button.label}</span>
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
                  onChange={(e) => handleInputChange(index, 'width', parseFloat(e.target.value))} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Höhe (%):
                <input 
                  type="number" 
                  value={button.height} 
                  onChange={(e) => handleInputChange(index, 'height', parseFloat(e.target.value))} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Oben (%):
                <input 
                  type="number" 
                  value={button.top} 
                  onChange={(e) => handleInputChange(index, 'top', parseFloat(e.target.value))} 
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold">Links (%):
                <input 
                  type="number" 
                  value={button.left} 
                  onChange={(e) => handleInputChange(index, 'left', parseFloat(e.target.value))} 
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
              {savedMessage && (
                <p className="text-green-500 text-center mt-2">Button gespeichert</p>
              )}
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

export default InteractiveVideos;
