import { useState } from 'react';
import { Linking } from 'react-native';
import { BootState, Button, Label, Penguin, Screen } from '@/components/ui-kit';
import { ReminderEditor } from '@/components/reminder-editor';
import { Reminder } from '@/lib/habits';
import { useApp } from '@/state/app-state';
function NotificationsForm({ initial }: { initial: Reminder }) {
  const { run, busy } = useApp(); const [value, setValue] = useState(initial); const [saved, setSaved] = useState(false);
  return <Screen title="Notifications" back><Penguin mood="sleeping" size={165} /><Label>Small reminders, on your terms.</Label><ReminderEditor value={value} onChange={next => { setValue(next); setSaved(false); }} /><Label muted style={{ fontSize: 13 }}>Individual habit reminders can be set when you add or edit a task. Reminder times follow your device’s local time.</Label><Button title={saved ? 'Preferences saved ✓' : 'Save reminder preferences'} disabled={busy} onPress={async () => { setSaved(await run({ type: 'profile', patch: { dailyReminder: value } })); }} /><Button secondary title="Open device settings" onPress={() => void Linking.openSettings().catch(() => undefined)} /><Label muted style={{ fontSize: 12 }}>Your phone’s battery settings can affect notification delivery.</Label></Screen>;
}
export default function NotificationsScreen() { const { data, ready } = useApp(); return ready ? <NotificationsForm initial={data.profile.dailyReminder} /> : <BootState />; }
