import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "Get",
          data: "json",
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw Error(
            "could not fetch data for that resource:",
            response.status
          );
        }

        const result = await response.json();

        setData(result);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log(err.message);
        } else {
          setError(err.message);
          console.log(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
