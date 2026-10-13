import { useApp } from '@/state/app-state';
export function useHabits() { const { data, ready, run } = useApp(); return { habits: data.habits, isReady: ready, run }; }

