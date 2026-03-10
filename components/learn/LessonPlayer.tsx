'use client';
import React, { useState, useCallback } from 'react';
import { Lesson, LessonStep, TextStep, BoardStep, PracticeStep } from '@/data/curriculum';
import ChessBoard from '@/components/board/ChessBoard';
import QuizStepComponent from './QuizStep';
import XPFeedback from './XPFeedback';
import { useUserProgress } from '@/hooks/useUserProgress';
import { XP_VALUES } from '@/lib/progress-utils';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  themeName?: string;
}

export default function LessonPlayer({ lesson, onComplete, onBack, themeName = 'lichess' }: LessonPlayerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [practiceMessage, setPracticeMessage] = useState('');
  const [practiceExplanation, setPracticeExplanation] = useState('');
  const [showXP, setShowXP] = useState(false);
  const [xpMessage, setXpMessage] = useState('');
  const [xpAmount, setXpAmount] = useState(0);
  const [currentFen, setCurrentFen] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const { addXP, completeLesson, progress } = useUserProgress();

  const totalSteps = lesson.steps.length;
  const step = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  const awardStepXP = useCallback(() => {
    addXP(XP_VALUES.LESSON_STEP);
  }, [addXP]);

  const handleNext = useCallback(() => {
    awardStepXP();
    if (isLastStep) {
      if (!progress.completedLessons.includes(lesson.id)) {
        setXpAmount(XP_VALUES.LESSON_COMPLETE);
        setXpMessage('Lesson Complete!');
        setShowXP(true);
        completeLesson(lesson.id);
      } else {
        onComplete();
      }
    } else {
      setStepIndex(i => i + 1);
      setPracticeComplete(false);
      setPracticeMessage('');
      setPracticeExplanation('');
      setCurrentFen(null);
      setWrongAttempts(0);
    }
  }, [isLastStep, awardStepXP, completeLesson, lesson.id, onComplete, progress.completedLessons]);

  const handlePracticeMove = useCallback(
    (from: string, to: string) => {
      if (step.type !== 'practice') return;
      const practiceStep = step as PracticeStep;
      setPracticeComplete(true);
      setPracticeMessage(practiceStep.successMessage);
      setPracticeExplanation(practiceStep.explanation);
    },
    [step]
  );

  const handleWrongMove = useCallback(() => {
    setWrongAttempts(w => w + 1);
  }, []);

  const progressPercent = ((stepIndex) / totalSteps) * 100;

  return (
    <div style={{ minHeight: '100vh', background: '#0f0a06' }}>
      <XPFeedback
        visible={showXP}
        xp={xpAmount}
        message={xpMessage}
        onDone={() => { setShowXP(false); onComplete(); }}
      />

      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 50,
          background: 'rgba(15,10,6,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #3d2e1e',
          padding: '12px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#c8a87a',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontFamily: 'Source Sans 3, sans-serif',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 0',
              flexShrink: 0,
            }}
          >
            ← Back
          </button>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#c8a87a',
                }}
              >
                {lesson.title}
              </span>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#7a6040',
                }}
              >
                {stepIndex + 1} / {totalSteps}
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: 4,
                background: '#3d2e1e',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #d4a853, #f0c878)',
                  borderRadius: 2,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '32px 24px 80px',
        }}
      >
        {step.type === 'text' && (
          <TextStepView step={step as TextStep} onNext={handleNext} themeName={themeName} />
        )}
        {step.type === 'board' && (
          <BoardStepView step={step as BoardStep} onNext={handleNext} themeName={themeName} />
        )}
        {step.type === 'practice' && (
          <PracticeStepView
            step={step as PracticeStep}
            onMove={handlePracticeMove}
            onWrongMove={handleWrongMove}
            onNext={handleNext}
            practiceComplete={practiceComplete}
            practiceMessage={practiceMessage}
            practiceExplanation={practiceExplanation}
            wrongAttempts={wrongAttempts}
            themeName={themeName}
          />
        )}
        {step.type === 'quiz' && (
          <QuizStepComponent step={step as any} onComplete={handleNext} />
        )}
      </div>
    </div>
  );
}

