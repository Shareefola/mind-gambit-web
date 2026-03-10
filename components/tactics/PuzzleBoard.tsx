'use client';
import React, { useState } from 'react';
import ChessBoard from '@/components/board/ChessBoard';
import PuzzleFeedback from './PuzzleFeedback';
import { usePuzzle } from '@/hooks/usePuzzle';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { Puzzle } from '@/data/tactics';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  onSolve: (puzzleId: string, attempts: number) => void;
  onNext: () => void;
  boardSize?: number;
  showHints?: boolean;
}

export default function PuzzleBoard({ puzzle, onSolve, onNext, boardSize = 440, showHints = true }: PuzzleBoardProps) {
  const { themeName } = useBoardTheme();
  const [hintSquare, setHintSquare] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | undefined>();

  const { fen, state, attempts, lastMove, attemptMove, showHint, revealSolution, reset } = usePuzzle({
    puzzle,
    onSolve: (att) => {
      const xp = att === 1 ? 15 : att === 2 ? 10 : 5;
      setXpEarned(xp);
      onSolve(puzzle.id, att);
      setTimeout(() => setShowExplanation(true), 400);
    },
  });

  const handleHint = () => {
    const sq = showHint();
    setHintSquare(sq);
    setHintUsed(true);
    setTimeout(() => setHintSquare(null), 1800);
  };

  const handleRetry = () => {
    reset();
    setShowExplanation(false);
    setHintUsed(false);
    setXpEarned(undefined);
  };

  const highlightSquares: Record<string, string> = {};
  if (hintSquare) highlightSquares[hintSquare] = 'rgba(212,168,83,0.55)';

  const boardBorderColor =
    state === 'solved' ? 'rgba(76,175,125,0.35)' :
    state === 'wrong'  ? 'rgba(224,82,82,0.35)' :
    '#3d2e1e';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        padding: 12, background: '#1a120b',
        border: `1px solid ${boardBorderColor}`,
        borderRadius: 14, transition: 'border-color 0.3s ease',
      }}>
        <ChessBoard
          fen={fen}
          interactive={state === 'ready' || state === 'piece_selected'}
          onMove={(from, to, promo) => attemptMove(from, to, promo)}
          lastMove={lastMove}
          themeName={themeName}
          showCoordinates
          size={boardSize}
          orientation={puzzle.sideToMove === 'Black' ? 'black' : 'white'}
          highlightSquares={highlightSquares}
        />
      </div>
      <PuzzleFeedback
        state={state}
        attempts={attempts}
        explanation={showExplanation ? puzzle.explanation : undefined}
        xpEarned={state === 'solved' ? xpEarned : undefined}
        onNext={onNext}
        onRetry={handleRetry}
        onReveal={revealSolution}
        showHintsEnabled={showHints}
        onHint={handleHint}
        hintUsed={hintUsed}
      />
    </div>
  );
}
