import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const penguins = [
  { name: 'Happy', emoji: '🐧', color: '#DDF7E5' },
  { name: 'Brave', emoji: '🐧', color: '#E7F0FF' },
  { name: 'Sunny', emoji: '🐧', color: '#FFF4D8' },
];

export default function PenguinScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Step 8</Text>
        <Text style={styles.title}>Pick your penguin</Text>

        <View style={styles.grid}>
          {penguins.map((penguin, index) => (
            <Pressable key={penguin.name} style={[styles.penguinCard, index === 0 && styles.penguinSelected]}>
              <View style={[styles.avatar, { backgroundColor: penguin.color }]}>
                <Text style={styles.penguinEmoji}>{penguin.emoji}</Text>
              </View>
              <Text style={styles.penguinName}>{penguin.name}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/ready')}>
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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 12,
  },
  penguinCard: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7E9F7',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },
  penguinSelected: {
    borderColor: '#7CCB8D',
    backgroundColor: '#F2FFF7',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  penguinEmoji: {
    fontSize: 42,
  },
  penguinName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2F5C',
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
