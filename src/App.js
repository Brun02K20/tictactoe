import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Board } from './components/Board.js';

const App = () => {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  useEffect(() => {
    // Cargar estadísticas desde Local Storage al cargar la página
    const storedStats = JSON.parse(localStorage.getItem('ticTacToeStats'));
    if (storedStats) {
      setXWins(storedStats.xWins || 0);
      setOWins(storedStats.oWins || 0);
      setDraws(storedStats.draws || 0);
    }
  }, []);

  const handleWin = (winner) => {
    if (winner === 'X') {
      setXWins((prevWins) => {
        const newXWins = prevWins + 1;
        // Guardar estadísticas actualizadas en Local Storage
        saveStats(newXWins, oWins, draws);
        return newXWins;
      });
    } else if (winner === 'O') {
      setOWins((prevWins) => {
        const newOWins = prevWins + 1;
        // Guardar estadísticas actualizadas en Local Storage
        saveStats(xWins, newOWins, draws);
        return newOWins;
      });
    } else {
      setDraws((prevDraws) => {
        const newDraws = prevDraws + 1;
        // Guardar estadísticas actualizadas en Local Storage
        saveStats(xWins, oWins, newDraws);
        return newDraws;
      });
    }
  };

  const saveStats = (xWins, oWins, draws) => {
    const stats = {
      xWins,
      oWins,
      draws,
    };
    // Guardar estadísticas en Local Storage
    localStorage.setItem('ticTacToeStats', JSON.stringify(stats));
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
