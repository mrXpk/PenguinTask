import { Habit, Reminder, isDateKey, isHabitScheduledForDate, normalizeHabit, normalizeReminder } from './habits';
export const APP_STORAGE_KEY = 'penguin-task-v2';
export const SCENES = ['arctic', 'forest', 'sunset', 'night'] as const;
export type Scene = typeof SCENES[number];
export type Profile = { name: string; goals: string[]; challenge: string; target: number; scene: Scene; onboardingComplete: boolean; onboardingStep: string; sound: boolean; dailyReminder: Reminder; accessory: string | null; backdrop: string | null };
export type Transaction = { id: string; amount: number; date: string; rewardId?: string };
export type AppData = { version: 2; habits: Habit[]; profile: Profile; transactions: Transaction[]; owned: string[]; celebratedDates: string[] };
export const REWARDS = [
  { id: 'crown', title: 'A little royalty', subtitle: 'Golden crown', cost: 100, icon: 'ribbon' as const, color: '#F5BD48' },
  { id: 'scarf', title: 'Cozy companion', subtitle: 'Winter scarf', cost: 150, icon: 'heart' as const, color: '#DD8E70' },
  { id: 'backdrop', title: 'A new horizon', subtitle: 'Twilight arctic scene', cost: 200, icon: 'image' as const, color: '#70AFCA' },
];
export function initialData(): AppData { return { version: 2, habits: [], transactions: [], owned: [], celebratedDates: [], profile: { name: '', goals: [], challenge: '', target: 5, scene: 'arctic', onboardingComplete: false, onboardingStep: 'welcome', sound: true, dailyReminder: { enabled: false, hour: 8, minute: 0 }, accessory: null, backdrop: null } }; }
export function parseData(raw: string): AppData {
  const data = JSON.parse(raw);
  if (data?.version !== 2 || !Array.isArray(data.habits) || !data.profile || !Array.isArray(data.transactions) || !Array.isArray(data.owned) || !Array.isArray(data.celebratedDates)) throw new Error('Saved data is unreadable. Nothing has been overwritten.');
  const p = data.profile;
  if (typeof p.name !== 'string' || typeof p.onboardingComplete !== 'boolean' || !SCENES.includes(p.scene) || !Array.isArray(p.goals) || !p.goals.every((g: unknown) => typeof g === 'string') || typeof p.sound !== 'boolean' || ![3, 5, 8].includes(p.target) || typeof p.challenge !== 'string' || typeof p.onboardingStep !== 'string') throw new Error('Saved preferences are invalid.');
  if (!data.transactions.every((t: Transaction) => typeof t.id === 'string' && Number.isSafeInteger(t.amount) && isDateKey(t.date)) || !data.owned.every((id: unknown) => typeof id === 'string' && REWARDS.some(r => r.id === id)) || !data.celebratedDates.every(isDateKey)) throw new Error('Saved rewards are invalid.');
  const habits = data.habits.map(normalizeHabit);
  if (new Set(habits.map((h: Habit) => h.id)).size !== habits.length || new Set(data.transactions.map((t: Transaction) => t.id)).size !== data.transactions.length) throw new Error('Duplicate saved records.');
  return { ...data, habits, profile: { ...p, dailyReminder: normalizeReminder(p.dailyReminder) ?? initialData().profile.dailyReminder } };
}
export function migrateLegacy(raw: string | null): AppData {
  const data = initialData(); if (raw === null) return data;
  const old = JSON.parse(raw); if (!Array.isArray(old)) throw new Error('Your original habit data is unreadable and has been kept.');
  data.habits = old.map(normalizeHabit); return parseData(JSON.stringify(data));
}
export type Action =
 | { type: 'saveHabit'; habit: Habit } | { type: 'deleteHabit'; id: string }
 | { type: 'toggle'; id: string; date: string } | { type: 'profile'; patch: Partial<Profile> }
 | { type: 'redeem'; id: string; date: string } | { type: 'equip'; id: string }
 | { type: 'celebrate'; date: string } | { type: 'reset' };
export function coinBalance(data: AppData) { return data.transactions.reduce((sum, t) => sum + t.amount, 0); }
export function reduceData(data: AppData, action: Action): AppData {
  switch (action.type) {
    case 'saveHabit': {
      const habit = normalizeHabit(action.habit);
      if (habit.frequency === 'custom' && !habit.customDays.length) throw new Error('Choose at least one day.');
      return { ...data, habits: data.habits.some(h => h.id === habit.id) ? data.habits.map(h => h.id === habit.id ? habit : h) : [...data.habits, habit] };
    }
    case 'deleteHabit': return { ...data, habits: data.habits.filter(h => h.id !== action.id) };
    case 'toggle': {
      const habit = data.habits.find(h => h.id === action.id);
      if (!habit || !isHabitScheduledForDate(habit, action.date)) return data;
      const wasDone = habit.completedDates.includes(action.date); const awardId = `complete:${action.id}:${action.date}`;
      return { ...data, habits: data.habits.map(h => h.id === action.id ? { ...h, completedDates: wasDone ? h.completedDates.filter(d => d !== action.date) : [...h.completedDates, action.date].sort() } : h),
        transactions: !wasDone && !data.transactions.some(t => t.id === awardId) ? [...data.transactions, { id: awardId, amount: 10, date: action.date }] : data.transactions };
    }
    case 'profile': return { ...data, profile: { ...data.profile, ...action.patch } };
    case 'redeem': {
      const reward = REWARDS.find(r => r.id === action.id);
      if (!reward) throw new Error('Reward not found.');
      if (data.owned.includes(reward.id)) return data;
      if (coinBalance(data) < reward.cost) throw new Error(`You need ${reward.cost - coinBalance(data)} more coins.`);
      return reduceData({ ...data, owned: [...data.owned, reward.id], transactions: [...data.transactions, { id: `redeem:${reward.id}`, rewardId: reward.id, amount: -reward.cost, date: action.date }] }, { type: 'equip', id: reward.id });
    }
    case 'equip': {
      if (!data.owned.includes(action.id)) throw new Error('Unlock this reward first.');
      return { ...data, profile: { ...data.profile, ...(action.id === 'backdrop' ? { backdrop: action.id } : { accessory: action.id }) } };
    }
    case 'celebrate': return { ...data, celebratedDates: [...new Set([...data.celebratedDates, action.date])] };
    case 'reset': return initialData();
  }
}

