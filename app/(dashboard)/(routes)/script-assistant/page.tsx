"use client";
import { FullPageChat } from "flowise-embed-react";
import { ScrollText} from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

const ScritpAssistant = () => {
  const proModal = useProModal();

  return ( 
    <div>
      <Heading
        title="Skript - Assistant"
        description="Ich schreibe dir Skripte für interaktive Videos..."
        icon={ScrollText}
        iconColor="text-red-500"
        bgColor="bg-gray-700/10"
      />
      <div className="px-0 lg:px-8">
      <FullPageChat
            chatflowid="ab0f0592-08cc-405a-8fa3-2ec4a7cbb9bc"
            apiHost="https://flowise-2h8u.onrender.com"
            // @ts-ignore
            theme={{
                
              button: {
                backgroundColor: "#EF4444",
                right: 20,
                bottom: 20,
                size: "medium",
                iconColor: "white",
                customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
            },
                chatWindow: {
                    welcomeMessage: "Hallo, ich bin dein Texteschreiber. Benutze am besten die Sprachfunktion und ich korregiere und formatiere deinen Text. :) ",
                    backgroundColor: "white",
                    height: 750,
                    
                    fontSize: 16,
                    poweredByTextColor: "white",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "writer.png",
                    },
                    userMessage: {
                        backgroundColor: "#EF4444",
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
 
export default ScritpAssistant;
