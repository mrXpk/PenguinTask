import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const languages = [
  'English',
  'हिंदी (Hindi)',
  'Español (Spanish)',
  'Français (French)',
  'Deutsch (German)',
  '日本語 (Japanese)',
  '中文 (Chinese)',
];

export default function LanguageScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <Text style={styles.signal}>◔</Text>
        </View>

        <Text style={styles.title}>Language</Text>

        <View style={styles.list}>
          {languages.map((language, index) => (
            <Pressable
              key={language}
              style={[styles.languageRow, index === 0 && styles.languageRowSelected]}
              onPress={() => router.push('/onboarding/welcome')}
            >
              <Text style={styles.languageText}>{language}</Text>
              {index === 0 && <Text style={styles.check}>✓</Text>}
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.push('/onboarding/welcome')}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFF7FF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#EFF7FF',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 26,
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
    color: '#1F2A44',
  },
  signal: {
    fontSize: 18,
    color: '#1F2A44',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1E2F5C',
    marginBottom: 18,
  },
  list: {
    gap: 12,
    marginBottom: 26,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D5EAF9',
    backgroundColor: '#F9FDFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  languageRowSelected: {
    borderColor: '#67C66A',
    backgroundColor: '#F1FFF4',
  },
  languageText: {
    fontSize: 17,
    color: '#1E2F5C',
    fontWeight: '700',
  },
  check: {
    color: '#2DAE4B',
    fontSize: 20,
    fontWeight: '900',
  },
  primaryButton: {
    backgroundColor: '#69C56A',
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
});
