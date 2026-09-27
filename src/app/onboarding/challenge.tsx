import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const challenges = ['Procrastination', 'Forgetting tasks', 'Staying consistent', 'Low motivation'];

export default function ChallengeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Step 5</Text>
        <Text style={styles.title}>What’s your biggest challenge?</Text>

        <View style={styles.options}>
          {challenges.map((item, index) => (
            <Pressable key={item} style={[styles.optionCard, index === 0 && styles.optionCardSelected]}>
              <View style={styles.optionRow}>
                <Text style={styles.optionText}>{item}</Text>
                {index === 0 && <Text style={styles.check}>✓</Text>}
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/task-goal')}>
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
  options: {
    gap: 12,
    marginBottom: 28,
  },
  optionCard: {
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7E9F7',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionCardSelected: {
    backgroundColor: '#F2FFF7',
    borderColor: '#7CCB8D',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2F5C',
  },
  check: {
    color: '#2FAE4A',
    fontSize: 22,
    fontWeight: '900',
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
