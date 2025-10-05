import { useState } from 'react';

export const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing((isEditing) => !isEditing);

    if (isEditing) {
      onChangeName(symbol, name);
    }
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  let playerName = <span className="player-name">{name}</span>;

  if (isEditing) {
    playerName = (
      <input type="text" required value={name} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? 'active' : null}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};
