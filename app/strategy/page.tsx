'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { STRATEGY_LESSONS, STRATEGY_CATEGORIES } from '@/data/strategy';
import ChessBoard from '@/components/board/ChessBoard';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import Badge from '@/components/ui/Badge';

export default function StrategyPage() {
  const { themeName } = useBoardTheme();
  const [activeLesson, setActiveLesson] = useState(STRATEGY_LESSONS[0]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredLessons = activeCategory
    ? STRATEGY_LESSONS.filter(l => l.category === activeCategory)
    : STRATEGY_LESSONS;

  const section = activeLesson.sections[activeSectionIdx];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.02em', marginBottom: 8 }}>
          🧠 Strategic Thinking
        </h1>
        <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '1rem', maxWidth: 600 }}>
          Long-term planning, pawn structures, piece activity, and the principles that separate club players from masters.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Sidebar — lesson list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Category filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: '6px 12px', borderRadius: 6, border: `1px solid ${activeCategory === null ? '#d4a853' : '#3d2e1e'}`,
                background: activeCategory === null ? 'rgba(212,168,83,0.12)' : 'transparent',
                color: activeCategory === null ? '#d4a853' : '#7a6040',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              All Topics
            </button>
            {STRATEGY_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                style={{
                  padding: '6px 12px', borderRadius: 6, border: `1px solid ${activeCategory === cat ? '#d4a853' : '#3d2e1e'}`,
                  background: activeCategory === cat ? 'rgba(212,168,83,0.12)' : 'transparent',
                  color: activeCategory === cat ? '#d4a853' : '#7a6040',
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lesson list */}
          {filteredLessons.map(lesson => {
            const isActive = lesson.id === activeLesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => { setActiveLesson(lesson); setActiveSectionIdx(0); }}
                style={{
                  padding: '12px 14px', borderRadius: 10, textAlign: 'left',
                  border: `1px solid ${isActive ? 'rgba(212,168,83,0.4)' : '#3d2e1e'}`,
                  background: isActive ? 'rgba(212,168,83,0.08)' : '#1a120b',
                  cursor: 'pointer', transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', fontWeight: 700, color: isActive ? '#d4a853' : '#f5e6c8', marginBottom: 3 }}>
                  {lesson.title}
                </div>
                <div style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem' }}>
                  {lesson.category} · {lesson.difficulty}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div>
          {/* Lesson header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Badge label={activeLesson.category} color="gold" />
              <Badge label={activeLesson.difficulty} color={activeLesson.difficulty === 'Intermediate' ? 'gold' : 'red'} />
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#f5e6c8', letterSpacing: '-0.01em', marginBottom: 6 }}>
              {activeLesson.title}
            </h2>
            <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 14 }}>
              {activeLesson.subtitle}
            </p>

            {/* Core concept */}
            <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 10, padding: '14px 18px' }}>
              <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
                {activeLesson.concept}
              </p>
            </div>
          </div>

          {/* Section navigation tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
            {activeLesson.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSectionIdx(i)}
                style={{
                  padding: '8px 14px', borderRadius: 8, border: `1px solid ${i === activeSectionIdx ? '#d4a853' : '#3d2e1e'}`,
                  background: i === activeSectionIdx ? 'rgba(212,168,83,0.12)' : 'transparent',
                  color: i === activeSectionIdx ? '#d4a853' : '#7a6040',
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                }}
              >
                {i + 1}. {s.title}
              </button>
            ))}
            {activeLesson.masterExample && (
              <button
                onClick={() => setActiveSectionIdx(activeLesson.sections.length)}
                style={{
                  padding: '8px 14px', borderRadius: 8,
                  border: `1px solid ${activeSectionIdx === activeLesson.sections.length ? '#d4a853' : '#3d2e1e'}`,
                  background: activeSectionIdx === activeLesson.sections.length ? 'rgba(212,168,83,0.12)' : 'transparent',
                  color: activeSectionIdx === activeLesson.sections.length ? '#d4a853' : '#7a6040',
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                }}
              >
                ★ Master Example
              </button>
            )}
          </div>

          {/* Section content */}
          {activeSectionIdx < activeLesson.sections.length ? (
            <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: '#f5e6c8', marginBottom: 14 }}>
                    {section.title}
                  </h3>
                  <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 0 }}>
                    {section.content}
                  </p>
                </div>
                <div style={{ padding: 10, background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, flexShrink: 0 }}>
                  <ChessBoard
                    fen={section.fen}
                    interactive={false}
                    size={260}
                    showCoordinates
                    themeName={themeName}
                    arrows={section.arrows}
                    highlightSquares={section.highlights}
                  />
                </div>
              </div>
            </div>
          ) : activeLesson.masterExample ? (
            <div style={{ animation: 'fadeUp 0.3s ease-out' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ color: '#d4a853', fontSize: '1.1rem' }}>★</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: '#f5e6c8' }}>
                  {activeLesson.masterExample.title}
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
                <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem', lineHeight: 1.8 }}>
                  {activeLesson.masterExample.description}
                </p>
                <div style={{ padding: 10, background: '#1a120b', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 12 }}>
                  <ChessBoard
                    fen={activeLesson.masterExample.fen}
                    interactive={false}
                    size={260}
                    showCoordinates
                    themeName={themeName}
                    arrows={activeLesson.masterExample.arrows}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              onClick={() => setActiveSectionIdx(i => Math.max(0, i - 1))}
              disabled={activeSectionIdx === 0}
              className="btn-ghost"
              style={{ opacity: activeSectionIdx === 0 ? 0.3 : 1 }}
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                const maxIdx = activeLesson.sections.length - 1 + (activeLesson.masterExample ? 1 : 0);
                setActiveSectionIdx(i => Math.min(maxIdx, i + 1));
              }}
              disabled={activeSectionIdx >= activeLesson.sections.length - 1 + (activeLesson.masterExample ? 1 : 0)}
              className="btn-primary"
              style={{ opacity: activeSectionIdx >= activeLesson.sections.length - 1 + (activeLesson.masterExample ? 1 : 0) ? 0.5 : 1 }}
            >
              Next →
            </button>
          </div>

          {/* Key principles */}
          <div style={{ marginTop: 32, background: '#1a120b', border: '1px solid #3d2e1e', borderRadius: 12, padding: '18px 20px' }}>
            <h4 style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#7a6040', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
              Key Principles
            </h4>
            {activeLesson.keyPrinciples.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#d4a853', flexShrink: 0 }}>◆</span>
                <p style={{ color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
