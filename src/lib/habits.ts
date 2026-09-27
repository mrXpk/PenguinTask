import AsyncStorage from '@react-native-async-storage/async-storage';

export type HabitFrequency = 'daily' | 'weekdays' | 'custom';

export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
  completedDates: string[];
  frequency?: HabitFrequency;
  customDays?: number[];
  note?: string;
};

export const STORAGE_KEY = 'habit-tracker-v1';
export const DEFAULT_FREQUENCY: HabitFrequency = 'daily';
export const FREQUENCY_OPTIONS: HabitFrequency[] = ['daily', 'weekdays', 'custom'];
export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type HabitTemplate = {
  id: string;
  name: string;
  icon: string;
  color: string;
  note: string;
  frequency: HabitFrequency;
};

export const HABIT_TEMPLATES: HabitTemplate[] = [
  { id: 'water', name: 'Drink water', icon: '💧', color: '#4CC9F0', note: 'A quick reset for the day.', frequency: 'daily' },
  { id: 'read', name: 'Read 20 minutes', icon: '📚', color: '#FFB703', note: 'Small progress compounds.', frequency: 'daily' },
  { id: 'stretch', name: 'Stretch', icon: '🧘', color: '#8AC926', note: 'Loosen up and reset the body.', frequency: 'weekdays' },
  { id: 'walk', name: 'Walk outside', icon: '🚶', color: '#F77F00', note: 'Fresh air and steady momentum.', frequency: 'daily' },
  { id: 'meditate', name: 'Meditate', icon: '🧠', color: '#C77DFF', note: 'A calm reset before the next task.', frequency: 'daily' },
  { id: 'journal', name: 'Journal', icon: '✍️', color: '#00C2A8', note: 'Capture a few honest thoughts.', frequency: 'daily' },
];

export const ICON_OPTIONS = [
  '✨',
  '🌞',
  '💧',
  '📚',
  '🧘',
  '🏃',
  '💪',
  '🌱',
  '🎨',
  '🎵',
  '📖',
  '🧠',
  '🧼',
  '🍎',
  '🚴',
  '😴',
  '🎯',
  '❤️',
  '🚀',
  '🌈',
  '🔥',
  '🥗',
  '🧴',
  '🧺',
  '☕',
  '📓',
  '🧾',
  '🧵',
  '🎧',
  '🧢',
  '😌',
  '💎',
  '🫧',
  '🌊',
  '🧘‍♀️',
  '🌿',
  '🪴',
  '🧖',
  '🚿',
  '🏋️',
];

export const COLOR_OPTIONS = [
  '#FF6B6B',
  '#FFB703',
  '#7BDFF2',
  '#4CC9F0',
  '#8AC926',
  '#00C2A8',
  '#C77DFF',
  '#F77F00',
  '#7F5AF0',
  '#06D6A0',
  '#FFD166',
  '#FF9F1C',
  '#F72585',
  '#3A86FF',
  '#B5179E',
  '#90BE6D',
];

export function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function offsetDate(daysAgo: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return getDateKey(date);
}

