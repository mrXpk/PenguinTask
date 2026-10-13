import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { Habit, CATEGORIES, getCurrentStreak, dateFromKey } from '@/lib/habits';
import { useApp } from '@/state/app-state';
import { CategoryIcon, Label } from './ui-kit';
import { palette as C } from '@/constants/design';
export function HabitCard({ habit, date }: { habit: Habit; date?: string }) {
  const { today, run, busy } = useApp(); const key = date ?? today; const done = habit.completedDates.includes(key);
  const category = CATEGORIES.find(c => c.id === habit.categoryId)!; const streak = getCurrentStreak(habit, dateFromKey(today));
  return <View style={{ flexDirection: 'row', backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 16, alignItems: 'center', padding: 7 }}>
    <Pressable accessibilityRole="button" accessibilityLabel={`View ${habit.name}`} onPress={() => router.push({ pathname: '/habit-detail', params: { habitId: habit.id } })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 58, paddingLeft: 4 }}>
      <CategoryIcon name={category.icon} color={category.color} /><View style={{ flex: 1 }}><Label bold numberOfLines={2}>{habit.name}</Label><Label muted style={{ fontSize: 11, lineHeight: 18 }}>{streak ? `🔥 ${streak} day streak` : 'A little progress, every day'}</Label></View>
    </Pressable>
    <Pressable disabled={busy || key !== today} accessibilityRole="checkbox" accessibilityState={{ checked: done, disabled: busy || key !== today }} accessibilityLabel={`${done ? 'Undo' : 'Complete'} ${habit.name}`} onPress={() => void run({ type: 'toggle', id: habit.id, date: key })} style={{ minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={done ? C.green : '#C2C5B7'} /></Pressable>
  </View>;
}

