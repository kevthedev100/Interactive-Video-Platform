"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import * as lucideIcons from "lucide-react";

interface Button {
  id: string;
  label: string;
  link: string | null;
  url: string | null;
  width: number;
  height: number;
  top: number;
  left: number;
  backgroundColor: string;
  textColor: string;
  icon: string;
  videoId: string;
  isVisible: boolean;
}

interface VideoData {
  videoId: string;
  buttons: Button[];
}

const ViewInteractiveVideo = () => {
  const { id } = useParams();
  const [videoId, setVideoId] = useState<string>("");
  const [buttons, setButtons] = useState<Button[]>([]);
  const [loading, setLoading] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchInteractiveVideo = async () => {
      try {
        const response = await fetch(`/api/interactive-videos/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interactive video");
        }
        const data: VideoData = await response.json();

        if (!data.videoId) {
          throw new Error("Video ID not found in fetched data");
        }

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

  const renderIcon = (iconName: string) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
  };

  const handleButtonClick = (index: number) => {
    const button = buttons[index];

    if (button.url) {
      window.open(button.url, "_blank");
    } else if (button.link) {
      setVideoId(button.link);
      setButtons(buttons.map(btn => ({
        ...btn,
        isVisible: btn.videoId === button.link,
      })));
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
        src={`https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`}
        loading="lazy"
        style={{ border: "none", height: "100%", width: "100%" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div id="buttons-container" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {buttons
          .filter(button => button.isVisible && button.videoId === videoId)
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
