import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";

const NewVideo = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Neues Video erstellen"
        description="Hier kannst du ein neues interaktives Videos erstellen"
        icon={Plus}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      
    </div>
   );
}
 
export default NewVideo;

