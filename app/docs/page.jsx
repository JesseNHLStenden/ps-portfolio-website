"use client";
import React, { useState, useEffect } from "react";
import Particles from "@/components/particles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentShowcase from "@/components/DocumentShowcase";
import Loader from "@/components/Loader";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

export default function Page() {
  const [semester1Documents, setSemester1Documents] = useState([]);
  const [semester2Documents, setSemester2Documents] = useState([]);
  const [isloading, setLoading] = useState(true);
  const router = useRouter();

  async function getFiles() {
    const response = await pb.collection("ps_items").getFullList({
      expand: "psDocs"
    })
    return response;
  }

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const files = await getFiles();
        const semester1 = files.filter(
          (file) => file.semester === 1 && file.year === 1,
        );
        const semester2 = files.filter(
          (file) => file.semester === 2 && file.year === 1,
        );

        await new Promise((resolve) => setTimeout(resolve, 1250));

        setSemester1Documents(semester1);
        setSemester2Documents(semester2);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setSemester1Documents([]);
        setSemester2Documents([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {isloading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-screen flex min-h-screen animate-fade-in flex-col items-center overflow-x-hidden overscroll-none antialiased dark:bg-gradient-to-tl dark:from-black/20 dark:via-zinc-600/20 dark:to-black/20">
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <h1 className="mb-4 pt-10 text-center text-4xl font-bold">
            Professional Skills
          </h1>
          <Tabs
            defaultValue="sem2"
            className="flex flex-col items-center justify-center"
          >
            <TabsList>
              <TabsTrigger value="sem1">Semester 1</TabsTrigger>
              <TabsTrigger value="sem2">Semester 2</TabsTrigger>
            </TabsList>
            <TabsContent value="sem1">
              <DocumentShowcase semestername={semester1Documents} />
            </TabsContent>
            <TabsContent value="sem2">
              <DocumentShowcase semestername={semester2Documents} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </main>
  );
}