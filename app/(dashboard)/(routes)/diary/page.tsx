import { BookLock } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const CalendarPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Tagebuch"
        description="Dein Tagebuch."
        icon={BookLock}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-0 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are currently on a Pro plan." : "Das wird momentan entwickelt... Mit einer premium Mitgliedschaft beschleunigst du die Entwicklung :)"}

          <h2 className="text-2xl md:text-xl font-bold pt-5 text-black ">
          Geplante Features:
         </h2>
         <p className="mb-0">
         - Vorerst: Anzeige eines Google Docs das als Tagebuch dient und durch AI befüllt wird
          </p>
          <p className="mb-0">
         - Später: Erstellung und Übersicht einzelner Beiträge durch AI
          </p>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default CalendarPage;

