import { CalendarCheck } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const CalendarPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Neues Video erstellen"
        description="Hier kannst du ein neues interaktives Videos erstellen"
        icon={CalendarCheck}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      
    </div>
   );
}
 
export default CalendarPage;

