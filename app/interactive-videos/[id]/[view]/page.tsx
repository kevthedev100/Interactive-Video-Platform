"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import * as lucideIcons from "lucide-react";

declare global {
  interface Document {
    mozFullScreenElement?: Element;
    webkitFullscreenElement?: Element;
    msFullscreenElement?: Element;
  }

  interface HTMLElement {
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
    msRequestFullscreen?: () => void;
  }
}

// Define the Button interface
interface Button {
  id: string;
  label: string;
  link: string | null; // The video ID the button points to
  url: string | null; // External URL if the button is a link
  width: number;
  height: number;
  top: number;
  left: number;
  backgroundColor: string;
  textColor: string;
  icon: string;
  videoId: string; // The video ID that the button belongs to
  isVisible: boolean;
}

interface VideoData {
  videoId: string;
  buttons: Button[];
}

const ViewInteractiveVideo = () => {
  const { id } = useParams(); // Get the video ID from the URL
  const [videoId, setVideoId] = useState<string>(""); // Current video ID being played
  const [buttons, setButtons] = useState<Button[]>([]); // All buttons associated with the video
  const [loading, setLoading] = useState(true); // Loading state
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchInteractiveVideo = async () => {
      try {
        setLoading(true); // Start loading

        const response = await fetch(`/api/interactive-videos/${id}/view`);
        if (!response.ok) {
          throw new Error("Failed to fetch interactive video");
        }
        
        const data: VideoData = await response.json();

        if (data && data.videoId) {
          setVideoId(data.videoId); // Set the initial video ID
          setButtons(data.buttons || []); // Set the buttons for the video
        } else {
          console.error("Invalid video data received");
        }

      } catch (error) {
        console.error("Error fetching interactive video:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchInteractiveVideo();

    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      if (fullscreenElement) {
        videoContainerRef.current?.classList.add("fullscreen");
      } else {
        videoContainerRef.current?.classList.remove("fullscreen");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [id]);

  const renderIcon = (iconName: string) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
  };

  const handleButtonClick = (index: number) => {
    const button = buttons[index];

    if (button.url) {
      window.open(button.url, "_blank");
    } else if (button.link) {
      setVideoId(button.link); // Update the current video ID
      // Filter buttons to show only those related to the new video
      setButtons((prevButtons) =>
        prevButtons.map((btn) => ({
          ...btn,
          isVisible: btn.videoId === button.link, // Show buttons only for the new video
        }))
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <img src="/Videyou-Logo.png" alt="Videyou Logo" className="w-1/2 max-w-xs" />
        <p className="text-white mt-6">Interaktive Videos von Videyou</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden" ref={videoContainerRef}>
      <iframe
        id="video-iframe"
        src={`https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`} // Autoplay enabled for transition
        loading="lazy"
        style={{ border: "none", height: "100%", width: "100%" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div id="buttons-container" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {buttons
          .filter((button) => button.videoId === videoId && button.isVisible) // Only show buttons for the current video
          .map((button, index) => (
            <div
              key={button.id}
              className="absolute flex items-center justify-center rounded-md cursor-pointer"
              style={{
                width: `${button.width}%`,
                height: `${button.height}%`,
                top: `${button.top}%`,
                left: `${button.left}%`,
                backgroundColor: button.backgroundColor,
                color: button.textColor,
              }}
              onClick={() => handleButtonClick(index)}
            >
              {button.icon && renderIcon(button.icon)}
              {button.label}
            </div>
          ))}
      </div>
      <style jsx>{`
        .fullscreen .absolute {
          position: fixed;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default ViewInteractiveVideo;
