"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import {
  SmilePlus,
  ListVideo,
  MonitorPlay,
  Plus,
  ScrollText,
  LayoutDashboard,
  BookMarked,
  MessageSquare,
  MailQuestion,
  Dumbbell,
  Settings,
  Apple,
  CalendarCheck,
  ClipboardList,
  Contact,
  HeartHandshake,
  BookLock,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [

  {
    label: 'Skript - Assistant',
    icon: ScrollText,
    href: '/script-assistant',
    color: "text-red-500",
  },
  {
    label: 'Videyou - Assistant',
    icon: MessageSquare,
    href: '/videyou-assistant',
    color: "text-violet-500",
  },
  {
    label: 'Wissensdatenbank',
    icon: BookMarked,
    href: '/knowledgebase',
    color: "text-white",
  },

  
];


const routes4 = [

  {
    label: 'Video-Mediathek',
    icon: ListVideo,
    href: '/video-library',
    color: "text-emerald-500",
  }
];

const routes5 = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500",
  },

  
];

const routes2 = [
  {
    label: 'Neues Video erstellen',
    icon: Plus,
    href: '/new-video',
    color: "text-white",
  },
  {
    label: 'Interaktive Videos',
    icon: MonitorPlay,
    href: '/interactive-videos',
    color: "text-amber-500",
  },
  {
    label: 'Video-Statistiken',
    icon: ClipboardList,
    href: '/statistics',
    color: "text-blue-500",
  }
];

const routes3 = [
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: "text-gray",
  },
];

const routes6 = [
  {
    label: 'Persönliche Anfrage',
    icon: MailQuestion,
    href: '/anfrage',
    color: "text-white",
  },
];


export const Sidebar = ({
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white overflow-y-auto">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-8">
          <div className="relative h-10 w-10 mr-3">
            <Image fill alt="Logo" src="/Videyou-Logo.png" layout="fill" />
          </div>
          <h1 className={cn("p-0 font-bold", poppins.className)}>
            Videyou
          </h1>
        </Link>
        <h2 className={cn("p-1 pt-2font-bold", poppins.className)}>
          Deine Basis
        </h2>
        <div className="space-y-1">
          {routes5.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        
        <h2 className={cn("p-1 pt-2font-bold", poppins.className)}>
          Deine Videos
        </h2>
        <div className="space-y-1">
          {routes2.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <h2 className={cn("p-1 font-bold", poppins.className)}>
          Mediathek
        </h2>
        <div className="space-y-1">
          {routes4.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <h2 className={cn("p-1 font-bold", poppins.className)}>
          Assistenten
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>

        <h2 className={cn("p-1 font-bold", poppins.className)}>
        Anfragen
        </h2>
        <div className="space-y-1">
          {routes6.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>

        <h2 className={cn("p-1 font-bold", poppins.className)}>
          Einstellungen
        </h2>
        <div className="space-y-1">
          {routes3.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <FreeCounter isPro={isPro} />
    </div>
  );
};



/*<h2 className={cn("p-1 font-bold", poppins.className)}>
          Tools
        </h2>
        <div className="space-y-1">
          {routes2.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>*/