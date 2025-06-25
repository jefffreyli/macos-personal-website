export interface SpotifyTrack {
  name: string;
  artists: string[];
  album: string;
  image: string | null;
  url: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

export interface SpotifyData {
  isPlaying: boolean;
  track: SpotifyTrack | null;
}

export interface SpotifyApiResponse {
  isPlaying: boolean;
  track: SpotifyTrack | null;
  error?: string;
}
