import { Redirect, Tabs } from 'expo-router';
import { BottomNav } from '@/components/bottom-nav';
import { BootState } from '@/components/ui-kit';
import { useApp } from '@/state/app-state';
export default function MainTabs() {
  const { ready, data } = useApp();
  if (!ready) return <BootState />;
  if (!data.profile.onboardingComplete) return <Redirect href="/" />;
  return <Tabs tabBar={() => <BottomNav />} screenOptions={{ headerShown: false, animation: 'none' }}>
    <Tabs.Screen name="home" /><Tabs.Screen name="progress" /><Tabs.Screen name="rewards" /><Tabs.Screen name="settings" />
  </Tabs>;
}

