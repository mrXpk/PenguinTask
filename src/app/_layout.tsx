import { Stack } from 'expo-router';

import { AppErrorBoundary } from '@/components/app-error-boundary';

export default function RootLayout() {
  return (
    <AppErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F6F9FF' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="progress" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="new-habit" />
        <Stack.Screen name="habit-detail" />
      </Stack>
    </AppErrorBoundary>
  );
}
