import React, { useState } from "react";
import { getImageURL } from "@/lib/pocketbase";
import Image from "next/image";
import { Download, ExternalLink, FolderClosed, Undo2, X} from "lucide-react";
import { Button } from "./ui/button";

function DocumentShowcase({ semestername }) {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const thumbnailPlaceholder = "https://placehold.co/240x340";
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  const openModal = (document) => {
    if (!isMobile) {
      setSelectedDocument(document);
    } else {
      window.open(getImageURL(document.id, document.pdf));
    }
  };

  const openFolder = (folder) => {
    setSelectedFolder(folder);
  };

  const closeModal = () => {
    setSelectedDocument(null);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width <= 640;

  return (
    <>
      {!selectedFolder ? (
        <div className="mt-5 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {semestername.map((document) => (
            <div key={document.expand.psDocs[0].id}>
              {document.expand.psDocs.length > 1 ? (
                <div
                  className="flex flex-col items-center justify-center duration-200 hover:scale-105"
                  onClick={() => openFolder(document.expand.psDocs)}
                >
                  <div className="h-[340px] w-[240px] cursor-pointer rounded-md bg-gray-500/25 object-cover">
                    <div className="flex h-[340px] w-[240px] cursor-pointer items-center justify-center rounded-md object-cover">
                      <FolderClosed className="h-12 w-12" />
                    </div>
                  </div>
                  <button
                    className="w-[240px] truncate text-center text-lg font-bold"
                    onClick={() => openFolder(document.expand.psDocs)}
                  >
                    {document.mapNaam}
                  </button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center duration-200 hover:scale-105"
                  onClick={() => openModal(document.expand.psDocs[0])}
                >
                  <button>
                    <Image
                      src={
                        getImageURL(
                          document.expand.psDocs[0].id,
                          document.expand.psDocs[0].thumbnail,
                        ) || thumbnailPlaceholder
                      }
                      alt={document.expand.psDocs[0].documentName}
                      width={400}
                      height={500}
                      priority={true}
                      quality={100}
                      className="h-[340px] w-[240px] cursor-pointer rounded-md object-cover"
                    />
                  </button>
                  <button
                    className="w-[240px] truncate text-center text-lg font-bold"
                    onClick={() => openModal(document.expand.psDocs[0])}
                  >
                    {document.expand.psDocs[0].documentName}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <div
              className="flex flex-col items-center justify-center duration-200 hover:scale-105"
              onClick={() => setSelectedFolder(null)}
            >
              <div className="h-[340px] w-[240px] cursor-pointer rounded-md bg-gray-500/25 object-cover">
                <div className="flex h-[340px] w-[240px] cursor-pointer items-center justify-center rounded-md object-cover">
                  <Undo2 className="h-12 w-12" />
                </div>
              </div>
              <button
                className="w-[240px] truncate text-center text-lg font-bold"
                onClick={() => setSelectedFolder(null)}
              >
                Ga terug
              </button>
            </div>
          </div>
          {selectedFolder.map((document) => (
            <div key={document.id}>
              <div
                className="flex flex-col items-center justify-center duration-200 hover:scale-105"
                onClick={() => openModal(document)}
              >
                <button>
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
            </div>
          ))}
        </div>
      )}

      {selectedDocument && (
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <div className="flex w-full flex-row-reverse items-center justify-center">
            <Button
              className="m-2 self-start text-lg font-bold text-white"
              onClick={closeModal}
              size="icon"
              variant="default"
            >
              <X className="h-4 w-4 text-black" />
            </Button>
            <iframe
              className="h-screen w-1/2"
              title={selectedDocument.documentName}
              src={getImageURL(selectedDocument.id, selectedDocument.pdf)}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentShowcase;
