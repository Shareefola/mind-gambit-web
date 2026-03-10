'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ALL_OPENINGS as OPENINGS } from '@/data/openings';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import Badge from '@/components/ui/Badge';

const MINI_BOARD_PIECES: Record<string, string> = {
  K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',
  k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟',
};

function MiniBoard({ fen, size = 120 }: { fen: string; size?: number }) {
  const { themeName } = useBoardTheme();
  const { BOARD_THEMES } = require('@/components/board/themes');
  const theme = BOARD_THEMES[themeName];
  const sq = size / 8;
  const position = fen.split(' ')[0];
  const rows = position.split('/');
  const board: (string | null)[][] = rows.map(row => {
    const cells: (string | null)[] = [];
    for (const ch of row) {
      if (/\d/.test(ch)) {
        for (let i = 0; i < parseInt(ch); i++) cells.push(null);
      } else {
        cells.push(ch);
      }
    }
    return cells;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(8, ${sq}px)`, gridTemplateRows: `repeat(8, ${sq}px)`, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
      {board.map((row, ri) =>
        row.map((piece, ci) => {
          const isLight = (ri + ci) % 2 === 0;
          return (
            <div key={`${ri}-${ci}`} style={{ width: sq, height: sq, backgroundColor: isLight ? theme.light : theme.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: sq * 0.72, lineHeight: 1 }}>
              {piece ? MINI_BOARD_PIECES[piece] || '' : ''}
            </div>
          );
        })
      )}
    </div>
  );
}

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type Style = 'Tactical' | 'Positional' | 'Balanced';
type Color = 'White' | 'Black' | 'Both';

export default function OpeningsPage() {
  const { progress } = useUserProgress();
  const [diffFilter, setDiffFilter] = useState<Difficulty[]>([]);
  const [styleFilter, setStyleFilter] = useState<Style[]>([]);
  const [colorFilter, setColorFilter] = useState<Color | null>(null);

  const toggleDiff = (d: Difficulty) =>
    setDiffFilter(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  const toggleStyle = (s: Style) =>
    setStyleFilter(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const filtered = OPENINGS.filter(o => {
    if (diffFilter.length > 0 && !diffFilter.includes(o.difficulty)) return false;
    if (styleFilter.length > 0 && !styleFilter.includes(o.style)) return false;
    if (colorFilter && o.forColor !== colorFilter && o.forColor !== 'Both') return false;
    return true;
  });

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px',
    borderRadius: 20,
    border: `1px solid ${active ? '#d4a853' : '#3d2e1e'}`,
    background: active ? 'rgba(212,168,83,0.15)' : 'transparent',
    color: active ? '#d4a853' : '#7a6040',
    fontFamily: 'Source Sans 3, sans-serif',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  });

  const difficultyColor = (d: string) => d === 'Beginner' ? 'green' : d === 'Intermediate' ? 'gold' : 'red';

  const mainLineFen = (o: typeof OPENINGS[0]) => {
    const last = o.mainLine[o.mainLine.length - 1];
    return last?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a120b, #0f0a06)', borderBottom: '1px solid #3d2e1e', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Opening Library
          </h1>
          <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '1rem', marginBottom: 28 }}>
            Ten essential openings with full move annotation, variations, and middlegame plans.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>LEVEL:</span>
              {(['Beginner','Intermediate','Advanced'] as Difficulty[]).map(d => (
                <button key={d} style={filterBtnStyle(diffFilter.includes(d))} onClick={() => toggleDiff(d)}>{d}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>STYLE:</span>
              {(['Tactical','Positional','Balanced'] as Style[]).map(s => (
                <button key={s} style={filterBtnStyle(styleFilter.includes(s))} onClick={() => toggleStyle(s)}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>FOR:</span>
              {(['White','Black'] as Color[]).map(c => (
                <button key={c} style={filterBtnStyle(colorFilter === c)} onClick={() => setColorFilter(prev => prev === c ? null : c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map((opening, i) => {
            const studied = progress.openingsStudied.includes(opening.id);
            return (
              <Link
                key={opening.id}
                href={`/openings/${opening.id}`}
                style={{ textDecoration: 'none', animation: `fadeUp 0.4s ease-out ${i * 60}ms both` }}
              >
                <div
                  style={{
                    background: '#1a120b',
                    border: `1px solid ${studied ? 'rgba(76,175,125,0.25)' : '#3d2e1e'}`,
                    borderRadius: 14,
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#251a10';
                    el.style.borderColor = '#8b6d35';
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = '0 8px 32px rgba(212,168,83,0.12)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#1a120b';
                    el.style.borderColor = studied ? 'rgba(76,175,125,0.25)' : '#3d2e1e';
                    el.style.transform = '';
                    el.style.boxShadow = '';
                  }}
                >
                  {/* Mini board */}
                  <div style={{ background: '#0f0a06', display: 'flex', justifyContent: 'center', padding: '16px 16px 12px' }}>
                    <MiniBoard fen={mainLineFen(opening)} size={136} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '14px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#f5e6c8', lineHeight: 1.3 }}>
                        {opening.name}
                      </h3>
                      <span style={{ color: '#7a6040', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', flexShrink: 0, marginLeft: 8 }}>
                        {opening.eco}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                      <Badge label={opening.difficulty} color={difficultyColor(opening.difficulty) as any} />
                      <Badge label={opening.style} color="muted" />
                      <Badge label={`For ${opening.forColor}`} color="blue" />
                      {studied && <Badge label="Studied" color="green" dot />}
                    </div>

                    <p style={{ color: '#8b6d35', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', marginBottom: 10 }}>
                      {opening.mainLine.slice(0, 3).map((s, i) => `${i % 2 === 0 ? `${Math.floor(i/2)+1}.` : ''}${s.move}`).join(' ')}...
                    </p>

                    <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.82rem', lineHeight: 1.5, flex: 1, marginBottom: 14 }}>
                      {opening.famousPlayers.slice(0, 2).map(p => p.name).join(' · ')}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#d4a853', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', fontWeight: 700 }}>
                        Study Opening →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>♟</div>
            <p>No openings match your filters. Try clearing some.</p>
          </div>
        )}
      </div>
    </div>
  );
}
