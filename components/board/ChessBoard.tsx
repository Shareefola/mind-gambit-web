'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { BOARD_THEMES, BoardThemeName } from './themes';
import {
  fenToPieceMap,
  getPieceSymbol,
  squareToCoords,
  coordsToSquare,
  MoveArrow,
  PieceInfo,
  isLightSquare,
} from '@/lib/chess-utils';

export interface ChessBoardProps {
  fen?: string;
  orientation?: 'white' | 'black';
  interactive?: boolean;
  onMove?: (from: string, to: string, promotion?: string) => void;
  onWrongMove?: (from: string, to: string) => void;
  arrows?: MoveArrow[];
  highlightSquares?: Record<string, string>;
  themeName?: BoardThemeName;
  showCoordinates?: boolean;
  allowedMoves?: string[]; // UCI format: "e2e4"
  size?: number;
  lastMove?: { from: string; to: string } | null;
  checkSquare?: string | null;
}

type SquareFlash = { square: string; type: 'correct' | 'wrong' } | null;

const PROMOTION_PIECES: Array<{ type: string; label: string }> = [
  { type: 'q', label: '♛' },
  { type: 'r', label: '♜' },
  { type: 'b', label: '♝' },
  { type: 'n', label: '♞' },
];

export default function ChessBoard({
  fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  orientation = 'white',
  interactive = false,
  onMove,
  onWrongMove,
  arrows = [],
  highlightSquares = {},
  themeName = 'lichess',
  showCoordinates = true,
  allowedMoves,
  size = 480,
  lastMove,
  checkSquare,
}: ChessBoardProps) {
  const theme = BOARD_THEMES[themeName] || BOARD_THEMES.lichess;
  const flipped = orientation === 'black';
  const squareSize = size / 8;

  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoveTargets, setLegalMoveTargets] = useState<string[]>([]);
  const [flashState, setFlashState] = useState<SquareFlash>(null);
  const [promotionState, setPromotionState] = useState<{
    from: string; to: string; x: number; y: number; color: 'w' | 'b';
  } | null>(null);
  const [movingPiece, setMovingPiece] = useState<{
    piece: PieceInfo; from: string; to: string; symbol: string;
  } | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef<Chess | null>(null);

  // Keep a chess instance synced to fen prop for legal move calculation
  useEffect(() => {
    try {
      chessRef.current = new Chess(fen);
    } catch {
      chessRef.current = new Chess();
    }
    setSelectedSquare(null);
    setLegalMoveTargets([]);
  }, [fen]);

  const pieceMap = fenToPieceMap(fen);

  const flashSquare = useCallback((square: string, type: 'correct' | 'wrong') => {
    setFlashState({ square, type });
    setTimeout(() => setFlashState(null), type === 'correct' ? 600 : 500);
  }, []);

  const handleSquareClick = useCallback(
    (square: string) => {
      if (!interactive || !chessRef.current) return;

      const game = chessRef.current;
      const piece = game.get(square as any);
      const turn = game.turn();

      // If promotion dialog is open, ignore clicks
      if (promotionState) return;

      // If a piece is already selected
      if (selectedSquare) {
        if (selectedSquare === square) {
          // Deselect
          setSelectedSquare(null);
          setLegalMoveTargets([]);
          return;
        }

        if (legalMoveTargets.includes(square)) {
          // Attempt the move
          const isPromotion =
            (() => {
              const p = game.get(selectedSquare as any);
              if (!p || p.type !== 'p') return false;
              const toRank = parseInt(square[1]);
              return (p.color === 'w' && toRank === 8) || (p.color === 'b' && toRank === 1);
            })();

          if (isPromotion) {
            // Get pixel coords for promotion dialog
            const [tc, tr] = squareToCoords(square, flipped);
            setPromotionState({
              from: selectedSquare,
              to: square,
              x: tc * squareSize,
              y: tr * squareSize,
              color: turn,
            });
            setSelectedSquare(null);
            setLegalMoveTargets([]);
            return;
          }

          // Check if move is allowed (lesson mode)
          if (allowedMoves) {
            const uci = selectedSquare + square;
            if (!allowedMoves.includes(uci)) {
              flashSquare(square, 'wrong');
              onWrongMove?.(selectedSquare, square);
              setSelectedSquare(null);
              setLegalMoveTargets([]);
              return;
            }
          }

          flashSquare(square, 'correct');
          onMove?.(selectedSquare, square);
          setSelectedSquare(null);
          setLegalMoveTargets([]);
          return;
        }

        // Clicking own piece — reselect
        if (piece && piece.color === turn) {
          setSelectedSquare(square);
          const moves = game.moves({ square: square as any, verbose: true });
          setLegalMoveTargets(moves.map(m => m.to));
          return;
        }

        // Clicking opponent piece or empty square — deselect
        setSelectedSquare(null);
        setLegalMoveTargets([]);
        return;
      }

      // No piece selected yet
      if (piece && piece.color === turn) {
        setSelectedSquare(square);
        const moves = game.moves({ square: square as any, verbose: true });
        setLegalMoveTargets(moves.map(m => m.to));
      }
    },
    [interactive, selectedSquare, legalMoveTargets, promotionState, flipped, squareSize, allowedMoves, onMove, onWrongMove, flashSquare]
  );

  const handlePromotion = useCallback(
    (pieceType: string) => {
      if (!promotionState) return;
      const uci = promotionState.from + promotionState.to + pieceType;
      if (allowedMoves && !allowedMoves.includes(uci) && !allowedMoves.includes(promotionState.from + promotionState.to)) {
        flashSquare(promotionState.to, 'wrong');
        onWrongMove?.(promotionState.from, promotionState.to);
      } else {
        flashSquare(promotionState.to, 'correct');
        onMove?.(promotionState.from, promotionState.to, pieceType);
      }
      setPromotionState(null);
    },
    [promotionState, allowedMoves, onMove, onWrongMove, flashSquare]
  );

  // Determine king-in-check square
  let kingCheckSquare = checkSquare || null;
  if (!kingCheckSquare && chessRef.current?.isCheck()) {
    const turn = chessRef.current.turn();
    const board = chessRef.current.board();
    outer: for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type === 'k' && p.color === turn) {
          kingCheckSquare = p.square;
          break outer;
        }
      }
    }
  }

  const getSquareColor = (square: string, col: number, row: number): string => {
    // Priority: check > flash > custom > selected > last move > base
    if (kingCheckSquare === square) return theme.check;
    if (flashState?.square === square) {
      return flashState.type === 'correct'
        ? 'rgba(76,175,125,0.45)'
        : 'rgba(224,82,82,0.45)';
    }
    if (highlightSquares[square]) return highlightSquares[square];
    if (selectedSquare === square) return theme.selected;
    if (lastMove && (lastMove.from === square || lastMove.to === square)) {
      return isLightSquare(square) ? theme.lastMoveLight : theme.lastMoveDark;
    }
    return isLightSquare(square) ? theme.light : theme.dark;
  };

  const files = flipped
    ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
    : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = flipped
    ? ['1', '2', '3', '4', '5', '6', '7', '8']
    : ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <div
      style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      className="select-none"
    >
      {/* Board grid */}
      <div
        ref={boardRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(8, ${squareSize}px)`,
          gridTemplateRows: `repeat(8, ${squareSize}px)`,
          width: size,
          height: size,
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          position: 'relative',
          cursor: interactive ? 'pointer' : 'default',
        }}
      >
        {ranks.map((rank, rowIdx) =>
          files.map((file, colIdx) => {
            const square = file + rank;
            const piece = pieceMap.get(square);
            const isLegalTarget = legalMoveTargets.includes(square);
            const hasPiece = !!piece;
            const squareColor = getSquareColor(square, colIdx, rowIdx);

            return (
              <div
                key={square}
                onClick={() => handleSquareClick(square)}
                style={{
                  width: squareSize,
                  height: squareSize,
                  backgroundColor: squareColor,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {/* Coordinates */}
                {showCoordinates && colIdx === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: 3,
                      fontSize: squareSize * 0.22,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      color: isLightSquare(square) ? theme.dark : theme.light,
                      opacity: 0.85,
                      lineHeight: 1,
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    {rank}
                  </span>
                )}
                {showCoordinates && rowIdx === 7 && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      right: 3,
                      fontSize: squareSize * 0.22,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                      color: isLightSquare(square) ? theme.dark : theme.light,
                      opacity: 0.85,
                      lineHeight: 1,
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    {file}
                  </span>
                )}

                {/* Legal move indicator */}
                {isLegalTarget && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}
                  >
                    {hasPiece ? (
                      // Capture ring
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 0,
                          background: `radial-gradient(circle, transparent 55%, ${theme.legalMove} 55%)`,
                        }}
                      />
                    ) : (
                      // Move dot
                      <div
                        style={{
                          width: squareSize * 0.28,
                          height: squareSize * 0.28,
                          borderRadius: '50%',
                          backgroundColor: theme.legalMove,
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Chess piece */}
                {piece && (
                  <span
                    style={{
                      fontSize: squareSize * 0.82,
                      lineHeight: 1,
                      zIndex: 4,
                      position: 'relative',
                      textShadow:
                        piece.color === 'w'
                          ? '0 1px 3px rgba(0,0,0,0.4)'
                          : '0 1px 2px rgba(0,0,0,0.2)',
                      transition: 'transform 0.12s ease',
                      display: 'block',
                      transform: selectedSquare === square ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    {getPieceSymbol(piece)}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* SVG Arrow overlay */}
      {arrows.length > 0 && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: size,
            height: size,
            pointerEvents: 'none',
            zIndex: 10,
          }}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            {['gold', 'green', 'red', 'blue'].map(color => {
              const hex =
                color === 'gold' ? '#d4a853' :
                color === 'green' ? '#4caf7d' :
                color === 'red' ? '#e05252' : '#5b9bd5';
              return (
                <marker
                  key={color}
                  id={`arrowhead-${color}`}
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                >
                  <path d="M 0 0 L 6 3 L 0 6 z" fill={hex} opacity="0.85" />
                </marker>
              );
            })}
          </defs>
          {arrows.map((arrow, i) => {
            const [fc, fr] = squareToCoords(arrow.from, flipped);
            const [tc, tr] = squareToCoords(arrow.to, flipped);
            const x1 = fc * squareSize + squareSize / 2;
            const y1 = fr * squareSize + squareSize / 2;
            const x2 = tc * squareSize + squareSize / 2;
            const y2 = tr * squareSize + squareSize / 2;
            const hex =
              arrow.color === 'gold' ? '#d4a853' :
              arrow.color === 'green' ? '#4caf7d' :
              arrow.color === 'red' ? '#e05252' : '#5b9bd5';

            // Shorten slightly so arrowhead doesn't overlap piece
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const shortX2 = x2 - (dx / len) * (squareSize * 0.22);
            const shortY2 = y2 - (dy / len) * (squareSize * 0.22);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={shortX2}
                y2={shortY2}
                stroke={hex}
                strokeWidth={squareSize * 0.14}
                strokeOpacity={0.82}
                markerEnd={`url(#arrowhead-${arrow.color})`}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )}

      {/* Promotion Dialog */}
      {promotionState && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
          }}
          onClick={() => setPromotionState(null)}
        >
          <div
            style={{
              background: '#251a10',
              border: '2px solid #3d2e1e',
              borderRadius: 10,
              padding: 16,
              display: 'flex',
              gap: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {PROMOTION_PIECES.map(pp => {
              const symbol =
                promotionState.color === 'w'
                  ? pp.label.replace(/♛|♜|♝|♞/, s =>
                      ({ '♛': '♕', '♜': '♖', '♝': '♗', '♞': '♘' }[s] || s)
                    )
                  : pp.label;
              return (
                <button
                  key={pp.type}
                  onClick={() => handlePromotion(pp.type)}
                  style={{
                    width: squareSize,
                    height: squareSize,
                    fontSize: squareSize * 0.72,
                    background: '#2e2015',
                    border: '1px solid #3d2e1e',
                    borderRadius: 8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                    color: '#f5e6c8',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.background = '#3d2e1e';
                    (e.target as HTMLElement).style.borderColor = '#d4a853';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.background = '#2e2015';
                    (e.target as HTMLElement).style.borderColor = '#3d2e1e';
                  }}
                >
                  {symbol}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
