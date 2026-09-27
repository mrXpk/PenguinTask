import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const reminders = [
  { label: 'Wake up time', time: '7:00 AM' },
  { label: 'Sleep time', time: '10:00 PM' },
  { label: 'Notification time', time: '8:00 AM' },
];

export default function ReminderScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Step 7</Text>
        <Text style={styles.title}>When should we remind you?</Text>

        <View style={styles.list}>
          {reminders.map((item, index) => (
            <Pressable key={item.label} style={[styles.itemRow, index === 0 && styles.itemRowSelected]}>
              <View style={styles.itemLeft}>
                <View style={[styles.iconCircle, index === 0 && styles.iconCircleGreen]}>
                  <Text style={styles.icon}>{index === 0 ? '⏰' : index === 1 ? '🌙' : '🔔'}</Text>
                </View>
                <View>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/penguin')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EBF6FF' },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 26,
    backgroundColor: '#EBF6FF',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  time: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2A44',
  },
  signal: {
    fontSize: 18,
    color: '#1F2A44',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#4A7CC3',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#1E2F5C',
    lineHeight: 40,
    marginBottom: 22,
  },
  list: {
    gap: 12,
    marginBottom: 28,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7E9F7',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  itemRowSelected: {
    borderColor: '#7CCB8D',
    backgroundColor: '#F2FFF7',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#EAF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleGreen: {
    backgroundColor: '#DDF7E5',
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2F5C',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5D7A',
  },
  arrow: {
    fontSize: 26,
    color: '#1E2F5C',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#69C56A',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
});
