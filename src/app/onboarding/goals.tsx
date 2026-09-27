import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.title}>What do you want to improve?</Text>
        <Text style={styles.subtitle}>Choose the habits that matter most to you.</Text>

        <View style={styles.pillWrap}>
          <Text style={styles.pill}>Wellness</Text>
          <Text style={styles.pill}>Productivity</Text>
          <Text style={styles.pill}>Mindfulness</Text>
          <Text style={styles.pill}>Focus</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/challenge')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EFF7FF' },
  screen: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#EFF7FF' },
  title: { fontSize: 34, fontWeight: '900', color: '#1E2F5C', lineHeight: 40, marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#4A5D7A', marginBottom: 26 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  pill: {
    backgroundColor: '#F8FCFF',
    borderColor: '#D7E9F7',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1E2F5C',
    fontWeight: '700',
  },
  primaryButton: { backgroundColor: '#69C56A', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
});
