import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NameScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.title}>What should we call you?</Text>
        <Text style={styles.subtitle}>It&apos;s nice to meet you!</Text>
        <TextInput placeholder="Your name" style={styles.input} defaultValue="Pratap" />
        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/goals')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EFF7FF' },
  screen: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#EFF7FF' },
  title: { fontSize: 36, fontWeight: '900', color: '#1E2F5C', lineHeight: 40 },
  subtitle: { fontSize: 18, color: '#4A5D7A', marginTop: 10, marginBottom: 26 },
  input: {
    backgroundColor: '#F8FCFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7E9F7',
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 18,
    color: '#1E2F5C',
    marginBottom: 28,
  },
  primaryButton: { backgroundColor: '#69C56A', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
});
