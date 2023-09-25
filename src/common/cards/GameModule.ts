export const GAME_MODULES = [
  'base',
  'corpera',
  'promo',
  'venus',
  'colonies',
  'prelude',
  'prelude2',
  'turmoil',
  'community',
  'ares',
  'moon',
  'pathfinders',
  'ceo',
  'pathfindersCardsOnly',
] as const;
export type GameModule = typeof GAME_MODULES[number];
