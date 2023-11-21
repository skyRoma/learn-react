import { Player } from './components/Player';
import { GameBoard } from './components/GameBoard';
import { Log } from './components/Log';
import { GameOver } from './components/GameOver';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

const initialGameBoard = new Array(3).fill(new Array(3).fill(null));

const deriveWinner = (gameBoard, players) => {
  let winner;

  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  });

  return winner;
};

export const deriveGameBoard = (gameTurns) => {
  const gameBoard = [...initialGameBoard.map((row) => [...row])];
  gameTurns.forEach(({ rowIndex, colIndex, symbol }) => {
    gameBoard[rowIndex][colIndex] = symbol;
  });

  return gameBoard;
};

export const App = () => {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    0: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activeSymbol = gameTurns[0]?.symbol === 'X' ? '0' : 'X';
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = !winner && gameTurns.length === 9;

  const handleSelect = (rowIndex, colIndex) => {
    setGameTurns((turns) => {
      return [{ rowIndex, colIndex, symbol: activeSymbol }, ...turns];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((players) => ({ ...players, [symbol]: newName }));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players['X']}
            symbol="X"
            isActive={activeSymbol === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={players['0']}
            symbol="0"
            isActive={activeSymbol === '0'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard gameBoard={gameBoard} onSelect={handleSelect} />
      </div>
      <Log gameTurns={gameTurns}></Log>
    </main>
  );
};
