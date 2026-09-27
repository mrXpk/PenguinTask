import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useHabits } from '@/hooks/use-habits';
import { getCurrentStreak, getDateKey, getLongestStreak } from '@/lib/habits';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function HabitDetailScreen() {
  const params = useLocalSearchParams<{ habitId?: string }>();
  const { habits, updateHabits } = useHabits();
  const habit = habits.find((item) => item.id === params.habitId);

  const history = useMemo(() => {
    if (!habit) return [];

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));
      const key = getDateKey(date);
      const done = habit.completedDates.includes(key);
      return { key, label: weekdays[date.getDay()], done };
    });
  }, [habit]);

  if (!habit) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>😵</Text>
          <Text style={styles.emptyTitle}>Habit not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentStreak = getCurrentStreak(habit.completedDates);
  const longestStreak = getLongestStreak(habit.completedDates);
  const completionCount = habit.completedDates.length;

  const toggleToday = async () => {
    const key = getDateKey(new Date());
    const nextHabits = habits.map((item) => {
      if (item.id !== habit.id) return item;
      const done = item.completedDates.includes(key);
      return {
        ...item,
        completedDates: done ? item.completedDates.filter((date) => date !== key) : [...item.completedDates, key],
      };
    });

    await updateHabits(nextHabits);
  };

  const deleteHabit = async () => {
    await updateHabits(habits.filter((item) => item.id !== habit.id));
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Progress</Text>
          <Pressable onPress={() => router.push({ pathname: '/new-habit', params: { habitId: habit.id } })} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>

        <View style={[styles.heroCard, { backgroundColor: habit.color + '22' }]}>
          <View style={[styles.heroIcon, { backgroundColor: habit.color }]}>
            <Text style={styles.heroIconText}>{habit.icon}</Text>
          </View>
          <Text style={styles.heroTitle}>{habit.name}</Text>
          <Text style={styles.heroSubtitle}>You are on a {currentStreak}-day streak.</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Current</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Best</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completionCount}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {(habit.note || habit.frequency || habit.customDays?.length) && (
          <View style={styles.infoCard}>
            {habit.note ? (
              <>
                <Text style={styles.sectionTitle}>Note</Text>
                <Text style={styles.noteText}>{habit.note}</Text>
              </>
            ) : null}

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Schedule</Text>
              <Text style={styles.metaValue}>
                {habit.frequency === 'custom'
                  ? `Custom: ${habit.customDays?.length ? habit.customDays.map((day) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(', ') : 'No days selected'}`
                  : habit.frequency === 'weekdays'
                    ? 'Weekdays only'
                    : 'Every day'}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.historyCard}>
          <Text style={styles.sectionTitle}>7-day history</Text>
          <View style={styles.historyRow}>
            {history.map((day) => (
              <View key={day.key} style={styles.historyDay}>
                <View style={[styles.dayBubble, day.done && { backgroundColor: habit.color, borderColor: habit.color }]}>
                  <Text style={[styles.dayBubbleText, day.done && { color: '#fff' }]}>{day.done ? '✓' : '•'}</Text>
                </View>
                <Text style={styles.dayLabel}>{day.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable onPress={toggleToday} style={[styles.primaryButton, { backgroundColor: habit.color }]}>
          <Text style={styles.primaryButtonText}>
            {habit.completedDates.includes(getDateKey(new Date())) ? 'Mark as not done' : 'Mark as done'}
          </Text>
        </Pressable>

        <Pressable onPress={deleteHabit} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Delete habit</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F9FF',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 22,
    color: '#0F172A',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF7D6',
    borderRadius: 10,
  },
  editText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  heroIcon: {
    width: 82,
    height: 82,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroIconText: {
    fontSize: 38,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  metaValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDay: {
    alignItems: 'center',
    gap: 8,
  },
  dayBubble: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBubbleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#475569',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  secondaryButtonText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '800',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyEmoji: {
    fontSize: 46,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
});
