import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { BootState, Button, Card, CategoryIcon, EmptyState, Label, Screen, Section, Stat, s } from '@/components/ui-kit';
import { ConfirmSheet } from '@/components/confirm-sheet';
import { CATEGORIES, dateFromKey, dateOffset, getCurrentStreak, getDateKey, getLongestStreak, isHabitScheduledForDate, WEEKDAY_LABELS } from '@/lib/habits';
import { formatReminderTime } from '@/lib/reminders';
import { palette as C } from '@/constants/design';
import { useApp } from '@/state/app-state';
export default function Detail() {
  const { habitId } = useLocalSearchParams<{ habitId?: string }>(); const { ready, data, today, run, busy } = useApp(); const [confirm, setConfirm] = useState(false);
  if (!ready) return <BootState />; const habit = data.habits.find(h => h.id === habitId);
  if (!habit) return <Screen title="Task Details" back><EmptyState title="Task not found" detail="This habit may have been deleted." action="Back home" onPress={() => router.replace('/home')} /></Screen>;
  const category = CATEGORIES.find(c => c.id === habit.categoryId)!; const date = dateFromKey(today); const done = habit.completedDates.includes(today);
  return <Screen title="Task Details" back>
    <View style={{ alignItems: 'center', gap: 12, paddingVertical: 18 }}><CategoryIcon name={category.icon} color={category.color} size={72} /><Label bold style={{ fontSize: 26, lineHeight: 33, textAlign: 'center' }}>{habit.name}</Label><Label muted>One small step at a time.</Label></View>
    <Card><View style={[s.row, { justifyContent: 'space-around' }]}><Stat icon="flame" value={getCurrentStreak(habit, date)} label="Day streak" /><Stat icon="trophy" value={getLongestStreak(habit, date)} label="Best streak" /></View></Card>
    <Section title="Your week" action="History" onPress={() => router.push({ pathname: '/calendar', params: { habitId: habit.id } })} />
    <Card><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>{Array.from({ length: 7 }, (_, i) => { const day = dateOffset(date, i - 6); const complete = habit.completedDates.includes(getDateKey(day)); const scheduled = isHabitScheduledForDate(habit, day); return <View key={i} style={{ alignItems: 'center', gap: 8 }}><View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: complete ? C.green : scheduled ? C.border : 'transparent', alignItems: 'center', justifyContent: 'center' }}><Label style={{ color: complete ? 'white' : C.muted }}>{complete ? '✓' : scheduled ? '·' : '–'}</Label></View><Label muted style={{ fontSize: 10 }}>{WEEKDAY_LABELS[day.getDay()]}</Label></View>; })}</View></Card>
    <Card><Label bold>Schedule</Label><Label muted>{habit.frequency === 'custom' ? habit.customDays.map(d => WEEKDAY_LABELS[d]).join(', ') || 'No days selected — edit to fix' : habit.frequency === 'weekdays' ? 'Monday to Friday' : 'Every day'}</Label>{habit.reminder?.enabled && <Label muted style={{ marginTop: 10 }}>Reminder · {formatReminderTime(habit.reminder.hour, habit.reminder.minute)}</Label>}{!!habit.note && <><Label bold style={{ marginTop: 15 }}>Your note</Label><Label muted>{habit.note}</Label></>}</Card>
    {isHabitScheduledForDate(habit, today) && <Button title={done ? 'Mark as not done' : 'Mark as done'} disabled={busy} onPress={() => void run({ type: 'toggle', id: habit.id, date: today })} icon="checkmark" />}
    <Button secondary title="Edit Task" onPress={() => router.push({ pathname: '/new-habit', params: { habitId: habit.id } })} />
    <Button secondary title="Delete Task" onPress={() => setConfirm(true)} />
    <ConfirmSheet visible={confirm} title="Delete this task?" detail="This removes its history. Coins you already earned will stay with you." action="Delete task" busy={busy} onCancel={() => setConfirm(false)} onConfirm={async () => { if (await run({ type: 'deleteHabit', id: habit.id })) router.replace('/home'); }} />
  </Screen>;
}

