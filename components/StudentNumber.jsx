'use client'
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export function handleCopy(input, melding) {
  if (navigator.clipboard.writeText(input)) {
    toast.success(`${melding} gekopieerd!`);
  } else {
    toast.error(`${melding} niet kunnen kopieeren`);
  }
}

export default function StudentNumber() {
  return (
    <div className="left-0 top-11 m-2 hidden sm:fixed sm:block">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopy("5371333", "Studentnummer")}
      >
        SN: 5371333 <Copy className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}