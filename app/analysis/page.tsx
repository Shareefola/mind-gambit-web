'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ChessBoard from '@/components/board/ChessBoard';
import { useChessGame } from '@/hooks/useChessGame';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { STARTING_FEN } from '@/lib/chess-utils';
import { Chess } from 'chess.js';

// All pieces for the position editor palette
const PIECE_PALETTE = [
  { code: 'wK', symbol: '♔', label: 'White King' },
  { code: 'wQ', symbol: '♕', label: 'White Queen' },
  { code: 'wR', symbol: '♖', label: 'White Rook' },
  { code: 'wB', symbol: '♗', label: 'White Bishop' },
  { code: 'wN', symbol: '♘', label: 'White Knight' },
  { code: 'wP', symbol: '♙', label: 'White Pawn' },
  { code: 'bK', symbol: '♚', label: 'Black King' },
  { code: 'bQ', symbol: '♛', label: 'Black Queen' },
  { code: 'bR', symbol: '♜', label: 'Black Rook' },
  { code: 'bB', symbol: '♝', label: 'Black Bishop' },
  { code: 'bN', symbol: '♞', label: 'Black Knight' },
  { code: 'bP', symbol: '♟', label: 'Black Pawn' },
];

type Arrow = { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' };
type TabType = 'play' | 'edit' | 'pgn';

// Compact paired move list component
function MoveList({
  history,
  currentIdx,
  onJump,
}: {
  history: { san?: string }[];
  currentIdx: number;
  onJump: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const active = ref.current.querySelector('[data-active="true"]');
      active?.scrollIntoView({ block: 'nearest' });
    }
  }, [currentIdx]);

  const pairs: Array<[string, string | undefined, number, number?]> = [];
  for (let i = 0; i < history.length; i += 2) {
    pairs.push([history[i].san!, history[i + 1]?.san, i, i + 1 < history.length ? i + 1 : undefined]);
  }

  if (!pairs.length) {
    return (
      <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', textAlign: 'center', padding: '20px 0' }}>
        No moves yet
      </p>
    );
  }

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {pairs.map(([white, black, wi, bi], pairIdx) => (
        <div key={pairIdx} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 1fr', gap: 2, alignItems: 'center' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7a6040', paddingLeft: 4 }}>
            {pairIdx + 1}.
          </span>
          <button
            data-active={wi === currentIdx}
            onClick={() => onJump(wi)}
            style={{
              padding: '4px 8px', borderRadius: 5, border: 'none', cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', fontWeight: 600,
              background: wi === currentIdx ? 'rgba(212,168,83,0.2)' : 'transparent',
              color: wi === currentIdx ? '#d4a853' : '#c8a87a',
              textAlign: 'left', transition: 'all 0.12s ease',
            }}
          >
            {white}
          </button>
          {black !== undefined && bi !== undefined ? (
            <button
              data-active={bi === currentIdx}
              onClick={() => onJump(bi)}
              style={{
                padding: '4px 8px', borderRadius: 5, border: 'none', cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', fontWeight: 600,
                background: bi === currentIdx ? 'rgba(212,168,83,0.2)' : 'transparent',
                color: bi === currentIdx ? '#d4a853' : '#c8a87a',
                textAlign: 'left', transition: 'all 0.12s ease',
              }}
            >
              {black}
            </button>
          ) : <div />}
        </div>
      ))}
    </div>
  );
}

