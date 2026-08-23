import { useEffect, useState } from "react";

/**
 * Custom hook to fetch data from the live API database endpoint.
 * Accepts an API function (e.g. creditCardsApi.getAll) and optional fallback data (if empty).
 */
export function useLiveData(apiFn, fallbackData = []) {
  const [data, setData] = useState([]);
  const [source, setSource] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    apiFn()
      .then((res) => {
        if (!cancelled) {
          const list = Array.isArray(res) ? res : res?.data || [];
          if (list.length > 0) {
            setData(list);
            setSource("live");
          } else {
            setData(fallbackData);
            setSource("fallback");
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setData(fallbackData);
          setSource("fallback");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, source, loading, error };
}
