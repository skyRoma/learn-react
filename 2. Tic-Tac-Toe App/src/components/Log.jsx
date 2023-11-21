export const Log = ({ gameTurns }) => {
  return (
    <ol id="log">
      {gameTurns.map(({ rowIndex, colIndex, symbol }) => (
        <li key={`${rowIndex}${colIndex}`}>
          {symbol} selected {rowIndex + 1}, {colIndex + 1}
        </li>
      ))}
    </ol>
  );
};
