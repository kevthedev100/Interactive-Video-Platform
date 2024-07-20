import { SmilePlus, BookMarked, MessageSquare, Dumbbell, Apple, ScrollText } from "lucide-react";

export const MAX_FREE_COUNTS = 20;

export const tools3 = [

  {
    label: 'Video-Mediathek',
    icon: Apple,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: '/e-beartung',
  },
  {
    label: 'Interaktive Videos',
    icon: Dumbbell,
    color: "text-amber-500",
    bgColor: "bg-orange-700/10",
    href: '/interactive-videos',
  },
  {
    label: 'Mental - AI',
    icon: SmilePlus,
    color: "text-red-300",
    bgColor: "bg-pink-700/10",
    href: '/mental',
  },
  {
    label: 'Wissensdatenbank',
    icon: BookMarked,
    href: '/journaling',
    color: "text-black",
    bgColor: "bg-gray-700/10",
  },
];
