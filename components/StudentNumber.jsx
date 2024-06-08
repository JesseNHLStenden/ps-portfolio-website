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
    <div className="fixed right-0 top-0 m-2">
      <Button
        variant="outline"
        onClick={() => handleCopy("5371333", "Studentnummer")}
      >
        <Copy className="w-4 h-4 mr-2" /> SN: 5371333
      </Button>
    </div>
  );
}