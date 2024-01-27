import { useCallback, useEffect, useState } from 'react';

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed!');
  }

  return data;
};

export const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await sendHttpRequest(url, config);

      setData(data);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if (!config || config.method === 'GET') {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
};
