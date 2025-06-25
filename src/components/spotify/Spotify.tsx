"use client";

import { CurrentSong } from "@/components/spotify/CurrentSong";

export function Spotify() {
  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex-1">
        <iframe
          src="https://open.spotify.com/embed/playlist/5owlM2bFfswB3g6Rf0qcrY?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="flex-1"
          style={{ minHeight: "400px" }}
        />
      </div>
      <CurrentSong />
    </div>
  );
}
