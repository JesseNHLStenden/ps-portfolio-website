"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Particles from "@/components/particles";

function page() {
  const [semester1Documents, setSemester1Documents] = useState([]);
  const [semester2Documents, setSemester2Documents] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null); // State to track the selected document
  const thumbnailPlaceholder = "https://placehold.co/240x340";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/document");
        if (!res.ok) {
          throw new Error("Failed to fetch documents");
        }
        const data = await res.json();

        // Separate documents into semester 1 and semester 2 arrays
        const semester1 = data.filter(
          (doc) => doc.year === 1 && doc.semester === 1
        );
        const semester2 = data.filter(
          (doc) => doc.year === 1 && doc.semester === 2
        );

        setSemester1Documents(semester1);
        setSemester2Documents(semester2);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setSemester1Documents([]);
        setSemester2Documents([]);
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
      <div className="bg-gradient-to-tl from-black/20 via-zinc-600/20 to-black/20 antialiased">
        <Particles className="absolute inset-0 -z-10" quantity={100} />
        <div className="flex flex-col justify-center items-center pt-12">
          <h1 className="text-4xl font-bold">Semester 1</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-7xl mt-5">
            {semester1Documents.map((document, index) => (
              <div
                key={index}
                className="flex flex-col justify-center hover:scale-105 duration-200 items-center"
              >
                <button onClick={() => openModal(document)}>
                  <Image
                    src={document.thumbnail || thumbnailPlaceholder}
                    alt={document.documentName}
                    width={400}
                    height={500}
                    quality={100}
                    className="border h-[340px] w-[240px] object-cover cursor-pointer"
                  />
                </button>
                <a
                  className="text-lg text-center font-bold truncate w-[240px]"
                  href={document.pdfLink}
                >
                  {document.documentName}
                </a>
              </div>
            ))}
          </div>
          <h1 className="text-4xl font-bold mt-10">Semester 2</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-7xl mt-5">
            {semester2Documents.map((document, index) => (
              <div
                key={index}
                className="flex flex-col justify-center hover:scale-105 duration-200 items-center"
              >
                <button onClick={() => openModal(document)}>
                  <Image
                    src={document.thumbnail || thumbnailPlaceholder}
                    alt={document.documentName}
                    width={400}
                    height={500}
                    quality={100}
                    className="rounded-md h-[340px] w-[240px] object-cover cursor-pointer"
                  />
                </button>
                <a
                  className="text-lg text-center font-bold truncate w-[240px]"
                  href={document.pdfLink}
                >
                  {document.documentName}
                </a>
              </div>
            ))}
          </div>
        </div>
        {selectedDocument && (
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <button
              className="absolute top-2 right-2 text-lg font-bold text-white"
              onClick={closeModal}
            >
              &times;
            </button>
            <iframe
              className="w-1/2 h-screen"
              src={selectedDocument.pdfLink}
              title={selectedDocument.documentName}
            ></iframe>
          </div>
        )}
      </div>
    </main>
  );
}

export default page;
