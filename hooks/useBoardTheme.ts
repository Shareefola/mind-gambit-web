'use client';
import { useState, useEffect, useCallback } from 'react';
import { BoardThemeName, DEFAULT_THEME } from '@/components/board/themes';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

export function useBoardTheme() {
  const [themeName, setThemeNameState] = useState<BoardThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const stored = getItem<BoardThemeName>(STORAGE_KEYS.BOARD_THEME, DEFAULT_THEME);
    setThemeNameState(stored);
  }, []);

  const setThemeName = useCallback((name: BoardThemeName) => {
    setThemeNameState(name);
    setItem(STORAGE_KEYS.BOARD_THEME, name);
  }, []);

  // Alias for backwards compat
  const setTheme = setThemeName;

  return { themeName, setThemeName, setTheme };
}
