"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";

export function handleCopy(input, melding) {
  if (navigator.clipboard.writeText(input)) {
    toast.success(`${melding} gekopieerd!`);
  } else {
    toast.error(`${melding} niet kunnen kopieeren`);
  }
}

export function StudentNumber() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="left-0 top-11 m-2 hidden animate-fade-in sm:fixed sm:block"
      onClick={() => handleCopy("5371333", "Studentnummer")}
    >
      <span className="flex h-full w-full items-center justify-center">
        SN: 5371333 <Copy className="ml-2 h-4 w-4" />
      </span>
    </Button>
  );
}

export function PortfolioWebsite() {
  return (
    <Button
      asChild
      className="left-0 top-0 m-2 hidden animate-fade-in sm:fixed sm:block"
      variant="outline"
      size="sm"
    >
      <Link target="_blank" href="https://bramsuurd.nl">
        <span className="flex h-full w-full items-center justify-center">
          Portfolio website <ExternalLink className="ml-2 h-4 w-4" />
        </span>
      </Link>
    </Button>
  );
}
