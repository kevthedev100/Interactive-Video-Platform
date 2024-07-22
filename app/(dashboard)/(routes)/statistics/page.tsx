import { UserCheck } from 'lucide-react';
import { Heading } from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";
const Statistics = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Video-Statistiken"
        description="Analyse deiner interaktiven Videos"
        icon={UserCheck}
        iconColor="text-blue-700"
        bgColor="bg-blue-700/10"
      />
      
    </div>
   );
}
 
export default Statistics;

