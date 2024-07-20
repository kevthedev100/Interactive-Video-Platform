"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { tools2 } from "@/constants2.";
import { tools3 } from "@/constants3";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Videyou - Interaktive Videos
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-3">
          Die Revolution im Videomarketing
        </p>
      </div>
      <img src="/Komp-1_1-min.gif" alt="Beschreibung des Bildes" className="mx-auto mt-8 h-[620px]" />
      <h2 className="text-2xl md:text-4xl font-bold text-center pt-10 pb-6">
        Deine Videos
        </h2>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-2 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
          
        ))}
        <h2 className="text-2xl md:text-4xl font-bold text-center pt-10 pb-6">
        Mediathek
        </h2> 
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools3.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-2 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
          
        ))}
        
        <h2 className="text-2xl md:text-4xl font-bold text-center pt-10 pb-6">
        Assistenten
        </h2> 
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools2.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-2 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
          
        ))}

        <h2 className="text-2xl md:text-4xl font-bold text-center pt-20 pb-10">
          Du brauchst Unterstützung?
        </h2>
        {/* Video-Embed-Code angepasst, um die gleiche Breite wie die Karten zu haben */}
        <div id='ms_frame_container' className="space-y-4 " style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
          <iframe 
            id='ms_frame' 
            loading='lazy' 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', minHeight: 'unset', minWidth: 'unset', border: 'none', maxHeight: '100vh' }} 
            src='https://embed.mindstamp.com/e/zFqSPFfzFpyw' 
            allowFullScreen 
            allow='encrypted-media; microphone; camera; geolocation' 
            scrolling='no'>
          </iframe>
        </div>
      </div>
    </div>
  );
}
