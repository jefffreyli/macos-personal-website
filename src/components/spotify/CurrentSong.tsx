import { SpotifyData } from "@/types/spotify";
import Image from "next/image";

interface ErrorStateProps {
  error: string;
}

function ErrorState({ error }: ErrorStateProps) {
  return <div className="text-red-500 p-4">Error: {error}</div>;
}

function NotPlayingState() {
  return (
    <div className="p-4 md:p-6 border-b border-gray-800">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg flex-shrink-0 bg-gray-800 flex items-center justify-center">
          <span className="text-xl md:text-2xl">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-0.5 md:mb-1">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-400 text-xs md:text-sm font-medium">
                Not Playing
              </span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-base md:text-lg truncate mb-0.5 md:mb-1">
            Nothing currently playing
          </h3>

          <p className="text-gray-400 text-xs md:text-sm truncate mb-0.5 md:mb-1">
            Jeffrey is not listening to anything right now.
          </p>
        </div>
      </div>
    </div>
  );
}

interface CurrentSongProps {
  isLoading: boolean;
  error: string | null;
  data: SpotifyData | null;
}

export function CurrentSong({ error, data }: CurrentSongProps) {
  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data?.isPlaying || !data?.track) {
    return <NotPlayingState />;
  }

  const { track } = data;

  return (
    <div className="p-4 md:p-6 border-b border-gray-800">
      <div className="flex items-center space-x-3 md:space-x-4">
        {track.image && (
          <div className="relative w-12 h-12">
            <Image
              src={track.image}
              alt={track.name}
              className="rounded-lg"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-0.5 md:mb-1">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs md:text-sm font-medium">
                Now Playing
              </span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-base md:text-lg truncate mb-0.5 md:mb-1">
            {track.name}
          </h3>

          <p className="text-gray-400 text-xs md:text-sm truncate mb-0.5 md:mb-1">
            by {track.artists.join(", ")}
          </p>

          <p className="text-gray-500 text-[10px] md:text-xs truncate mb-2 md:mb-3">
            {track.album}
          </p>
        </div>
      </div>
    </div>
  );
}
