import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error("Not Found!");
        }
        const data = await req.json();
        setData(data.results || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [url]);
  return { data, error, loader };
};
