import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { useHabits } from '@/hooks/use-habits';
import { getCompletionRate, getCurrentStreak, getDateKey, getLongestStreak } from '@/lib/habits';

type ViewMode = 'weekly' | 'monthly';

function getDateRange(count: number) {
  const result: string[] = [];
  const end = new Date();
  end.setHours(12, 0, 0, 0);

  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - index);
    result.push(getDateKey(date));
  }

  return result;
}

function getHeatColor(value: number) {
  if (value <= 0) return '#F0E2D2';
  if (value === 1) return '#E8C6A0';
  if (value === 2) return '#D7A779';
  if (value >= 3) return '#B56B3E';
  return '#F0E2D2';
}

export default function ProgressScreen() {
  const { habits, isReady } = useHabits();
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');

  const data = useMemo(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const dateKeys = getDateRange(viewMode === 'weekly' ? 28 : 35);
    const counts = new Map<string, number>();

    dateKeys.forEach((dateKey) => counts.set(dateKey, 0));
    habits.forEach((habit) => {
      habit.completedDates.forEach((dateKey) => {
        if (counts.has(dateKey)) {
          counts.set(dateKey, (counts.get(dateKey) ?? 0) + 1);
        }
      });
    });

    const completedToday = habits.filter((habit) => habit.completedDates.includes(getDateKey(today))).length;
    const currentStreak = habits.length === 0 ? 0 : Math.max(...habits.map((habit) => getCurrentStreak(habit.completedDates)));
    const bestStreak = habits.length === 0 ? 0 : Math.max(...habits.map((habit) => getLongestStreak(habit.completedDates)));

    return {
      dateKeys,
      counts,
      completedToday,
      totalHabits: habits.length,
      overallRate: habits.length === 0 ? 0 : Math.round((completedToday / habits.length) * 100),
      currentStreak,
      bestStreak,
    };
  }, [habits, viewMode]);

  const weeklySummary = useMemo(() => {
    const start = new Date();
    start.setHours(12, 0, 0, 0);
    start.setDate(start.getDate() - 6);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = getDateKey(date);
      const count = habits.reduce((sum, habit) => sum + (habit.completedDates.includes(key) ? 1 : 0), 0);
      return { key, label: date.toLocaleDateString('en-US', { weekday: 'short' }), value: count };
    });
  }, [habits]);

  const maxWeeklyValue = Math.max(1, ...weeklySummary.map((entry) => entry.value));
  const bestDay = weeklySummary.reduce((best, day) => (day.value > best.value ? day : best), weeklySummary[0] ?? { label: '—', value: 0 });
  const weakestDay = weeklySummary.reduce((weakest, day) => (day.value < weakest.value ? day : weakest), weeklySummary[0] ?? { label: '—', value: 0 });

  if (!isReady) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingTitle}>Loading progress…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>Progress</Text>
          <Text style={styles.title}>Your rhythm</Text>

          <View style={styles.summaryGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Overall</Text>
              <Text style={styles.metricValue}>{data.overallRate}%</Text>
              <Text style={styles.metricMeta}>{data.completedToday}/{data.totalHabits} today</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Current</Text>
              <Text style={styles.metricValue}>{data.currentStreak}</Text>
              <Text style={styles.metricMeta}>day streak</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Best</Text>
              <Text style={styles.metricValue}>{data.bestStreak}</Text>
              <Text style={styles.metricMeta}>record</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Habits</Text>
              <Text style={styles.metricValue}>{data.totalHabits}</Text>
              <Text style={styles.metricMeta}>tracked</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Habit activity</Text>
              <View style={styles.toggleRow}>
                <Pressable
                  onPress={() => setViewMode('weekly')}
                  style={[styles.toggleButton, viewMode === 'weekly' && styles.toggleButtonActive]}>
                  <Text style={[styles.toggleText, viewMode === 'weekly' && styles.toggleTextActive]}>Weekly</Text>
                </Pressable>
                <Pressable
                  onPress={() => setViewMode('monthly')}
                  style={[styles.toggleButton, viewMode === 'monthly' && styles.toggleButtonActive]}>
                  <Text style={[styles.toggleText, viewMode === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.legendRow}>
              <Text style={styles.legendLabel}>Low</Text>
              {[0, 1, 2, 3].map((value) => (
                <View key={value} style={[styles.legendCell, { backgroundColor: getHeatColor(value) }]} />
              ))}
              <Text style={styles.legendLabel}>High</Text>
            </View>

            <View style={styles.heatmapWrap}>
              {data.dateKeys.map((dateKey) => {
                const value = data.counts.get(dateKey) ?? 0;
                const isToday = dateKey === getDateKey(new Date());
                return (
                  <View
                    key={`${dateKey}-${viewMode}`}
                    style={[styles.heatCell, { backgroundColor: getHeatColor(value) }, isToday && styles.heatCellToday]}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Weekly performance</Text>
              <Text style={styles.cardSubtle}>{bestDay.label} was strongest</Text>
            </View>

            <View style={styles.barChart}>
              {weeklySummary.map((day) => (
                <View key={day.key} style={styles.barColumn}>
                  <Text style={styles.barValue}>{day.value}</Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[styles.barFill, { height: `${Math.max(14, (day.value / maxWeeklyValue) * 100)}%` }]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{day.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.daysSummaryRow}>
              <Text style={styles.summaryPill}>Best day: {bestDay.label}</Text>
              <Text style={styles.summaryPillMuted}>Weakest: {weakestDay.label}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Habit performance</Text>
            {habits.length === 0 ? (
              <Text style={styles.emptyText}>Start with a new habit to see performance details here.</Text>
            ) : (
              habits.map((habit) => {
                const completion = getCompletionRate(habit);
                return (
                  <Pressable
                    key={habit.id}
                    onPress={() => router.push({ pathname: '/habit-detail', params: { habitId: habit.id } })}
                    style={styles.habitRow}>
                    <View style={styles.habitMain}>
                      <View style={[styles.habitIcon, { backgroundColor: habit.color }]}>
                        <Text style={styles.habitIconText}>{habit.icon}</Text>
                      </View>
                      <View style={styles.habitMeta}>
                        <Text style={styles.habitName}>{habit.name}</Text>
                        <Text style={styles.habitMetaText}>{Math.round(completion)}% complete · {getCurrentStreak(habit.completedDates)} day streak</Text>
                      </View>
                    </View>
                    <View style={styles.progressMini}>
                      <View style={[styles.progressMiniFill, { width: `${completion}%`, backgroundColor: habit.color }]} />
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F0E7' },
  screen: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 140 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#8A684A',
    fontWeight: '800',
    marginBottom: 8,
  },
  title: { fontSize: 30, fontWeight: '900', color: '#2A1D12', marginBottom: 18 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
  metricCard: {
    width: '47%',
    backgroundColor: '#FFFDFB',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8DCC9',
    shadowColor: '#2A1D12',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  metricLabel: { fontSize: 12, color: '#715A48', textTransform: 'uppercase', fontWeight: '700' },
  metricValue: { fontSize: 28, fontWeight: '900', color: '#2A1D12', marginTop: 8 },
  metricMeta: { fontSize: 12, color: '#775E49', marginTop: 4 },
  card: {
    backgroundColor: '#FFFDFB',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8DCC9',
    marginBottom: 18,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#2A1D12' },
  cardSubtle: { fontSize: 11, color: '#775E49', fontWeight: '700' },
  toggleRow: { flexDirection: 'row', backgroundColor: '#F3E6D2', borderRadius: 999, padding: 4 },
  toggleButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  toggleButtonActive: { backgroundColor: '#C8844D' },
  toggleText: { color: '#5E4634', fontSize: 11, fontWeight: '800' },
  toggleTextActive: { color: '#FFF7F0' },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  legendLabel: { fontSize: 11, color: '#715A48', fontWeight: '700' },
  legendCell: { width: 12, height: 12, borderRadius: 4 },
  heatmapWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  heatCell: { width: 18, height: 18, borderRadius: 6, borderWidth: 1, borderColor: '#F2E7DA' },
  heatCellToday: { borderColor: '#2A1D12', borderWidth: 2 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, gap: 8 },
  barColumn: { flex: 1, alignItems: 'center' },
  barValue: { fontSize: 10, color: '#715A48', fontWeight: '700', marginBottom: 6 },
  barTrack: { width: '100%', maxWidth: 24, height: 80, backgroundColor: '#F2E7DA', borderRadius: 999, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 999, backgroundColor: '#C8844D' },
  barLabel: { fontSize: 10, color: '#715A48', fontWeight: '700', marginTop: 6 },
  daysSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, gap: 8 },
  summaryPill: { backgroundColor: '#F3E6D2', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 8, fontSize: 11, color: '#4B3627', fontWeight: '800' },
  summaryPillMuted: { backgroundColor: '#F6F0E7', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 8, fontSize: 11, color: '#715A48', fontWeight: '700' },
  habitRow: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F2E7DA' },
  habitMain: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  habitIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  habitIconText: { fontSize: 20 },
  habitMeta: { flex: 1 },
  habitName: { fontSize: 15, fontWeight: '800', color: '#2A1D12' },
  habitMetaText: { fontSize: 11, color: '#715A48', marginTop: 4 },
  progressMini: { height: 8, backgroundColor: '#F2E7DA', borderRadius: 999, overflow: 'hidden' },
  progressMiniFill: { height: '100%', borderRadius: 999 },
  emptyText: { fontSize: 14, lineHeight: 20, color: '#715A48' },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingTitle: { fontSize: 20, fontWeight: '800', color: '#2A1D12' },
});
