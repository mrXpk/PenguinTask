export type HabitFrequency = 'daily' | 'weekdays' | 'custom';
export type Reminder = { enabled: boolean; hour: number; minute: number };
export type CategoryId = 'water' | 'study' | 'exercise' | 'food' | 'read' | 'meditate' | 'custom';
export type Habit = {
  id: string; name: string; icon: string; categoryId: CategoryId; color: string;
  createdAt: string; completedDates: string[]; frequency: HabitFrequency;
  customDays: number[]; note: string; reminder?: Reminder;
};
export const STORAGE_KEY = 'habit-tracker-v1';
export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const CATEGORIES: { id: CategoryId; name: string; icon: string; color: string }[] = [
  { id: 'water', name: 'Drink Water', icon: 'water', color: '#43A9D1' },
  { id: 'study', name: 'Study', icon: 'book', color: '#AA71D4' },
  { id: 'exercise', name: 'Exercise', icon: 'barbell', color: '#EE7A5C' },
  { id: 'food', name: 'Healthy Food', icon: 'leaf', color: '#78A968' },
  { id: 'read', name: 'Read Book', icon: 'library', color: '#EAB247' },
  { id: 'meditate', name: 'Meditate', icon: 'sunny', color: '#E7B445' },
  { id: 'custom', name: 'My Habit', icon: 'sparkles', color: '#689CBA' },
];
export function getDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function dateFromKey(key: string) { return new Date(`${key}T12:00:00`); }
export function dateOffset(date: Date, offset: number) {
  const next = new Date(date); next.setHours(12, 0, 0, 0); next.setDate(next.getDate() + offset); return next;
}
export function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && getDateKey(dateFromKey(value)) === value;
}
export function isHabitScheduledForDate(habit: Habit, date: Date | string) {
  const target = typeof date === 'string' ? dateFromKey(date) : date;
  if (getDateKey(target) < habit.createdAt) return false;
  const day = target.getDay();
  return habit.frequency === 'daily' || (habit.frequency === 'weekdays' && day > 0 && day < 6) ||
    (habit.frequency === 'custom' && habit.customDays.includes(day));
}
export function normalizeReminder(value: unknown): Reminder | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const r = value as Partial<Reminder>;
  if (typeof r.enabled !== 'boolean' || !Number.isInteger(r.hour) || !Number.isInteger(r.minute) || r.hour! < 0 || r.hour! > 23 || r.minute! < 0 || r.minute! > 59) throw new Error('Invalid reminder time.');
  return { enabled: r.enabled, hour: r.hour!, minute: r.minute! };
}
export function normalizeHabit(value: unknown): Habit {
  if (!value || typeof value !== 'object') throw new Error('Invalid habit record.');
  const h = value as Partial<Habit>;
  if (typeof h.id !== 'string' || !h.id || typeof h.name !== 'string' || !h.name.trim() || !isDateKey(h.createdAt) || !Array.isArray(h.completedDates) || !h.completedDates.every(isDateKey)) throw new Error('Your saved habits could not be read. Your original data has been kept.');
  const category = CATEGORIES.find(c => c.id === h.categoryId) ?? CATEGORIES.find(c => c.name.toLowerCase() === h.name!.toLowerCase()) ?? CATEGORIES[6];
  const frequency = h.frequency ?? 'daily';
  if (!['daily', 'weekdays', 'custom'].includes(frequency)) throw new Error('Invalid habit schedule.');
  const customDays = Array.from(new Set((h.customDays ?? []).filter(d => Number.isInteger(d) && d >= 0 && d <= 6))).sort();
  return { id: h.id, name: h.name.trim(), icon: typeof h.icon === 'string' ? h.icon : category.icon,
    categoryId: category.id, color: typeof h.color === 'string' && /^#[0-9a-f]{6}$/i.test(h.color) ? h.color : category.color,
    createdAt: h.createdAt, completedDates: [...new Set(h.completedDates)].sort(), frequency, customDays,
    note: typeof h.note === 'string' ? h.note : '', reminder: normalizeReminder(h.reminder) };
}
export function getCurrentStreak(habit: Habit, today = new Date()) {
  const done = new Set(habit.completedDates); let count = 0;
  for (let cursor = dateOffset(today, 0); getDateKey(cursor) >= habit.createdAt; cursor = dateOffset(cursor, -1)) {
    if (!isHabitScheduledForDate(habit, cursor)) continue;
    if (done.has(getDateKey(cursor))) count++;
    else if (getDateKey(cursor) !== getDateKey(today)) break;
  }
  return count;
}
export function getLongestStreak(habit: Habit, today = new Date()) {
  const done = new Set(habit.completedDates); let running = 0; let best = 0;
  for (let cursor = dateFromKey(habit.createdAt); getDateKey(cursor) <= getDateKey(today); cursor = dateOffset(cursor, 1)) {
    if (!isHabitScheduledForDate(habit, cursor)) continue;
    running = done.has(getDateKey(cursor)) ? running + 1 : 0; best = Math.max(best, running);
  }
  return best;
}
export function getStats(habits: Habit[], from: Date, to = new Date()) {
  let scheduled = 0; let completed = 0;
  for (let day = dateOffset(from, 0); getDateKey(day) <= getDateKey(to); day = dateOffset(day, 1)) {
    habits.forEach(h => { if (isHabitScheduledForDate(h, day)) { scheduled++; if (h.completedDates.includes(getDateKey(day))) completed++; } });
  }
  return { scheduled, completed, percent: scheduled ? Math.round(completed / scheduled * 100) : 0 };
}
export function getCompletionRate(habit: Habit, today = new Date()) { return getStats([habit], dateFromKey(habit.createdAt), today).percent; }

