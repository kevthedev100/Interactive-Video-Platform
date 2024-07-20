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
          <div className="relative h-10 w-10 mr-1">
            <Image fill alt="Logo" src="/Videyou-Logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            Videyou
          </h1>
        </Link>
      </div>
      <div className="flex w-full md:w-auto justify-center md:justify-start space-x-4">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Login
          </Button>
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="rounded-full">
            Jetzt kostenlos registrieren
          </Button>
        </Link>
      </div>
    </nav>
  );
};
