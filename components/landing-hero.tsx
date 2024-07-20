"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold pt-12 pl-5 pr-5 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Videyou - Interaktive Videos</h1>
        
        <div style={{padding: 5}} className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600" >
          <TypewriterComponent
            options={{
              strings: [
                "Mehr Anfragen",
                "20x längere Watchtime",
                "Persönliche Nutzererfahrung",
                "In Deutschland gehostet",
                "Von Videyou entwickelt",
                "AI-Assistenten...",
                "Alles rund ums Videomarketing..."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Deine Platform für die Entwicklung von interaktiven Videos
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Jetzt kostenlos registrieren
          </Button>
        </Link>
      </div>
      <div style={{padding: 5}} className="mb-48 text-zinc-400 text-xs md:text-sm font-normal">
        Das effektivste Videomarketing in 2024
      </div>
      <div className="my-32" style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
        <iframe 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
          src="https://embed.mindstamp.com/e/zFqSPFfzFpyw" 
          allowFullScreen 
          allow="encrypted-media; microphone; camera; geolocation" 
          loading="lazy" 
          scrolling="no">
        </iframe>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400 text-center">
        In diesem Video kannst du dir durch interaktionen einen einzigartigen Eindruck machen...
      </div>
    </div>
  );
};
