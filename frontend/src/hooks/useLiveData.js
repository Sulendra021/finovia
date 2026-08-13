import { useEffect, useState } from "react";

// Tries the live backend first; silently falls back to (and stays on) the
// bundled mock data if the API is unreachable or returns nothing, so every
// page renders whether or not `backend/` is running.
export function useLiveData(apiFn, mockData) {
  const [data, setData] = useState(mockData);
  const [source, setSource] = useState("mock");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    apiFn()
      .then((res) => {
        if (!cancelled && Array.isArray(res) && res.length > 0) {
          setData(res);
          setSource("live");
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, source, loading };
}
