'use client';
import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAllOpeningById as getOpeningById, OpeningStep } from '@/data/openings';
import ChessBoard from '@/components/board/ChessBoard';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import Badge from '@/components/ui/Badge';
import BoardControls from '@/components/board/BoardControls';

type Tab = 'overview' | 'moves' | 'variations' | 'plans' | 'mistakes';

export default function OpeningDetailPage() {
  const params = useParams();
  const router = useRouter();
  const openingId = params?.openingId as string;
  const opening = getOpeningById(openingId);
  const { themeName } = useBoardTheme();
  const { studyOpening, progress } = useUserProgress();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [currentMoveIdx, setCurrentMoveIdx] = useState(-1);
  const [orientation, setOrientation] = useState<'white' | 'black'>(opening?.forColor === 'Black' ? 'black' : 'white');
  const [activeVariation, setActiveVariation] = useState<string | null>(null);

  if (!opening) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#f5e6c8', marginBottom: 12 }}>Opening not found</h2>
          <button onClick={() => router.push('/openings')} className="btn-primary">← Back to Library</button>
        </div>
      </div>
    );
  }

  const studied = progress.openingsStudied.includes(opening.id);

  const getDisplayLine = (): OpeningStep[] => {
    if (activeVariation) {
      const variation = opening.variations.find(v => v.id === activeVariation);
      if (variation) return [...opening.mainLine, ...variation.steps];
    }
    return opening.mainLine;
  };

  const displayLine = getDisplayLine();
  const currentFen = currentMoveIdx >= 0
    ? displayLine[currentMoveIdx]?.fen
    : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const currentAnnotation = currentMoveIdx >= 0 ? displayLine[currentMoveIdx]?.annotation : 'Use the arrows below to walk through the opening move by move.';

  const handlePrev = useCallback(() => setCurrentMoveIdx(i => Math.max(-1, i - 1)), []);
  const handleNext = useCallback(() => {
    setCurrentMoveIdx(i => {
      const next = Math.min(displayLine.length - 1, i + 1);
      if (next === displayLine.length - 1 && !studied) studyOpening(opening.id);
      return next;
    });
  }, [displayLine.length, opening.id, studied, studyOpening]);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'moves', label: 'Learn the Moves' },
    { id: 'variations', label: 'Variations' },
    { id: 'plans', label: 'Middlegame Plans' },
    { id: 'mistakes', label: 'Common Mistakes' },
  ];

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    border: 'none',
    borderBottom: `2px solid ${active ? '#d4a853' : 'transparent'}`,
    background: 'transparent',
    color: active ? '#d4a853' : '#7a6040',
    fontFamily: 'Source Sans 3, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 64px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => router.push('/openings')}
          style={{ background: 'none', border: 'none', color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', cursor: 'pointer', marginBottom: 16, padding: 0 }}
        >
          ← Back to Library
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 8 }}>
              {opening.name}
            </h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ color: '#7a6040', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>{opening.eco}</span>
              <Badge label={opening.difficulty} color={opening.difficulty === 'Beginner' ? 'green' : opening.difficulty === 'Intermediate' ? 'gold' : 'red'} />
              <Badge label={opening.style} color="muted" />
              <Badge label={`For ${opening.forColor}`} color="blue" />
              {studied && <Badge label="Studied ✓" color="green" dot />}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'start' }}>
        {/* Board (sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 80 }}>
          <div style={{ padding: 12, background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 14 }}>
            <ChessBoard
              fen={currentFen}
              interactive={false}
              size={400}
              orientation={orientation}
              showCoordinates
              themeName={themeName}
            />
          </div>

          {/* Move navigation */}
          {activeTab === 'moves' && (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button
                onClick={handlePrev}
                disabled={currentMoveIdx < 0}
                style={{ padding: '10px 20px', background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 8, color: currentMoveIdx >= 0 ? '#c8a87a' : '#3d2e1e', cursor: currentMoveIdx >= 0 ? 'pointer' : 'not-allowed', fontFamily: 'Source Sans 3, sans-serif', fontWeight: 700, transition: 'all 0.15s ease' }}
              >
                ← Prev
              </button>
              <button
                onClick={handleNext}
                disabled={currentMoveIdx >= displayLine.length - 1}
                style={{ padding: '10px 20px', background: currentMoveIdx < displayLine.length - 1 ? 'linear-gradient(135deg,#d4a853,#b8893d)' : '#1a120b', border: '1px solid #3d2e1e', borderRadius: 8, color: currentMoveIdx < displayLine.length - 1 ? '#0f0a06' : '#3d2e1e', cursor: currentMoveIdx < displayLine.length - 1 ? 'pointer' : 'not-allowed', fontFamily: 'Source Sans 3, sans-serif', fontWeight: 700, transition: 'all 0.15s ease' }}
              >
                Next →
              </button>
            </div>
          )}

          <BoardControls onFlip={() => setOrientation(o => o === 'white' ? 'black' : 'white')} showFlip orientation={orientation} compact />
        </div>

        {/* Content panel */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #3d2e1e', marginBottom: 24, overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button key={tab.id} style={tabStyle(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
              <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '1rem', lineHeight: 1.75, marginBottom: 28 }}>
                {opening.intro}
              </p>

              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 16 }}>
                Famous Players
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {opening.famousPlayers.map((p, i) => (
                  <div key={i} style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 10, padding: '12px 16px' }}>
                    <span style={{ color: '#d4a853', fontFamily: 'Source Sans 3, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</span>
                    <span style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem' }}> — {p.note}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 14 }}>
                Key Tips
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {opening.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#d4a853', flexShrink: 0, marginTop: 2 }}>◆</span>
                    <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'moves' && (
            <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
              {/* Move list */}
              <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '16px', marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '4px 12px' }}>
                  {displayLine.map((step, idx) => {
                    const moveNum = Math.floor(idx / 2) + 1;
                    const isWhite = idx % 2 === 0;
                    const isCurrent = idx === currentMoveIdx;
                    return (
                      <React.Fragment key={idx}>
                        {isWhite && (
                          <span style={{ color: '#7a6040', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', paddingTop: 3 }}>
                            {moveNum}.
                          </span>
                        )}
                        {!isWhite && idx === 0 && <span />}
                        <button
                          onClick={() => setCurrentMoveIdx(idx)}
                          style={{
                            background: isCurrent ? 'rgba(212,168,83,0.15)' : 'transparent',
                            border: `1px solid ${isCurrent ? 'rgba(212,168,83,0.35)' : 'transparent'}`,
                            borderRadius: 4,
                            padding: '3px 8px',
                            color: isCurrent ? '#d4a853' : step.keyMove ? '#f5e6c8' : '#c8a87a',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.875rem',
                            fontWeight: isCurrent || step.keyMove ? 700 : 400,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.1s ease',
                          }}
                        >
                          {step.move}
                          {step.keyMove && <span style={{ color: '#d4a853', marginLeft: 2 }}>★</span>}
                        </button>
                        {isWhite && idx + 1 < displayLine.length && idx + 1 < displayLine.length && (
                          <button
                            onClick={() => setCurrentMoveIdx(idx + 1)}
                            style={{
                              background: idx + 1 === currentMoveIdx ? 'rgba(212,168,83,0.15)' : 'transparent',
                              border: `1px solid ${idx + 1 === currentMoveIdx ? 'rgba(212,168,83,0.35)' : 'transparent'}`,
                              borderRadius: 4,
                              padding: '3px 8px',
                              color: idx + 1 === currentMoveIdx ? '#d4a853' : displayLine[idx+1]?.keyMove ? '#f5e6c8' : '#c8a87a',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '0.875rem',
                              fontWeight: idx + 1 === currentMoveIdx ? 700 : 400,
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.1s ease',
                            }}
                          >
                            {displayLine[idx+1]?.move}
                            {displayLine[idx+1]?.keyMove && <span style={{ color: '#d4a853', marginLeft: 2 }}>★</span>}
                          </button>
                        )}
                        {isWhite && idx + 1 >= displayLine.length && <span />}
                      </React.Fragment>
                    );
                  }).filter((_, i, arr) => {
                    // Only render white move fragments (they include their black counterpart inline)
                    return true;
                  })}
                </div>
              </div>

              {/* Annotation */}
              <div style={{ background: 'rgba(212,168,83,0.05)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 10, padding: '16px 18px' }}>
                <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {currentAnnotation}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'variations' && (
            <div style={{ animation: 'fadeUp 0.3s ease-out', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {opening.variations.map(variation => {
                const isActive = activeVariation === variation.id;
                return (
                  <div
                    key={variation.id}
                    style={{
                      background: isActive ? '#251a10' : '#1a120b',
                      border: `1px solid ${isActive ? '#d4a853' : '#3d2e1e'}`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveVariation(isActive ? null : variation.id);
                        setCurrentMoveIdx(isActive ? -1 : opening.mainLine.length);
                        setActiveTab('moves');
                      }}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 16,
                      }}
                    >
                      <div>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: isActive ? '#d4a853' : '#f5e6c8', marginBottom: 4 }}>
                          {variation.name}
                        </h3>
                        <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', margin: 0 }}>
                          {variation.idea}
                        </p>
                        <p style={{ color: '#8b6d35', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', marginTop: 4 }}>
                          {variation.gameType}
                        </p>
                      </div>
                      <span style={{ color: isActive ? '#d4a853' : '#7a6040', fontSize: '1rem', flexShrink: 0 }}>
                        {isActive ? '▾' : '▸'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'plans' && (
            <div style={{ animation: 'fadeUp 0.3s ease-out', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {opening.middlegamePlans.map((plan, i) => (
                <div key={i} style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '18px 20px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 10 }}>
                    {plan.title}
                  </h3>
                  <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 0 }}>
                    {plan.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div style={{ animation: 'fadeUp 0.3s ease-out', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {opening.commonMistakes.map((mistake, i) => (
                <div key={i} style={{ background: '#1a120b', border: '1px solid rgba(224,82,82,0.2)', borderRadius: 12, padding: '18px 20px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 14 }}>
                    ⚠ {mistake.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ background: 'rgba(224,82,82,0.07)', border: '1px solid rgba(224,82,82,0.2)', borderRadius: 8, padding: '12px 14px' }}>
                      <p style={{ color: '#e05252', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
                        ✗ Bad Move: {mistake.badMove}
                      </p>
                      <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                        {mistake.whyBad}
                      </p>
                    </div>
                    <div style={{ background: 'rgba(76,175,125,0.07)', border: '1px solid rgba(76,175,125,0.2)', borderRadius: 8, padding: '12px 14px' }}>
                      <p style={{ color: '#4caf7d', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
                        ✓ Better: {mistake.correctMove}
                      </p>
                      <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                        {mistake.whyCorrect}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
