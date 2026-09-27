import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const benefits = [
  'Unlimited tasks',
  'Advanced analytics',
  'Custom themes',
  'Focus timer',
];

export default function BenefitsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Premium Benefits</Text>
        <Text style={styles.title}>Everything you need to level up.</Text>

        <View style={styles.benefitsWrap}>
          {benefits.map((item, index) => (
            <View key={item} style={styles.benefitCard}>
              <View style={[styles.iconCircle, index % 2 === 0 ? styles.iconPurple : styles.iconBlue]}>
                <Text style={styles.icon}>{index === 0 ? '✓' : index === 1 ? '📊' : index === 2 ? '🎨' : '⏱️'}</Text>
              </View>
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/paywall/pricing')}>
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
    marginBottom: 24,
  },
  benefitsWrap: {
    gap: 12,
    marginBottom: 26,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#DAEBF7',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconPurple: {
    backgroundColor: '#EFEAFF',
  },
  iconBlue: {
    backgroundColor: '#E3F3FF',
  },
  icon: {
    fontSize: 18,
  },
  benefitText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2F46',
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
