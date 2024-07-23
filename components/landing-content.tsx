"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus, BookMarked, CalendarCheck2, Star, BrainCog, ListRestart, UserPlus, ScrollText, ListPlus, Phone, Mail, PictureInPicture2, Zap, MonitorPlay, MessagesSquare, Crown } from "lucide-react";

const testimonials = [
  {
    name: "Interaktivität",
    icon: <PictureInPicture2 className="w-10 h-10 text-violet-500 mx-auto" />,
    title: "Buttons, Links und vieles mehr...",
    description: "Durch den interaktiven Aufbau eines Videos hast du ein Alleinstellungsmerkmal, das deine Nutzer überzeugt.",
  },
  {
    name: "Skriptgenerierung",
    icon: <ScrollText className="w-10 h-10 text-red-500 mx-auto" />,
    title: "KI-Assistent mit Expertenwissen",
    description: "Für die Generierung von Skripten für interaktive Videos stehen dir KI-Assistenten zur Verfügung.",
  },
  {
    name: "DSGVO Konform",
    icon: <BookMarked className="w-10 h-10 text-white-700 mx-auto" />,
    title: "In Deutschland gehostete Videos",
    description: "Alle Videos sowie die Daten, die aus den Videos entstehen, werden in Deutschland gelagert und gehostet.",
  },
  {
    name: "Schnelle Ladezeiten",
    icon: <Zap className="w-10 h-10 text-yellow-500 mx-auto" />,
    title: "Blitzschnelle Videos",
    description: "Im Vergleich zu anderen Anbietern sind unsere Videos sehr schnell abrufbar und beeinträchtigen nicht die Ladezeit.",
  },
  {
    name: "Von Experten entwickelt",
    icon: <MonitorPlay className="w-10 h-10 text-blue-300 mx-auto" />,
    title: "Powered by Videyou",
    description: "Die Software wurde von dem führenden Unternehmen im Bereich interaktiver Videos entwickelt, um maximale Ergebnisse zu erreichen.",
  },
  {
    name: "Viele weitere Tools...",
    icon: <ListPlus className="w-10 h-10 text-emerald-300 mx-auto" />,
    title: "Auf dich zugeschnitten",
    description: "Wir entwickeln zusätzlich spezielle Tools für unsere Kunden, die auf ihre Bedürfnisse zugeschnitten sind.",
  },
];

const testimonials2 = [
  {
    name: "14 Tage Kostenlos testen",
    icon: <SmilePlus color="white" className="w-12 h-12 mx-auto" />,
    title: "Free",
    description: "Du kannst auf die Starter-Version 14 Tage zugreifen. Wir bieten dir hierbei umfangreichen Support.",
  },
  {
    name: "Starter",
    icon: <MessagesSquare color="white" className="w-12 h-12 text-emerald-500 mx-auto" />,
    title: "49€ / Monat",
    description: "In dieser Variante kannst du ein Kontingent von 20 Videosequenzen für deine interaktiven Videos nutzen.",
  },
  {
    name: "Premium",
    icon: <Crown color="white" className="w-12 h-12 text-red-300 mx-auto" />,
    title: "99€ / Monat",
    description: "In dieser Variante kannst du ein Kontingent von 100 Videosequenzen für deine interaktiven Videos nutzen.",
  },
  {
    name: "Agentur",
    icon: <Star color="white" className="w-12 h-12 text-amber-500 mx-auto" />,
    title: "Auf Anfrage",
    description: "Für Agenturen bieten wir besondere Pakete an, die wir je nach Bedarf individuell absprechen.",
  },
];

const testimonials3 = [
  {
    name: "E-Mail",
    icon: <Mail color="white" className="w-12 h-12 mx-auto" />,
    title: "Antwort innerhalb von 48h",
    description: <a href="mailto:k.bahnmueller@videyou.de" className="text-white hover:text-red-600">k.bahnmueller@videyou.de</a>,
  },
  {
    name: "Telefon",
    icon: <Phone color="white" className="w-12 h-12 text-emerald-500 mx-auto" />,
    title: "Gerne auch Anliegen auf die Mailbox",
    description: <a href="tel:+491786705334" className="text-white hover:text-red-600">+49 1786705334</a>,
  },
  {
    name: "Termin buchen",
    icon: <CalendarCheck2 color="white" className="w-12 h-12 text-emerald-500 mx-auto" />,
    title: "Ein unverbindliches Gespräch vereinbaren",
    description: <a href="https://calendly.com/kevinbahnmueller/unverbindliches-gespraech" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600">Termin buchen</a>,
  }
];

const videoTestimonials = [
  {
    name: "Interaktive Beratung",
    videoEmbed: `<iframe src="https://embed.mindstamp.com/e/zFqSPFfzFpyw" class="video-embed" frameborder="0" allowfullscreen allow="encrypted-media; microphone; camera; geolocation" loading="lazy" scrolling="no"></iframe>`,
    title: "Einführung in neu gedachte Videos",
    description: "Ein komplett neues Vertriebsinstrument..."
  },
  {
    name: "Produkt-Tour",
    videoEmbed: `<iframe src="https://embed.mindstamp.com/e/zFqSPFfzFpyw" class="video-embed" frameborder="0" allowfullscreen allow="encrypted-media; microphone; camera; geolocation" loading="lazy" scrolling="no"></iframe>`,
    title: "Erkunde die Features",
    description: "Tauche tiefer in die vielfältigen Funktionen unserer Software ein."
  },
  {
    name: "Erfahrungsberichte",
    videoEmbed: `<iframe src="https://embed.mindstamp.com/e/zFqSPFfzFpyw" class="video-embed" frameborder="0" allowfullscreen allow="encrypted-media; microphone; camera; geolocation" loading="lazy" scrolling="no"></iframe>`,
    title: "Kundenstimmen",
    description: "Höre, was unsere Nutzer über uns zu sagen haben."
  },
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

      <div className="px-10 pb-10 pt-6">
        <h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10 pt-10">Erfahre mehr über die Revolution im Videomarketing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {videoTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-[#2d2d2d] border-none text-white text-center px-0 py-0">
              <div className="relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
                  src={testimonial.videoEmbed.match(/src="([^"]+)"/)[1]} 
                  allowFullScreen 
                  allow="encrypted-media; microphone; camera; geolocation" 
                  loading="lazy" 
                  scrolling="no">
                </iframe>
              </div>
              <CardHeader>
                <CardTitle>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm pb-2">{testimonial.title}</p>
                </CardTitle>
                <CardContent>
                  {testimonial.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      
      <h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10 pt-10">Preisgestaltung</h2>
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
