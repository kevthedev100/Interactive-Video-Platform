"use client";

import { ListVideo } from "lucide-react";

import { Heading } from "@/components/heading";

import { useProModal } from "@/hooks/use-pro-modal";


const VideoPage = () => {
  const proModal = useProModal();


  return ( 
    <div>
      <Heading
        title="Video-Mediathek"
        description="Übersicht über deine Einzelvideos"
        icon={ListVideo}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      
    </div>
   );
}
 
export default VideoPage;