export default function AnalysisPage() {
  const { themeName } = useBoardTheme();
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [fenInput, setFenInput] = useState('');
  const [fenError, setFenError] = useState('');
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [copied, setCopied] = useState<'fen' | 'pgn' | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('play');
  const [pgnInput, setPgnInput] = useState('');
  const [pgnError, setPgnError] = useState('');
  const [historyIdx, setHistoryIdx] = useState(-1); // -1 = at end
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [highlights, setHighlights] = useState<Record<string, string>>({});

  // Position editor state
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [editFen, setEditFen] = useState(STARTING_FEN);
  const [editTurn, setEditTurn] = useState<'w' | 'b'>('w');

  const { fen, history, isCheck, isCheckmate, isStalemate, isDraw, makeMove, undo, redo, canRedo, reset, loadFen, loadPgn, goToMove, getPgn } = useChessGame({
    initialFen: STARTING_FEN,
    onMove: (move) => {
      setLastMove({ from: move.from, to: move.to });
      setHistoryIdx(-1); // always at end after making a move
    },
  });

  const handleMove = useCallback((from: string, to: string, promotion?: string) => {
    const ok = makeMove(from, to, promotion);
    if (ok) setLastMove({ from, to });
  }, [makeMove]);

  const handleLoadFen = () => {
    const val = fenInput.trim();
    if (!val) return;
    const success = loadFen(val);
    if (!success) {
      setFenError('Invalid FEN string. Please check and try again.');
      setTimeout(() => setFenError(''), 3000);
    } else {
      setFenError('');
      setLastMove(null);
      setFenInput('');
      setHistoryIdx(-1);
    }
  };

  const handleLoadPgn = () => {
    const val = pgnInput.trim();
    if (!val) return;
    const count = loadPgn(val);
    if (count < 0) {
      setPgnError('Invalid PGN. Please check the format and try again.');
      setTimeout(() => setPgnError(''), 3000);
    } else {
      setPgnError('');
      setLastMove(null);
      setHistoryIdx(-1);
      setActiveTab('play');
    }
  };

  const handleCopyFen = () => {
    navigator.clipboard.writeText(fen).then(() => {
      setCopied('fen');
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const handleCopyPgn = () => {
    navigator.clipboard.writeText(getPgn()).then(() => {
      setCopied('pgn');
      setTimeout(() => setCopied(null), 1800);
    });
  };

  // Jump to a move in history
  const handleJump = useCallback((idx: number) => {
    goToMove(idx);
    setHistoryIdx(idx);
    if (history[idx]) setLastMove({ from: history[idx].from, to: history[idx].to });
  }, [goToMove, history]);

  const handleUndo = () => {
    undo();
    setLastMove(null);
  };

  const handleRedo = () => {
    redo();
    setLastMove(null);
  };

  // === Position Editor ===
  const handleEditorSquareClick = useCallback((square: string) => {
    if (!selectedPiece) return;
    try {
      // Parse current FEN board part and modify
      const parts = editFen.split(' ');
      const rows = parts[0].split('/');
      const file = square.charCodeAt(0) - 97; // a=0
      const rank = 8 - parseInt(square[1]);   // rank 8 = row 0
      
      // Expand FEN row
      const expandRow = (row: string): string[] => {
        const cells: string[] = [];
        for (const ch of row) {
          if (isNaN(parseInt(ch))) cells.push(ch);
          else for (let i = 0; i < parseInt(ch); i++) cells.push('1');
        }
        return cells;
      };
      const compressRow = (cells: string[]): string => {
        let result = '';
        let count = 0;
        for (const c of cells) {
          if (c === '1') count++;
          else { if (count) { result += count; count = 0; } result += c; }
        }
        if (count) result += count;
        return result;
      };

      const cells = expandRow(rows[rank]);
      if (selectedPiece === 'clear') {
        cells[file] = '1';
      } else {
        const color = selectedPiece[0]; // 'w' or 'b'
        const type = selectedPiece[1].toLowerCase();
        cells[file] = color === 'w' ? type.toUpperCase() : type;
      }
      rows[rank] = compressRow(cells);
      parts[0] = rows.join('/');
      const newFen = parts.join(' ');
      
      // Validate new FEN
      try { new Chess(newFen); setEditFen(newFen); } catch {}
    } catch {}
  }, [editFen, selectedPiece]);

  const applyEditorPosition = () => {
    const parts = editFen.split(' ');
    parts[1] = editTurn;
    const newFen = parts.join(' ');
    const success = loadFen(newFen);
    if (success) {
      setActiveTab('play');
      setLastMove(null);
    }
  };

  const gameStatus = isCheckmate ? '♟ Checkmate' : isStalemate ? '= Stalemate' : isDraw ? '= Draw' : isCheck ? '⚠ Check!' : null;
  const turnLabel = fen.split(' ')[1] === 'w' ? 'White to move' : 'Black to move';

  const TABS: { id: TabType; label: string; icon: string }[] = [
    { id: 'play', label: 'Play & Analyze', icon: '🔬' },
    { id: 'edit', label: 'Edit Position', icon: '✏️' },
    { id: 'pgn', label: 'Import PGN', icon: '📋' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 6 }}>
          🔬 Analysis Board
        </h1>
        <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem' }}>
          Explore any position freely. Import games, edit positions, annotate with arrows, and study at your own pace.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'start' }}>
        {/* Board column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            padding: 12, background: '#1a120b', borderRadius: 14,
            border: `1px solid ${isCheck && !isCheckmate ? 'rgba(224,82,82,0.4)' : '#3d2e1e'}`,
          }}>
            <ChessBoard
              fen={activeTab === 'edit' ? editFen : fen}
              interactive={activeTab === 'play'}
              onMove={handleMove}
              lastMove={lastMove}
              size={440}
              orientation={orientation}
              showCoordinates
              themeName={themeName}
              arrows={arrows}
              highlightSquares={highlights}
            />
          </div>

          {/* Status bar */}
          <div style={{
            padding: '8px 14px', borderRadius: 8, textAlign: 'center',
            background: gameStatus ? 'rgba(212,168,83,0.08)' : 'rgba(212,168,83,0.04)',
            border: `1px solid ${isCheck ? 'rgba(224,82,82,0.3)' : 'rgba(212,168,83,0.12)'}`,
          }}>
            <p style={{ margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700, color: gameStatus ? '#d4a853' : '#7a6040' }}>
              {gameStatus || turnLabel}
            </p>
          </div>

          {/* Board controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <button onClick={handleUndo} className="btn-ghost" style={{ justifyContent: 'center', fontSize: '0.82rem' }}>← Undo</button>
            <button onClick={handleRedo} disabled={!canRedo()} className="btn-ghost" style={{ justifyContent: 'center', fontSize: '0.82rem', opacity: canRedo() ? 1 : 0.35 }}>Redo →</button>
            <button onClick={() => setOrientation(o => o === 'white' ? 'black' : 'white')} className="btn-ghost" style={{ justifyContent: 'center', fontSize: '0.82rem' }}>⇅ Flip</button>
            <button onClick={() => { reset(); setLastMove(null); setArrows([]); setHighlights({}); }} className="btn-ghost" style={{ justifyContent: 'center', fontSize: '0.82rem' }}>↺ Reset</button>
          </div>

          {/* Export */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <button onClick={handleCopyFen} className="btn-ghost" style={{ justifyContent: 'center', fontSize: '0.8rem' }}>
              {copied === 'fen' ? '✓ Copied!' : '📋 Copy FEN'}
            </button>
            <button onClick={handleCopyPgn} className="btn-ghost" style={{ justifyContent: 'center', fontSize: '0.8rem' }}>
              {copied === 'pgn' ? '✓ Copied!' : '📄 Copy PGN'}
            </button>
          </div>

          {/* Arrow toolbar */}
          <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ margin: '0 0 8px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Annotations
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['gold', 'green', 'red', 'blue'] as const).map(color => {
                const colorMap = { gold: '#d4a853', green: '#4caf7d', red: '#e05252', blue: '#5b9bd5' };
                return (
                  <button
                    key={color}
                    onClick={() => {
                      // Add a placeholder arrow (user enters squares via text)
                      const from = prompt(`Arrow from square (e.g. e2):`);
                      const to = prompt(`Arrow to square (e.g. e4):`);
                      if (from && to && from.length === 2 && to.length === 2) {
                        setArrows(arr => [...arr, { from, to, color }]);
                      }
                    }}
                    style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: colorMap[color] + '20',
                      border: `1px solid ${colorMap[color]}50`,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    title={`Add ${color} arrow`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <line x1="2" y1="12" x2="11" y2="3" stroke={colorMap[color]} strokeWidth="2" strokeLinecap="round" />
                      <polygon points="11,3 8,3 11,6" fill={colorMap[color]} />
                    </svg>
                  </button>
                );
              })}
              <button
                onClick={() => { setArrows([]); setHighlights({}); }}
                style={{
                  padding: '0 10px', height: 28, borderRadius: 6, border: '1px solid #3d2e1e',
                  background: 'transparent', cursor: 'pointer', color: '#7a6040',
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.72rem', fontWeight: 700,
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 14px', borderRadius: 8,
                  border: `1px solid ${activeTab === tab.id ? '#d4a853' : '#3d2e1e'}`,
                  background: activeTab === tab.id ? 'rgba(212,168,83,0.1)' : 'transparent',
                  color: activeTab === tab.id ? '#d4a853' : '#7a6040',
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* === PLAY TAB === */}
          {activeTab === 'play' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* FEN input */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Load FEN Position
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={fenInput}
                    onChange={e => setFenInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLoadFen()}
                    placeholder="Paste FEN string here…"
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: 8,
                      border: `1px solid ${fenError ? '#e05252' : '#3d2e1e'}`,
                      background: '#0f0a06', color: '#f5e6c8',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
                      outline: 'none',
                    }}
                  />
                  <button onClick={handleLoadFen} className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                    Load
                  </button>
                </div>
                {fenError && <p style={{ color: '#e05252', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', margin: '6px 0 0' }}>{fenError}</p>}
                <p style={{ margin: '8px 0 0', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#7a6040', wordBreak: 'break-all', lineHeight: 1.5 }}>
                  {fen}
                </p>
              </div>

              {/* Move history */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <p style={{ margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Move History
                  </p>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7a6040' }}>
                    {history.length} moves
                  </span>
                </div>
                <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                  <MoveList
                    history={history}
                    currentIdx={historyIdx === -1 ? history.length - 1 : historyIdx}
                    onJump={handleJump}
                  />
                </div>
                {/* Navigation bar */}
                <div style={{ display: 'flex', gap: 4, marginTop: 10, justifyContent: 'center' }}>
                  {[
                    { label: '|◀', action: () => history.length > 0 && handleJump(0), title: 'First move' },
                    { label: '◀', action: () => { if (history.length) { const cur = historyIdx === -1 ? history.length - 1 : historyIdx; if (cur > 0) handleJump(cur - 1); } }, title: 'Previous move' },
                    { label: '▶', action: () => { const cur = historyIdx === -1 ? history.length - 1 : historyIdx; if (cur < history.length - 1) handleJump(cur + 1); }, title: 'Next move' },
                    { label: '▶|', action: () => history.length > 0 && handleJump(history.length - 1), title: 'Last move' },
                  ].map(btn => (
                    <button key={btn.label} onClick={btn.action} title={btn.title} style={{ width: 32, height: 28, borderRadius: 6, border: '1px solid #3d2e1e', background: 'transparent', color: '#c8a87a', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', cursor: 'pointer' }}>
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game status */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Position Info
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Turn', value: fen.split(' ')[1] === 'w' ? 'White' : 'Black' },
                    { label: 'Move', value: fen.split(' ')[5] || '1' },
                    { label: 'Half-moves', value: fen.split(' ')[4] || '0' },
                    { label: 'Castling', value: fen.split(' ')[2] || '-' },
                  ].map(item => (
                    <div key={item.label} style={{ background: '#0f0a06', borderRadius: 6, padding: '6px 10px' }}>
                      <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.7rem', color: '#7a6040', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#d4a853', fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                {(isCheckmate || isStalemate || isDraw) && (
                  <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 8, background: 'rgba(212,168,83,0.08)', border: '1px solid rgba(212,168,83,0.2)', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#d4a853' }}>
                      {isCheckmate ? '♟ Checkmate!' : isStalemate ? '= Stalemate' : '= Draw'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* === EDIT TAB === */}
          {activeTab === 'edit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 10, padding: '12px 14px' }}>
                <p style={{ margin: 0, color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Select a piece from the palette, then click squares on the board to place it. Click a square with a piece already on it to remove it.
                </p>
              </div>

              {/* Piece palette */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Piece Palette
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 10 }}>
                  {PIECE_PALETTE.map(piece => (
                    <button
                      key={piece.code}
                      onClick={() => setSelectedPiece(p => p === piece.code ? null : piece.code)}
                      title={piece.label}
                      style={{
                        padding: '8px 4px', borderRadius: 8, border: `1.5px solid ${selectedPiece === piece.code ? '#d4a853' : '#3d2e1e'}`,
                        background: selectedPiece === piece.code ? 'rgba(212,168,83,0.15)' : '#0f0a06',
                        cursor: 'pointer', fontSize: '1.3rem', lineHeight: 1, transition: 'all 0.12s ease',
                        color: piece.code.startsWith('w') ? '#f5e6c8' : '#2e2015',
                        textShadow: piece.code.startsWith('b') ? '0 0 1px #f5e6c8' : 'none',
                      }}
                    >
                      {piece.symbol}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPiece(p => p === 'clear' ? null : 'clear')}
                  style={{
                    width: '100%', padding: '7px', borderRadius: 8, border: `1px solid ${selectedPiece === 'clear' ? '#e05252' : '#3d2e1e'}`,
                    background: selectedPiece === 'clear' ? 'rgba(224,82,82,0.1)' : 'transparent',
                    color: selectedPiece === 'clear' ? '#e05252' : '#7a6040',
                    cursor: 'pointer', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                  }}
                >
                  🗑 Erase Square
                </button>
              </div>

              {/* Turn selector */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Side to Move
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {(['w', 'b'] as const).map(color => (
                    <button
                      key={color}
                      onClick={() => setEditTurn(color)}
                      style={{
                        padding: '10px', borderRadius: 8,
                        border: `1.5px solid ${editTurn === color ? '#d4a853' : '#3d2e1e'}`,
                        background: editTurn === color ? 'rgba(212,168,83,0.12)' : 'transparent',
                        color: editTurn === color ? '#d4a853' : '#7a6040',
                        fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {color === 'w' ? '♔ White' : '♚ Black'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick positions */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Quick Positions
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { label: 'Starting Position', fen: STARTING_FEN },
                    { label: 'Empty Board', fen: '8/8/8/8/8/8/8/8 w - - 0 1' },
                    { label: 'K+P vs K (Endgame)', fen: '8/8/8/4k3/8/8/4P3/4K3 w - - 0 1' },
                    { label: 'Lucena Position', fen: '1K1k4/1P6/8/8/8/8/8/2R5 w - - 0 1' },
                  ].map(pos => (
                    <button
                      key={pos.label}
                      onClick={() => setEditFen(pos.fen)}
                      style={{
                        padding: '8px 12px', borderRadius: 8, border: '1px solid #3d2e1e',
                        background: 'transparent', color: '#c8a87a', textAlign: 'left',
                        fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.82rem', cursor: 'pointer',
                        transition: 'all 0.12s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'; e.currentTarget.style.color = '#d4a853'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#3d2e1e'; e.currentTarget.style.color = '#c8a87a'; }}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={applyEditorPosition} className="btn-primary" style={{ justifyContent: 'center', padding: '12px' }}>
                ✓ Apply Position & Analyze
              </button>
            </div>
          )}

          {/* === PGN TAB === */}
          {activeTab === 'pgn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 10, padding: '12px 14px' }}>
                <p style={{ margin: 0, color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Paste any PGN game notation to load it. You can then navigate through the moves using the move list or arrow keys.
                </p>
              </div>

              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  PGN Input
                </p>
                <textarea
                  value={pgnInput}
                  onChange={e => setPgnInput(e.target.value)}
                  placeholder={`[Event "World Championship"]\n[White "Kasparov, G"]\n[Black "Karpov, A"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5...`}
                  rows={10}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: `1px solid ${pgnError ? '#e05252' : '#3d2e1e'}`,
                    background: '#0f0a06', color: '#c8a87a', resize: 'vertical',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', lineHeight: 1.6,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
                {pgnError && (
                  <p style={{ color: '#e05252', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', margin: '6px 0 0' }}>
                    {pgnError}
                  </p>
                )}
                <button onClick={handleLoadPgn} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: '12px' }}>
                  📋 Load PGN Game
                </button>
              </div>

              {/* Example PGN games */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Example Games
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    {
                      label: "Immortal Game — Anderssen vs Kieseritzky (1851)",
                      pgn: '[Event "London"]\n[White "Anderssen, A"]\n[Black "Kieseritzky, L"]\n[Result "1-0"]\n\n1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7# 1-0'
                    },
                    {
                      label: "Opera Game — Morphy vs Allies (1858)",
                      pgn: '[Event "Paris Opera"]\n[White "Morphy, P"]\n[Black "Duke Karl / Count Isouard"]\n[Result "1-0"]\n\n1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0'
                    },
                    {
                      label: "Game of the Century — Byrne vs Fischer (1956)",
                      pgn: '[Event "Third Rosenwald Trophy"]\n[White "Byrne, D"]\n[Black "Fischer, R"]\n[Result "0-1"]\n\n1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4 7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3 13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2# 0-1'
                    },
                  ].map(game => (
                    <button
                      key={game.label}
                      onClick={() => { setPgnInput(game.pgn); }}
                      style={{
                        padding: '9px 12px', borderRadius: 8, border: '1px solid #3d2e1e',
                        background: 'transparent', color: '#c8a87a', textAlign: 'left',
                        fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', cursor: 'pointer',
                        lineHeight: 1.4, transition: 'all 0.12s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'; e.currentTarget.style.color = '#d4a853'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#3d2e1e'; e.currentTarget.style.color = '#c8a87a'; }}
                    >
                      {game.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
