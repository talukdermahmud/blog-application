import { useState, useEffect, useCallback } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fetchFn();
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setState({ data: null, loading: false, error: message });
      }
    };

    fetchData();
  }, [trigger, fetchFn]);

  return { ...state, refetch };
}
