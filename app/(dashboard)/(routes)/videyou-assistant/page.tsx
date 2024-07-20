"use client";
import { FullPageChat } from "flowise-embed-react";
import { MessageSquare } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";


const VideyouAssistant = () => {
  const proModal = useProModal();

  return ( 
    <div>
      <Heading
        title="Videyou - Assistant"
        description="Ich helfe dir dabei dich in der Software zurechtzufinden"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-0 lg:px-8">
      
      <FullPageChat
            chatflowid="c097c145-2f51-4b32-8b56-21b1f4fdab25"
            apiHost="https://flowise-2h8u.onrender.com"
            // @ts-ignore
            theme={{
                
              button: {
                backgroundColor: "#8B5CF6",
                right: 20,
                bottom: 20,
                size: "medium",
                iconColor: "white",
                customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
            },
                chatWindow: {
                    welcomeMessage: "Ich helfe dir dein Leben besser zu Organisieren und alle wichtigen Termine auf dem Schrim zu haben :) Wie kann ich dir helfen?",
                    backgroundColor: "white",
                    height: 750,
                    
                    fontSize: 16,
                    poweredByTextColor: "white",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "/organisation.png",
                    },
                    userMessage: {
                        backgroundColor: "#8B5CF6",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJkSDRtV0FNeXRtSFhDZGtMUk1ib094Y0k0UCJ9?width=80",
                    },
                    textInput: {
                        placeholder: "Schreibe hier einen Befehl...",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#3B81F6",
                    }
                }
            }}
        />
      
        
      </div>
    </div>
    
   );
}
 
export default VideyouAssistant;

