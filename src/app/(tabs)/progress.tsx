import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Card, CategoryIcon, EmptyState, Label, Penguin, ProgressRing, Screen, Section, Stat, s } from '@/components/ui-kit';
import { palette as C } from '@/constants/design';
import { CATEGORIES, dateFromKey, dateOffset, getCurrentStreak, getLongestStreak, getStats } from '@/lib/habits';
import { useApp } from '@/state/app-state';
export default function Progress() {
  const { data, today } = useApp(); const [period, setPeriod] = useState('Weekly'); const date = dateFromKey(today);
  const start = period === 'Weekly' ? dateOffset(date, -6) : period === 'Monthly' ? new Date(date.getFullYear(), date.getMonth(), 1, 12) : dateFromKey(data.habits.map(h => h.createdAt).sort()[0] ?? today);
  const stats = getStats(data.habits, start, date);
  const week = Array.from({ length: 7 }, (_, i) => { const day = dateOffset(date, i - 6); return { label: day.toLocaleDateString('en-US', { weekday: 'short' }), ...getStats(data.habits, day, day) }; });
  const max = Math.max(1, ...week.map(d => d.completed));
  if (!data.habits.length) return <Screen title="Your Progress"><EmptyState title="Your story starts here" detail="Add a habit and your small wins will become a beautiful picture of progress." /></Screen>;
  return <Screen title="Your Progress">
    <View style={{ flexDirection: 'row', borderRadius: 25, padding: 4, backgroundColor: '#EFEEE3' }}>{['Weekly', 'Monthly', 'All-time'].map(p => <Pressable key={p} accessibilityRole="tab" accessibilityState={{ selected: period === p }} onPress={() => setPeriod(p)} style={{ flex: 1, minHeight: 44, borderRadius: 24, backgroundColor: period === p ? C.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}><Label bold style={{ fontSize: 13, color: period === p ? 'white' : C.muted }}>{p}</Label></Pressable>)}</View>
    <Card><View style={[s.row, { justifyContent: 'space-around' }]}><ProgressRing completed={stats.completed} total={stats.scheduled} size={150} percentFirst /><Penguin mood="celebrating" size={140} /></View></Card>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>{[
      { label: 'Day streak', icon: 'flame' as const, value: Math.max(0, ...data.habits.map(h => getCurrentStreak(h, date))) },
      { label: 'Best streak', icon: 'trophy' as const, value: Math.max(0, ...data.habits.map(h => getLongestStreak(h, date))) },
      { label: 'Completed', icon: 'checkmark-circle' as const, value: stats.completed },
      { label: 'Habits', icon: 'leaf' as const, value: data.habits.length },
    ].map(item => <Card key={item.label} style={{ width: '47%', flexGrow: 1, padding: 12 }}><Stat {...item} /></Card>)}</View>
    <Section title="Habit Overview" />
    {data.habits.map(h => { const progress = getStats([h], start, date); const category = CATEGORIES.find(c => c.id === h.categoryId)!; return <Pressable key={h.id} accessibilityRole="button" onPress={() => router.push({ pathname: '/habit-detail', params: { habitId: h.id } })}><Card style={{ padding: 12 }}><View style={s.row}><CategoryIcon name={category.icon} color={category.color} /><View style={{ flex: 1 }}><View style={[s.row, { justifyContent: 'space-between' }]}><Label bold style={{ flex: 1, fontSize: 13 }}>{h.name}</Label><Label style={{ fontSize: 12 }}>{progress.completed}/{progress.scheduled}</Label></View><View style={{ marginTop: 7, height: 7, borderRadius: 4, backgroundColor: C.border }}><View style={{ width: `${progress.percent}%`, height: 7, borderRadius: 4, backgroundColor: progress.percent < 50 ? C.gold : C.green }} /></View></View></View></Card></Pressable>; })}
    <Section title="This Week" action="Calendar" onPress={() => router.push('/calendar')} />
    <Card><View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-end', height: 145 }}>{week.map((day, i) => <View key={i} accessible accessibilityLabel={`${day.label}: ${day.completed} completed`} style={{ flex: 1, alignItems: 'center', gap: 6 }}><Label muted style={{ fontSize: 11 }}>{day.completed}</Label><View style={{ height: 90, width: '100%', justifyContent: 'flex-end' }}><View style={{ height: day.completed / max * 90, borderRadius: 8, backgroundColor: i === 6 ? C.green : '#86AC72', width: '100%' }} /></View><Label muted style={{ fontSize: 10 }}>{day.label}</Label></View>)}</View></Card>
  </Screen>;
}
