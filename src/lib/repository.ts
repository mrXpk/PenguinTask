import { APP_STORAGE_KEY, AppData, migrateLegacy, parseData } from './model';
import { STORAGE_KEY } from './habits';
export type Storage = { getItem(key: string): Promise<string | null>; setItem(key: string, value: string): Promise<void> };
export function createRepository(storage: Storage) {
  let queue: Promise<void> = Promise.resolve();
  return {
    async load() {
      const raw = await storage.getItem(APP_STORAGE_KEY);
      if (raw !== null) return parseData(raw);
      const data = migrateLegacy(await storage.getItem(STORAGE_KEY));
      await storage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
      return data; // Preserve the legacy key, including after successful migration.
    },
    save(data: AppData) {
      const value = JSON.stringify(data);
      const next = queue.then(() => storage.setItem(APP_STORAGE_KEY, value));
      queue = next.catch(() => undefined); return next;
    },
  };
}

