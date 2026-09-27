import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Meet your penguin buddy.</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/name')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EFF7FF' },
  screen: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#EFF7FF' },
  title: { fontSize: 34, fontWeight: '900', color: '#1E2F5C', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#4A5D7A', marginBottom: 28 },
  primaryButton: { backgroundColor: '#69C56A', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
});
