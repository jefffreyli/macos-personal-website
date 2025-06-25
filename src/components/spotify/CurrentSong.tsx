import { useSpotify } from "@/hooks/useSpotify";

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="text-red-400 mb-2">⚠️ Error loading Spotify data</div>
      <div className="text-gray-400 text-sm mb-4">{error}</div>
    </div>
  );
}

function NotPlayingState() {
  return (
    <div className="p-6 border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-lg shadow-lg flex-shrink-0 bg-gray-800 flex items-center justify-center">
          <span className="text-2xl">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium">
                Not Playing
              </span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-lg truncate mb-1">
            Nothing currently playing
          </h3>

          <p className="text-gray-400 text-sm truncate mb-1">
            Jeffrey is not listening to anything right now.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CurrentSong() {
  const { data, error, refetch } = useSpotify(10000); // Poll every 10 seconds

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data?.isPlaying || !data?.track) {
    return <NotPlayingState />;
  }

  const { track } = data;

  return (
    <div className="p-6 border-b border-gray-800">
      <div className="flex items-center space-x-4">
        {track.image && (
          <img
            src={track.image}
            alt={`${track.album} cover`}
            className="w-16 h-16 rounded-lg shadow-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Now Playing
              </span>
            </div>
          </div>

          <h3 className="text-white font-semibold text-lg truncate mb-1">
            {track.name}
          </h3>

          <p className="text-gray-400 text-sm truncate mb-1">
            by {track.artists.join(", ")}
          </p>

          <p className="text-gray-500 text-xs truncate mb-3">{track.album}</p>
        </div>
      </div>
    </div>
  );
}
