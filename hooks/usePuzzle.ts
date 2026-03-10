'use client';
import { useState, useCallback, useRef } from 'react';
import { Puzzle } from '@/data/tactics';
import { Chess } from 'chess.js';

export type PuzzleState = 'ready' | 'piece_selected' | 'correct' | 'wrong' | 'solved' | 'revealed';

interface UsePuzzleOptions {
  puzzle: Puzzle;
  onSolve?: (attempts: number) => void;
}

export function usePuzzle({ puzzle, onSolve }: UsePuzzleOptions) {
  const [fen, setFen] = useState(puzzle.fen);
  const [state, setState] = useState<PuzzleState>('ready');
  const [attempts, setAttempts] = useState(0);
  const [solutionStep, setSolutionStep] = useState(0);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const gameRef = useRef<Chess>(new Chess(puzzle.fen));

  const attemptMove = useCallback(
    (from: string, to: string, promotion?: string): boolean => {
      const expectedUci = puzzle.solution[solutionStep];

      // Puzzle is already solved or revealed
      if (state === 'solved' || state === 'revealed') return false;

      // No moves needed (already checkmate position to study)
      if (puzzle.solution.length === 0) {
        setState('solved');
        onSolve?.(1);
        return true;
      }

      const attemptUci = from + to + (promotion || '');
      const isCorrect = expectedUci === attemptUci || expectedUci === from + to;

      if (isCorrect) {
        // Execute the player's move
        try {
          gameRef.current.move({ from, to, promotion: promotion || 'q' });
          setFen(gameRef.current.fen());
          setLastMove({ from, to });

          const nextStep = solutionStep + 1;

          if (nextStep >= puzzle.solution.length) {
            // Puzzle solved!
            const finalAttempts = attempts + 1;
            setState('solved');
            onSolve?.(finalAttempts);
          } else {
            // Correct but more moves to go — play opponent's response
            setState('correct');
            setSolutionStep(nextStep);

            // Auto-play opponent's response after delay
            setTimeout(() => {
              const opponentUci = puzzle.solution[nextStep];
              const opponentFrom = opponentUci.slice(0, 2);
              const opponentTo = opponentUci.slice(2, 4);
              const opponentPromo = opponentUci.slice(4) || undefined;
              try {
                gameRef.current.move({ from: opponentFrom, to: opponentTo, promotion: opponentPromo || 'q' });
                setFen(gameRef.current.fen());
                setLastMove({ from: opponentFrom, to: opponentTo });
                setSolutionStep(nextStep + 1);
                setState('ready');
              } catch {
                setState('ready');
              }
            }, 800);
          }
          return true;
        } catch {
          return false;
        }
      } else {
        // Wrong move
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setState('wrong');
        setTimeout(() => setState('ready'), 600);
        return false;
      }
    },
    [puzzle, solutionStep, state, attempts, onSolve]
  );

  const showHint = useCallback(() => {
    const currentSolutionMove = puzzle.solution[solutionStep];
    return currentSolutionMove ? currentSolutionMove.slice(0, 2) : null; // Return the "from" square
  }, [puzzle.solution, solutionStep]);

  const revealSolution = useCallback(() => {
    setState('revealed');
    // Play through remaining solution moves
    let delay = 0;
    for (let i = solutionStep; i < puzzle.solution.length; i++) {
      const uci = puzzle.solution[i];
      delay += 700;
      setTimeout(() => {
        try {
          gameRef.current.move({
            from: uci.slice(0, 2),
            to: uci.slice(2, 4),
            promotion: uci.slice(4) || 'q',
          });
          setFen(gameRef.current.fen());
          setLastMove({ from: uci.slice(0, 2), to: uci.slice(2, 4) });
        } catch {}
      }, delay);
    }
  }, [puzzle.solution, solutionStep]);

  const reset = useCallback(() => {
    gameRef.current = new Chess(puzzle.fen);
    setFen(puzzle.fen);
    setState('ready');
    setAttempts(0);
    setSolutionStep(0);
    setLastMove(null);
  }, [puzzle.fen]);

  return {
    fen,
    state,
    attempts,
    lastMove,
    attemptMove,
    showHint,
    revealSolution,
    reset,
  };
}
