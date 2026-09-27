import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { useHabits } from '@/hooks/use-habits';

export default function SettingsScreen() {
  const { habits, updateHabits } = useHabits();

  const totalHabits = habits.length;
  const bestStreak = habits.reduce((highest, habit) => Math.max(highest, habit.completedDates.length), 0);

  const handleResetData = () => {
    Alert.alert('Reset all habits?', 'This clears every saved habit and all progress in this app.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await updateHabits([]);
          Alert.alert('Data cleared', 'All habits have been reset.');
        },
      },
    ]);
  };

  const handleExportData = () => {
    Alert.alert('Export data', 'CSV export is ready for the next pass.');
  };

  const handleAppearanceToggle = () => {
    Alert.alert('Appearance', 'Theme switching is in the next polish pass.');
  };

  const handleWeekToggle = () => {
    Alert.alert('Start of week', 'This setting is coming in the next iteration.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>Settings</Text>
          <Text style={styles.title}>Your preferences</Text>

          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>🐧</Text>
              </View>
              <View style={styles.profileTextWrap}>
                <Text style={styles.profileTitle}>HabitFlow</Text>
                <Text style={styles.profileMeta}>Momentum mode is on</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statChip}>
                <Text style={styles.statChipLabel}>Habits</Text>
                <Text style={styles.statChipValue}>{totalHabits}</Text>
              </View>
              <View style={styles.statChip}>
                <Text style={styles.statChipLabel}>Best</Text>
                <Text style={styles.statChipValue}>{bestStreak}d</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <Pressable onPress={handleAppearanceToggle} style={({ pressed }) => [styles.settingCard, pressed && styles.settingCardPressed]}>
              <View style={styles.settingMain}>
                <View style={styles.settingIcon}><Ionicons name="sunny-outline" size={18} color="#8A684A" /></View>
                <View style={styles.settingTextWrap}>
                  <Text style={styles.settingTitle}>Appearance</Text>
                  <Text style={styles.settingDetail}>Light mode</Text>
                </View>
              </View>
              <View style={styles.settingPill}><Text style={styles.settingPillText}>Light</Text></View>
            </Pressable>

            <Pressable onPress={handleWeekToggle} style={({ pressed }) => [styles.settingCard, pressed && styles.settingCardPressed]}>
              <View style={styles.settingMain}>
                <View style={styles.settingIcon}><Ionicons name="calendar-outline" size={18} color="#8A684A" /></View>
                <View style={styles.settingTextWrap}>
                  <Text style={styles.settingTitle}>Start of week</Text>
                  <Text style={styles.settingDetail}>Monday</Text>
                </View>
              </View>
              <View style={styles.settingPill}><Text style={styles.settingPillText}>Mon</Text></View>
            </Pressable>
          </View>

          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>Data</Text>

            <Pressable onPress={handleExportData} style={({ pressed }) => [styles.settingCard, pressed && styles.settingCardPressed]}>
              <View style={styles.settingMain}>
                <View style={styles.settingIcon}><Ionicons name="download-outline" size={18} color="#8A684A" /></View>
                <View style={styles.settingTextWrap}>
                  <Text style={styles.settingTitle}>Export data</Text>
                  <Text style={styles.settingDetail}>CSV backup</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#7C6855" />
            </Pressable>

            <Pressable onPress={handleResetData} style={({ pressed }) => [styles.settingCard, styles.settingCardDanger, pressed && styles.settingCardPressed]}>
              <View style={styles.settingMain}>
                <View style={[styles.settingIcon, styles.settingIconDanger]}><Ionicons name="trash-outline" size={18} color="#B91C1C" /></View>
                <View style={styles.settingTextWrap}>
                  <Text style={[styles.settingTitle, styles.settingTitleDanger]}>Reset all data</Text>
                  <Text style={styles.settingDetail}>Clear local habits</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#B91C1C" />
            </Pressable>
          </View>

          <View style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>About</Text>

            <Pressable onPress={() => router.push('/privacy-policy' as any)} style={({ pressed }) => [styles.settingCard, pressed && styles.settingCardPressed]}>
              <View style={styles.settingMain}>
                <View style={styles.settingIcon}><Ionicons name="shield-checkmark-outline" size={18} color="#8A684A" /></View>
                <View style={styles.settingTextWrap}>
                  <Text style={styles.settingTitle}>Privacy policy</Text>
                  <Text style={styles.settingDetail}>Read the app policy</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#7C6855" />
            </Pressable>

            <View style={styles.settingCard}>
              <View style={styles.settingMain}>
                <View style={styles.settingIcon}><Ionicons name="information-circle-outline" size={18} color="#8A684A" /></View>
                <View style={styles.settingTextWrap}>
                  <Text style={styles.settingTitle}>App version</Text>
                  <Text style={styles.settingDetail}>HabitFlow 1.0.0</Text>
                </View>
              </View>
              <Text style={styles.badgeText}>v1</Text>
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F3EE',
  },
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 140,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#8A684A',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2A1D12',
    marginBottom: 18,
  },
  profileCard: {
    backgroundColor: '#FFFDFB',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8DCC9',
    padding: 16,
    marginBottom: 22,
    shadowColor: '#2A1D12',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#F9E9CE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 28,
  },
  profileTextWrap: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2A1D12',
  },
  profileMeta: {
    marginTop: 4,
    fontSize: 12,
    color: '#715A48',
  },
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statChip: {
    flex: 1,
    backgroundColor: '#F7F1E8',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E8DCC9',
  },
  statChipLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#7C6855',
  },
  statChipValue: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '900',
    color: '#2A1D12',
  },
  sectionWrap: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#8A684A',
    marginBottom: 10,
    paddingLeft: 4,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: '#FFFDFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8DCC9',
    marginBottom: 10,
  },
  settingCardDanger: {
    borderColor: '#F7C9C9',
    backgroundColor: '#FFF8F8',
  },
  settingCardPressed: {
    opacity: 0.8,
  },
  settingMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F4E7D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingIconDanger: {
    backgroundColor: '#FEE2E2',
  },
  settingTextWrap: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A1D12',
  },
  settingTitleDanger: {
    color: '#B91C1C',
  },
  settingDetail: {
    fontSize: 12,
    color: '#715A48',
    marginTop: 2,
  },
  settingPill: {
    backgroundColor: '#F4E7D6',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  settingPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B4D2B',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C6855',
    backgroundColor: '#F7F1E8',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
