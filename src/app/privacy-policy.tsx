import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>Prototype / Demo Notice</Text>
            <Text style={styles.noticeText}>
              This app is a prototype demo and is not a production service. Habit information is stored
              locally on the device for tracking and convenience.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Data storage</Text>
          <Text style={styles.paragraph}>
            HabitFlow currently stores habits, completion dates, and local app settings on the device
            using local storage. This prototype does not require an account or sign-in.
          </Text>

          <Text style={styles.sectionTitle}>Information we collect</Text>
          <Text style={styles.paragraph}>
            The app does not currently collect personal information, analytics identifiers, location,
            or contact details. We do not sell personal information.
          </Text>

          <Text style={styles.sectionTitle}>Data removal</Text>
          <Text style={styles.paragraph}>
            Data may be deleted when the user resets the app, clears local storage, removes the app, or
            uses the reset data option available in the app settings.
          </Text>

          <Text style={styles.sectionTitle}>No account required</Text>
          <Text style={styles.paragraph}>
            The prototype does not require user accounts, login, or external authentication. The app is
            intended to remain simple, local-first, and private by default.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F3EE' },
  screen: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFDFB',
    borderWidth: 1,
    borderColor: '#E8DCC9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 22, color: '#2A1D12', fontWeight: '700' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#2A1D12' },
  spacer: { width: 42 },
  container: { paddingHorizontal: 20, paddingBottom: 36 },
  noticeCard: {
    backgroundColor: '#FFFDFB',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E8DCC9',
    padding: 18,
    marginBottom: 20,
  },
  noticeTitle: { fontSize: 16, fontWeight: '800', color: '#2A1D12', marginBottom: 8 },
  noticeText: { fontSize: 14, lineHeight: 20, color: '#5E4634' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#2A1D12', marginBottom: 8, marginTop: 4 },
  paragraph: { fontSize: 14, lineHeight: 22, color: '#5E4634', marginBottom: 18 },
});
