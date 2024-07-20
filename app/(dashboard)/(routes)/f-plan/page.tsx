import { HeartHandshake } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const CalendarPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Interaktive Videos"
        description="Übersicht über deine körperlichen Ziele."
        icon={HeartHandshake}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are currently on a Pro plan." : "Das wird momentan entwickelt... Mit einer premium Mitgliedschaft beschleunigst du die Entwicklung :)"}

          <h2 className="text-2xl md:text-xl font-bold pt-5 text-black ">
          Geplante Features:
         </h2>
         <p className="mb-0">
         - Aktualisierter Fitnessplan anzeige
          </p>
          <p className="mb-0">
         - Aktualisierter Ernährungsplan anzeige
          </p>
          <p className="mb-2">
         - Google Health API für Schlaf, Gewicht und Fitnessdaten
          </p>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default CalendarPage;