function TextStepView({ step, onNext, themeName }: { step: TextStep; onNext: () => void; themeName: string }) {
  const paragraphs = step.content.split('\n\n');

  return (
    <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
      <h2
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
          fontWeight: 700,
          color: '#f5e6c8',
          marginBottom: 24,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
        }}
      >
        {step.title}
      </h2>

      <div style={{ marginBottom: 32 }}>
        {paragraphs.map((para, i) => {
          // Parse **bold** markdown
          const parts = para.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p
              key={i}
              style={{
                color: '#c8a87a',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: i < paragraphs.length - 1 ? 16 : 0,
              }}
            >
              {parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={j} style={{ color: '#f5e6c8', fontWeight: 700 }}>
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>

      {step.fen && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div
            style={{
              padding: 12,
              background: '#1a120b',
              borderRadius: 12,
              border: '1px solid #3d2e1e',
            }}
          >
            <ChessBoard
              fen={step.fen}
              interactive={false}
              size={340}
              showCoordinates={true}
              arrows={step.arrows}
              themeName={themeName as any}
            />
          </div>
        </div>
      )}

      <button onClick={onNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
        Continue →
      </button>
    </div>
  );
}

function BoardStepView({ step, onNext, themeName }: { step: BoardStep; onNext: () => void; themeName: string }) {
  return (
    <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div
          style={{
            padding: 12,
            background: '#1a120b',
            borderRadius: 12,
            border: '1px solid #3d2e1e',
          }}
        >
          <ChessBoard
            fen={step.fen}
            interactive={false}
            size={360}
            showCoordinates={true}
            arrows={step.arrows}
            highlightSquares={step.highlights}
            themeName={themeName as any}
          />
        </div>
      </div>

      <div
        style={{
          background: '#1a120b',
          border: '1px solid #3d2e1e',
          borderRadius: 10,
          padding: '16px 20px',
          marginBottom: 24,
        }}
      >
        <p
          style={{
            color: '#c8a87a',
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {step.caption}
        </p>
      </div>

      <button onClick={onNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
        Got it →
      </button>
    </div>
  );
}

function PracticeStepView({
  step, onMove, onWrongMove, onNext, practiceComplete,
  practiceMessage, practiceExplanation, wrongAttempts, themeName,
}: {
  step: PracticeStep;
  onMove: (from: string, to: string) => void;
  onWrongMove: () => void;
  onNext: () => void;
  practiceComplete: boolean;
  practiceMessage: string;
  practiceExplanation: string;
  wrongAttempts: number;
  themeName: string;
}) {
  return (
    <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
      <div
        style={{
          background: 'rgba(212,168,83,0.08)',
          border: '1px solid rgba(212,168,83,0.2)',
          borderRadius: 10,
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>🎯</span>
        <p
          style={{
            color: '#d4a853',
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            margin: 0,
          }}
        >
          {step.instruction}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div
          style={{
            padding: 12,
            background: '#1a120b',
            borderRadius: 12,
            border: `1px solid ${practiceComplete ? 'rgba(76,175,125,0.3)' : '#3d2e1e'}`,
            transition: 'border-color 0.3s ease',
          }}
        >
          <ChessBoard
            fen={step.fen}
            interactive={!practiceComplete}
            onMove={onMove}
            onWrongMove={onWrongMove}
            allowedMoves={step.allowedMoves}
            orientation={step.orientation || 'white'}
            size={360}
            showCoordinates={true}
            themeName={themeName as any}
          />
        </div>
      </div>

      {wrongAttempts > 0 && !practiceComplete && (
        <div
          style={{
            background: 'rgba(224,82,82,0.08)',
            border: '1px solid rgba(224,82,82,0.2)',
            borderRadius: 8,
            padding: '12px 16px',
            marginBottom: 16,
          }}
        >
          <p style={{ color: '#e05252', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', margin: 0 }}>
            Not quite — try again! {wrongAttempts >= 2 && 'Look carefully at the instruction above.'}
          </p>
        </div>
      )}

      {practiceComplete && (
        <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
          <div
            style={{
              background: 'rgba(76,175,125,0.1)',
              border: '1px solid rgba(76,175,125,0.3)',
              borderRadius: 10,
              padding: '16px 20px',
              marginBottom: 16,
            }}
          >
            <p
              style={{
                color: '#4caf7d',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              ✓ {practiceMessage}
            </p>
            <p
              style={{
                color: '#c8a87a',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {practiceExplanation}
            </p>
          </div>

          <button onClick={onNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
