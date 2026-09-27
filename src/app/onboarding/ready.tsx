import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReadyScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Final step</Text>
        <Text style={styles.title}>You’re all set to begin.</Text>

        <View style={styles.heroCard}>
          <View style={styles.penguinWrap}>
            <Text style={styles.penguin}>🐧</Text>
          </View>
          <Text style={styles.heroText}>Your penguin buddy is ready to help you build better habits.</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/paywall/value-teaser')}>
          <Text style={styles.primaryButtonText}>Start now</Text>
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
    marginBottom: 24,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7E9F7',
    borderRadius: 26,
    paddingVertical: 28,
    paddingHorizontal: 22,
    marginBottom: 28,
  },
  penguinWrap: {
    width: 150,
    height: 150,
    borderRadius: 36,
    backgroundColor: '#DDF7E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  penguin: {
    fontSize: 82,
  },
  heroText: {
    fontSize: 18,
    color: '#1E2F5C',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
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
