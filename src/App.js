import logo from './logo.svg';
import React, { useState } from 'react';
import { Board } from './components/Board.js';

const App = () => {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const handleWin = (winner) => {
    if (winner === 'X') {
      setXWins(xWins + 1);
    } else if (winner === 'O') {
      setOWins(oWins + 1);
    } else {
      setDraws(draws + 1);
    }
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="statistics">
        <p>Wins for X: {xWins}</p>
        <p>Wins for O: {oWins}</p>
        <p>Draws: {draws}</p>
      </div>
      <Board handleWin={handleWin} />
    </div>
  );
};

export default App;
