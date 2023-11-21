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

  return (
    <li className={isActive ? 'active' : null}>
      <span className="player">
        {isEditing && (
          <input type="text" required value={name} onChange={handleChange} />
        )}
        {!isEditing && <span className="player-name">{name}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};
