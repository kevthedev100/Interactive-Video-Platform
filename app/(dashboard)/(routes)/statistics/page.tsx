import { ClipboardList } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Taskmanger"
        description="Hier eine Übersicht über deine Aufgaben."
        icon={ClipboardList}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are currently on a Pro plan." : "Das wird momentan entwickelt... Mit einer premium Mitgliedschaft beschleunigst du die Entwicklung :)"}
          <h2 className="text-2xl md:text-xl font-bold pt-5 text-black">
          Geplante Features:
         </h2>
         <p className="mb-0">
         - Kanban-Board
          </p>
          <p className="mb-2">
         - To-Do Management
          </p>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default SettingsPage;

