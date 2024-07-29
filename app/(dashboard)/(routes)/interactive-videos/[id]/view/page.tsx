"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as lucideIcons from "lucide-react";

const ViewInteractiveVideo = () => {
  const { id } = useParams();
  const [videoId, setVideoId] = useState("");
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInteractiveVideo = async () => {
      try {
        const response = await fetch(`/api/interactive-videos/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interactive video");
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
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        src={`https://iframe.mediadelivery.net/embed/275360/${videoId}?autoplay=true`}
        loading="lazy"
        style={{ border: 'none', height: '100%', width: '100%' }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
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
  );
};

export default ViewInteractiveVideo;
