import { useState } from 'react';

import { Counter } from './components/Counter/Counter.jsx';
import { Header } from './components/Header.jsx';
import { log } from './log.js';
import { ConfigureCounter } from './components/Counter/ConfigureCounter.jsx';

export const App = () => {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  const handleSetCount = (count) => {
    setChosenCount(count);
  };

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSetCount={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
};
