"use client";
import { FullPageChat } from "flowise-embed-react";
import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      
      const response = await axios.post('/api/corganisation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
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

  
  /*<iframe src="https://cheat-sheet.streamlit.app/?embedded=true" width="100%" height="500">
      </iframe>*/

      /*<iframe src="https://flowise-2h8u.onrender.com/chatbot/564a7751-1584-47a7-a798-9885e7eb6a13" width="100%" height="500">
      </iframe>*/

  return ( 
    <div>
      <Heading
        title="Videyou - Assistant"
        description="Ich plane deine Termine und deinen Kalender."
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
 
export default ConversationPage;

