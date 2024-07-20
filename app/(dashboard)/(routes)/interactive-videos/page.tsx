"use client";
import { FullPageChat } from "flowise-embed-react";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dumbbell, Send } from "lucide-react";

import { Heading } from "@/components/heading";

import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post('/api/f-beratung', values);
      console.log(response)

      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }

  return ( 
    <div>
      <Heading
        title="Interaktive Videos"
        description="Ich helfe dir dabei deine Fitness- und Sportgewohnheiten zu verbessern."
        icon={Dumbbell}
        iconColor="text-amber-500"
        bgColor="bg-orange-700/10"
      />
      <div className="px-0 lg:px-8">
      <FullPageChat
            chatflowid="b54d6e6c-18d6-4887-ab4d-ecd399904fbf"
            apiHost="https://flowise-2h8u.onrender.com"
            // @ts-ignore
            theme={{
              button: {
                backgroundColor: "#F59E0B",
                right: 20,
                bottom: 20,
                size: "medium",
                iconColor: "white",
                customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
            },
                chatWindow: {
                    welcomeMessage: "Hallo, ich bin dein Fitnesscoach und möchte dir dabei helfen deine Sportgewohnheiten und deine Gesundheit zu verbessern. Wie ist deine aktuelle Situation?",
                    backgroundColor: "white",
                    height: 750,
                    
                    fontSize: 16,
                    poweredByTextColor: "white",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "/fitness.png",
                    },
                    userMessage: {
                        backgroundColor: "#F59E0B",
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
 
export default MusicPage;
