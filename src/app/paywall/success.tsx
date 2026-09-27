import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Success</Text>
        <Text style={styles.title}>You’re all set!</Text>

        <View style={styles.card}>
          <Text style={styles.icon}>✅</Text>
          <Text style={styles.message}>Premium unlocked. Your habit journey just got a lot more fun.</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/explore')}>
          <Text style={styles.primaryButtonText}>Start using Premium</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAF5FF' },
  screen: {
    flex: 1,
    backgroundColor: '#EAF5FF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  time: {
    fontSize: 15,
    fontWeight: '700',
    color: '#17212B',
  },
  signal: {
    fontSize: 18,
    color: '#17212B',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#4A7CC3',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#17212B',
    lineHeight: 40,
    marginBottom: 22,
  },
  card: {
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7EAF8',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 50,
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    color: '#1F2F46',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 26,
  },
  primaryButton: {
    backgroundColor: '#60BC63',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
});
