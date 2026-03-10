export type BoardThemeName =
  | 'lichess'
  | 'tournament'
  | 'ocean'
  | 'midnight'
  | 'walnut'
  | 'marble';

export interface BoardTheme {
  name: BoardThemeName;
  label: string;
  light: string;
  dark: string;
  selected: string;
  lastMoveLight: string;
  lastMoveDark: string;
  legalMove: string;
  check: string;
  coordinates: string;
  description: string;
}

export const BOARD_THEMES: Record<BoardThemeName, BoardTheme> = {
  lichess: {
    name: 'lichess',
    label: 'Lichess Classic',
    light: '#f0d9b5',
    dark: '#b58863',
    selected: 'rgba(20, 85, 30, 0.5)',
    lastMoveLight: 'rgba(155, 199, 0, 0.41)',
    lastMoveDark: 'rgba(155, 199, 0, 0.41)',
    legalMove: 'rgba(0, 0, 0, 0.20)',
    check: 'rgba(220, 50, 50, 0.45)',
    coordinates: '#b58863',
    description: 'The gold standard — warm and familiar',
  },
  tournament: {
    name: 'tournament',
    label: 'Tournament Green',
    light: '#ffffdd',
    dark: '#86a666',
    selected: 'rgba(20, 85, 30, 0.5)',
    lastMoveLight: 'rgba(205, 210, 106, 0.5)',
    lastMoveDark: 'rgba(170, 162, 58, 0.5)',
    legalMove: 'rgba(0, 0, 0, 0.18)',
    check: 'rgba(220, 50, 50, 0.45)',
    coordinates: '#86a666',
    description: 'Classic tournament hall feel',
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean Blue',
    light: '#dee3e6',
    dark: '#7fa8b8',
    selected: 'rgba(20, 80, 130, 0.5)',
    lastMoveLight: 'rgba(100, 150, 200, 0.5)',
    lastMoveDark: 'rgba(70, 110, 170, 0.5)',
    legalMove: 'rgba(0, 0, 0, 0.18)',
    check: 'rgba(220, 50, 50, 0.45)',
    coordinates: '#7fa8b8',
    description: 'Modern, calm, easy on eyes',
  },
  midnight: {
    name: 'midnight',
    label: 'Midnight',
    light: '#8896a5',
    dark: '#4a5568',
    selected: 'rgba(100, 140, 200, 0.5)',
    lastMoveLight: 'rgba(100, 130, 170, 0.5)',
    lastMoveDark: 'rgba(70, 100, 140, 0.5)',
    legalMove: 'rgba(255, 255, 255, 0.15)',
    check: 'rgba(220, 80, 80, 0.5)',
    coordinates: '#8896a5',
    description: 'Dark, focused, dramatic',
  },
  walnut: {
    name: 'walnut',
    label: 'Walnut Wood',
    light: '#e8cda5',
    dark: '#8b5e3c',
    selected: 'rgba(100, 60, 20, 0.5)',
    lastMoveLight: 'rgba(200, 150, 80, 0.5)',
    lastMoveDark: 'rgba(160, 100, 40, 0.5)',
    legalMove: 'rgba(0, 0, 0, 0.20)',
    check: 'rgba(220, 50, 50, 0.45)',
    coordinates: '#8b5e3c',
    description: 'Rich, warm wood grain feel',
  },
  marble: {
    name: 'marble',
    label: 'Marble',
    light: '#f5f5f5',
    dark: '#6b6b6b',
    selected: 'rgba(80, 80, 200, 0.4)',
    lastMoveLight: 'rgba(150, 150, 200, 0.4)',
    lastMoveDark: 'rgba(100, 100, 160, 0.4)',
    legalMove: 'rgba(0, 0, 0, 0.18)',
    check: 'rgba(220, 50, 50, 0.45)',
    coordinates: '#6b6b6b',
    description: 'Clean, elegant, neutral',
  },
};

export const DEFAULT_THEME: BoardThemeName = 'lichess';
