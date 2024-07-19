import { SmilePlus, BookMarked, MessageSquare, Dumbbell, Apple, ScrollText } from "lucide-react";

export const MAX_FREE_COUNTS = 20;

export const tools = [
  {
    label: 'Writer - Assistant',
    icon: ScrollText,
    href: '/Writer',
    color: "text-red-500",
    bgColor: "bg-gray-700/10",
  },
  {
    label: 'Organisation - Assistant',
    icon: MessageSquare,
    href: '/organisation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Second Brain - Business',
    icon: BookMarked,
    href: '/journaling',
    color: "text-black",
    bgColor: "bg-gray-700/10",
  },
];
