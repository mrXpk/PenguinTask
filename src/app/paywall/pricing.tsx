import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PricingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.eyebrow}>Pricing</Text>
        <Text style={styles.title}>Choose your plan</Text>

        <View style={styles.planToggle}>
          <View style={styles.toggleSelected}><Text style={styles.toggleTextSelected}>Monthly</Text></View>
          <Text style={styles.toggleText}>Yearly</Text>
        </View>

        <View style={styles.planCardOuter}>
          <View style={styles.planCard}>
            <Text style={styles.planType}>Premium</Text>
            <Text style={styles.planPrice}>$4.99</Text>
            <Text style={styles.planSub}>/month</Text>
            <View style={styles.features}>
              <Text style={styles.feature}>✓ Unlimited tasks</Text>
              <Text style={styles.feature}>✓ Advanced analytics</Text>
              <Text style={styles.feature}>✓ More penguins</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/paywall/compare')}>
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
  planToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2FC',
    borderRadius: 999,
    padding: 6,
    marginBottom: 20,
  },
  toggleSelected: {
    backgroundColor: '#60BC63',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  toggleTextSelected: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  toggleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#495F7D',
  },
  planCardOuter: {
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#F9FCFF',
    borderWidth: 1,
    borderColor: '#D8EAF8',
    borderRadius: 22,
    padding: 20,
  },
  planType: {
    fontSize: 18,
    fontWeight: '800',
    color: '#17212B',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 42,
    fontWeight: '900',
    color: '#17212B',
  },
  planSub: {
    fontSize: 14,
    color: '#5C758E',
    fontWeight: '700',
    marginBottom: 18,
  },
  features: {
    gap: 10,
  },
  feature: {
    fontSize: 15,
    color: '#1F2F46',
    fontWeight: '700',
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
