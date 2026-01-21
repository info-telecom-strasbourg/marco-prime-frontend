import { useEffect, useRef, useState } from "preact/hooks";
import type z from "zod";

type useFetchState<T> = {
  data: T | null;
  error: unknown | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

export function useFetch<T>(
  validator: z.ZodType<T>,
  url: string,
  options?: RequestInit,
  directFetch: boolean = true,
): useFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loadedUrl, setLoadedUrl] = useState<string>();
  const [error, setError] = useState<unknown | null>(null);
  const loading = loadedUrl !== url;

  const abortRef = useRef<AbortController | null>(null);

  const refetch = async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch(url, {
        ...options,
        signal: abortRef.current.signal,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          ...options?.headers,
        },
      });
      const data = await res.json();
      const safeData = validator.parse(data);
      setError(null);
      setData(safeData);
    } catch (error) {
      setError(error);
    } finally {
      setLoadedUrl(url);
    }
  };

  useEffect(() => {
    if (directFetch) refetch();

    return () => abortRef.current?.abort();
  }, [url]);

  return { data, loading, error, refetch };
}
