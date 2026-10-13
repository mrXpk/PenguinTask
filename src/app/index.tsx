import { Redirect, Href } from 'expo-router';
import { BootState } from '@/components/ui-kit';
import { useApp } from '@/state/app-state';
const steps = ['welcome', 'name', 'goals', 'challenge', 'task-goal', 'reminder', 'penguin', 'ready'];
export default function Entry() {
  const { ready, data } = useApp(); if (!ready) return <BootState />;
  if (data.profile.onboardingComplete) return <Redirect href="/home" />;
  const step = steps.includes(data.profile.onboardingStep) ? data.profile.onboardingStep : 'welcome';
  return <Redirect href={(`/onboarding/${step}`) as Href} />;
}

