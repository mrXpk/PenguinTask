import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AppData } from './model';
const OWNER = 'penguin-task';
export function formatReminderTime(hour: number, minute = 0) { return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`; }
export async function syncReminders(data: AppData, askPermission = false): Promise<string | null> {
  if (Platform.OS === 'web') return data.profile.dailyReminder.enabled || data.habits.some(h => h.reminder?.enabled) ? 'Reminders work in the Android and iOS app.' : null;
  Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: data.profile.sound, shouldSetBadge: false }) });
  // Cancel only notifications owned by this app feature. A retry reconciles partial schedules.
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(scheduled.filter(n => n.content.data?.owner === OWNER).map(n => Notifications.cancelScheduledNotificationAsync(n.identifier)));
  const enabled = data.profile.dailyReminder.enabled || data.habits.some(h => h.reminder?.enabled);
  if (!enabled) return null;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(data.profile.sound ? 'habits-sound' : 'habits-quiet', {
      name: data.profile.sound ? 'Habit reminders' : 'Quiet habit reminders',
      importance: Notifications.AndroidImportance.DEFAULT, sound: data.profile.sound ? 'default' : null,
    });
  }
  let permission = await Notifications.getPermissionsAsync();
  if (!permission.granted && askPermission) permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) return 'Notifications are off in device settings. Your reminder times have been saved.';
  const channelId = data.profile.sound ? 'habits-sound' : 'habits-quiet';
  const schedule = async (id: string, body: string, hour: number, minute: number, weekday?: number, habitId?: string) => {
    await Notifications.scheduleNotificationAsync({
      identifier: `penguin:${id}`,
      content: { title: 'Penguin Task', body, sound: data.profile.sound ? 'default' : false, data: { owner: OWNER, habitId: habitId ?? '' } },
      trigger: weekday === undefined
        ? { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute, channelId }
        : { type: Notifications.SchedulableTriggerInputTypes.WEEKLY, weekday: weekday + 1, hour, minute, channelId },
    });
  };
  const daily = data.profile.dailyReminder;
  if (daily.enabled) await schedule('daily', 'Small steps, big dreams. A little progress is waiting for you.', daily.hour, daily.minute);
  for (const habit of data.habits) {
    const reminder = habit.reminder; if (!reminder?.enabled) continue;
    const days = habit.frequency === 'daily' ? undefined : habit.frequency === 'weekdays' ? [1, 2, 3, 4, 5] : habit.customDays;
    if (days) { for (const day of days) await schedule(`${habit.id}:${day}`, `Time for ${habit.name}. You’ve got this!`, reminder.hour, reminder.minute, day, habit.id); }
    else await schedule(habit.id, `Time for ${habit.name}. You’ve got this!`, reminder.hour, reminder.minute, undefined, habit.id);
  }
  return null;
}

