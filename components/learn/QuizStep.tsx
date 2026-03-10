'use client';
import React, { useState } from 'react';
import { QuizStep as QuizStepData } from '@/data/curriculum';
import ChessBoard from '@/components/board/ChessBoard';

interface QuizStepProps {
  step: QuizStepData;
  onComplete: () => void;
}

export default function QuizStep({ step, onComplete }: QuizStepProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  };

  return (
    <div>
      {step.fen && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <ChessBoard fen={step.fen} interactive={false} size={280} showCoordinates={false} />
        </div>
      )}

      <h3
        style={{
          fontFamily: 'Source Sans 3, sans-serif',
          fontSize: '1.05rem',
          fontWeight: 700,
          color: '#f5e6c8',
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        {step.question}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {step.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = opt.correct;
          let bg = '#2e2015';
          let border = '#3d2e1e';
          let color = '#c8a87a';

          if (answered && isSelected) {
            if (isCorrect) {
              bg = 'rgba(76,175,125,0.15)';
              border = 'rgba(76,175,125,0.4)';
              color = '#4caf7d';
            } else {
              bg = 'rgba(224,82,82,0.15)';
              border = 'rgba(224,82,82,0.4)';
              color = '#e05252';
            }
          } else if (answered && isCorrect) {
            bg = 'rgba(76,175,125,0.08)';
            border = 'rgba(76,175,125,0.3)';
            color = '#4caf7d';
          }

          return (
            <div key={idx}>
              <button
                onClick={() => handleSelect(idx)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 10,
                  color,
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: answered ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
                onMouseEnter={e => {
                  if (!answered) {
                    (e.currentTarget as HTMLElement).style.background = '#3d2e1e';
                    (e.currentTarget as HTMLElement).style.borderColor = '#8b6d35';
                  }
                }}
                onMouseLeave={e => {
                  if (!answered) {
                    (e.currentTarget as HTMLElement).style.background = '#2e2015';
                    (e.currentTarget as HTMLElement).style.borderColor = '#3d2e1e';
                  }
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    border: `1px solid ${answered && isSelected ? 'currentColor' : '#3d2e1e'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    color: answered && isSelected ? 'inherit' : '#7a6040',
                  }}
                >
                  {answered && isSelected
                    ? isCorrect ? '✓' : '✗'
                    : String.fromCharCode(65 + idx)}
                </span>
                {opt.text}
              </button>

              {answered && isSelected && (
                <div
                  style={{
                    marginTop: 8,
                    padding: '12px 16px',
                    background: isCorrect ? 'rgba(76,175,125,0.08)' : 'rgba(224,82,82,0.08)',
                    border: `1px solid ${isCorrect ? 'rgba(76,175,125,0.2)' : 'rgba(224,82,82,0.2)'}`,
                    borderRadius: 8,
                    color: '#c8a87a',
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                  }}
                >
                  {opt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 24 }}>
          <button
            onClick={onComplete}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
