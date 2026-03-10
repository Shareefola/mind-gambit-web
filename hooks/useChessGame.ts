'use client';
import { useState, useCallback, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import { STARTING_FEN } from '@/lib/chess-utils';

export interface ChessMove {
  from: string;
  to: string;
  promotion?: string;
  san?: string;
  uci?: string;
}

export interface UseChessGameOptions {
  initialFen?: string;
  onMove?: (move: ChessMove, newFen: string) => void;
}

export function useChessGame({ initialFen = STARTING_FEN, onMove }: UseChessGameOptions = {}) {
  const gameRef = useRef<Chess>(new Chess(initialFen));
  // Redo stack stores FEN snapshots popped off by undo
  const redoStackRef = useRef<string[]>([]);

  const [fen, setFen] = useState(initialFen);
  const [history, setHistory] = useState<ChessMove[]>([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [isStalemate, setIsStalemate] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  const updateState = useCallback(() => {
    const game = gameRef.current;
    setFen(game.fen());
    setIsCheck(game.isCheck());
    setIsCheckmate(game.isCheckmate());
    setIsStalemate(game.isStalemate());
    setIsDraw(game.isDraw());
    setHistory(
      game.history({ verbose: true }).map(m => ({
        from: m.from,
        to: m.to,
        promotion: m.promotion,
        san: m.san,
        uci: m.from + m.to + (m.promotion || ''),
      }))
    );
  }, []);

  const makeMove = useCallback(
    (from: string, to: string, promotion?: string): boolean => {
      const game = gameRef.current;
      try {
        const result = game.move({ from, to, promotion: promotion || 'q' });
        if (result) {
          redoStackRef.current = []; // clear redo on new move
          updateState();
          const move: ChessMove = {
            from: result.from,
            to: result.to,
            promotion: result.promotion,
            san: result.san,
            uci: result.from + result.to + (result.promotion || ''),
          };
          onMove?.(move, game.fen());
          return true;
        }
      } catch {
        // Invalid move
      }
      return false;
    },
    [onMove, updateState]
  );

  const getLegalMoves = useCallback((square: string): string[] => {
    const game = gameRef.current;
    return game.moves({ square: square as Square, verbose: true }).map(m => m.to);
  }, []);

  const isPawnPromotion = useCallback((from: string, to: string): boolean => {
    const game = gameRef.current;
    const piece = game.get(from as any);
    if (!piece || piece.type !== 'p') return false;
    const toRank = parseInt(to[1]);
    return (piece.color === 'w' && toRank === 8) || (piece.color === 'b' && toRank === 1);
  }, []);

  const undo = useCallback(() => {
    const currentFen = gameRef.current.fen();
    const result = gameRef.current.undo();
    if (result) {
      redoStackRef.current.push(currentFen);
      updateState();
    }
  }, [updateState]);

  const redo = useCallback(() => {
    const nextFen = redoStackRef.current.pop();
    if (nextFen) {
      try {
        gameRef.current = new Chess(nextFen);
        updateState();
      } catch {}
    }
  }, [updateState]);

  const canRedo = useCallback(() => redoStackRef.current.length > 0, []);

  const reset = useCallback((newFen?: string) => {
    gameRef.current = new Chess(newFen || initialFen);
    redoStackRef.current = [];
    updateState();
  }, [initialFen, updateState]);

  const loadFen = useCallback((newFen: string): boolean => {
    try {
      const game = new Chess(newFen);
      gameRef.current = game;
      redoStackRef.current = [];
      updateState();
      return true;
    } catch {
      return false;
    }
  }, [updateState]);

  // Load a full PGN string — returns number of moves loaded or -1 on error
  const loadPgn = useCallback((pgn: string): number => {
    try {
      const game = new Chess();
      game.loadPgn(pgn);
      gameRef.current = game;
      redoStackRef.current = [];
      updateState();
      return game.history().length;
    } catch {
      return -1;
    }
  }, [updateState]);

  // Jump to a specific move index in history (0 = start)
  const goToMove = useCallback((moveIndex: number) => {
    const fullHistory = gameRef.current.history({ verbose: true });
    const targetMoves = fullHistory.slice(0, moveIndex + 1);
    const newGame = new Chess();
    for (const m of targetMoves) {
      newGame.move(m.san);
    }
    gameRef.current = newGame;
    redoStackRef.current = [];
    updateState();
  }, [updateState]);

  const getKingSquare = useCallback((color: 'w' | 'b'): string | null => {
    const game = gameRef.current;
    const board = game.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k' && piece.color === color) {
          return piece.square;
        }
      }
    }
    return null;
  }, []);

  const getPieceAt = useCallback((square: string) => {
    return gameRef.current.get(square as any) || null;
  }, []);

  const getTurn = useCallback((): 'w' | 'b' => {
    return gameRef.current.turn();
  }, []);

  // Export current game as PGN
  const getPgn = useCallback((): string => {
    return gameRef.current.pgn();
  }, []);

  return {
    fen,
    history,
    isCheck,
    isCheckmate,
    isStalemate,
    isDraw,
    makeMove,
    getLegalMoves,
    isPawnPromotion,
    undo,
    redo,
    canRedo,
    reset,
    loadFen,
    loadPgn,
    goToMove,
    getPgn,
    getKingSquare,
    getPieceAt,
    getTurn,
    game: gameRef.current,
  };
}
