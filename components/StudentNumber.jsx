'use client'
import { toast } from "sonner";
import { Button } from "./ui/button";

export function handleCopy(input, melding) {
  if (navigator.clipboard.writeText(input)) {
  toast.success(`${melding} gekopieerd!`);
  } else {
    toast.error(`${melding} niet kunnen kopieeren`)
  }
}

export default function StudentNumber() {
  return (
    <div className="fixed top-0 right-0 m-2">
      <Button variant="outline" onClick={() => handleCopy("5371333", "Studentnummer")}>
        SN: 5371333
      </Button>
    </div>
  );
}