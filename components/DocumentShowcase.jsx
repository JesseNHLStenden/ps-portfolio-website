import React, {useState} from "react";
import { getImageURL } from "@/lib/pocketbase";
import Image from "next/image";


function DocumentShowcase({ semestername }) {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const thumbnailPlaceholder = "https://placehold.co/240x340";

  const openModal = (document) => {
    setSelectedDocument(document);
  };

  const closeModal = () => {
    setSelectedDocument(null);
  }

  return (
    <>
      <div className="mt-5 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {semestername.map((document) => (
          <div
            key={document.id}
            className="flex flex-col items-center justify-center duration-200 hover:scale-105"
            onClick={() => openModal(document)}
          >
            <button onClick={() => openModal(document)}>
              <Image
                src={
                  getImageURL(document.id, document.thumbnail) ||
                  thumbnailPlaceholder
                }
                alt={document.documentName}
                width={400}
                height={500}
                priority={true}
                quality={100}
                className="h-[340px] w-[240px] cursor-pointer rounded-md object-cover"
              />
            </button>
            <button
              className="w-[240px] truncate text-center text-lg font-bold"
              onClick={() => openModal(document)}
            >
              {document.documentName}
            </button>
          </div>
        ))}
      </div>
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
            title={selectedDocument.documentName}
            src={getImageURL(selectedDocument.id, selectedDocument.pdf)}
          ></iframe>
        </div>
      )}
    </>
  );
}

export default DocumentShowcase;
