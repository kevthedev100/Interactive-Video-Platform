import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Settings"
        description="Deine Einstellungen."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          <p className="text-2xl md:text-xl font-bold pt-0 text-black">
          {isPro ? "Du bist momentan in der PRO-Version" : "Du bist momentan in der Probeversion"}
          </p>
          <br></br>
          {"Hier kannst du deinen Account und deine Mitgliedschaft verwalten."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default SettingsPage;

