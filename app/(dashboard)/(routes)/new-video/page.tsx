import { CalendarCheck } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const CalendarPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Kalender"
        description="Hier eine Übersicht über deinen Kalender."
        icon={CalendarCheck}
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
         - Kalenderintegration
          </p>
          <p className="mb-2">
         - Tagesplan
          </p>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default CalendarPage;

/*
'use client'
import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { timelineResourceData } from '../../../datasource';
import { CalendarCheck } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

import { useProModal } from "@/hooks/use-pro-modal";

export default function Home() {
  const eventSettings: EventSettingsModel = { dataSource: timelineResourceData }
  const group = { byGroupID: false, resources: ['Projects', 'Categories'] }

  const projectData: Object[] = [
    { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
    { text: 'PROJECT 2', id: 2, color: '#56ca85' },
    { text: 'PROJECT 3', id: 3, color: '#df5286' },
  ];
  const categoryData: Object[] = [
    { text: 'Nutze den Tag', id: 1, color: '#1aaa55' }
  ];
  return (
    <>
      <div>
      <Heading
        title="Kalander"
        description="Hier eine Übersicht über deinen Kalender und Events."
        icon={CalendarCheck}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          <p>Das wird momentan entwickelt...  Mit einer premium Mitgliedschaft beschleunigst du die Entwicklung</p>
          <h2 className="text-2xl md:text-xl font-bold pt-5 text-black">
          Geplante Features:
         </h2>
         <p className="mb-0">
         - Kalenderübersicht
          </p>
          <p className="mb-6">
         - Google Kalender Synchronisation
          </p>
        </div>
        
      </div>
    </div>

      <h2 className="text-2xl md:text-xl font-bold pb-5 text-black">Kalenderübersicht</h2>
      <ScheduleComponent width='100%' height='550px' currentView='Week' selectedDate={new Date()} eventSettings={eventSettings} group={group} >
        <ViewsDirective>
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
            dataSource={categoryData} textField='text' idField='id' colorField='color'>
          </ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </>
  )
}*/