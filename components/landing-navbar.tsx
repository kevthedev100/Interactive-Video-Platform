"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex flex-wrap items-center justify-between">
      <div className="w-full md:w-auto flex justify-between items-center mb-4 md:mb-0">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-3">
            <Image fill alt="Logo" src="/logo-3.png" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            KI Innovationszentrum
          </h1>
        </Link>
      </div>
      <div className="flex w-full md:w-auto justify-center md:justify-start">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Zugang zu Kirana
          </Button>
        </Link>
      </div>
    </nav>
  );
};
