import { useRef, useState } from 'react';
import { ResultModal } from './ResultModal';

export const TimerChallenge = ({ title, targetTime }) => {
  const intervalIdRef = useRef();
  const dialogRef = useRef();

  const [remainingTime, setTimeRemaining] = useState(targetTime * 1000);

  const isTimerActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  if (remainingTime === 0) {
    clearInterval(intervalIdRef.current);
    dialogRef.current.open();
  }

  const handleStart = () => {
    intervalIdRef.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalIdRef.current);
    dialogRef.current.open();
  };

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        remainingTime={remainingTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isTimerActive ? 'active' : null}>
          {isTimerActive ? 'Timer is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
};
