import assert from 'node:assert/strict';
import test from 'node:test';
import { dateFromKey, getCurrentStreak, getDateKey, getLongestStreak, getStats, normalizeHabit } from '../src/lib/habits';
import { APP_STORAGE_KEY, coinBalance, initialData, migrateLegacy, parseData, reduceData } from '../src/lib/model';
import { createRepository } from '../src/lib/repository';
const habit = (extra = {}) => normalizeHabit({ id: 'water', name: 'Drink Water', createdAt: '2026-10-01', completedDates: [], ...extra });
test('legacy migration retains IDs and deduplicates historical completions without seeding a new user', () => {
  assert.equal(migrateLegacy(null).habits.length, 0);
  const migrated = migrateLegacy(JSON.stringify([habit({ completedDates: ['2026-10-12', '2026-10-12'] })]));
  assert.equal(migrated.habits[0].id, 'water');
  assert.deepEqual(migrated.habits[0].completedDates, ['2026-10-12']);
});
test('malformed saved state fails instead of being replaced', () => {
  assert.throws(() => migrateLegacy('{broken'));
  assert.throws(() => migrateLegacy('{}'));
  assert.throws(() => parseData(JSON.stringify({ version: 9 })));
  assert.throws(() => normalizeHabit({ id: 'a', name: 'A', createdAt: '2026-02-30', completedDates: [] }));
  assert.throws(() => normalizeHabit({ id: 'a', name: 'A', createdAt: '2026-02-01', completedDates: ['not-a-date'] }));
});
test('weekday streak survives weekends and an unfinished Monday', () => {
  const h = habit({ frequency: 'weekdays', completedDates: ['2026-10-08', '2026-10-09'] });
  assert.equal(getCurrentStreak(h, dateFromKey('2026-10-12')), 2);
  assert.equal(getCurrentStreak(h, dateFromKey('2026-10-13')), 0);
  assert.equal(getLongestStreak(h, dateFromKey('2026-10-13')), 2);
});
test('custom streak skips rest days and handles empty legacy schedules', () => {
  const h = habit({ frequency: 'custom', customDays: [1, 3], completedDates: ['2026-10-05', '2026-10-07'] });
  assert.equal(getCurrentStreak(h, dateFromKey('2026-10-12')), 2);
  assert.equal(getCurrentStreak(habit({ frequency: 'custom', customDays: [] }), dateFromKey('2026-10-12')), 0);
  assert.throws(() => reduceData(initialData(), { type: 'saveHabit', habit: habit({ frequency: 'custom', customDays: [] }) }));
});
test('today remains open until midnight, dates use the local calendar and leap days count', () => {
  const h = habit({ createdAt: '2024-02-28', completedDates: ['2024-02-28', '2024-02-29'] });
  assert.equal(getCurrentStreak(h, dateFromKey('2024-03-01')), 2);
  assert.equal(getCurrentStreak(h, dateFromKey('2024-03-02')), 0);
  assert.equal(getDateKey(new Date(2026, 9, 13, 0, 1)), '2026-10-13');
});
test('statistics count only scheduled days on or after creation', () => {
  const h = habit({ frequency: 'weekdays', createdAt: '2026-10-09', completedDates: ['2026-10-09', '2026-10-10'] });
  assert.deepEqual(getStats([h], dateFromKey('2026-10-01'), dateFromKey('2026-10-12')), { scheduled: 2, completed: 1, percent: 50 });
  assert.deepEqual(getStats([], dateFromKey('2026-10-01'), dateFromKey('2026-10-12')), { scheduled: 0, completed: 0, percent: 0 });
});
test('completion awards are idempotent across undo, restart and habit deletion', () => {
  let data = reduceData(initialData(), { type: 'saveHabit', habit: habit() });
  const toggle = { type: 'toggle' as const, id: 'water', date: '2026-10-13' };
  data = reduceData(data, toggle); data = reduceData(data, toggle);
  data = parseData(JSON.stringify(data)); data = reduceData(data, toggle);
  assert.equal(coinBalance(data), 10);
  data = reduceData(data, { type: 'deleteHabit', id: 'water' });
  assert.equal(coinBalance(data), 10);
});
test('redemption is atomic, rejects insufficient funds and persists equipment', () => {
  let data = initialData(); assert.throws(() => reduceData(data, { type: 'redeem', id: 'crown', date: '2026-10-13' }));
  data.transactions = [{ id: 'earned', amount: 100, date: '2026-10-13' }];
  data = reduceData(data, { type: 'redeem', id: 'crown', date: '2026-10-13' });
  data = reduceData(data, { type: 'redeem', id: 'crown', date: '2026-10-13' });
  assert.equal(coinBalance(data), 0); assert.equal(data.owned.length, 1);
  assert.equal(parseData(JSON.stringify(data)).profile.accessory, 'crown');
  assert.deepEqual(reduceData(data, { type: 'reset' }), initialData());
});
test('migration keeps legacy storage and does not write over unreadable current state', async () => {
  const values = new Map([['habit-tracker-v1', JSON.stringify([habit()])]]);
  const repo = createRepository({ getItem: async k => values.get(k) ?? null, setItem: async (k, v) => { values.set(k, v); } });
  await repo.load(); assert.ok(values.has('habit-tracker-v1')); assert.ok(values.has(APP_STORAGE_KEY));
  values.set(APP_STORAGE_KEY, '{broken'); await assert.rejects(repo.load()); assert.equal(values.get(APP_STORAGE_KEY), '{broken');
});
test('repository serializes writes and recovers after a failed write', async () => {
  const writes: string[] = []; let fail = true;
  const repo = createRepository({ getItem: async () => null, setItem: async (_, value) => {
    if (fail) { fail = false; throw new Error('disk unavailable'); }
    await new Promise(resolve => setTimeout(resolve, 5)); writes.push(JSON.parse(value).profile.name);
  } });
  await assert.rejects(repo.save(initialData()));
  const first = initialData(); first.profile.name = 'First'; const second = initialData(); second.profile.name = 'Second';
  await Promise.all([repo.save(first), repo.save(second)]); assert.deepEqual(writes, ['First', 'Second']);
});
