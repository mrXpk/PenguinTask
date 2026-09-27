import { Stack } from 'expo-router';

export default function PaywallLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#EAF5FF' },
      }}
    />
  );
}
