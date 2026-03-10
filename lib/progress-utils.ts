export interface UserProgress {
  completedLessons: string[];
  completedPuzzles: string[];
  xp: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  boardTheme: string;
  openingsStudied: string[];
  puzzleStats: {
    attempted: number;
    solved: number;
    totalAttempts: number;
  };
  settings: {
    showCoordinates: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
    showHintsInPuzzles: boolean;
    autoAdvanceLessons: boolean;
    boardSize: number;
  };
}

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  completedPuzzles: [],
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  boardTheme: 'lichess',
  openingsStudied: [],
  puzzleStats: {
    attempted: 0,
    solved: 0,
    totalAttempts: 0,
  },
  settings: {
    showCoordinates: true,
    animationSpeed: 'normal',
    showHintsInPuzzles: true,
    autoAdvanceLessons: false,
    boardSize: 480,
  },
};

export interface XPLevel {
  level: number;
  xpRequired: number;
  title: string;
  nextXP: number;
}

export const XP_LEVELS: Omit<XPLevel, 'nextXP'>[] = [
  { level: 1, xpRequired: 0, title: 'Pawn' },
  { level: 2, xpRequired: 150, title: 'Squire' },
  { level: 3, xpRequired: 400, title: 'Knight' },
  { level: 4, xpRequired: 800, title: 'Bishop' },
  { level: 5, xpRequired: 1500, title: 'Rook' },
  { level: 6, xpRequired: 3000, title: 'Queen' },
  { level: 7, xpRequired: 6000, title: 'King' },
  { level: 8, xpRequired: 12000, title: 'Grandmaster' },
];

export function getLevelFromXP(xp: number): XPLevel {
  let currentLevel = XP_LEVELS[0];
  for (const level of XP_LEVELS) {
    if (xp >= level.xpRequired) {
      currentLevel = level;
    }
  }
  const idx = XP_LEVELS.findIndex(l => l.level === currentLevel.level);
  const nextLevel = XP_LEVELS[idx + 1];
  return {
    ...currentLevel,
    nextXP: nextLevel ? nextLevel.xpRequired : currentLevel.xpRequired,
  };
}

export function getXPProgress(xp: number): { current: number; total: number; percentage: number } {
  const level = getLevelFromXP(xp);
  const current = xp - level.xpRequired;
  const total = level.nextXP - level.xpRequired;
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 100;
  return { current, total, percentage };
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = progress.lastActiveDate;

  if (lastActive === today) {
    return progress; // Already active today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newStreak = lastActive === yesterdayStr ? progress.streak + 1 : 1;
  const longestStreak = Math.max(progress.longestStreak, newStreak);

  return {
    ...progress,
    streak: newStreak,
    longestStreak,
    lastActiveDate: today,
  };
}

export const XP_VALUES = {
  LESSON_STEP: 5,
  LESSON_COMPLETE: 20,
  PUZZLE_FIRST_TRY: 15,
  PUZZLE_SECOND_TRY: 10,
  PUZZLE_THIRD_PLUS: 5,
  STREAK_BONUS: 50,
  OPENING_COMPLETE: 30,
} as const;
