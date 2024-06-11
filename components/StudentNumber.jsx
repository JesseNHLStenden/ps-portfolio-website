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
    <div className="fixed left-0 top-11 m-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopy("5371333", "Studentnummer")}
      >
      SN: 5371333 <Copy className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}