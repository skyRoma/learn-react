import { useEffect, useState } from 'react';

export const ProgressBar = ({ max }) => {
  const [remainingTime, setRemainingTime] = useState(max);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return <progress value={remainingTime} max={max} />;
};
