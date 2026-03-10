'use client';
import React, { useState, useCallback, useRef } from 'react';
import { ENDGAMES, ENDGAME_CATEGORIES, EndgamePosition } from '@/data/endgames';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import ChessBoard from '@/components/board/ChessBoard';
import Badge from '@/components/ui/Badge';
import { Chess } from 'chess.js';

type StudyState = 'reading' | 'practice' | 'solved' | 'revealed';

function EndgameStudy({ endgame }: { endgame: EndgamePosition }) {
  const { themeName } = useBoardTheme();
  const [studyState, setStudyState] = useState<StudyState>('reading');
  const [fen, setFen] = useState(endgame.fen);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [solutionStep, setSolutionStep] = useState(0);
  const [wrongMove, setWrongMove] = useState(false);
  const gameRef = useRef(new Chess(endgame.fen));

  const resetPractice = useCallback(() => {
    gameRef.current = new Chess(endgame.fen);
    setFen(endgame.fen);
    setLastMove(null);
    setSolutionStep(0);
    setWrongMove(false);
    setStudyState('practice');
  }, [endgame.fen]);

  const handleMove = useCallback((from: string, to: string, promotion?: string) => {
    if (studyState !== 'practice') return false;
    if (endgame.solution.length === 0) { setStudyState('solved'); return true; }

    const expected = endgame.solution[solutionStep];
    const attempt = from + to + (promotion || '');
    const isCorrect = attempt === expected || from + to === expected;

    if (isCorrect) {
      try {
        gameRef.current.move({ from, to, promotion: promotion || 'q' });
        setFen(gameRef.current.fen());
        setLastMove({ from, to });
        const next = solutionStep + 1;
        if (next >= endgame.solution.length) {
          setStudyState('solved');
        } else {
          setSolutionStep(next);
          // Auto-play opponent response
          setTimeout(() => {
            const opp = endgame.solution[next];
            try {
              gameRef.current.move({ from: opp.slice(0, 2), to: opp.slice(2, 4), promotion: opp[4] || 'q' });
              setFen(gameRef.current.fen());
              setLastMove({ from: opp.slice(0, 2), to: opp.slice(2, 4) });
              setSolutionStep(next + 1);
            } catch {}
          }, 700);
        }
        return true;
      } catch { return false; }
    } else {
      setWrongMove(true);
      setTimeout(() => setWrongMove(false), 700);
      return false;
    }
  }, [endgame.solution, solutionStep, studyState]);

  const revealSolution = useCallback(() => {
    setStudyState('revealed');
    let delay = 0;
    gameRef.current = new Chess(endgame.fen);
    setFen(endgame.fen);
    endgame.solution.forEach((uci, i) => {
      delay += 900;
      setTimeout(() => {
        try {
          gameRef.current.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] || 'q' });
          setFen(gameRef.current.fen());
          setLastMove({ from: uci.slice(0, 2), to: uci.slice(2, 4) });
        } catch {}
      }, delay);
    });
  }, [endgame]);

  const diffColor = endgame.difficulty === 'Beginner' ? 'green' : endgame.difficulty === 'Intermediate' ? 'gold' : 'red';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'start' }}>
      {/* Board */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          padding: 12, background: '#1a120b', borderRadius: 14,
          border: `1px solid ${studyState === 'solved' ? 'rgba(76,175,125,0.4)' : wrongMove ? 'rgba(224,82,82,0.4)' : '#3d2e1e'}`,
          transition: 'border-color 0.3s ease',
        }}>
          <ChessBoard
            fen={fen}
            interactive={studyState === 'practice'}
            onMove={handleMove}
            lastMove={lastMove}
            size={420}
            orientation={endgame.sideToMove === 'Black' ? 'black' : 'white'}
            showCoordinates
            themeName={themeName}
            arrows={studyState === 'reading' ? endgame.arrows : undefined}
            highlightSquares={studyState === 'reading' ? endgame.highlights : undefined}
          />
        </div>

        {/* Status */}
        <div style={{
          padding: '10px 14px', borderRadius: 8, textAlign: 'center',
          background: studyState === 'solved' ? 'rgba(76,175,125,0.1)' : studyState === 'revealed' ? 'rgba(91,155,213,0.1)' : wrongMove ? 'rgba(224,82,82,0.1)' : 'rgba(212,168,83,0.06)',
          border: `1px solid ${studyState === 'solved' ? 'rgba(76,175,125,0.3)' : studyState === 'revealed' ? 'rgba(91,155,213,0.3)' : wrongMove ? 'rgba(224,82,82,0.3)' : 'rgba(212,168,83,0.12)'}`,
        }}>
          <p style={{
            margin: 0, fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700,
            color: studyState === 'solved' ? '#4caf7d' : studyState === 'revealed' ? '#5b9bd5' : wrongMove ? '#e05252' : '#d4a853',
          }}>
            {studyState === 'reading' ? `${endgame.sideToMove} to move` :
             studyState === 'practice' ? (wrongMove ? 'Not quite — try again' : `${endgame.sideToMove} to move`) :
             studyState === 'solved' ? '✓ Correct! Well done' :
             'Solution revealed'}
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {studyState === 'reading' && (
            <button onClick={resetPractice} className="btn-primary" style={{ justifyContent: 'center' }}>
              Try it Yourself →
            </button>
          )}
          {(studyState === 'practice' || studyState === 'solved' || studyState === 'revealed') && (
            <button onClick={resetPractice} className="btn-ghost" style={{ justifyContent: 'center' }}>
              ↺ Try Again
            </button>
          )}
          {studyState === 'practice' && endgame.solution.length > 0 && (
            <button onClick={revealSolution} className="btn-ghost" style={{ justifyContent: 'center' }}>
              Show Solution
            </button>
          )}
          {studyState !== 'reading' && (
            <button onClick={() => { setStudyState('reading'); setFen(endgame.fen); gameRef.current = new Chess(endgame.fen); setLastMove(null); setSolutionStep(0); }} className="btn-ghost" style={{ justifyContent: 'center' }}>
              ← Back to Study
            </button>
          )}
        </div>
      </div>

      {/* Side panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Info */}
        <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <Badge label={endgame.category} color="blue" />
            <Badge label={endgame.difficulty} color={diffColor} />
            <Badge label={`${endgame.sideToMove} to move`} color="muted" />
          </div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 6 }}>
            {endgame.title}
          </h3>
          <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            {endgame.objective}
          </p>
        </div>

        {/* Key idea */}
        <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 10, padding: '14px 18px' }}>
          <h4 style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
            Concept: {endgame.concept}
          </h4>
          <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            {endgame.keyIdea}
          </p>
        </div>

        {/* Explanation (after solve/reveal) */}
        {(studyState === 'solved' || studyState === 'revealed') && (
          <div style={{ background: 'rgba(76,175,125,0.06)', border: '1px solid rgba(76,175,125,0.2)', borderRadius: 10, padding: '14px 18px', animation: 'fadeUp 0.4s ease-out' }}>
            <h4 style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#4caf7d', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              Explanation
            </h4>
            <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
              {endgame.explanation}
            </p>
          </div>
        )}

        {/* Tips */}
        <div style={{ background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 10, padding: '14px 18px' }}>
          <h4 style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
            Tips
          </h4>
          {endgame.tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
              <span style={{ color: '#d4a853', flexShrink: 0, marginTop: 1 }}>◆</span>
              <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.84rem', lineHeight: 1.55, margin: 0 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EndgamesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeEndgame, setActiveEndgame] = useState(ENDGAMES[0]);

  const filtered = activeCategory ? ENDGAMES.filter(e => e.category === activeCategory) : ENDGAMES;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 8 }}>
          ♔ Essential Endgames
        </h1>
        <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '1rem', maxWidth: 580 }}>
          Mastering endgames is the fastest way to improve. These positions decide games at every level — study them until they&apos;re automatic.
        </p>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '7px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'Source Sans 3, sans-serif',
            border: `1px solid ${activeCategory === null ? '#d4a853' : '#3d2e1e'}`,
            background: activeCategory === null ? 'rgba(212,168,83,0.12)' : 'transparent',
            color: activeCategory === null ? '#d4a853' : '#7a6040',
          }}
        >
          All
        </button>
        {ENDGAME_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            style={{
              padding: '7px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Source Sans 3, sans-serif',
              border: `1px solid ${activeCategory === cat ? '#d4a853' : '#3d2e1e'}`,
              background: activeCategory === cat ? 'rgba(212,168,83,0.12)' : 'transparent',
              color: activeCategory === cat ? '#d4a853' : '#7a6040',
              whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Endgame selector row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {filtered.map((eg, i) => {
          const isActive = eg.id === activeEndgame.id;
          return (
            <button
              key={eg.id}
              onClick={() => setActiveEndgame(eg)}
              style={{
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${isActive ? '#d4a853' : '#3d2e1e'}`,
                background: isActive ? 'rgba(212,168,83,0.12)' : '#1a120b',
                color: isActive ? '#d4a853' : '#c8a87a',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                transition: 'all 0.15s ease',
              }}
              title={eg.objective}
            >
              {i + 1}. {eg.concept}
            </button>
          );
        })}
      </div>

      {/* Study area */}
      <EndgameStudy key={activeEndgame.id} endgame={activeEndgame} />
    </div>
  );
}
