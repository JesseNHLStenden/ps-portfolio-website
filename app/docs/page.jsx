"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Particles from "@/components/particles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";

export default function Page() {
  const [semester1Documents, setSemester1Documents] = useState([]);
  const [semester2Documents, setSemester2Documents] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const thumbnailPlaceholder = "https://placehold.co/240x340";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/document");
        if (!res.ok) {
          throw new Error("Failed to fetch documents");
        }
        const data = await res.json();

        const semester1 = data.filter(
          (doc) => doc.year === 1 && doc.semester === 1,
        );
        const semester2 = data.filter(
          (doc) => doc.year === 1 && doc.semester === 2,
        );

        setSemester1Documents(semester1);
        setSemester2Documents(semester2);
        setTimeout(() => {
          setLoading(false);
        }, 1250);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setSemester1Documents([]);
        setSemester2Documents([]);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  const openModal = (document) => {
    setSelectedDocument(document);
  };

  const closeModal = () => {
    setSelectedDocument(null);
  };

  return (
    <main>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="banter-loader">
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
            <div class="banter-loader__box"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen flex min-h-screen animate-fade-in flex-col items-center overflow-x-hidden overscroll-none bg-gradient-to-tl from-black/20 via-zinc-600/20 to-black/20 antialiased">
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <h1 className="mb-4 pt-10 text-center text-4xl font-bold">
            Professional Skills Portfolio
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
              <div className="mt-5 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {semester1Documents.map((document, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center duration-200 hover:scale-105"
                  >
                    <button onClick={() => openModal(document)}>
                      <Image
                        src={document.thumbnail || thumbnailPlaceholder}
                        alt={document.documentName}
                        width={400}
                        height={500}
                        quality={100}
                        className="h-[340px] w-[240px] cursor-pointer rounded-md object-cover"
                      />
                    </button>
                    <a
                      className="w-[240px] truncate text-center text-lg font-bold"
                      href={document.pdfLink}
                    >
                      {document.documentName}
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sem2">
              <div className="mt-5 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {semester2Documents.map((document, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center duration-200 hover:scale-105"
                  >
                    <button onClick={() => openModal(document)}>
                      <Image
                        src={document.thumbnail || thumbnailPlaceholder}
                        alt={document.documentName}
                        width={400}
                        height={500}
                        quality={100}
                        className="h-[340px] w-[240px] cursor-pointer rounded-md object-cover"
                      />
                    </button>
                    <a
                      className="w-[240px] truncate text-center text-lg font-bold"
                      href={document.pdfLink}
                    >
                      {document.documentName}
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex flex-col items-center justify-center pt-12"></div>
          {selectedDocument && (
            <div
              className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50"
              onClick={closeModal}
            >
              <button
                className="absolute right-2 top-2 text-lg font-bold text-white"
                onClick={closeModal}
              >
                &times;
              </button>
              <iframe
                className="h-screen w-1/2"
                src={selectedDocument.pdfLink}
                title={selectedDocument.documentName}
              ></iframe>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
