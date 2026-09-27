import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ValueTeaserScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.batteryRow}>
            <Text style={styles.signal}>◔</Text>
            <Text style={styles.signal}>⌁</Text>
          </View>
        </View>

        <View style={styles.phoneCard}>
          <View style={styles.contentGlow} />

          <View style={styles.headerRow}>
            <View style={styles.penguinBadge}>
              <Text style={styles.penguinIcon}>🐧</Text>
            </View>
            <Text style={styles.crown}>★</Text>
          </View>

          <Text style={styles.title}>Unlock Your Full Potential</Text>

          <View style={styles.overviewWrap}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Your Progress</Text>
              <Text style={styles.metricValue}>67%</Text>
              <Text style={styles.metricSub}>3 day streak</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Tasks</Text>
              <Text style={styles.metricValue}>8/12</Text>
              <Text style={styles.metricSub}>+120 XP</Text>
            </View>
          </View>

          <Text style={styles.summary}>You’re doing great! Imagine what you could achieve with Premium.</Text>

          <View style={styles.actionRow}>
            <Pressable style={styles.primaryButton} onPress={() => router.push('/paywall/benefits')}>
              <Text style={styles.primaryButtonText}>Try Premium Free</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => router.push('/paywall/benefits')}>
              <Text style={styles.secondaryButtonText}>Maybe later</Text>
            </Pressable>
          </View>
        </View>
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
    justifyContent: 'center',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  time: {
    fontSize: 15,
    fontWeight: '700',
    color: '#17212B',
  },
  batteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signal: {
    fontSize: 18,
    color: '#17212B',
  },
  phoneCard: {
    backgroundColor: '#F4FAFF',
    borderRadius: 30,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DBEBF8',
    shadowColor: '#1C2B3A',
    shadowOpacity: 0.09,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  contentGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#DFF5FF',
    bottom: -70,
    right: -70,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  penguinBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#E8F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C7E7F7',
  },
  penguinIcon: {
    fontSize: 30,
  },
  crown: {
    fontSize: 22,
    color: '#F4B94A',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#17212B',
    lineHeight: 34,
    marginBottom: 20,
  },
  overviewWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E4EEF6',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#59728C',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#17212B',
  },
  metricSub: {
    marginTop: 6,
    fontSize: 12,
    color: '#5E7A91',
    fontWeight: '700',
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2A3D53',
    marginBottom: 20,
    zIndex: 1,
  },
  actionRow: {
    gap: 12,
    zIndex: 1,
  },
  primaryButton: {
    backgroundColor: '#60BC63',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DDECF6',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#1B2F48',
    fontSize: 15,
    fontWeight: '800',
  },
});
