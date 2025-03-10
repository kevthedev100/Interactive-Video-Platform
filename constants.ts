import {Plus, MonitorPlay, UserCheck  } from "lucide-react";

export const MAX_FREE_COUNTS = 20;

export const tools = [
  {
    label: 'Neues Video erstellen',
    icon: Plus,
    href: '/interactive-videos',
    color: "text-black",
  },
  {
    label: 'Interaktive Videos',
    icon: MonitorPlay,
    href: '/interactive-library',
    color: "text-amber-500",
  },
  {
    label: 'Video-Statistiken',
    icon: UserCheck,
    href: '/statistics',
    color: "text-blue-500",
  }
];
