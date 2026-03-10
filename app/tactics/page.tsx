'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { ALL_PUZZLES, ALL_THEMES, Puzzle } from '@/data/tactics';
import { useUserProgress } from '@/hooks/useUserProgress';
import PuzzleBoard from '@/components/tactics/PuzzleBoard';
import PuzzleHeader from '@/components/tactics/PuzzleHeader';
import Badge from '@/components/ui/Badge';

export default function TacticsPage() {
  const { progress, solvePuzzle } = useUserProgress();
  const [activeTheme, setActiveTheme] = useState<string>('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionSolved, setSessionSolved] = useState(0);
  const [sessionAttempted, setSessionAttempted] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const filteredPuzzles = activeTheme === 'All'
    ? ALL_PUZZLES
    : ALL_PUZZLES.filter(p => p.theme === activeTheme);

  const currentPuzzle = filteredPuzzles[currentIdx % filteredPuzzles.length];

  const handleSolve = useCallback((puzzleId: string, attempts: number) => {
    solvePuzzle(puzzleId, attempts);
    setSessionSolved(s => s + 1);
    setSessionAttempted(a => a + 1);
    setSessionStreak(s => s + 1);
  }, [solvePuzzle]);

  const handleNext = useCallback(() => {
    setCurrentIdx(i => (i + 1) % filteredPuzzles.length);
  }, [filteredPuzzles.length]);

  const completedCount = mounted ? progress.completedPuzzles.length : 0;
  const dots = filteredPuzzles.slice(0, Math.min(filteredPuzzles.length, 27));

  const themes = ['All', ...ALL_THEMES];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 6 }}>
          🧩 Tactics Training
        </h1>
        <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem' }}>
          {ALL_PUZZLES.length} puzzles across {ALL_THEMES.length} tactical themes. Find the winning move.
        </p>
      </div>

      {/* Theme filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {themes.map(t => (
          <button
            key={t}
            onClick={() => { setActiveTheme(t); setCurrentIdx(0); }}
            style={{
              padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${activeTheme === t ? '#d4a853' : '#3d2e1e'}`,
              background: activeTheme === t ? 'rgba(212,168,83,0.12)' : 'transparent',
              color: activeTheme === t ? '#d4a853' : '#7a6040',
              fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
          >
            {t}
            <span style={{ marginLeft: 6, fontSize: '0.7rem', opacity: 0.7 }}>
              ({t === 'All' ? ALL_PUZZLES.length : ALL_PUZZLES.filter(p => p.theme === t).length})
            </span>
          </button>
        ))}
      </div>

      {/* Puzzle dots nav */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 24 }}>
        {dots.map((p, i) => {
          const isDone = mounted && progress.completedPuzzles.includes(p.id);
          const isCurrent = i === (currentIdx % filteredPuzzles.length);
          return (
            <button
              key={p.id}
              onClick={() => setCurrentIdx(i)}
              title={`${p.theme} — ${p.difficulty}`}
              style={{
                width: 10, height: 10, borderRadius: '50%', border: 'none',
                background: isCurrent ? '#d4a853' : isDone ? 'rgba(76,175,125,0.6)' : '#3d2e1e',
                cursor: 'pointer', transition: 'all 0.15s ease',
                transform: isCurrent ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          );
        })}
        {filteredPuzzles.length > 27 && (
          <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', color: '#7a6040', alignSelf: 'center', marginLeft: 4 }}>
            +{filteredPuzzles.length - 27} more
          </span>
        )}
      </div>

      {/* Header stats */}
      {mounted && (
        <div style={{ marginBottom: 20 }}>
          <PuzzleHeader
            theme={currentPuzzle.theme}
            difficulty={currentPuzzle.difficulty}
            rating={currentPuzzle.rating}
            solved={completedCount}
            attempted={progress.puzzleStats.attempted}
            streak={sessionStreak}
          />
        </div>
      )}

      {/* Main puzzle area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'start' }}>
        {/* Board */}
        <PuzzleBoard
          key={`${currentPuzzle.id}-${currentIdx}`}
          puzzle={currentPuzzle}
          onSolve={handleSolve}
          onNext={handleNext}
          boardSize={440}
          showHints={progress.settings?.showHintsInPuzzles ?? true}
        />

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Puzzle info */}
          <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', margin: 0 }}>
                Puzzle {(currentIdx % filteredPuzzles.length) + 1} of {filteredPuzzles.length}
              </h3>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#d4a853', fontWeight: 700 }}>
                ⭐ {currentPuzzle.rating}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <Badge label={currentPuzzle.theme} color="gold" />
              <Badge label={currentPuzzle.difficulty} color={currentPuzzle.difficulty === 'Beginner' ? 'green' : currentPuzzle.difficulty === 'Intermediate' ? 'gold' : 'red'} />
              <Badge label={`${currentPuzzle.sideToMove} to move`} color="muted" />
            </div>
            {currentPuzzle.hint && (
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', color: '#7a6040', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
                💡 <span style={{ color: '#5b9bd5' }}>{currentPuzzle.hint}</span>
              </p>
            )}
          </div>

          {/* Session stats */}
          <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 18px' }}>
            <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              This Session
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { label: 'Solved', value: sessionSolved },
                { label: 'Streak', value: `${sessionStreak}🔥` },
                { label: 'Accuracy', value: sessionAttempted > 0 ? `${Math.round((sessionSolved / sessionAttempted) * 100)}%` : '—' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center', background: '#0f0a06', borderRadius: 8, padding: '8px 6px' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: '#d4a853' }}>{stat.value}</div>
                  <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.68rem', color: '#7a6040' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* All-time progress */}
          {mounted && (
            <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 18px' }}>
              <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                All-Time Progress
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Puzzles Solved', value: progress.puzzleStats.solved, total: ALL_PUZZLES.length },
                  { label: 'Total Attempted', value: progress.puzzleStats.attempted, total: null },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', color: '#7a6040' }}>{item.label}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#d4a853' }}>
                        {item.value}{item.total ? ` / ${item.total}` : ''}
                      </span>
                    </div>
                    {item.total && (
                      <div style={{ height: 4, background: '#3d2e1e', borderRadius: 2 }}>
                        <div style={{ height: '100%', background: 'linear-gradient(90deg, #d4a853, #f0c878)', borderRadius: 2, width: `${Math.min(100, (item.value / item.total) * 100)}%`, transition: 'width 0.5s ease' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Theme breakdown */}
          <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '14px 18px' }}>
            <p style={{ margin: '0 0 10px', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Themes
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ALL_THEMES.map(theme => {
                const count = ALL_PUZZLES.filter(p => p.theme === theme).length;
                const solvedCount = mounted ? ALL_PUZZLES.filter(p => p.theme === theme && progress.completedPuzzles.includes(p.id)).length : 0;
                return (
                  <button
                    key={theme}
                    onClick={() => { setActiveTheme(theme); setCurrentIdx(0); }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '6px 10px', borderRadius: 6, border: 'none',
                      background: activeTheme === theme ? 'rgba(212,168,83,0.08)' : 'transparent',
                      cursor: 'pointer', transition: 'background 0.15s ease',
                    }}
                  >
                    <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.82rem', color: activeTheme === theme ? '#d4a853' : '#c8a87a' }}>
                      {theme}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7a6040' }}>
                      {solvedCount}/{count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
