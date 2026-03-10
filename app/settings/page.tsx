'use client';
import React, { useState, useEffect } from 'react';
import ChessBoard from '@/components/board/ChessBoard';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import { BOARD_THEMES } from '@/components/board/themes';
import { getLevelFromXP, getXPProgress, XP_LEVELS } from '@/lib/progress-utils';
import ProgressBar from '@/components/ui/ProgressBar';
import Modal from '@/components/ui/Modal';

const PREVIEW_FEN = 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';

type Section = 'board' | 'learning' | 'progress' | 'account';

export default function SettingsPage() {
  const { themeName, setThemeName } = useBoardTheme();
  const { progress, updateSettings, resetProgress, loaded } = useUserProgress();
  const [mounted, setMounted] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('board');

  useEffect(() => setMounted(true), []);

  const settings = progress.settings;
  const level = mounted ? getLevelFromXP(progress.xp) : null;
  const xpProgress = mounted ? getXPProgress(progress.xp) : null;

  const handleReset = () => {
    resetProgress();
    setShowResetModal(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  const SECTIONS: { id: Section; label: string; icon: string }[] = [
    { id: 'board', label: 'Board & Display', icon: '♟' },
    { id: 'learning', label: 'Learning', icon: '📖' },
    { id: 'progress', label: 'My Progress', icon: '📊' },
    { id: 'account', label: 'Account', icon: '⚙️' },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 6 }}>
          ⚙️ Settings
        </h1>
        <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem' }}>
          Customize your MindGambit experience.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28, alignItems: 'start' }}>
        {/* Sidebar nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'sticky', top: 76 }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '10px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                border: `1px solid ${activeSection === s.id ? 'rgba(212,168,83,0.35)' : '#3d2e1e'}`,
                background: activeSection === s.id ? 'rgba(212,168,83,0.08)' : 'transparent',
                color: activeSection === s.id ? '#d4a853' : '#7a6040',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s ease',
              }}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* ═══ BOARD & DISPLAY ═══ */}
          {activeSection === 'board' && (
            <>
              {/* Board Theme */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '20px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 4 }}>Board Theme</h3>
                <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', marginBottom: 18, lineHeight: 1.5 }}>
                  Choose the visual style of your chess board. Changes apply immediately across the entire app.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
                  {Object.entries(BOARD_THEMES).map(([name, theme]) => {
                    const isActive = name === themeName;
                    return (
                      <button
                        key={name}
                        onClick={() => setThemeName(name as any)}
                        style={{
                          padding: '12px', borderRadius: 10, cursor: 'pointer',
                          border: `2px solid ${isActive ? '#d4a853' : '#3d2e1e'}`,
                          background: isActive ? 'rgba(212,168,83,0.08)' : '#0f0a06',
                          boxShadow: isActive ? '0 0 0 1px rgba(212,168,83,0.2)' : 'none',
                          transition: 'all 0.15s ease',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                        }}
                      >
                        {/* Mini board preview: 4x4 */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 14px)', gridTemplateRows: 'repeat(4, 14px)' }}>
                          {Array.from({ length: 16 }, (_, i) => {
                            const r = Math.floor(i / 4), c = i % 4;
                            const isLight = (r + c) % 2 === 0;
                            return (
                              <div key={i} style={{ width: 14, height: 14, background: isLight ? theme.light : theme.dark, borderRadius: 1 }} />
                            );
                          })}
                        </div>
                        <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: isActive ? '#d4a853' : '#7a6040', textTransform: 'capitalize', letterSpacing: '0.02em' }}>
                          {name.replace(/-/g, ' ')}
                        </span>
                        {isActive && <span style={{ fontSize: '0.65rem', color: '#d4a853', fontFamily: 'Source Sans 3, sans-serif', fontWeight: 700 }}>✓ Active</span>}
                      </button>
                    );
                  })}
                </div>
                {/* Live preview */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', background: '#0f0a06', borderRadius: 10, border: '1px solid #3d2e1e' }}>
                  <ChessBoard
                    fen={PREVIEW_FEN}
                    interactive={false}
                    size={280}
                    showCoordinates={settings.showCoordinates}
                    themeName={themeName}
                  />
                </div>
              </div>

              {/* Coordinates toggle */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 14 }}>Display Options</h3>
                <SettingToggle
                  label="Show Coordinates"
                  description="Display rank numbers and file letters around the board"
                  value={settings.showCoordinates}
                  onChange={v => updateSettings({ showCoordinates: v })}
                />
              </div>

              {/* Board size slider */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 4 }}>Board Size</h3>
                <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', marginBottom: 16 }}>
                  Adjust the chess board size for lesson and analysis views.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', width: 28 }}>S</span>
                  <input
                    type="range"
                    min={320}
                    max={580}
                    step={20}
                    value={settings.boardSize}
                    onChange={e => updateSettings({ boardSize: Number(e.target.value) })}
                    style={{ flex: 1, accentColor: '#d4a853', cursor: 'pointer', height: 4 }}
                  />
                  <span style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', width: 28, textAlign: 'right' }}>L</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#d4a853', width: 50, textAlign: 'right' }}>{settings.boardSize}px</span>
                </div>
              </div>
            </>
          )}

          {/* ═══ LEARNING ═══ */}
          {activeSection === 'learning' && (
            <>
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 16 }}>Puzzle Settings</h3>
                <SettingToggle
                  label="Show Hints in Puzzles"
                  description="Show the hint button during puzzle solving (disabling challenges you to find moves without assistance)"
                  value={settings.showHintsInPuzzles}
                  onChange={v => updateSettings({ showHintsInPuzzles: v })}
                />
              </div>

              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 16 }}>Lesson Settings</h3>
                <SettingToggle
                  label="Auto-advance Text Steps"
                  description="Automatically advance through text-only lesson steps after 3 seconds"
                  value={settings.autoAdvanceLessons}
                  onChange={v => updateSettings({ autoAdvanceLessons: v })}
                />
              </div>

              {/* Animation speed */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 4 }}>Animation Speed</h3>
                <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', marginBottom: 14 }}>
                  Controls how fast piece movements and page transitions animate.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['slow', 'normal', 'fast'] as const).map(speed => (
                    <button
                      key={speed}
                      onClick={() => updateSettings({ animationSpeed: speed })}
                      style={{
                        flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                        border: `1.5px solid ${settings.animationSpeed === speed ? '#d4a853' : '#3d2e1e'}`,
                        background: settings.animationSpeed === speed ? 'rgba(212,168,83,0.12)' : 'transparent',
                        color: settings.animationSpeed === speed ? '#d4a853' : '#7a6040',
                        fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700,
                        textTransform: 'capitalize', transition: 'all 0.15s ease',
                      }}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ═══ PROGRESS ═══ */}
          {activeSection === 'progress' && mounted && level && xpProgress && (
            <>
              {/* Level card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(212,168,83,0.08) 0%, rgba(46,32,21,1) 60%)',
                border: '1px solid rgba(212,168,83,0.25)', borderRadius: 14, padding: '24px 22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(212,168,83,0.15)', border: '2px solid rgba(212,168,83,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    {level.level <= 1 ? '♟' : level.level <= 2 ? '🗡️' : level.level <= 3 ? '♞' : level.level <= 4 ? '♝' : level.level <= 5 ? '♜' : level.level <= 6 ? '♛' : '♚'}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#d4a853', lineHeight: 1.2 }}>
                      {level.title}
                    </div>
                    <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', color: '#7a6040', marginTop: 2 }}>
                      Level {level.level} · {progress.xp} XP total
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', color: '#7a6040' }}>Progress to next level</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#d4a853' }}>
                      {xpProgress.current} / {xpProgress.total} XP
                    </span>
                  </div>
                  <ProgressBar value={xpProgress.percentage} max={100} color="gold" />
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { icon: '🔥', label: 'Current Streak', value: `${progress.streak} day${progress.streak !== 1 ? 's' : ''}` },
                  { icon: '🏆', label: 'Longest Streak', value: `${progress.longestStreak} day${progress.longestStreak !== 1 ? 's' : ''}` },
                  { icon: '📖', label: 'Lessons Completed', value: `${progress.completedLessons.length}` },
                  { icon: '🧩', label: 'Puzzles Solved', value: `${progress.puzzleStats.solved}` },
                  { icon: '📊', label: 'Puzzle Accuracy', value: progress.puzzleStats.attempted > 0 ? `${Math.round((progress.puzzleStats.solved / progress.puzzleStats.attempted) * 100)}%` : '—' },
                  { icon: '📚', label: 'Openings Studied', value: `${progress.openingsStudied.length}` },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '1rem' }}>{stat.icon}</span>
                      <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', color: '#7a6040', fontWeight: 600 }}>{stat.label}</span>
                    </div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#d4a853', lineHeight: 1 }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* XP level chart */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 14 }}>XP Levels</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {XP_LEVELS.map((lvl, i) => {
                    const isCurrentLevel = lvl.level === level.level;
                    const isPast = progress.xp >= lvl.xpRequired;
                    return (
                      <div key={lvl.level} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: isPast ? 1 : 0.45 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                          background: isCurrentLevel ? 'rgba(212,168,83,0.2)' : isPast ? 'rgba(76,175,125,0.15)' : '#0f0a06',
                          border: `1.5px solid ${isCurrentLevel ? '#d4a853' : isPast ? 'rgba(76,175,125,0.4)' : '#3d2e1e'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700,
                          color: isCurrentLevel ? '#d4a853' : isPast ? '#4caf7d' : '#7a6040',
                        }}>
                          {isPast && !isCurrentLevel ? '✓' : lvl.level}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700, color: isCurrentLevel ? '#d4a853' : '#c8a87a' }}>
                              {lvl.title}
                              {isCurrentLevel && <span style={{ marginLeft: 8, fontSize: '0.72rem', color: '#7a6040' }}>← Current</span>}
                            </span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#7a6040' }}>{lvl.xpRequired} XP</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ═══ ACCOUNT ═══ */}
          {activeSection === 'account' && (
            <>
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 4 }}>About MindGambit</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  {[
                    { label: 'Version', value: '2.0.0' },
                    { label: 'Chess Engine', value: 'chess.js 1.0' },
                    { label: 'Framework', value: 'Next.js 14' },
                    { label: 'Data Storage', value: 'localStorage (no account needed)' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #3d2e1e' }}>
                      <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', color: '#7a6040' }}>{item.label}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#c8a87a' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#1a120b', border: '1px solid rgba(224,82,82,0.2)', borderRadius: 14, padding: '18px 22px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 4 }}>
                  Reset Progress
                </h3>
                <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', marginBottom: 16, lineHeight: 1.6 }}>
                  Clear all your progress, XP, completed lessons, and puzzle stats. This cannot be undone. Your board theme preference will be kept.
                </p>
                {resetDone && (
                  <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(76,175,125,0.08)', border: '1px solid rgba(76,175,125,0.25)', marginBottom: 12 }}>
                    <p style={{ margin: 0, color: '#4caf7d', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700 }}>
                      ✓ Progress has been reset successfully.
                    </p>
                  </div>
                )}
                <button
                  onClick={() => setShowResetModal(true)}
                  style={{
                    padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(224,82,82,0.4)',
                    background: 'rgba(224,82,82,0.08)', color: '#e05252',
                    fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(224,82,82,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(224,82,82,0.08)'; }}
                >
                  🗑 Reset All Progress
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Reset confirmation modal */}
      <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)} title="Reset All Progress?">
        <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 20 }}>
          This will permanently delete all your XP, completed lessons, solved puzzles, streak data, and stats. Your board theme will be kept. This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => setShowResetModal(false)} className="btn-ghost">Cancel</button>
          <button
            onClick={handleReset}
            style={{
              padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(224,82,82,0.4)',
              background: 'rgba(224,82,82,0.1)', color: '#e05252',
              fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Yes, Reset Everything
          </button>
        </div>
      </Modal>
    </div>
  );
}

// Reusable toggle row component
function SettingToggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '1px solid #3d2e1e', marginBottom: 14 }}>
      <div>
        <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', color: '#7a6040', lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          position: 'relative', width: 48, height: 26, borderRadius: 13, border: 'none',
          background: value ? '#d4a853' : '#3d2e1e', cursor: 'pointer',
          transition: 'background 0.2s ease', flexShrink: 0,
        }}
        aria-checked={value}
        role="switch"
      >
        <div style={{
          position: 'absolute', top: 3, left: value ? 25 : 3, width: 20, height: 20,
          borderRadius: '50%', background: value ? '#0f0a06' : '#7a6040',
          transition: 'left 0.2s ease',
        }} />
      </button>
    </div>
  );
}
