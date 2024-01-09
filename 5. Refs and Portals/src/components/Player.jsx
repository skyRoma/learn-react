import { useRef, useState } from 'react';

export const Player = () => {
  const inputRef = useRef();

  const [playerName, setPlayerName] = useState('');

  const handleClick = () => {
    setPlayerName(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <section id="player">
      <h2>Welcome {playerName || 'unknown entity'}</h2>
      <p>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}> Set Name</button>
      </p>
    </section>
  );
};
