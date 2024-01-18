import { useEffect, useState } from 'react';

export const useFetch = (fetchFn, initialValue) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchFn();
        setData(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch data.');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [fetchFn]);

  return { isLoading, error, data, setData };
};
