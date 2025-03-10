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

const ViewInteractiveVideo = () => {
  const { id } = useParams();
  const [videoId, setVideoId] = useState("");
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHydrated(true);

    const fetchInteractiveVideo = async () => {
      try {
        const response = await fetch(`/api/interactive-videos/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch interactive video: ${errorData.error}`);
        }
        const data = await response.json();
        setVideoId(data.videoId);
        setButtons(data.buttons || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching interactive video:", error);
        setLoading(false);
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

  const renderIcon = (iconName) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
  };

  const handleButtonClick = (index) => {
    const button = buttons[index];

    if (button.url) {
      window.open(button.url, '_blank');
    } else if (button.link) {
      setVideoId(button.link);
    }

    const newButtons = [...buttons];
    newButtons[index].isVisible = false;
    setButtons(newButtons);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <img src="/Videyou-Logo.png" alt="Videyou Logo" className="w-1/2 max-w-xs md:max-w-sm lg:max-w-md" />
        <p className="text-white mt-6 text-center">Das interaktive Video wird geladen...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden" ref={videoContainerRef}>
      <iframe
        id="video-iframe"
        src={`https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`}
        loading="lazy"
        style={{ border: 'none', height: '100%', width: '100%' }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div id="buttons-container">
        {buttons.map((button, index) => (
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
              onClick={() => handleButtonClick(index)}
            >
              {button.icon && renderIcon(button.icon)}
              {button.label}
            </div>
          )
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
