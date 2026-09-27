import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LimitedOfferScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Limited Time Offer</Text>
        <Text style={styles.title}>Get 50% off!</Text>

        <View style={styles.offerCard}>
          <View style={styles.penguinWrap}>
            <Text style={styles.penguin}>🐧</Text>
          </View>
          <Text style={styles.offerText}>Unlock all premium features and get a better routine.</Text>
          <View style={styles.timerBox}>
            <Text style={styles.timerText}>23:59:45</Text>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/paywall/success')}>
          <Text style={styles.primaryButtonText}>Get Premium</Text>
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
  offerCard: {
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7EAF8',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 22,
  },
  penguinWrap: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#DDF7E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  penguin: {
    fontSize: 60,
  },
  offerText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#1F2F46',
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 18,
  },
  timerBox: {
    backgroundColor: '#1B2940',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  timerText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2,
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
