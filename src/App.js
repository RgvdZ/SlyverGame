
import React, { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
// import GameHistory from './components/GameHistory';
import { calculateSumsOfMoves, removeBadOptions } from './components/GameMath';
import { gsap } from 'gsap'; // Make sure to install gsap with npm install gsap
import { CSSPlugin } from 'gsap/CSSPlugin';
// import { animated, useSpring } from 'react-spring';
import 'animate.css';

gsap.registerPlugin(CSSPlugin);

const MAX_NUMBER_AVAILABLE = 100;

const handleMoves = (state, move) => {
  let { moves, sumsOfMoves, possibleNumbers, gameOver, winner } = state;

  moves.push(move);
  sumsOfMoves = calculateSumsOfMoves(moves, sumsOfMoves)
  possibleNumbers = removeBadOptions(moves, sumsOfMoves, possibleNumbers)

  if (move === 1) {
    gameOver = true;
    winner = moves.length % 2 === 0 ? 1 : 2; // If Player 1 selects 1, Player 2 wins and vice versa
  }

  return { moves, sumsOfMoves, possibleNumbers, gameOver, winner };
};

function App() {
  const [{ moves, possibleNumbers, gameOver, winner }, makeMove] = React.useReducer(handleMoves, {
    moves: [],
    sumsOfMoves: new Set(),
    possibleNumbers: new Array(MAX_NUMBER_AVAILABLE + 1).fill(true),
    gameOver: false,
    winner: null
  });

  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    gsap.from(".title", { duration: 2, opacity: 0, y: -100, ease: "power2.out" });
    gsap.from(".start-button", { duration: 2, opacity: 0, y: 100, ease: "power2.out", delay: 1 });
  }, []);

  const startGame = () => {
    gsap.to(".intro", { duration: 2, opacity: 0, visibility: 'hidden', ease: "power2.out" });
    gsap.fromTo(".game-container", { opacity: 0, visibility: 'hidden' }, { duration: 2, opacity: 1, visibility: 'visible', ease: "power2.out", delay: 2 });
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted && (
        <div className="intro">
          <h1 className="title" style={{ color: gameOver ? 'yellow' : 'initial' }}>
            {gameOver ? `Player ${winner} wins!` : 'Mystic Heist Game'}
          </h1>
          <button className="start-button" onClick={startGame}>Start</button>
        </div>
      )}
      {gameStarted && (
        <div className="app">
          <div className="game-container">
            <GameBoard possibleNumbers={possibleNumbers} moves={moves} makeMove={makeMove} />
          </div>
          <div className="moves-list" key={moves.length}>
            {moves.map((move, index) => (
              <p key={index} style={{ color: 'yellow' }}>Player {index % 2 === 0 ? 1 : 2}: {move}</p>
            ))}
            {gameOver && <h2 style={{ color: 'red' }}>Player {winner} wins!</h2>}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
