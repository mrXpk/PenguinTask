import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export type ReminderSettings = {
  enabled: boolean;
  hour: number;
  minute: number;
};

export type ReminderAvailability = {
  available: boolean;
  scheduled: boolean;
  reason?: string;
};

export const REMINDER_SETTINGS_KEY = 'habit-reminder-settings-v1';

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  hour: 8,
  minute: 0,
};

export function formatReminderTime(hour: number, minute = 0) {
  const safeHour = ((hour % 24) + 24) % 24;
  const period = safeHour >= 12 ? 'PM' : 'AM';
  const normalizedHour = safeHour % 12 === 0 ? 12 : safeHour % 12;
  return `${normalizedHour}:${String(minute).padStart(2, '0')} ${period}`;
}

export async function loadReminderSettings(): Promise<ReminderSettings> {
  try {
    const raw = await AsyncStorage.getItem(REMINDER_SETTINGS_KEY);
    if (!raw) return DEFAULT_REMINDER_SETTINGS;

    const parsed = JSON.parse(raw) as Partial<ReminderSettings>;
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_REMINDER_SETTINGS.enabled,
      hour: typeof parsed.hour === 'number' ? Math.min(23, Math.max(0, Math.floor(parsed.hour))) : DEFAULT_REMINDER_SETTINGS.hour,
      minute: typeof parsed.minute === 'number' ? Math.min(59, Math.max(0, Math.floor(parsed.minute))) : DEFAULT_REMINDER_SETTINGS.minute,
    };
  } catch (error) {
    return DEFAULT_REMINDER_SETTINGS;
  }
}

export async function saveReminderSettings(nextSettings: ReminderSettings) {
  await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(nextSettings));
}

export async function updateReminderSchedule(settings: ReminderSettings): Promise<ReminderAvailability> {
  if (Platform.OS === 'web') {
    return {
      available: false,
      scheduled: false,
      reason: 'Notifications are not available in the web preview.',
    };
  }

  const isExpoGo = Constants.appOwnership === 'expo';
  if (Platform.OS === 'android' && isExpoGo) {
    return {
      available: false,
      scheduled: false,
      reason: 'Android push notifications require a development build. Expo Go does not support this feature.',
    };
  }

  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const permissions = await Notifications.getPermissionsAsync();
    if (permissions.status !== 'granted') {
      const requested = await Notifications.requestPermissionsAsync();
      if (requested.status !== 'granted') {
        return {
          available: false,
          scheduled: false,
          reason: 'Notification permission was not granted.',
        };
      }
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    if (!settings.enabled) {
      return { available: true, scheduled: false };
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'HabitFlow reminder',
        body: 'Your habits are waiting for you today ✨',
        sound: 'default',
      },
      trigger: {
        hour: settings.hour,
        minute: settings.minute,
        repeats: true,
      } as any,
    });

    return { available: true, scheduled: true };
  } catch (error) {
    console.warn('Local reminder scheduling is unavailable in the current environment:', error);
    return {
      available: false,
      scheduled: false,
      reason: 'Local reminders are unavailable in this Expo Go environment.',
    };
  }
}
