import { NextResponse } from "next/server";

// Spotify API configuration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyCurrentlyPlayingResponse {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; width: number; height: number }>;
    };
    external_urls: {
      spotify: string;
    };
    duration_ms: number;
  } | null;
  progress_ms: number;
}

async function getAccessToken(): Promise<string> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Missing Spotify environment variables");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify access token");
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

async function getCurrentlyPlaying(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    // No content - nothing currently playing
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch currently playing track");
  }

  return response.json() as Promise<SpotifyCurrentlyPlayingResponse>;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const currentlyPlaying = await getCurrentlyPlaying(accessToken);

    if (!currentlyPlaying || !currentlyPlaying.item) {
      return NextResponse.json({
        isPlaying: false,
        track: null,
      });
    }

    const track = {
      name: currentlyPlaying.item.name,
      artists: currentlyPlaying.item.artists.map((artist) => artist.name),
      album: currentlyPlaying.item.album.name,
      image: currentlyPlaying.item.album.images[0]?.url || null,
      url: currentlyPlaying.item.external_urls.spotify,
      isPlaying: currentlyPlaying.is_playing,
      progress: currentlyPlaying.progress_ms,
      duration: currentlyPlaying.item.duration_ms,
    };

    return NextResponse.json({
      isPlaying: currentlyPlaying.is_playing,
      track,
    });
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch currently playing track" },
      { status: 500 }
    );
  }
}
