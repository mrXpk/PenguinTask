import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { HabitCard } from '@/components/habit-card';
import { BootState, Card, IconButton, Label, Penguin, Screen, s } from '@/components/ui-kit';
import { palette as C } from '@/constants/design';
import { dateFromKey, getDateKey, getStats, isHabitScheduledForDate, WEEKDAY_LABELS } from '@/lib/habits';
import { useApp } from '@/state/app-state';
export default function Calendar() {
  const { data, today, ready } = useApp(); const { habitId } = useLocalSearchParams<{ habitId?: string }>();
  const [month, setMonth] = useState(() => { const date = dateFromKey(today); return new Date(date.getFullYear(), date.getMonth(), 1, 12); }); const [selected, setSelected] = useState(today);
  if (!ready) return <BootState />;
  const habits = habitId ? data.habits.filter(h => h.id === habitId) : data.habits;
  const offset = (month.getDay() + 6) % 7; const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return <Screen title="Calendar" back><Card>
    <View style={[s.row, { justifyContent: 'space-between' }]}><IconButton name="chevron-back" label="Previous month" onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1, 12))} /><Label bold>{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Label><IconButton name="chevron-forward" label="Next month" onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1, 12))} /></View>
    <View style={{ flexDirection: 'row' }}>{[1, 2, 3, 4, 5, 6, 0].map(day => <Label key={day} muted style={{ width: '14.2857%', textAlign: 'center', fontSize: 11, paddingVertical: 10 }}>{WEEKDAY_LABELS[day]}</Label>)}</View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{Array.from({ length: offset + count }, (_, i) => {
      if (i < offset) return <View key={i} style={{ width: '14.2857%' }} />;
      const date = new Date(month.getFullYear(), month.getMonth(), i - offset + 1, 12); const key = getDateKey(date); const stats = getStats(habits, date, date);
      const color = key > today || !stats.scheduled ? 'transparent' : stats.percent === 100 ? C.green : stats.completed ? '#E8BC58' : C.border;
      return <Pressable key={i} accessibilityRole="button" accessibilityLabel={`${key}, ${stats.completed} of ${stats.scheduled} completed`} onPress={() => setSelected(key)} style={{ width: '14.2857%', minHeight: 48, alignItems: 'center', justifyContent: 'center' }}><View style={{ width: 33, height: 33, borderRadius: 17, backgroundColor: color, borderWidth: key === selected ? 2 : 0, borderColor: C.ink, justifyContent: 'center', alignItems: 'center' }}><Label style={{ fontSize: 12, color: color === C.green ? 'white' : C.ink }}>{date.getDate()}</Label></View></Pressable>;
    })}</View><Label muted style={{ fontSize: 11, textAlign: 'center', marginTop: 16 }}>Green · complete    Gold · partial    Cream · missed</Label>
  </Card><Label bold>{dateFromKey(selected).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</Label>
    {habits.filter(h => isHabitScheduledForDate(h, selected)).map(habit => <HabitCard key={habit.id} habit={habit} date={selected} />)}
    {!habits.some(h => isHabitScheduledForDate(h, selected)) && <Label muted>No habits scheduled for this day.</Label>}
    <Penguin mood="encouraging" size={150} />
  </Screen>;
}

