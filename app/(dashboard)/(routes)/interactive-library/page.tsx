import { Plus, MonitorPlay } from "lucide-react";
import { Heading } from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";
const InteractiveLibrary = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div className="mb-6">
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
 
export default InteractiveLibrary;

