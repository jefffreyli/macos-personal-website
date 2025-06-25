"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "@/types/photos";
import { photos } from "@/components/photos/photo-library";
import Image from "next/image";

export function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(photos[newIndex]);
  };

  // Full-screen photo viewer
  if (selectedPhoto) {
    return (
      <div className="h-full w-full flex flex-col bg-black">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={closePhoto}
              className="p-1 hover:bg-white/20 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center flex-1">
            <div className="font-medium">
              {selectedPhoto.location || selectedPhoto.title}
            </div>
            <div className="text-sm opacity-75">{selectedPhoto.date}</div>
          </div>
          <div className="w-[76px]"></div>{" "}
          {/* Spacer to balance the left button */}
        </div>

        {/* Photo Display */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden p-4 bg-black">
          <button
            onClick={() => navigatePhoto("prev")}
            className="absolute left-6 p-2 mb-4 bg-black/50 hover:bg-black/70 rounded-full text-white z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={selectedPhoto.src || "/placeholder.svg"}
              alt={selectedPhoto.title}
              className="max-h-full max-w-full object-contain"
              fill
              style={{
                objectFit: "contain",
              }}
              priority
            />
          </div>

          <button
            onClick={() => navigatePhoto("next")}
            className="absolute right-6 p-2 mb-4 bg-black/50 hover:bg-black/70 rounded-full text-white z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white">
      {/* Main Content */}
      <div className="h-full w-full">
        {/* Photo Grid */}
        <div className="h-full w-full p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square cursor-pointer group relative overflow-hidden rounded-lg bg-gray-100"
                onClick={() => openPhoto(photo)}
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
