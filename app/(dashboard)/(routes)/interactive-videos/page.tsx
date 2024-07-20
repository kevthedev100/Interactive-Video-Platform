"use client";

import { MonitorPlay } from "lucide-react";

import { Heading } from "@/components/heading";

import { useProModal } from "@/hooks/use-pro-modal";


const InteractiveVideos = () => {
  const proModal = useProModal();
 
  return ( 
    <div>
      <Heading
        title="Interaktive Videos"
        description="Übersicht über deine Videos"
        icon={MonitorPlay}
        iconColor="text-amber-500"
        bgColor="bg-orange-700/10"
      />
      
    </div>
   );
}
 
export default InteractiveVideos;
