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
        <h1>Kirana - Deine persönliche AI für</h1>
        
        <div style={{padding: 5}} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700" >
          <TypewriterComponent
            options={{
              strings: [
                "Kalender und Terminplanung",
                "E-Mails und Texte schreiben",
                "Ernährung & Fitness",
                "Wissensspeicher",
                "Persönliche Weiterentwicklung",
                "Individuelle Assistenten...",
                "Alles..."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Kirana vereint viele individuelle Assistenten mit Langzeitgedächtnis als eine AI-Persönlichkeit
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Zugang zu deiner persönlichen AI
          </Button>
        </Link>
      </div>
      <div style={{padding: 5}} className="text-zinc-400 text-xs md:text-sm font-normal">
        Kirana ist dein komplettes Kompetenzzentrum für KI
      </div>
      <img src="/Kortana-Image-Full.png" alt="Beschreibung des Bildes" className="mx-auto mt-8 h-[620px]" />
    </div>
  );
};
