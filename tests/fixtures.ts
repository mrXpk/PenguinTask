import { CATEGORIES, dateFromKey, dateOffset, getDateKey, normalizeHabit } from '../src/lib/habits';
import { initialData } from '../src/lib/model';
export function visualFixture() {
  const data = initialData(); const today = dateFromKey('2026-10-13');
  data.profile = { ...data.profile, name: 'Pratap', onboardingComplete: true };
  data.habits = CATEGORIES.slice(0, 6).map((c, i) => normalizeHabit({ ...c, categoryId: c.id, id: `fixture-${c.id}`, createdAt: '2026-10-01', frequency: 'daily', completedDates: [1, 2, 3, 4, 5, 6].filter(d => i < 2 || d % 2 === 0).map(d => getDateKey(dateOffset(today, -d))).concat(i < 4 ? ['2026-10-13'] : []), note: 'A little progress every day.' }));
  data.transactions = [{ id: 'fixture-award', amount: 250, date: '2026-10-13' }];
  return data;
}
