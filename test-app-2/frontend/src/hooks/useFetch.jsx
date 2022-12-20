import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  function fetchData(url, options) {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setError(null);
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    if (url) {
      fetchData(url, options);
    }
  }, []);
  return { loading, error, data, fetchData };
};

export default useFetch;
