"use client";

import { CurrentSong } from "@/components/spotify/CurrentSong";
import { useSpotify } from "@/hooks/useSpotify";

export function Spotify() {
  const { data, loading, error } = useSpotify();

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex-1 min-h-0">
        <iframe
          src="https://open.spotify.com/embed/playlist/5owlM2bFfswB3g6Rf0qcrY?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="flex-1 w-full"
          style={{ minHeight: "300px", maxHeight: "calc(100vh - 150px)" }}
        />
      </div>
      <CurrentSong isLoading={loading} error={error} data={data} />
    </div>
  );
}
