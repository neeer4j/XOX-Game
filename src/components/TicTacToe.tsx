'use client'

import React, { useState, useEffect, useRef } from 'react'
import { LeaderboardEntry } from './Leaderboard'
import dynamic from 'next/dynamic'
import Confetti from 'react-confetti'

// Dynamically import Confetti with no SSR to avoid hydration issues
const ConfettiComponent = dynamic(() => import('react-confetti'), {
  ssr: false
})

type Player = 'X' | 'O' | null

interface BoardState {
  squares: (Player)[]
  xIsNext: boolean
  winner: Player
  gameOver: boolean
  xScore: number
  oScore: number
  draws: number
  showCelebration: boolean
}

interface TicTacToeProps {
  currentUsername: string;
  updateLeaderboard: (name: string, winsToAdd: number) => void;
  onGameEnd: () => void;
  gameMode: 'pvp' | 'pvc';
  player1: { name: string; symbol: 'X' | 'O' };
  player2: { name: string; symbol: 'X' | 'O' };
}

const TicTacToe: React.FC<TicTacToeProps> = ({
  currentUsername,
  updateLeaderboard,
  onGameEnd,
  gameMode,
  player1,
  player2
}) => {
  const [state, setState] = useState<BoardState>({
    squares: Array(9).fill(null),
    xIsNext: true,
    winner: null,
    gameOver: false,
    xScore: 0,
    oScore: 0,
    draws: 0,
    showCelebration: false
  })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [winnerName, setWinnerName] = useState('')
  const gameEndedRef = useRef(false);

  const { squares, xIsNext, winner, gameOver, xScore, oScore, draws, showCelebration } = state

  // Update window size for confetti
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    updateWindowSize()
    
    // Add event listener for resize
    window.addEventListener('resize', updateWindowSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  // Sound effects
  useEffect(() => {
    // We'll just define these but not implement actual audio
    // for simplicity, but this shows how you'd add game sounds
    const playMoveSound = () => {
      // Play move sound logic would go here
    }
    
    const playWinSound = () => {
      // Play win sound logic would go here
    }
    
    const playDrawSound = () => {
      // Play draw sound logic would go here
    }
  }, [])

  // Calculate winner
  useEffect(() => {
    const winner = calculateWinner(squares)
    const isGameFinished = winner || squares.every(square => square !== null)
    
    if (isGameFinished && !gameEndedRef.current) {
      let newXScore = xScore;
      let newOScore = oScore;
      let newDraws = draws;
      let showCelebration = false;
      let winnerUsername = '';
      
      if (winner === 'X') {
        newXScore++;
        showCelebration = true;
        winnerUsername = player1.name;
        // Update leaderboard when X wins (player is X)
        // Just increment by 1, don't use the local score
        updateLeaderboard(player1.name, 1);
        gameEndedRef.current = true;
      } else if (winner === 'O') {
        newOScore++;
        showCelebration = true;
        winnerUsername = player2.name;
        gameEndedRef.current = true;
      } else if (winner === null && squares.every(square => square !== null)) {
        newDraws++;
      }
      
      if (winner) {
        setWinnerName(winnerUsername);
      }
      
      setState(prevState => ({
        ...prevState,
        winner,
        gameOver: true,
        xScore: newXScore,
        oScore: newOScore,
        draws: newDraws,
        showCelebration
      }))
      
      // Hide celebration after 5 seconds, then return to registration screen
      if (showCelebration) {
        setTimeout(() => {
          setState(prevState => ({
            ...prevState,
            showCelebration: false
          }))
          
          // After the celebration is done, wait a moment and return to registration
          setTimeout(() => {
            onGameEnd();
          }, 1000);
        }, 5000)
      }
    } else if (!xIsNext && gameMode === 'pvc' && !winner) {
      // Computer's turn
      setTimeout(() => makeComputerMove(squares), 500);
    }
  }, [squares, currentUsername, updateLeaderboard, onGameEnd, gameEndedRef, gameOver, xIsNext, gameMode])

  // Handle click on square
  const handleClick = (i: number) => {
    // If square is already filled or game is over, do nothing
    if (squares[i] || gameOver) return

    const newSquares = [...squares]
    newSquares[i] = xIsNext ? player1.symbol : player2.symbol

    setState({
      ...state,
      squares: newSquares,
      xIsNext: !xIsNext,
    })
  }

  // Reset game
  const resetGame = () => {
    gameEndedRef.current = false;
    setState({
      ...state,
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      gameOver: false,
      showCelebration: false
    })
    setWinnerName('')
  }

  // Reset scores
  const resetScores = () => {
    gameEndedRef.current = false;
    setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      gameOver: false,
      xScore: 0,
      oScore: 0,
      draws: 0,
      showCelebration: false
    })
    setWinnerName('')
  }

  // Render a square
  const renderSquare = (i: number) => {
    const isWinningSquare = winner && calculateWinner(squares, true)?.includes(i)
    const value = squares[i]
    
    return (
      <button
        className={`game-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center 
          ${isWinningSquare ? 'bg-green-500 bg-opacity-30' : 'bg-indigo-900 bg-opacity-50'} 
          border-2 border-indigo-400 rounded-lg m-0.5 
          ${value === 'X' ? 'x-mark' : value === 'O' ? 'o-mark' : 'text-white hover:bg-indigo-800 hover:bg-opacity-70'}`}
        onClick={() => handleClick(i)}
        disabled={!!squares[i] || gameOver}
      >
        {value}
      </button>
    )
  }

  // Status message
  let status
  if (winner) {
    status = `${winnerName} WINS!`
  } else if (gameOver) {
    status = 'DRAW!'
  } else {
    status = `${xIsNext ? player1.name : player2.name}'S TURN (${xIsNext ? player1.symbol : player2.symbol})`
  }

  // Add these helper functions before the TicTacToe component
  function getEmptySquares(board: (Player)[]): number[] {
    return board
      .map((square, index) => square === null ? index : null)
      .filter((index): index is number => index !== null);
  }

  function isWinningMove(board: (Player)[], player: Player): boolean {
    const winner = calculateWinner(board);
    return winner === player;
  }

  function minimax(
    board: (Player)[],
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    computerSymbol: Player,
    humanSymbol: Player
  ): number {
    // Base cases
    if (isWinningMove(board, computerSymbol)) return 10 - depth;
    if (isWinningMove(board, humanSymbol)) return depth - 10;
    
    const emptySquares = getEmptySquares(board);
    if (emptySquares.length === 0) return 0;
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of emptySquares) {
        const newBoard = [...board];
        newBoard[move] = computerSymbol;
        const evaluation = minimax(newBoard, depth + 1, alpha, beta, false, computerSymbol, humanSymbol);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of emptySquares) {
        const newBoard = [...board];
        newBoard[move] = humanSymbol;
        const evaluation = minimax(newBoard, depth + 1, alpha, beta, true, computerSymbol, humanSymbol);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }

  function findBestMove(board: (Player)[], computerSymbol: Player, humanSymbol: Player): number {
    const emptySquares = getEmptySquares(board);
    let bestMove = -1;
    let bestEval = -Infinity;
    
    // If it's the first move, choose a corner or center for better strategy
    if (emptySquares.length === 9) {
      const strategicMoves = [0, 2, 4, 6, 8];
      return strategicMoves[Math.floor(Math.random() * strategicMoves.length)];
    }
    
    // For the second move, if center is available, take it
    if (emptySquares.length === 8 && board[4] === null) {
      return 4;
    }
    
    for (const move of emptySquares) {
      const newBoard = [...board];
      newBoard[move] = computerSymbol;
      const moveEval = minimax(newBoard, 0, -Infinity, Infinity, false, computerSymbol, humanSymbol);
      
      if (moveEval > bestEval) {
        bestEval = moveEval;
        bestMove = move;
      }
    }
    
    return bestMove;
  }

  // Replace the existing makeComputerMove function with this improved version
  const makeComputerMove = (currentBoard: (Player)[]) => {
    const computerSymbol = xIsNext ? player1.symbol : player2.symbol;
    const humanSymbol = xIsNext ? player2.symbol : player1.symbol;
    
    const bestMove = findBestMove(currentBoard, computerSymbol, humanSymbol);
    
    if (bestMove !== -1) {
      const newBoard = [...currentBoard];
      newBoard[bestMove] = computerSymbol;
      setState(prevState => ({
        ...prevState,
        squares: newBoard,
        xIsNext: !xIsNext,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center relative max-w-4xl mx-auto px-4">
      {/* Confetti celebration when someone wins */}
      {showCelebration && (
        <>
          <ConfettiComponent
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
          <div className="celebration-popup fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-indigo-900 bg-opacity-80 rounded-xl border-2 border-yellow-400 p-4 sm:p-6 text-center animate-bounce shadow-2xl">
              <h2 className="text-2xl sm:text-3xl text-yellow-300 font-bold mb-2">🎉 CONGRATULATIONS! 🎉</h2>
              <p className="text-xl sm:text-2xl text-white">
                <span className="font-bold text-yellow-300">{winnerName}</span> is the WINNER!
              </p>
            </div>
          </div>
        </>
      )}
      
      {/* Current player indication */}
      <div className="w-full mb-2 text-center">
        <p className="text-xs sm:text-sm text-indigo-200">Playing as <span className="text-yellow-300 font-bold">{currentUsername}</span></p>
      </div>
      
      {/* Top section with score and status */}
      <div className="w-full mb-2 flex flex-col items-center">
        {/* Scoreboard */}
        <div className="grid grid-cols-3 gap-2 text-center bg-indigo-900 bg-opacity-50 p-2 rounded-xl border-2 border-indigo-400 shadow-lg w-full max-w-xs mb-2">
          <div className="flex flex-col px-1 sm:px-2">
            <span className="text-xs sm:text-sm text-blue-300">{player1.name}</span>
            <span className="text-xl sm:text-2xl font-bold x-mark">{xScore}</span>
          </div>
          <div className="flex flex-col px-1 sm:px-2">
            <span className="text-xs sm:text-sm text-yellow-300">DRAW</span>
            <span className="text-xl sm:text-2xl font-bold text-yellow-300">{draws}</span>
          </div>
          <div className="flex flex-col px-1 sm:px-2">
            <span className="text-xs sm:text-sm text-pink-300">{player2.name}</span>
            <span className="text-xl sm:text-2xl font-bold o-mark">{oScore}</span>
          </div>
        </div>
        
        {/* Game status */}
        <div className={`text-base sm:text-lg font-bold ${winner ? 'winner-text' : ''} 
          ${winner === 'X' ? 'x-mark' : winner === 'O' ? 'o-mark' : 'text-yellow-300'}`}>
          {status}
        </div>
      </div>
      
      {/* Game board */}
      <div className="game-board p-1 sm:p-2 mb-3">
        <div className="grid grid-cols-3 gap-0">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      
      {/* Game controls */}
      <div className="flex flex-row gap-2 sm:gap-4">
        <button
          className="game-button px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg border-b-4 border-indigo-800"
          onClick={resetGame}
        >
          New Game
        </button>
        <button
          className="game-button px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg border-b-4 border-purple-800"
          onClick={resetScores}
        >
          Reset Scores
        </button>
      </div>
    </div>
  )
}

// Calculate winner function
function calculateWinner(squares: Player[], returnIndices: boolean = false): any {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return returnIndices ? lines[i] : squares[a]
    }
  }
  
  return null
}

export default TicTacToe 