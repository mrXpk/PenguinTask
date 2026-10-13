import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { HabitCard } from '@/components/habit-card';
import { BootState, EmptyState, Label, Screen } from '@/components/ui-kit';
import { palette as C } from '@/constants/design';
import { isHabitScheduledForDate } from '@/lib/habits';
import { useApp } from '@/state/app-state';
export default function Tasks() {
  const { data, today, ready } = useApp(); const [filter, setFilter] = useState('All');
  if (!ready) return <BootState />;
  const habits = data.habits.filter(h => filter === 'All' || (filter === 'Today' ? isHabitScheduledForDate(h, today) : filter === 'Completed' ? h.completedDates.includes(today) : !isHabitScheduledForDate(h, today)));
  return <Screen title="Your Tasks" back><View style={{ flexDirection: 'row', gap: 4 }}>{['All', 'Today', 'Upcoming', 'Completed'].map(f => <Pressable key={f} accessibilityRole="tab" accessibilityState={{ selected: filter === f }} onPress={() => setFilter(f)} style={{ flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: filter === f ? C.green : C.border }}><Label style={{ fontSize: 11, color: filter === f ? 'white' : C.ink }}>{f}</Label></Pressable>)}</View>{habits.length ? habits.map(habit => <HabitCard key={habit.id} habit={habit} />) : <EmptyState title={data.habits.length ? 'Nothing here just yet' : 'No tasks yet!'} detail="Every little habit begins with one small step." />}</Screen>;
}
