export const EVENT_TITLE_VALUES = [
  'Field Trips',
  'Birthday Parties',
  'Private Screening',
  'Gaming Sessions',
  'Independent Film Screening',
  'Photoshoots',
  'Corporate Events',
  'Movie Premiere',
  'Partial Booking',
  'Basement Area Shoot'
] as const;

export const EVENT_SCREEN_VALUES = [
  'Maximus',
  'Screen 2',
  'Screen 3',
  'Screen 4',
  'Screen 5',
  'Screen 6',
  'Platinum 7',
  'Platinum 8'
] as const;

export const EVENT_TITLE_OPTIONS = EVENT_TITLE_VALUES.map((value) => ({
  value,
  label: value
}));

export const EVENT_SCREEN_OPTIONS = EVENT_SCREEN_VALUES.map((value) => ({
  value,
  label: value
}));

export type EventTitleValue = (typeof EVENT_TITLE_VALUES)[number];
export type EventScreenValue = (typeof EVENT_SCREEN_VALUES)[number];
