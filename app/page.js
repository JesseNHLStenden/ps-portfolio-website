import Particles from "@/components/particles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
<<<<<<< HEAD

function page() {
=======
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { Loader2, BadgeCheck } from "lucide-react";

function Page() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const tokenitem = searchParams.get("token");
    if (tokenitem) {
      setToken(tokenitem);
    }
  }, []);

  function clearStates() {
    setError("");
    setSuccess(false);
    token && setToken("");
  }

  function handleSubmit(event) {
    console.log("submit");
    event.preventDefault();
    verifyToken(inputToken).then((isValid) => {
      if (isValid) {
        window.location.href = `/docs?token=${inputToken}`;
      }
    });
  }

  async function verifyToken(token) {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const record = await pb
        .collection("tokens")
        .getFirstListItem(`token="${token}"`);
      const isValidToken = record !== undefined && record !== null;
      setLoading(false);
      return isValidToken;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  }

>>>>>>> parent of 4f55a45 (Refactor form layout and error handling in page.js)
  return (
    <div className="animate-glow flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black/20 via-zinc-600/20 to-black/20 antialiased">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="mb-5 animate-fade-in text-6xl font-bold">Bram Suurd</h1>
      <p className="max-w-xl animate-fade-in text-center">
        Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik
        al mijn documenten op plaatsen die ik in de loop van mijn studie heb
        gemaakt.
      </p>
<<<<<<< HEAD
      <Button size="lg" className="mt-5 animate-fade-in" asChild>
        <Link href="/docs">Bekijk documenten</Link>
      </Button>
=======
      <Dialog>
        <DialogTrigger onClick={clearStates}>
          {token ? (
            <Button size="lg" asChild className="mt-5 animate-fade-in">
              <Link href={`/docs?token=${token}`}>Bekijk documenten</Link>
            </Button>
          ) : (
            <Button size="lg" className="mt-5 animate-fade-in">
              <Lock className="mr-2 h-4 w-4" />
              Bekijk documenten
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authenticatie</DialogTitle>
            <DialogDescription>
              Om mijn bestanden te bekijken, moet je een token hebben. heb je
              deze niet? neem dan contact op met mij.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form
              className="flex w-full flex-col gap-2"
              onSubmit={handleSubmit}
            >
              <div className="flex sm:gap-2 gap-4 sm:flex-row flex-col">
                <Input
                  type="password"
                  placeholder="Token"
                  name="token"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                
                  // when the success state is true, the input field will have a green border. when the error state is true, the input field will have a red border.
                  className={`${
                    success ? "border-green-500" : ""
                  } ${error ? "border-red-500" : ""}`}
                />
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      <p>Verifieer</p>
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      <p>Verifieer</p>
                    </>
                  )}
                </Button>
              </div>
              {error && <p className="text-xs text-red-500">Verkeerde token, probeer het opnieuw</p>}
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
>>>>>>> parent of 4f55a45 (Refactor form layout and error handling in page.js)
    </div>
  );
}

export default page;
