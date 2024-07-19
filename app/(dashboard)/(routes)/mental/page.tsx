"use client";
import { FullPageChat } from "flowise-embed-react";
import * as z from "zod";
import axios from "axios";
import { SmilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
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

const CodePage = () => {
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
      
      const response = await axios.post('/api/code', { messages: newMessages });
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

  return ( 
    <div>
      <Heading
        title="Mental - AI"
        description="Ich helfe dir durch gute und durch schlechte Zeiten und bin deine psychologische Stütze..."
        icon={SmilePlus}
        iconColor="text-red-300"
        bgColor="bg-pink-700/10"
      />
      <div className="px-0 lg:px-8">
      
      <FullPageChat
            chatflowid="207a8d4a-57f2-440e-828a-6e3fa9cd5e1c"
            apiHost="https://flowise-2h8u.onrender.com"
            // @ts-ignore
            theme={{
              button: {
                backgroundColor: "#FCA5A5",
                right: 20,
                bottom: 20,
                size: "medium",
                iconColor: "white",
                customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
            },
                chatWindow: {
                    welcomeMessage: "Hallo, ich bin deine Mentale Stütze und diene als 'Psychotherapeutin' wenn man das so nennen kann als KI :) Wie ist deine aktuelle Situation?",
                    backgroundColor: "white",
                    height: 750,
                    
                    fontSize: 16,
                    poweredByTextColor: "white",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "/mental.png",
                    },
                    userMessage: {
                        backgroundColor: "#FCA5A5",
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
 
export default CodePage;

