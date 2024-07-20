"use client";
import { MailQuestion } from "lucide-react";
import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";


const AnfragePage = () => {
  const proModal = useProModal();

  return ( 
    <div>
      <Heading
        title="Persönliche Anfrage"
        description="Beschreibe deine Wünsche und stell uns eine Anfrage"
        icon={MailQuestion}
        iconColor="text-white"
        bgColor="bg-black"
      />
      <div className="px-0 lg:px-8">
      
      
      
        
      </div>
    </div>

   );
}
 
export default AnfragePage;

