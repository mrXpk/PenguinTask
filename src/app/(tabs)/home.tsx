import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modal, Pressable, View } from 'react-native';
import { HabitCard } from '@/components/habit-card';
import { Button, Card, EmptyState, IconButton, Label, Penguin, ProgressRing, Scenery, Screen, Section, Stat, Title, s } from '@/components/ui-kit';
import { palette as C } from '@/constants/design';
import { dateFromKey, dateOffset, getCurrentStreak, getDateKey, getLongestStreak, getStats, isHabitScheduledForDate } from '@/lib/habits';
import { coinBalance } from '@/lib/model';
import { useApp } from '@/state/app-state';
export default function Home() {
  const { data, today, run, busy } = useApp(); const { habits, profile } = data;
  const date = dateFromKey(today); const scheduled = habits.filter(h => isHabitScheduledForDate(h, date));
  const stats = getStats(habits, date, date);
  const current = Math.max(0, ...habits.map(h => getCurrentStreak(h, date)));
  const best = Math.max(0, ...habits.map(h => getLongestStreak(h, date)));
  const yesterday = dateOffset(date, -1); const missed = habits.filter(h => isHabitScheduledForDate(h, yesterday) && !h.completedDates.includes(getDateKey(yesterday))).length;
  const celebrating = stats.scheduled > 0 && stats.completed === stats.scheduled && !data.celebratedDates.includes(today);
  const dismiss = async () => { await run({ type: 'celebrate', date: today }); };
  const hour = new Date().getHours(); const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  return <Screen>
    <View style={[s.row, { alignItems: 'flex-start', paddingBottom: 8 }]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Edit your profile" onPress={() => router.push('/profile')}><Penguin size={55} scene={profile.scene} equipped /></Pressable>
      <View style={{ flex: 1 }}><Label bold style={{ fontSize: 18, lineHeight: 25 }}>{greeting},{'\n'}{profile.name || 'friend'}! <Ionicons name="sunny" color={C.gold} size={16} /></Label><Label muted style={{ fontSize: 12, lineHeight: 18, marginTop: 5 }}>Keep going! You’re building{ '\n' }better habits.</Label></View>
      <IconButton name="notifications-outline" label="Notification settings" onPress={() => router.push('/notifications')} />
    </View>
    <Card style={{ paddingTop: 18 }}><Label bold>Today’s Progress</Label><View style={[s.row, { marginTop: 12 }]}><ProgressRing completed={stats.completed} total={stats.scheduled} /><View style={{ width: 1, height: 78, backgroundColor: C.border }} /><View style={{ flex: 1, gap: 17 }}><Stat icon="flame" value={current} label="Day streak" /><Stat icon="trophy" value={best} label="Best streak" /></View></View><View pointerEvents="none" style={{ position: 'absolute', right: 6, top: -35 }}><Penguin mood="waving" size={66} /></View></Card>
    <Section title="Today’s Tasks" action="View all" onPress={() => router.push('/tasks')} />
    {!habits.length ? <EmptyState /> : !scheduled.length ? <EmptyState title="A little room to breathe" detail="No habits scheduled today. Enjoy your rest, or make a little plan for tomorrow." action="See all habits" onPress={() => router.push('/tasks')} /> : scheduled.slice(0, 6).map(habit => <HabitCard key={habit.id} habit={habit} />)}
    {scheduled.length > 0 && <Scenery twilight={!!profile.backdrop} style={{ marginTop: 8, minHeight: 113, padding: 16, flexDirection: 'row', alignItems: 'center' }}><View style={{ flex: 1 }}><Label bold style={{ fontSize: 15 }}>{missed ? 'A fresh start, every day.' : 'Small steps. Big changes.'}</Label><Label style={{ fontSize: 12, lineHeight: 18, maxWidth: 200 }}>{missed ? 'Yesterday is behind you. Let’s make a little progress today.' : 'You don’t have to do it all. Just take the next little step.'}</Label></View><Penguin mood={missed ? 'encouraging' : 'writing'} size={84} equipped /></Scenery>}
    <Pressable accessibilityRole="button" onPress={() => router.navigate('/rewards')} style={[s.row, { justifyContent: 'center', paddingVertical: 6 }]}><Ionicons name="ellipse" color={C.gold} size={16} /><Label muted style={{ fontSize: 12 }}>{coinBalance(data)} coins earned · Little wins add up</Label></Pressable>
    <Modal visible={celebrating} transparent animationType="fade" onRequestClose={() => void dismiss()}><View style={{ flex: 1, backgroundColor: '#102A3DCC', justifyContent: 'center', padding: 24 }}><Card style={{ gap: 17, alignItems: 'center', paddingVertical: 28 }}><Penguin mood="celebrating" size={210} /><Title small>All tasks completed!</Title><Label muted style={{ textAlign: 'center' }}>You did it{profile.name ? `, ${profile.name}` : ''}! Every little step made a difference today.</Label><ProgressRing completed={stats.completed} total={stats.scheduled} size={95} /><View style={{ alignSelf: 'stretch' }}><Button title="Awesome!" disabled={busy} onPress={() => void dismiss()} /></View></Card></View></Modal>
  </Screen>;
}
