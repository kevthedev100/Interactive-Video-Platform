"use client";

import { useState, useRef, useEffect } from "react";
import { MonitorPlay, Plus, Trash2 } from "lucide-react"; // Add Trash2 icon for delete button
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";
import * as lucideIcons from "lucide-react";
import { useParams } from "next/navigation"; // Use useParams to get the video ID from the URL

const EditVideos = () => {
  const { id } = useParams(); // Get the video ID from the URL
  const proModal = useProModal();
  const [video, setVideo] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);
  const [isButtonTypeSelectionVisible, setIsButtonTypeSelectionVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/interactive-videos/${id}`); // Fetch the specific video by ID
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }
        const data = await response.json();
        setVideo(data);
        setButtons(data.buttons || []);
        setPlayingVideo(data.videoId);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  const handlePlayVideo = (videoId: string) => {
    if (iframeRef.current) {
      iframeRef.current.src = `https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`;
      setPlayingVideo(videoId);
    }
  };

  const addNewButton = (type: "video" | "link") => {
    setButtons([
      ...buttons,
      {
        id: "",
        label: "Neuer Button",
        link: "",
        url: "",
        type,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Standard-Hintergrundfarbe halb-transparent Schwarz
        textColor: "#ffffff", // Standard-Textfarbe Weiß
        icon: "",
        width: 45, // Standard-Breite
        height: 8, // Standard-Höhe
        top: 84, // Standard-Position von oben
        left: 2, // Standard-Position von links
        isVisible: true,
      },
    ]);
    setIsButtonTypeSelectionVisible(false); // Hide the button type selection after adding
  };

  const updateButton = (index, newProperties) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], ...newProperties };
    setButtons(newButtons);
  };

  const handleInputChange = (index, property, value) => {
    // Convert numerical properties to numbers
    const numericalProperties = ["width", "height", "top", "left"];
    const updatedValue = numericalProperties.includes(property) ? parseFloat(value) : value;
    updateButton(index, { [property]: updatedValue });
  };

  const handleButtonClick = (index) => {
    const button = buttons[index];
    if (!button.label || (button.type === "video" && !button.link)) {
      setErrorMessage("Du musst alle Felder ausfüllen.");
      return;
    }

    if (button.link) {
      handlePlayVideo(button.link);
    }
    updateButton(index, { isVisible: false });
    setErrorMessage("");
  };

  const saveButton = async (index) => {
    const button = buttons[index];
    if (!button.label || button.width <= 0 || button.height <= 0 || button.top < 0 || button.left < 0) {
      alert("Bitte alle Felder für den Button ausfüllen.");
      return;
    }

    const { url, ...buttonToSave } = button; // Exclude the 'url' field

    try {
      const response = await fetch(`/api/interactive-videos/${id}/buttons/${button.id}`, {
        method: button.id ? "PUT" : "POST", // Use PUT if the button has an ID, otherwise POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buttonToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to save button");
      }

      const data = await response.json();
      console.log("Button gespeichert:", data);
      updateButton(index, { id: data.id }); // Update button with returned ID
      setSavedMessage(true);

      setTimeout(() => {
        setSavedMessage(false);
      }, 3000); // Blendet die Erfolgsnachricht nach 3 Sekunden aus
    } catch (error) {
      console.error("Error saving button:", error);
    }
  };

  const deleteButton = async (index) => {
    const button = buttons[index];
    if (!button.id) {
      // If the button has no ID, it's a newly added button that hasn't been saved yet
      setButtons(buttons.filter((_, i) => i !== index));
      return;
    }

    try {
      const response = await fetch(`/api/interactive-videos/${id}/buttons/${button.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete button");
      }

      console.log("Button gelöscht:", button.id);
      setButtons(buttons.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting button:", error);
    }
  };

  const saveButtons = async () => {
    if (!video) {
      alert("Video nicht geladen.");
      return;
    }

    const buttonsToSave = buttons.map(({ url, ...rest }) => rest); // Exclude the 'url' field from all buttons

    try {
      const response = await fetch(`/api/interactive-videos/${id}/buttons`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buttonsToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to save buttons");
      }

      const data = await response.json();
      console.log("Buttons gespeichert:", data);
      setButtons(data); // Update buttons with returned data
      setSavedMessage(true);

      setTimeout(() => {
        setSavedMessage(false);
      }, 3000); // Blendet die Erfolgsnachricht nach 3 Sekunden aus
    } catch (error) {
      console.error("Error saving buttons:", error);
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
  };

  return (
    <div className="p-4">
      <Heading
        title="Interaktives Video bearbeiten"
        description="Hier kannst du dein interaktives Video bearbeiten"
        icon={MonitorPlay}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      {playingVideo && (
        <div className="relative mb-4">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              ref={iframeRef}
              src={`https://iframe.mediadelivery.net/embed/275360/${playingVideo}?autoplay=true`}
              loading="lazy"
              style={{ border: "none", position: "absolute", top: 0, height: "100%", width: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
            {buttons.map((button, index) => (
              button.isVisible !== false && (
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

      {buttons.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Keine Buttons verfügbar.</p>
      )}

      {!isButtonTypeSelectionVisible && (
        <button onClick={() => setIsButtonTypeSelectionVisible(true)} className="bg-black text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
          + Neuen Button erstellen
        </button>
      )}

      {isButtonTypeSelectionVisible && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => addNewButton("video")} className="bg-blue-800 text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Neues Video auswählen
          </button>
          <button onClick={() => addNewButton("link")} className="bg-orange-800 text-white px-4 py-4 rounded-md mb-4 mt-4 w-full">
            Link auswählen
          </button>
        </div>
      )}

      {buttons.map((button, index) => (
        <div key={index}>
          <h2 className="text-center text-white bg-gray-500 py-2 rounded-md mb-4">
            Button {index + 1} - {button.type === "video" ? "Video wechseln" : "Link"}
          </h2>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">
                Beschriftung:
                <input
                  type="text"
                  value={button.label}
                  onChange={(e) => handleInputChange(index, "label", e.target.value)}
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            {button.type === "video" && (
              <div>
                <label className="font-bold">
                  Video:
                  <select
                    value={button.link}
                    onChange={(e) => handleInputChange(index, "link", e.target.value)}
                    className="ml-2 px-2 py-1 border rounded-md w-full"
                    disabled={button.url !== ""}
                  >
                    <option value="">Wähle ein Video</option>
                    {video.map((video) => (
                      <option key={video.guid} value={video.guid}>
                        {video.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            {button.type === "link" && (
              <div>
                <label className="font-bold">
                  URL:
                  <input
                    type="text"
                    value={button.url}
                    onChange={(e) => handleInputChange(index, "url", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "backgroundColor", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "textColor", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "icon", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "width", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "height", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "top", e.target.value)}
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
                  onChange={(e) => handleInputChange(index, "left", e.target.value)}
                  className="ml-2 px-2 py-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => saveButton(index)}
                className="bg-green-500 text-white px-2 py-1 rounded-md w-full"
              >
                Diesen Button speichern
              </button>
              <button
                onClick={() => deleteButton(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 w-full"
              >
                Löschen
              </button>
            </div>
            {savedMessage && (
              <p className="text-green-500 text-center mt-2">Button gespeichert</p>
            )}
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

export default EditVideos;
