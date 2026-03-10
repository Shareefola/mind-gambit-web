'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LESSONS } from '@/data/curriculum';
import LessonPlayer from '@/components/learn/LessonPlayer';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import Link from 'next/link';

export default function LessonPageClient({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const { themeName } = useBoardTheme();
  const lesson = LESSONS[lessonId];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!lesson) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>♟</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#f5e6c8', marginBottom: 12 }}>
            Lesson not found
          </h2>
          <Link href="/learn" className="btn-primary">
            Back to Learning Path
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LessonPlayer
      lesson={lesson}
      themeName={themeName}
      onComplete={() => router.push('/learn')}
      onBack={() => router.push('/learn')}
    />
  );
}
