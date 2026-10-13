import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState, ReactNode } from 'react';
import { AppState } from 'react-native';
import { Action, AppData, initialData, reduceData } from '@/lib/model';
import { createRepository } from '@/lib/repository';
import { getDateKey } from '@/lib/habits';
import { syncReminders } from '@/lib/reminders';
const repository = createRepository(AsyncStorage);
type Context = { data: AppData; ready: boolean; error: string | null; notice: string | null; busy: boolean; today: string; run(action: Action): Promise<boolean>; retry(): Promise<void>; dismissNotice(): void };
const Store = createContext<Context | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [data, replace] = useReducer((_: AppData, next: AppData) => next, undefined, initialData);
  const current = useRef(data);
  const [ready, setReady] = useState(false);
  const hydrated = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [today, setToday] = useState(getDateKey(new Date()));
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const load = useCallback(async () => {
    try {
      const next = await repository.load(); current.current = next; replace(next); hydrated.current = true; setReady(true); setError(null);
      queue.current = queue.current.then(async () => { try { setNotice(await syncReminders(current.current)); } catch { setNotice('Reminders could not be scheduled. Open Notifications to retry.'); } });
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to load saved data.'); }
  }, []);
  useEffect(() => { void Promise.resolve().then(load); }, [load]);
  useEffect(() => {
    const tick = () => setToday(getDateKey(new Date()));
    const timer = setInterval(tick, 30000); const subscription = AppState.addEventListener('change', state => { if (state === 'active') tick(); });
    return () => { clearInterval(timer); subscription.remove(); };
  }, []);
  const run = useCallback((action: Action): Promise<boolean> => {
    const result = queue.current.then(async () => {
      if (!hydrated.current) return false;
      setBusy(true);
      try {
        const next = reduceData(current.current, action);
        await repository.save(next);
        current.current = next; replace(next); setError(null);
        const affectsReminders = ['saveHabit', 'deleteHabit', 'reset'].includes(action.type) || (action.type === 'profile' && ('dailyReminder' in action.patch || 'sound' in action.patch));
        if (affectsReminders) {
          try { setNotice(await syncReminders(next, action.type !== 'deleteHabit' && action.type !== 'reset')); }
          catch { setNotice('Your changes are saved, but reminders need attention. Open Notifications and retry.'); }
        }
        return true;
      } catch (e) { setError(e instanceof Error ? e.message : 'Unable to save. Please try again.'); return false; }
      finally { setBusy(false); }
    });
    queue.current = result.catch(() => undefined); return result;
  }, []);
  const retry = useCallback(async () => { if (!hydrated.current) await load(); else setError(null); }, [load]);
  return <Store.Provider value={{ data, ready, error, notice, busy, today, run, retry, dismissNotice: () => setNotice(null) }}>{children}</Store.Provider>;
}
export function useApp() { const value = useContext(Store); if (!value) throw new Error('AppProvider is missing'); return value; }

