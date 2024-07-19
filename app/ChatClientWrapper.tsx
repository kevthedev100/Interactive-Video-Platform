"use client";

// ChatClientWrapper.tsx
import React, { useEffect, useState } from 'react';

const ChatClientWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Setzt isClient auf true, sobald die Komponente gemountet wird
  }, []);

  if (!isClient) {
    return null; // Rendert nichts auf dem Server
  }

  // Dynamischer Import der BubbleChat Komponente
  const BubbleChat = React.lazy(() => import('flowise-embed-react').then(module => ({ default: module.BubbleChat })));

  return (
    <React.Suspense fallback={<div>Lädt...</div>}>
      <BubbleChat
            chatflowid="564a7751-1584-47a7-a798-9885e7eb6a13"
            apiHost="https://flowise-2h8u.onrender.com"
            theme={{
                button: {
                    backgroundColor: "#3B81F6",
                    right: 20,
                    bottom: 20,
                    size: "medium",
                    iconColor: "white",
                    customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
                },
                chatWindow: {
                    welcomeMessage: "Hi, wie kann ich dir helfen?",
                    backgroundColor: "#ffffff",
                    height: 700,
                    width: 400,
                    fontSize: 16,
                    poweredByTextColor: "#303235",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
                    },
                    userMessage: {
                        backgroundColor: "#3B81F6",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                        placeholder: "Type your question",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#3B81F6",
                    }
                }
            }}
        />
    </React.Suspense>
  );
};

export default ChatClientWrapper;
