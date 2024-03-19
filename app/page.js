import Particles from "@/components/particles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black/20 via-zinc-600/20 to-black/20 antialiased animate-glow">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="font-bold text-6xl mb-5 animate-fade-in">Bram Suurd</h1>
      <p className="max-w-xl text-center animate-fade-in">
        Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik
        al mijn documenten op plaatsen die ik in de loop van mijn studie heb
        gemaakt.
      </p>
      <Button size="lg" className="mt-5 animate-fade-in" asChild>
        <Link href="/docs">Bekijk documenten</Link>
      </Button>
    </div>
  );
}

export default page;
