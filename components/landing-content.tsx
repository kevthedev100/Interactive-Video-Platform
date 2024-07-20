"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus, BookMarked, CalendarCheck2, Star, Apple, BrainCog, ListRestart, UserPlus, CalendarCheck, ScrollText, ListPlus, Phone, Mail } from "lucide-react";

const testimonials = [
  {
    name: "Interaktivität",
    icon: <CalendarCheck className="w-10 h-10 text-violet-500 mx-auto" />,
    title: "Buttons, Links und vieles mehr...",
    description: "Kirana verwaltet deinen Kalender und behält alle Events im Überblick und erinnert dich an alles Wichtige.",
  },
  {
    name: "Skriptgenerierung",
    icon: <ScrollText className="w-10 h-10 text-red-500 mx-auto" />,
    title: "AI-Assistent mit Expertenwissen",
    description: "Kirana kann per Spracheingabe alle Texte von dir korregieren oder eben alles von sich aus generieren.",
  },
  {
    name: "DSGVO Konform",
    icon: <BookMarked className="w-10 h-10 text-white-700 mx-auto" />,
    title: "In Deutschland gehostete Videos",
    description: "Kirana kann deine täglichen Erkenntnisse speichern und eine endlose Wissensdatenbank aufbauen.",
  },
  {
    name: "Schnelle Ladezeiten",
    icon: <Apple className="w-10 h-10 text-emerald-500 mx-auto" />,
    title: "Körperliche Weiterentwicklung",
    description: "Kirana dient als Fitness- und Ernährungscoach und begleitet dich wie ein echter Coach in Echtzeit und mit einem Langzeitgedächtnis.",
  },
  {
    name: "Von Experten entwickelt",
    icon: <SmilePlus className="w-10 h-10 text-red-300 mx-auto" />,
    title: "Ansprechpartner für Probleme",
    description: "Kirana hat einen spezifischen Assistenten, der dir als Psychotherapeut und Tagebuch dient, um dich selbst weiterzuentwickeln.",
  },
  {
    name: "Viele weitere Tools...",
    icon: <ListPlus className="w-10 h-10 text-orange-300 mx-auto" />,
    title: "Auf dich zugeschnitten",
    description: "Jede Kirana wird individuell für dich entwickelt und bekommt anhand deiner Bedürfnisse weitere individuelle Assistenten...",
  },
];

const testimonials2 = [
  {
    name: "Langzeitgedächtnis",
    icon: <BrainCog color="white" className="w-12 h-12 mx-auto" />,
    title: "Kontinuierliche Weiterentwicklung",
    description: "Kirana besitzt für jeden Anwendungsfall ein Langzeitgedächtnis, sodass sie sich mit jeder Nachricht mehr auf dich anpasst...",
  },
  {
    name: "Einzigartige Automatisierung",
    icon: <ListRestart color="white" className="w-12 h-12 text-emerald-500 mx-auto" />,
    title: "Fortgeschrittene Schnittstellen",
    description: "Kirana kann Termine in deinen Kalender eintragen, Dokumente erstellen und sehr viele Aufgaben automatisiert lösen...",
  },
  {
    name: "Modellunabhängig",
    icon: <Star color="white" className="w-12 h-12 text-red-300 mx-auto" />,
    title: "OpenAI, Llama, Cloude...",
    description: "Kirana ist flexibel und hat Zugriff auf alle modernen AI-Modelle, sodass sie jederzeit von OpenAI umtrainiert werden kann.",
  },
  {
    name: "Perfekte Integration",
    icon: <UserPlus color="white" className="w-12 h-12 text-amber-500 mx-auto" />,
    title: "Software wie ein Maßanzug",
    description: "Wir entwickeln zusätzlich individuelle Assistenten für deine Use-Cases, sodass Kirana dein Nummer 1 Ansprechpartner wird.",
  },
];

const testimonials3 = [
  {
    name: "E-Mail",
    icon: <Mail color="white" className="w-12 h-12 mx-auto" />,
    title: "Anwort innerhalb von 24h",
    description: <a href="mailto:k.bahnmueller@ki-innovationszentrum.de" className="text-blue-500 hover:text-blue-600">k.bahnmueller@ki-innovationszentrum.de</a>,
  },
  {
    name: "Telefon",
    icon: <Phone color="white" className="w-12 h-12 text-emerald-500 mx-auto" />,
    title: "Gerne auch Anliegen auf die Mailbox",
    description: <a href="tel:+491786705334" className="text-blue-500 hover:text-blue-600">+49 1786705334</a>,
  },
  {
    name: "Termin buchen",
    icon: <CalendarCheck2 color="white" className="w-12 h-12 text-emerald-500 mx-auto" />,
    title: "Ein unverbliches Gespräch vereinbaren",
    description: <a href="https://calendly.com/kevinbahnmueller/unverbindliches-gespraech" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Termin buchen</a>,
  }
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-10 pt-6">
      <h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10 pt-10">Warum Videyou die richtige Platform ist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {testimonials.map((item, index) => (
          <Card key={index} className="bg-[#2d2d2d] border-none text-white text-center px-0 py-0">
            <div className="pt-8">{item.icon}</div>
            <CardHeader>
              <CardTitle>
                <p className="text-lg">{item.name}</p>
                <p className="text-zinc-400 text-sm pb-2">{item.title}</p>
              </CardTitle>
              <CardContent>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
      <h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10 pt-10">Warum Kirana?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials2.map((item, index) => (
          <Card key={index} className="bg-[#2d2d2d] border-none text-white text-center px-0 py-0">
            <div className="pt-8">{item.icon}</div>
            <CardHeader>
              <CardTitle>
                <p className="text-lg">{item.name}</p>
                <p className="text-zinc-400 text-sm pb-2">{item.title}</p>
              </CardTitle>
              <CardContent>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Video-Embed-Code direkt vor dem Footer */}
      <h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10 pt-10">Erfolgsbeispiele von interaktiven Videos</h2>
      <div className="my-8" style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
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
        Überzeuge deine Kunden persönlich mit einem interaktiven Video
      </div>
    

      <h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10 pt-20">Sprech einfach mit uns</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 pb-20">
        {testimonials3.map((item, index) => (
          <Card key={index} className="bg-[#2d2d2d] border-none text-white text-center px-0 py-0">
            <div className="pt-8">{item.icon}</div>
            <CardHeader>
              <CardTitle>
                <p className="text-lg">{item.name}</p>
                <p className="text-zinc-400 text-sm pb-2">{item.title}</p>
              </CardTitle>
              <CardContent>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>



{/* Footer-Bereich */}
<div className="w-full mt-10">
  <footer className="flex flex-wrap justify-between items-center px-10 py-4 bg-[#2d2d2d] text-white text-sm md:text-base">
    <div className="footer-item w-full md:w-auto mb-4 md:mb-0">
      <a href="http://www.impressum.de" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Impressum
      </a>
    </div>
    <div className="footer-item w-full md:w-auto mb-4 md:mb-0">
      <a href="http://www.datenschutz.de" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Datenschutzerklärung
      </a>
    </div>
    <div className="footer-item w-full md:w-auto mb-4 md:mb-0">
      <a href="http://www.AGB.de" target="_blank" rel="noopener noreferrer" className="hover:underline">
        AGB
      </a>
    </div>
    <div className="footer-item w-full md:w-auto">
      © Videoyou 2024
    </div>
  </footer>
</div>


</div>
    
  );
};
