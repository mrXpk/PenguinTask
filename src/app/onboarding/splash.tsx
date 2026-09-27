import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.icon}>◔</Text>
            <Text style={styles.icon}>⌁</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>{'Penguin\nTask'}</Text>
          <Text style={styles.subtitle}>{'Small steps,\nbig dreams!'}</Text>

          <View style={styles.scene}>
            <View style={styles.iceMountainLeft} />
            <View style={styles.iceMountainRight} />

            <View style={styles.penguinWrap}>
              <View style={styles.crown}>
                <View style={styles.crownPoint} />
                <View style={styles.crownPoint} />
                <View style={styles.crownPoint} />
              </View>

              <View style={styles.penguinBody}>
                <View style={styles.penguinHead}>
                  <View style={styles.eye} />
                  <View style={styles.eyeRight} />
                  <View style={styles.cheek} />
                  <View style={styles.beak} />
                </View>

                <View style={styles.board}>
                  <View style={styles.checkmark} />
                </View>
              </View>

              <View style={styles.penguinFeet}>
                <View style={styles.footLeft} />
                <View style={styles.footRight} />
              </View>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/language')}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#BFE9FF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#BFE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  statusBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2A44',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 16,
    color: '#1F2A44',
  },
  hero: {
    width: '100%',
    maxWidth: 430,
    flex: 1,
    backgroundColor: '#CFEFFF',
    borderRadius: 32,
    paddingTop: 16,
    paddingHorizontal: 18,
    paddingBottom: 22,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 58,
    lineHeight: 52,
    fontWeight: '900',
    color: '#1E2F5C',
    textAlign: 'center',
    letterSpacing: -2.5,
    marginTop: 18,
    textShadowColor: 'rgba(30,47,92,0.18)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 26,
    color: '#1E2F5C',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 4,
  },
  scene: {
    width: '100%',
    height: 360,
    marginTop: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  iceMountainLeft: {
    position: 'absolute',
    bottom: 68,
    left: -16,
    width: 180,
    height: 120,
    backgroundColor: '#D7F0FF',
    borderRadius: 100,
    transform: [{ rotate: '8deg' }],
    opacity: 0.9,
  },
  iceMountainRight: {
    position: 'absolute',
    bottom: 72,
    right: -16,
    width: 180,
    height: 120,
    backgroundColor: '#D5EEFF',
    borderRadius: 100,
    transform: [{ rotate: '-8deg' }],
    opacity: 0.9,
  },
  penguinWrap: {
    position: 'relative',
    width: 290,
    height: 250,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crown: {
    position: 'absolute',
    top: 8,
    width: 122,
    height: 44,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  crownPoint: {
    width: 26,
    height: 26,
    backgroundColor: '#FFD94D',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    transform: [{ skewX: '-10deg' }],
    borderWidth: 2,
    borderColor: '#F4C84C',
  },
  penguinBody: {
    position: 'relative',
    width: 220,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  penguinHead: {
    position: 'absolute',
    top: 18,
    width: 126,
    height: 110,
    backgroundColor: '#F6F8FF',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#0F1E2F',
    zIndex: 2,
  },
  eye: {
    position: 'absolute',
    top: 38,
    left: 34,
    width: 12,
    height: 12,
    backgroundColor: '#0F1E2F',
    borderRadius: 8,
  },
  eyeRight: {
    position: 'absolute',
    top: 38,
    right: 34,
    width: 12,
    height: 12,
    backgroundColor: '#0F1E2F',
    borderRadius: 8,
  },
  cheek: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#F8D0C0',
    opacity: 0.8,
  },
  beak: {
    position: 'absolute',
    left: 50,
    bottom: 24,
    width: 26,
    height: 20,
    backgroundColor: '#F9B93C',
    borderRadius: 8,
    transform: [{ rotate: '90deg' }],
  },
  board: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    width: 150,
    height: 98,
    backgroundColor: '#7CD66F',
    borderRadius: 18,
    borderWidth: 8,
    borderColor: '#6BBF66',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    zIndex: 3,
  },
  checkmark: {
    width: 18,
    height: 34,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    marginTop: -8,
  },
  penguinFeet: {
    position: 'absolute',
    bottom: 0,
    width: 190,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  footLeft: {
    width: 40,
    height: 28,
    backgroundColor: '#F7C871',
    borderRadius: 20,
    marginLeft: 16,
  },
  footRight: {
    width: 40,
    height: 28,
    backgroundColor: '#F7C871',
    borderRadius: 20,
    marginRight: 16,
  },
  progressTrack: {
    width: '82%',
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(36, 95, 120, 0.16)',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 18,
  },
  progressFill: {
    width: '72%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#67D274',
  },
  primaryButton: {
    width: '82%',
    backgroundColor: '#69C56A',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E7D32',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
});
