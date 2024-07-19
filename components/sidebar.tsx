"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import {
  SmilePlus,
  ScrollText,
  LayoutDashboard,
  BookMarked,
  MessageSquare,
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
    label: 'Writer - Assistant',
    icon: ScrollText,
    href: '/Writer',
    color: "text-red-500",
  },
  {
    label: 'Organisation - Assistant',
    icon: MessageSquare,
    href: '/organisation',
    color: "text-violet-500",
  },
  {
    label: 'Second Brain - Business',
    icon: BookMarked,
    href: '/journaling',
    color: "text-white",
  },

  
];


const routes4 = [

  {
    label: 'Ernährungsberater - AI',
    icon: Apple,
    href: '/e-beratung',
    color: "text-emerald-500",
  },
  {
    label: 'Fitnesscoach - AI',
    icon: Dumbbell,
    href: '/f-beratung',
    color: "text-amber-500",
  },
  {
    label: 'Mental - AI',
    icon: SmilePlus,
    href: '/mental',
    color: "text-red-300",
  },
  {
    label: 'Second Brain - Personal',
    icon: BookMarked,
    href: '/journaling',
    color: "text-white",
  },

  
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
    label: 'Kalender',
    icon: CalendarCheck,
    href: '/kalender',
    color: "text-gray",
  },
  {
    label: 'Taskmanager',
    icon: ClipboardList,
    href: '/taskmanager',
    color: "text-gray",
  },
  {
    label: 'Gewohnheiten',
    icon: Contact,
    href: '/e-plan',
    color: "text-gray",
  },
  {
    label: 'Fitness & Ernährung',
    icon: HeartHandshake,
    href: '/f-plan',
    color: "text-gray",
  },
  {
    label: 'Tagebuch',
    icon: BookLock,
    href: '/diary',
    color: "text-gray",
  },
];

const routes3 = [
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: "text-gray",
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
          <div className="relative h-8 w-8 mr-3">
            <Image fill alt="Logo" src="/logo-3.png" layout="fill" />
          </div>
          <h1 className={cn("p-0 font-bold", poppins.className)}>
            KI Innovationszentrum
          </h1>
        </Link>
        <h2 className={cn("p-1 pt-2font-bold", poppins.className)}>
          Deine Kirana
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
          Business-Assistants
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
          Personal-Assistants
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
          Unique-Assistants
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

        <h2 className={cn("p-1 font-bold", poppins.className)}>
        Anwendungshilfe
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