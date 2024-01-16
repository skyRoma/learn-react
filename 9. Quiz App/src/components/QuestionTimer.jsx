import { useEffect, useState } from 'react';

export const QuestionTimer = ({ time, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const timeoutId = setTimeout(onTimeout, time);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [time, onTimeout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={time}
      value={remainingTime}
      className={mode}
    />
  );
};
