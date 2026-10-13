import { Stack, router } from 'expo-router';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useEffect } from 'react';
import { Platform, Pressable, View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { AppErrorBoundary } from '@/components/app-error-boundary';
import { AppProvider, useApp } from '@/state/app-state';
import { palette as C } from '@/constants/design';
void SplashScreen.preventAutoHideAsync().catch(() => undefined);
function Content() {
  const { error, notice, ready, retry, dismissNotice, data } = useApp();
  useEffect(() => {
    if (Platform.OS === 'web' || !ready || !data.profile.onboardingComplete) return;
    const navigate = (response: Notifications.NotificationResponse | null) => {
      const id = response?.notification.request.content.data?.habitId;
      if (typeof id === 'string' && id) router.push({ pathname: '/habit-detail', params: { habitId: id } });
      else if (response) router.navigate('/home');
      if (response) void Notifications.clearLastNotificationResponseAsync();
    };
    void Notifications.getLastNotificationResponseAsync().then(navigate);
    const sub = Notifications.addNotificationResponseReceivedListener(navigate); return () => sub.remove();
  }, [ready, data.profile.onboardingComplete]);
  return <View style={{ flex: 1 }}><StatusBar style="dark" />
    {ready && (error || notice) && <Pressable accessibilityRole="button" onPress={() => error ? void retry() : dismissNotice()} style={{ padding: 16, paddingTop: 35, backgroundColor: '#FFF0D5' }}><Text style={{ color: C.ink }}>{error ? `${error} Your change was not saved. Dismiss and try again.` : notice}</Text></Pressable>}
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="new-habit" options={{ presentation: 'modal' }} />
    </Stack>
  </View>;
}
export default function RootLayout() {
  const [loaded, error] = useFonts({ Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold });
  useEffect(() => { if (loaded || error) void SplashScreen.hideAsync(); }, [loaded, error]);
  if (!loaded && !error) return null;
  return <AppErrorBoundary><AppProvider><Content /></AppProvider></AppErrorBoundary>;
}

