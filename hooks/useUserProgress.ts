'use client';
import { useState, useEffect, useCallback } from 'react';
import { UserProgress, DEFAULT_PROGRESS, updateStreak, XP_VALUES } from '@/lib/progress-utils';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = getItem<UserProgress>(STORAGE_KEYS.USER_PROGRESS, DEFAULT_PROGRESS);
    setProgress(stored);
    setLoaded(true);
  }, []);

  const save = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    setItem(STORAGE_KEYS.USER_PROGRESS, newProgress);
  }, []);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => {
      const updated = updateStreak({ ...prev, xp: prev.xp + amount });
      setItem(STORAGE_KEYS.USER_PROGRESS, updated);
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const updated = updateStreak({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + XP_VALUES.LESSON_COMPLETE,
      });
      setItem(STORAGE_KEYS.USER_PROGRESS, updated);
      return updated;
    });
  }, []);

  const solvePuzzle = useCallback((puzzleId: string, attempts: number) => {
    setProgress(prev => {
      const xpEarned =
        attempts === 1 ? XP_VALUES.PUZZLE_FIRST_TRY :
        attempts === 2 ? XP_VALUES.PUZZLE_SECOND_TRY :
        XP_VALUES.PUZZLE_THIRD_PLUS;

      const alreadySolved = prev.completedPuzzles.includes(puzzleId);
      const updated = updateStreak({
        ...prev,
        completedPuzzles: alreadySolved ? prev.completedPuzzles : [...prev.completedPuzzles, puzzleId],
        xp: prev.xp + (alreadySolved ? 0 : xpEarned),
        puzzleStats: {
          attempted: prev.puzzleStats.attempted + 1,
          solved: prev.puzzleStats.solved + (alreadySolved ? 0 : 1),
          totalAttempts: prev.puzzleStats.totalAttempts + attempts,
        },
      });
      setItem(STORAGE_KEYS.USER_PROGRESS, updated);
      return updated;
    });
  }, []);

  const studyOpening = useCallback((openingId: string) => {
    setProgress(prev => {
      if (prev.openingsStudied.includes(openingId)) return prev;
      const updated = updateStreak({
        ...prev,
        openingsStudied: [...prev.openingsStudied, openingId],
        xp: prev.xp + XP_VALUES.OPENING_COMPLETE,
      });
      setItem(STORAGE_KEYS.USER_PROGRESS, updated);
      return updated;
    });
  }, []);

  const updateSettings = useCallback((settings: Partial<UserProgress['settings']>) => {
    setProgress(prev => {
      const updated = { ...prev, settings: { ...prev.settings, ...settings } };
      setItem(STORAGE_KEYS.USER_PROGRESS, updated);
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    save(DEFAULT_PROGRESS);
  }, [save]);

  return {
    progress,
    loaded,
    addXP,
    completeLesson,
    solvePuzzle,
    studyOpening,
    updateSettings,
    resetProgress,
  };
}
