'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UNITS, LESSONS } from '@/data/curriculum';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getLevelFromXP } from '@/lib/progress-utils';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';

export default function LearnPage() {
  const { progress, loaded } = useUserProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isUnitUnlocked = (unitId: string) => {
    const unit = UNITS.find(u => u.id === unitId);
    if (!unit) return false;
    if (unit.prerequisiteUnitIds.length === 0) return true;
    return unit.prerequisiteUnitIds.every(prereqId => {
      const prereqUnit = UNITS.find(u => u.id === prereqId);
      if (!prereqUnit) return false;
      return prereqUnit.lessonIds.every(lid => progress.completedLessons.includes(lid));
    });
  };

  const getUnitProgress = (unitId: string) => {
    const unit = UNITS.find(u => u.id === unitId);
    if (!unit) return { completed: 0, total: 0 };
    const total = unit.lessonIds.length;
    const completed = unit.lessonIds.filter(lid => progress.completedLessons.includes(lid)).length;
    return { completed, total };
  };

  const levelInfo = mounted ? getLevelFromXP(progress.xp) : { level: 1, title: 'Pawn', xpRequired: 0, nextXP: 150 };
  const xpToNext = levelInfo.nextXP - levelInfo.xpRequired;
  const xpInLevel = progress.xp - levelInfo.xpRequired;

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a120b 0%, #0f0a06 100%)',
          borderBottom: '1px solid #3d2e1e',
          padding: '48px 24px 40px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#f5e6c8',
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            Your Learning Path
          </h1>
          <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '1rem', marginBottom: 28 }}>
            Five units. Fifteen lessons. One clear path to chess mastery.
          </p>

          {mounted && (
            <div
              style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  background: '#2e2015',
                  border: '1px solid #3d2e1e',
                  borderRadius: 12,
                  padding: '16px 20px',
                  minWidth: 200,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
                    Level {levelInfo.level} — {levelInfo.title}
                  </span>
                  <span style={{ color: '#d4a853', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                    {progress.xp} XP
                  </span>
                </div>
                <ProgressBar value={xpInLevel} max={xpToNext} color="#d4a853" height={5} />
                <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', marginTop: 6 }}>
                  {xpToNext - xpInLevel} XP to next level
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#d4a853' }}>
                    {progress.streak}
                  </div>
                  <div style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem' }}>Day Streak</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#d4a853' }}>
                    {progress.completedLessons.length}
                  </div>
                  <div style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem' }}>Lessons Done</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Units */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {UNITS.map((unit, unitIdx) => {
            const unlocked = isUnitUnlocked(unit.id);
            const { completed, total } = getUnitProgress(unit.id);
            const unitComplete = total > 0 && completed === total;
            const pct = total > 0 ? (completed / total) * 100 : 0;

            return (
              <div
                key={unit.id}
                style={{
                  background: '#1a120b',
                  border: `1px solid ${unlocked ? '#3d2e1e' : '#251a10'}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  opacity: unlocked ? 1 : 0.55,
                  animation: `fadeUp 0.4s ease-out ${unitIdx * 80}ms both`,
                }}
              >
                {/* Unit header */}
                <div
                  style={{
                    padding: '20px 24px',
                    borderBottom: unlocked ? '1px solid #3d2e1e' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: unlocked ? 'rgba(212,168,83,0.12)' : 'rgba(122,96,64,0.1)',
                        border: `1px solid ${unlocked ? 'rgba(212,168,83,0.2)' : '#3d2e1e'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        flexShrink: 0,
                      }}
                    >
                      {unlocked ? unit.icon : '🔒'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                        <h2
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: unlocked ? '#f5e6c8' : '#7a6040',
                          }}
                        >
                          {unit.title}
                        </h2>
                        <Badge
                          label={unit.difficulty}
                          color={unit.difficulty === 'Beginner' ? 'green' : unit.difficulty === 'Intermediate' ? 'gold' : 'red'}
                        />
                        {unitComplete && <Badge label="Complete" color="green" dot />}
                      </div>
                      <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem' }}>
                        {unit.subtitle}
                      </p>
                    </div>
                  </div>

                  {total > 0 && (
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ color: '#c8a87a', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                        {completed}/{total}
                      </span>
                      <div style={{ marginTop: 6, width: 80 }}>
                        <ProgressBar value={pct} max={100} color={unitComplete ? '#4caf7d' : '#d4a853'} height={4} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Lessons */}
                {unlocked && unit.lessonIds.length > 0 && (
                  <div style={{ padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {unit.lessonIds.map((lessonId, lessonIdx) => {
                      const lesson = LESSONS[lessonId];
                      if (!lesson) return null;
                      const done = progress.completedLessons.includes(lessonId);
                      const isFirst = lessonIdx === 0;
                      const prevDone = lessonIdx === 0 || progress.completedLessons.includes(unit.lessonIds[lessonIdx - 1]);
                      const lessonUnlocked = isFirst || prevDone;

                      return (
                        <Link
                          key={lessonId}
                          href={`/learn/${lessonId}`}
                          style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '14px 16px',
                            borderRadius: 10,
                            background: done ? 'rgba(76,175,125,0.06)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${done ? 'rgba(76,175,125,0.18)' : '#3d2e1e'}`,
                            opacity: lessonUnlocked ? 1 : 0.5,
                            pointerEvents: lessonUnlocked ? 'auto' : 'none',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            if (lessonUnlocked) {
                              (e.currentTarget as HTMLElement).style.background = done ? 'rgba(76,175,125,0.1)' : '#251a10';
                              (e.currentTarget as HTMLElement).style.borderColor = done ? 'rgba(76,175,125,0.3)' : '#8b6d35';
                            }
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = done ? 'rgba(76,175,125,0.06)' : 'rgba(255,255,255,0.02)';
                            (e.currentTarget as HTMLElement).style.borderColor = done ? 'rgba(76,175,125,0.18)' : '#3d2e1e';
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: done ? 'rgba(76,175,125,0.2)' : 'rgba(212,168,83,0.1)',
                              border: `1.5px solid ${done ? 'rgba(76,175,125,0.4)' : 'rgba(212,168,83,0.2)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: done ? '1rem' : '0.75rem',
                              color: done ? '#4caf7d' : '#d4a853',
                              fontFamily: 'JetBrains Mono, monospace',
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {done ? '✓' : lessonIdx + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontFamily: 'Source Sans 3, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: done ? '#4caf7d' : '#f5e6c8',
                                marginBottom: 2,
                              }}
                            >
                              {lesson.title}
                            </div>
                            <div style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem' }}>
                              {lesson.steps.length} steps · +{lesson.xp + lesson.steps.length * 5} XP
                            </div>
                          </div>
                          <span style={{ color: done ? '#4caf7d' : '#c8a87a', fontSize: '1rem' }}>
                            {done ? '✓' : '→'}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {unlocked && unit.lessonIds.length === 0 && (
                  <div style={{ padding: '16px 24px 20px' }}>
                    <p
                      style={{
                        color: '#7a6040',
                        fontFamily: 'Source Sans 3, sans-serif',
                        fontSize: '0.875rem',
                        fontStyle: 'italic',
                      }}
                    >
                      More lessons coming soon...
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
