"use client";
import Particles from "@/components/particles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";

function Page() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has("token")) {
      const token = url.searchParams.get("token");
      setToken(token);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url);
    }

    if (token) {
      (async () => {
        try {
          await pb
            .collection("tokens")
            .authWithPassword("token@portfolio.com", token);

          if (pb.authStore.isValid) {
            setIsLoggedIn(true);
          } else {
            console.log("Token is invalid");
          }
        } catch (error) {
          console.error("Authentication failed:", error);
        }
      })();
    }

    if (pb.authStore.isValid) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn, token, setToken]);

  async function login(event) {
    try {
      setIsLoading(true);
      event.preventDefault();

      const token = event.target.token.value;

      await new Promise((resolve) => setTimeout(resolve, 750));

      await pb
        .collection("tokens")
        .authWithPassword("token@portfolio.com", token);

      if (pb.authStore.isValid) {
        router.push("/docs");
      } else {
        setIsError("Authenticatie mislukt, probeer het opnieuw.");
      }
    } catch (error) {
      console.error(error);

      if (error && error.status) {
        if (error.status === 400) {
          setIsError("De token is onjuist, probeer het opnieuw.");
        } else if (error.status === 404) {
          setIsError("Er is iets fout gegaan, probeer het later opnieuw.");
        } else {
          setIsError("Er is een onbekende fout opgetreden.");
        }
      } else {
        setIsError("Er is een onbekende fout opgetreden.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="animate-glow flex h-screen w-screen flex-col items-center justify-center overflow-hidden antialiased dark:bg-gradient-to-tl dark:from-black/20 dark:via-zinc-600/20 dark:to-black/20">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="mb-5 animate-fade-in text-6xl font-bold">Jesse van der Voet</h1>
      <p className="max-w-xl animate-fade-in text-center">
        Welkom bij mijn portfolio website voor Professional Skills. Hier zal ik
        al mijn documenten op plaatsen die ik in de loop van mijn studie heb
        gemaakt.
      </p>
      <div className="mt-5 animate-fade-in">
        {isLoggedIn ? (
          <div>
            <Link href="/docs" asChild>
              <Button size="lg">Bekijk documenten</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Dialog>
              <DialogTrigger asChild onClick={() => setIsError("")}>
                <Button size="lg" className="flex gap-2">
                  <Lock className="h-4 w-4" /> Bekijk documenten
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={login} className="flex flex-col gap-3">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Authenticatie</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="flex w-full flex-col gap-2">
                    Om mijn documenten te bekijken moet je inloggen met een
                    token, heb je deze niet? Vraag er dan een aan.
                  </DialogDescription>
                  <DialogFooter>
                    <div className="flex w-full flex-col gap-2">
                      <label
                        htmlFor="token"
                        className="text-sm text-muted-foreground"
                      >
                        Token
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="password"
                          id="token"
                          name="token"
                          className={`w-full ${isError ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex gap-2 w-48"
                        >
                          Inloggen{" "}
                          {isLoading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                        </Button>
                      </div>
                      <div className="h-2">
                        {isError && (
                          <p className="text-sm text-red-500">{isError}</p>
                        )}
                      </div>
                    </div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
