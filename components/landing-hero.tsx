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
                "20x längere Watchtime",
                "Online mehr Anfragen",
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
      <div className="mb-32 text-zinc-400 text-xs md:text-sm font-normal">
        <h5 className="mb-20">Das effektivste Videomarketing in 2024</h5>
      </div>
      

      {/* Neues interaktives Video - Live Version */}
      <div className="mt-64 relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <iframe 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
          src="https://interactive-video-platform.vercel.app/public-interactive/clzajff0f0005udicy9i4jclm/view" 
          allowFullScreen 
          allow="encrypted-media; microphone; camera; geolocation" 
          loading="lazy" 
          scrolling="no">
        </iframe>
      </div>

      <div className="text-sm md:text-xl font-light text-zinc-400 text-center">
        In diesem Video kannst du dir durch Interaktionen einen einzigartigen Eindruck machen...
      </div>


      {/* Abstand zwischen den iframes */}
      <div style={{ height: '50px' }}></div>

      {/* Bestehendes Video */}
      <div className="relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
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
        In diesem Video kannst du dir durch Interaktionen einen einzigartigen Eindruck machen...
      </div>

      {/* Neues interaktives Video */}
      <div className="mt-64 relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <iframe 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
          src="http://localhost:3000/public-interactive/clzajff0f0005udicy9i4jclm/view" 
          allowFullScreen 
          allow="encrypted-media; microphone; camera; geolocation" 
          loading="lazy" 
          scrolling="no">
        </iframe>
      </div>


    </div>
  );
};
