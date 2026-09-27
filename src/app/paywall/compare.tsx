import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const freeFeatures = ['Basic tasks', 'Local streaks', '1 penguin'];
const premiumFeatures = ['Unlimited tasks', 'Advanced analytics', 'Custom themes', 'Focus timer'];

export default function CompareScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Compare</Text>
        <Text style={styles.title}>Free vs Premium</Text>

        <View style={styles.compareCard}>
          <View style={styles.columns}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Free</Text>
              {freeFeatures.map((item) => (
                <Text key={item} style={styles.featureText}>• {item}</Text>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={[styles.columnTitle, styles.premiumTitle]}>Premium</Text>
              {premiumFeatures.map((item) => (
                <Text key={item} style={[styles.featureText, styles.featureTextPremium]}>✓ {item}</Text>
              ))}
            </View>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/paywall/limited-offer')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
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
  compareCard: {
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D7EAF8',
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
  },
  columns: {
    flexDirection: 'row',
    gap: 12,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#17212B',
    marginBottom: 18,
  },
  premiumTitle: {
    color: '#60BC63',
  },
  featureText: {
    fontSize: 14,
    color: '#1F2F46',
    fontWeight: '700',
    marginBottom: 10,
  },
  featureTextPremium: {
    color: '#2F9C3A',
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