export function getCurrentStreak(completedDates: string[]) {
  const uniqueDates = Array.from(new Set(completedDates)).sort();
  if (uniqueDates.length === 0) return 0;

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (true) {
    const key = getDateKey(cursor);
    if (!uniqueDates.includes(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getLongestStreak(completedDates: string[]) {
  const uniqueDates = Array.from(new Set(completedDates)).sort();
  if (uniqueDates.length === 0) return 0;

  let longest = 1;
  let running = 1;

  for (let index = 1; index < uniqueDates.length; index += 1) {
    const previous = new Date(`${uniqueDates[index - 1]}T12:00:00`);
    const current = new Date(`${uniqueDates[index]}T12:00:00`);
    const difference = Math.round((current.getTime() - previous.getTime()) / 86400000);

    if (difference === 1) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 1;
    }
  }

  return longest;
}

export function normalizeHabit(habit: Partial<Habit>): Habit {
  const frequency = habit.frequency ?? DEFAULT_FREQUENCY;

  return {
    id: habit.id ?? `habit-${Date.now()}`,
    name: habit.name ?? 'Habit',
    icon: habit.icon ?? '✨',
    color: habit.color ?? '#7BDFF2',
    createdAt: habit.createdAt ?? new Date().toISOString().split('T')[0],
    completedDates: Array.isArray(habit.completedDates) ? habit.completedDates : [],
    frequency,
    customDays:
      frequency === 'custom' && Array.isArray(habit.customDays)
        ? Array.from(new Set(habit.customDays.filter((day) => day >= 0 && day <= 6)))
        : [],
    note: habit.note ?? '',
  };
}

export function isHabitScheduledForDate(habit: Habit, date: Date | string) {
  const target = typeof date === 'string' ? new Date(`${date}T12:00:00`) : new Date(date);
  target.setHours(12, 0, 0, 0);
  const day = target.getDay();

  switch (habit.frequency ?? DEFAULT_FREQUENCY) {
    case 'weekdays':
      return day !== 0 && day !== 6;
    case 'custom':
      return (habit.customDays ?? []).includes(day);
    case 'daily':
    default:
      return true;
  }
}

export function getMilestoneMessage(bestStreak: number) {
  if (bestStreak >= 30) return 'Legend mode unlocked. Your routine is steady, strong, and seriously impressive.';
  if (bestStreak >= 14) return 'You are in a beautiful rhythm. Protect it and keep stacking the wins.';
  if (bestStreak >= 7) return 'A full week is a real win. Keep the chain alive and stay steady.';
  if (bestStreak >= 3) return 'You are building real momentum. One more day can make this stick.';
  return 'Tiny wins are turning into a habit. Keep showing up, even in small steps.';
}

export function getStreakMilestone(bestStreak: number) {
  if (bestStreak >= 30) {
    return {
      label: '30-day legend',
      detail: 'Consistency is your superpower. Keep protecting the streak and celebrate the rhythm.',
    };
  }

  if (bestStreak >= 14) {
    return {
      label: '2-week flow',
      detail: 'The routine feels natural now. Keep the flow going and this can become your norm.',
    };
  }

  if (bestStreak >= 7) {
    return {
      label: '1-week win',
      detail: 'A full week is a huge accomplishment. Stay light, steady, and proud of the progress.',
    };
  }

  if (bestStreak >= 3) {
    return {
      label: 'Growing streak',
      detail: 'The habit is sticking. Keep it simple and let the chain keep growing.',
    };
  }

  return {
    label: 'Momentum building',
    detail: 'Every small win matters. Today is the start of something stronger.',
  };
}

export function getDailyMotivationMessage(totalHabits: number, completedToday: number, bestStreak: number) {
  if (totalHabits === 0) return 'Create your first habit and let the routine begin.';
  const remaining = totalHabits - completedToday;
  if (remaining <= 0) return `Amazing work — you completed every habit today and kept the streak glowing.`;
  if (bestStreak >= 7) return `Strong streak: ${bestStreak} days. Finish ${remaining} more habit${remaining > 1 ? 's' : ''} and keep the rhythm alive.`;
  if (remaining === 1) return 'You are just one tiny step away from a full day. Keep it simple and finish strong.';
  return `You’re ${remaining} habits away from a full day. Small wins still count — keep the momentum going.`;
}

export function getCompletionRate(habit: Habit) {
  const created = new Date(`${habit.createdAt}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  let scheduledDays = 0;
  let completedDays = 0;

  for (let current = new Date(created); current <= today; current.setDate(current.getDate() + 1)) {
    const key = getDateKey(current);
    if (isHabitScheduledForDate(habit, current)) {
      scheduledDays += 1;
      if (habit.completedDates.includes(key)) completedDays += 1;
    }
  }

  if (scheduledDays === 0) return 0;
  return Math.min(100, Math.round((completedDays / scheduledDays) * 100));
}

export function buildSeedHabits(): Habit[] {
  const today = getDateKey(new Date());

  return [
    {
      id: 'seed-1',
      name: 'Drink water',
      icon: '💧',
      color: '#4CC9F0',
      createdAt: offsetDate(14),
      completedDates: [offsetDate(0), offsetDate(1), offsetDate(2), offsetDate(3), offsetDate(5), offsetDate(6), today],
      frequency: 'daily',
      customDays: [],
      note: 'A quick reset for the day.',
    },
    {
      id: 'seed-2',
      name: 'Read story',
      icon: '📚',
      color: '#FFB703',
      createdAt: offsetDate(19),
      completedDates: [offsetDate(0), offsetDate(1), offsetDate(2), offsetDate(4), offsetDate(6), today],
      frequency: 'daily',
      customDays: [],
      note: 'Even ten pages helps.',
    },
    {
      id: 'seed-3',
      name: 'Stretch time',
      icon: '🧘',
      color: '#8AC926',
      createdAt: offsetDate(10),
      completedDates: [offsetDate(0), offsetDate(1), offsetDate(3), offsetDate(4), offsetDate(7), today],
      frequency: 'weekdays',
      customDays: [],
      note: 'Keep the body feeling good.',
    },
  ];
}

export async function loadHabits(): Promise<Habit[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = buildSeedHabits();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    const parsed = JSON.parse(raw) as Habit[];
    const normalized = Array.isArray(parsed) ? parsed.map(normalizeHabit) : [];
    return normalized;
  } catch (error) {
    console.warn('Unable to load habits', error);
    return [];
  }
}

export async function saveHabits(habits: Habit[]) {
  const normalized = habits.map(normalizeHabit);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}
