"use client";

import { useState, useEffect, useCallback } from "react";
import { SpotifyData } from "@/types/spotify";

interface UseSpotifyReturn {
  data: SpotifyData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSpotify(pollingInterval: number = 30000): UseSpotifyReturn {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpotifyData = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch("/api/spotify");

      if (!response.ok) {
        throw new Error("Failed to fetch Spotify data");
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Spotify fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchSpotifyData();
  }, [fetchSpotifyData]);

  useEffect(() => {
    // Initial fetch
    fetchSpotifyData();

    // Set up polling interval
    const interval = setInterval(fetchSpotifyData, pollingInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [fetchSpotifyData, pollingInterval]);

  return { data, loading, error, refetch };
}
