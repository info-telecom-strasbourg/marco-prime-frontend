import { useState } from "preact/hooks";

export function useFetch(path: string, options?: RequestInit) {
  const [response, setResponse] = useState<unknown>(null);
  const [loaded, setLoaded] = useState<string>();
  const [error, setError] = useState<unknown>(null);

  console.log(new URL(path, import.meta.env.VITE_API_URL), {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    ...options,
  });

  const loading = loaded !== path;

  const fetchData = async () => {
    try {
      const res = await fetch(new URL(path, import.meta.env.VITE_API_URL), {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
        ...options,
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoaded(path);
    }
  };

  return { response, loading, fetchData, error };
}
