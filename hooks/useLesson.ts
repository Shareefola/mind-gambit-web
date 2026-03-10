'use client';
import { useState, useCallback } from 'react';
import { Lesson, LessonStep } from '@/data/curriculum';

export interface UseLessonOptions {
  lesson: Lesson;
  onComplete?: () => void;
}

export function useLesson({ lesson, onComplete }: UseLessonOptions) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = lesson.steps.length;
  const currentStep: LessonStep = lesson.steps[currentStepIdx];
  const progress = totalSteps > 0 ? Math.round(((currentStepIdx) / totalSteps) * 100) : 0;

  const nextStep = useCallback(() => {
    setCompletedSteps(prev => { const next = new Set(prev); next.add(currentStepIdx); return next; });
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(i => i + 1);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentStepIdx, totalSteps, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(i => i - 1);
    }
  }, [currentStepIdx]);

  const goToStep = useCallback((idx: number) => {
    if (idx >= 0 && idx < totalSteps) {
      setCurrentStepIdx(idx);
    }
  }, [totalSteps]);

  const isStepCompleted = useCallback((idx: number) => completedSteps.has(idx), [completedSteps]);

  return {
    currentStep,
    currentStepIdx,
    totalSteps,
    progress,
    isComplete,
    nextStep,
    prevStep,
    goToStep,
    isStepCompleted,
    isLastStep: currentStepIdx === totalSteps - 1,
    isFirstStep: currentStepIdx === 0,
  };
}
