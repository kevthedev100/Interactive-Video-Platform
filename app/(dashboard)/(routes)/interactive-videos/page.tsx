"use client";

import { useState, useRef, useEffect } from "react";
import { MonitorPlay, Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";
import * as lucideIcons from "lucide-react";

const InteractiveVideos = () => {
  const proModal = useProModal();
  const [videos, setVideos] = useState([]);
  const [interactiveVideoId, setInteractiveVideoId] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [isInteractiveVideoCreated, setIsInteractiveVideoCreated] = useState(false);
  const [isButtonTypeSelectionVisible, setIsButtonTypeSelectionVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/VideoList");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handlePlayVideo = (videoId) => {
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

  const addNewButton = (type) => {
    setButtons([...buttons, {
      id: '',
      label: 'Neuer Button',
      link: type === 'video' ? '' : null,
      url: type === 'link' ? '' : null,
      type,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      textColor: '#ffffff',
      icon: '',
      width: 45,
      height: 8,
      top: 84,
      left: 2,
      isVisible: true,
    }]);
    setIsButtonTypeSelectionVisible(false);
  };

  const updateButton = (index, newProperties) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], ...newProperties };
    setButtons(newButtons);
  };

  const handleInputChange = (index, property, value) => {
    const numericalProperties = ['width', 'height', 'top', 'left'];
    const updatedValue = numericalProperties.includes(property) ? parseFloat(value) : value;
    updateButton(index, { [property]: updatedValue });
    console.log(`Updated ${property} for button ${index}:`, value);
  };

  const handleButtonClick = (index) => {
    const button = buttons[index];
    if (!button.label || (button.type === 'video' && !button.link) || (button.type === 'link' && !button.url)) {
      setErrorMessage("Du musst alle Felder ausfüllen.");
      return;
    }

    if (button.type === 'link' && button.url) {
      window.open(button.url, '_blank');
    } else if (button.type === 'video' && button.link) {
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

    const buttonToSave = {
      ...button,
      videoId: interactiveVideoId
    };

    console.log('Button to save:', buttonToSave);

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
      updateButton(index, { id: data.id });
      setSavedMessage(true);

      setTimeout(() => {
        setSavedMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving button:', error);
    }
  };

  const saveButtons = async () => {
    if (!interactiveVideoId) {
      alert("Bitte erstellen Sie zuerst ein interaktives Video.");
      return;
    }

    const buttonsToSave = buttons.map(button => ({
      ...button,
      videoId: interactiveVideoId
    }));

    console.log('Buttons to save:', buttonsToSave);

    try {
      const response = await fetch(`/api/interactive-videos/${interactiveVideoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buttons: buttonsToSave }),
      });

      if (!response.ok) {
        throw new Error('Failed to save buttons');
      }

      const data = await response.json();
      console.log('Buttons gespeichert:', data);
      setButtons(data.buttons || data);
      setSavedMessage(true);

      setTimeout(() => {
        setSavedMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving buttons:', error);
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const iframe = iframeRef.current;
      if (iframe) {
        const isFullscreen = document.fullscreenElement === iframe || document.webkitFullscreenElement === iframe || document.mozFullScreenElement === iframe || document.msFullscreenElement === iframe;
        iframe.style.position = isFullscreen ? 'fixed' : 'absolute';
        iframe.style.top = isFullscreen ? '0' : '0';
        iframe.style.width = isFullscreen ? '100%' : '100%';
        iframe.style.height = isFullscreen ? '100%' : '100%';
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="p-4">
      <Heading
        title="Neues Video erstellen"
        description="Hier kannst du ein neues interaktives Video erstellen"
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
              button.isVisible && (
                <div 
                  key={index} 
                  className="absolute flex items-center justify-center rounded-md cursor-pointer"
                  style={{
                    backgroundColor: button.backgroundColor,
                    color: button.textColor,
                    width: `${button.width}%`,
                    height: `${button.height}%`,
                    top: `${button.top}%`,
                    left: `${button.left}%`,
                  }}
                  onClick={() => handleButtonClick(index)}
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
              <label className="font-bold block">Beschriftung:
                <input 
                  type="text" 
                  value={button.label} 
                  onChange={(e) => handleInputChange(index, 'label', e.target.value)} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            {button.type === 'video' && (
              <div>
                <label className="font-bold block">Video:
                  <select 
                    value={button.link} 
                    onChange={(e) => handleInputChange(index, 'link', e.target.value)} 
                    className="mt-1 px-2 py-1 border rounded-md w-full"
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
                <label className="font-bold block">URL:
                  <input 
                    type="text" 
                    value={button.url || ''} 
                    onChange={(e) => handleInputChange(index, 'url', e.target.value)} 
                    className="mt-1 px-2 py-1 border rounded-md w-full"
                  />
                </label>
              </div>
            )}
            <div>
              <label className="font-bold block">Hintergrundfarbe (Hex):
                <input 
                  type="text" 
                  value={button.backgroundColor} 
                  onChange={(e) => handleInputChange(index, 'backgroundColor', e.target.value)} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold block">Textfarbe (Hex):
                <input 
                  type="text" 
                  value={button.textColor} 
                  onChange={(e) => handleInputChange(index, 'textColor', e.target.value)} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold block">Icon:
                <input 
                  type="text" 
                  value={button.icon} 
                  onChange={(e) => handleInputChange(index, 'icon', e.target.value)} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold block">Breite (%):
                <input 
                  type="number" 
                  value={button.width} 
                  onChange={(e) => handleInputChange(index, 'width', parseFloat(e.target.value))} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold block">Höhe (%):
                <input 
                  type="number" 
                  value={button.height} 
                  onChange={(e) => handleInputChange(index, 'height', parseFloat(e.target.value))} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold block">Oben (%):
                <input 
                  type="number" 
                  value={button.top} 
                  onChange={(e) => handleInputChange(index, 'top', parseFloat(e.target.value))} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="font-bold block">Links (%):
                <input 
                  type="number" 
                  value={button.left} 
                  onChange={(e) => handleInputChange(index, 'left', parseFloat(e.target.value))} 
                  className="mt-1 px-2 py-1 border rounded-md w-full"
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

export default InteractiveVideos;
