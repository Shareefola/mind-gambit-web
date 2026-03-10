'use client';
import React, { useEffect, useState } from 'react';

type FeedbackState = 'solved' | 'wrong' | 'revealed' | 'correct' | 'ready' | 'piece_selected';

interface PuzzleFeedbackProps {
  state: FeedbackState;
  attempts: number;
  explanation?: string;
  xpEarned?: number;
  onNext: () => void;
  onRetry: () => void;
  onReveal: () => void;
  showHintsEnabled?: boolean;
  onHint: () => void;
  hintUsed?: boolean;
}

const CORRECT_MESSAGES = ['Excellent!', 'Brilliant!', 'Well spotted!', 'Good find!', 'Sharp!', 'Nice move!'];

export default function PuzzleFeedback({
  state, attempts, explanation, xpEarned,
  onNext, onRetry, onReveal, showHintsEnabled = true, onHint, hintUsed,
}: PuzzleFeedbackProps) {
  const [celebMsg] = useState(() => CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (state === 'solved' || state === 'revealed') {
      setTimeout(() => setVisible(true), 100);
    } else {
      setVisible(false);
    }
  }, [state]);

  // Status bar colors
  const statusColors: Record<FeedbackState, { bg: string; border: string; text: string }> = {
    solved:        { bg: 'rgba(76,175,125,0.1)',  border: 'rgba(76,175,125,0.3)',  text: '#4caf7d' },
    wrong:         { bg: 'rgba(224,82,82,0.1)',   border: 'rgba(224,82,82,0.3)',   text: '#e05252' },
    revealed:      { bg: 'rgba(91,155,213,0.1)',  border: 'rgba(91,155,213,0.3)',  text: '#5b9bd5' },
    correct:       { bg: 'rgba(76,175,125,0.08)', border: 'rgba(76,175,125,0.2)', text: '#4caf7d' },
    ready:         { bg: 'rgba(212,168,83,0.06)', border: 'rgba(212,168,83,0.12)', text: '#d4a853' },
    piece_selected:{ bg: 'rgba(212,168,83,0.06)', border: 'rgba(212,168,83,0.12)', text: '#d4a853' },
  };

  const col = statusColors[state];

  const statusMsg =
    state === 'solved'  ? `Solved in ${attempts} attempt${attempts !== 1 ? 's' : ''}! ✓` :
    state === 'wrong'   ? 'Not quite — try again' :
    state === 'revealed'? 'Solution revealed' :
    state === 'correct' ? 'Correct! Opponent responding…' :
    'Find the best move';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Status bar */}
      <div style={{
        padding: '10px 14px', background: col.bg,
        border: `1px solid ${col.border}`, borderRadius: 8, textAlign: 'center',
        transition: 'all 0.3s ease',
      }}>
        <p style={{ color: col.text, fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
          {statusMsg}
        </p>
      </div>

      {/* Action buttons row */}
      {(state === 'ready' || state === 'piece_selected' || state === 'wrong') && (
        <div style={{ display: 'flex', gap: 8 }}>
          {showHintsEnabled && (
            <button
              onClick={onHint}
              disabled={hintUsed}
              style={{
                flex: 1, padding: '8px', borderRadius: 8,
                border: '1px solid rgba(91,155,213,0.3)',
                background: 'rgba(91,155,213,0.06)',
                color: hintUsed ? '#7a6040' : '#5b9bd5',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                cursor: hintUsed ? 'default' : 'pointer', opacity: hintUsed ? 0.5 : 1,
              }}
            >
              💡 {hintUsed ? 'Hint used' : 'Hint (−5 XP)'}
            </button>
          )}
          {attempts >= 3 && (
            <button
              onClick={onReveal}
              style={{
                flex: 1, padding: '8px', borderRadius: 8,
                border: '1px solid rgba(91,155,213,0.3)',
                background: 'rgba(91,155,213,0.06)',
                color: '#5b9bd5',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              👁 Show Solution
            </button>
          )}
        </div>
      )}

      {/* Post-solve panel */}
      {visible && (state === 'solved' || state === 'revealed') && (
        <div style={{
          background: state === 'solved' ? 'rgba(76,175,125,0.06)' : 'rgba(91,155,213,0.06)',
          border: `1px solid ${state === 'solved' ? 'rgba(76,175,125,0.2)' : 'rgba(91,155,213,0.2)'}`,
          borderRadius: 10, padding: '14px 16px',
          animation: 'fadeUp 0.3s ease forwards',
        }}>
          {state === 'solved' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#4caf7d' }}>
                {celebMsg}
              </span>
              {xpEarned !== undefined && (
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700, color: '#d4a853' }}>
                  +{xpEarned} XP
                </span>
              )}
            </div>
          )}
          {explanation && (
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', color: '#c8a87a', lineHeight: 1.7, margin: '0 0 12px' }}>
              {explanation}
            </p>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onNext} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
              Next Puzzle →
            </button>
            <button onClick={onRetry} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
              ↺ Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
