// Chess piece Unicode symbols
export const PIECE_SYMBOLS: Record<string, string> = {
  // White pieces
  wK: '♔',
  wQ: '♕',
  wR: '♖',
  wB: '♗',
  wN: '♘',
  wP: '♙',
  // Black pieces
  bK: '♚',
  bQ: '♛',
  bR: '♜',
  bB: '♝',
  bN: '♞',
  bP: '♟',
};

export type PieceColor = 'w' | 'b';
export type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p';

export interface PieceInfo {
  type: PieceType;
  color: PieceColor;
}

export type Square = string; // e.g. 'e4', 'a1'

export interface MoveArrow {
  from: Square;
  to: Square;
  color: 'gold' | 'green' | 'red' | 'blue';
}

// Convert square notation to [col, row] indices (0-indexed from top-left when white is on bottom)
export function squareToCoords(sq: Square, flipped = false): [number, number] {
  const file = sq.charCodeAt(0) - 97; // a=0, b=1, ...h=7
  const rank = parseInt(sq[1]) - 1;   // 1=0, 2=1, ...8=7
  if (flipped) {
    return [7 - file, rank];
  }
  return [file, 7 - rank];
}

export function coordsToSquare(col: number, row: number, flipped = false): Square {
  if (flipped) {
    return String.fromCharCode(104 - col) + (row + 1).toString();
  }
  return String.fromCharCode(97 + col) + (8 - row).toString();
}

// Parse FEN to get piece map
export function fenToPieceMap(fen: string): Map<Square, PieceInfo> {
  const pieceMap = new Map<Square, PieceInfo>();
  const position = fen.split(' ')[0];
  const rows = position.split('/');

  const pieceChars: Record<string, PieceInfo> = {
    K: { type: 'k', color: 'w' },
    Q: { type: 'q', color: 'w' },
    R: { type: 'r', color: 'w' },
    B: { type: 'b', color: 'w' },
    N: { type: 'n', color: 'w' },
    P: { type: 'p', color: 'w' },
    k: { type: 'k', color: 'b' },
    q: { type: 'q', color: 'b' },
    r: { type: 'r', color: 'b' },
    b: { type: 'b', color: 'b' },
    n: { type: 'n', color: 'b' },
    p: { type: 'p', color: 'b' },
  };

  rows.forEach((row, rankIdx) => {
    let fileIdx = 0;
    for (const char of row) {
      if (/\d/.test(char)) {
        fileIdx += parseInt(char);
      } else {
        const square = String.fromCharCode(97 + fileIdx) + (8 - rankIdx).toString();
        if (pieceChars[char]) {
          pieceMap.set(square, pieceChars[char]);
        }
        fileIdx++;
      }
    }
  });

  return pieceMap;
}

export function getPieceSymbol(piece: PieceInfo): string {
  const key = `${piece.color}${piece.type.toUpperCase()}`;
  return PIECE_SYMBOLS[key] || '?';
}

// Calculate animation duration based on distance
export function getMoveDuration(from: Square, to: Square): number {
  const [fc, fr] = squareToCoords(from);
  const [tc, tr] = squareToCoords(to);
  const distance = Math.sqrt(Math.pow(fc - tc, 2) + Math.pow(fr - tr, 2));
  return Math.min(350, Math.max(150, distance * 45));
}

// Get active color from FEN
export function getActiveColor(fen: string): PieceColor {
  return fen.split(' ')[1] as PieceColor;
}

// Check if square is light or dark
export function isLightSquare(square: Square): boolean {
  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1]) - 1;
  return (file + rank) % 2 !== 0;
}

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
