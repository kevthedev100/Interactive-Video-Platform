"use client";
import { BookMarked} from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";


const KnowledgeBase = () => {
  const proModal = useProModal();

  return ( 
    <div>
      <Heading
        title="Wissensdatenbank"
        description="Hier findest du alle Informationen zu interaktiven Videos und der Software"
        icon={BookMarked}
        iconColor="text-white-500"
        bgColor="bg-gray-700/10"
      />

    </div>
   );
}
 
export default KnowledgeBase;
