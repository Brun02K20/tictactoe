import React, { useState } from 'react';
import { Square } from './Square';

const Board = ({ handleWin }) => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [gameResult, setGameResult] = useState(null);

    const handleClick = (index) => {
        const newSquares = [...squares];

        if (calculateWinner(newSquares) || newSquares[index]) {
            return;
        }

        newSquares[index] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);

        const winner = calculateWinner(newSquares);
        if (winner) {
            handleWin(winner);
            setGameResult(`Winner: ${winner}`);
        } else if (newSquares.every((square) => square !== null)) {
            handleWin('Draw');
            setGameResult('Draw');
        }
    };

    const renderSquare = (index) => {
        return (
            <Square
                value={squares[index]}
                onClick={() => handleClick(index)}
            />
        );
    };

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setGameResult(null);
    };

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <h3>{gameResult}</h3>
            <button className="restart-button" onClick={handleRestart}>
                Restart Game
            </button>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
};

export { Board };