import React from "react";
import { getImageURL } from "@/lib/pocketbase";
import Image from "next/image";

function DocumentShowcase({ semestername }) {
  const thumbnailPlaceholder = "https://placehold.co/240x340";
  return (
    <>
      <div className="mt-5 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {semestername.map((document) => (
          <div
            key={document.id}
            className="flex flex-col items-center justify-center duration-200 hover:scale-105"
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
                loading="eager"
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
    </>
  );
}

export default DocumentShowcase;
