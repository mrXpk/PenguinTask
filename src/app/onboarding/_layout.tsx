import { Stack, Redirect } from 'expo-router';
import { useApp } from '@/state/app-state';
import { BootState } from '@/components/ui-kit';
export default function Layout() { const { ready, data } = useApp(); if (!ready) return <BootState />; if (data.profile.onboardingComplete) return <Redirect href="/home" />; return <Stack screenOptions={{ headerShown: false }} />; }
