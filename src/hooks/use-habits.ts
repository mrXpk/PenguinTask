import { useCallback, useEffect, useState } from 'react';

import { Habit, loadHabits, saveHabits } from '@/lib/habits';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isReady, setIsReady] = useState(false);

  const refresh = useCallback(async () => {
    const loaded = await loadHabits();
    setHabits(loaded);
    setIsReady(true);
  }, []);

  const updateHabits = useCallback(async (nextHabits: Habit[]) => {
    setHabits(nextHabits);
    await saveHabits(nextHabits);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { habits, isReady, refresh, updateHabits };
}
