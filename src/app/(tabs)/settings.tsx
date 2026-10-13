import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Switch, View } from 'react-native';
import { Card, Label, Penguin, Screen, s } from '@/components/ui-kit';
import { SettingsRow } from '@/components/settings-row';
import { ConfirmSheet } from '@/components/confirm-sheet';
import { palette as C } from '@/constants/design';
import { useApp } from '@/state/app-state';
export default function Settings() {
  const { data, run, busy } = useApp(); const [reset, setReset] = useState(false);
  return <Screen title="Settings"><Pressable accessibilityRole="button" accessibilityLabel="Edit profile" onPress={() => router.push('/profile')}><Card><View style={s.row}><Penguin size={66} scene={data.profile.scene} equipped /><View><Label bold style={{ fontSize: 18 }}>{data.profile.name || 'Your little world'}</Label><Label muted style={{ fontSize: 12 }}>Keep going! You’ve got this.</Label></View></View></Card></Pressable>
    <Card><SettingsRow title="Edit Profile" icon="person-outline" onPress={() => router.push('/profile')} /><SettingsRow title="Notifications" icon="notifications-outline" detail={data.profile.dailyReminder.enabled ? 'Daily reminder enabled' : 'At your own pace'} onPress={() => router.push('/notifications')} /><View style={[s.row, { minHeight: 58, justifyContent: 'space-between' }]}><Label bold>Reminder sound</Label><Switch disabled={busy} accessibilityLabel="Reminder sound" value={data.profile.sound} onValueChange={sound => void run({ type: 'profile', patch: { sound } })} trackColor={{ true: C.green }} /></View><View style={{ paddingVertical: 12, gap: 8 }}><Label>Appearance <Label muted>· Arctic Light</Label></Label><Label>Language <Label muted>· English</Label></Label></View></Card>
    <Card><SettingsRow title="Help & Support" icon="help-circle-outline" onPress={() => router.push('/help')} /><SettingsRow title="About Penguin Task" icon="information-circle-outline" onPress={() => router.push('/about')} /><SettingsRow title="Privacy" icon="shield-checkmark-outline" onPress={() => router.push('/privacy-policy')} /></Card>
    <Card><SettingsRow title="Reset all data" detail="Clear this device and start fresh" icon="trash-outline" danger onPress={() => setReset(true)} /></Card><Label muted style={{ textAlign: 'center', fontSize: 12 }}>Penguin Task · 1.0.0{ '\n' }Small steps. Big dreams.</Label>
    <ConfirmSheet visible={reset} title="Start a new chapter?" detail="This deletes all habits, history, coins, rewards and preferences on this device, and cancels your reminders. This cannot be undone." action="Reset everything" busy={busy} onCancel={() => setReset(false)} onConfirm={async () => { if (await run({ type: 'reset' })) { setReset(false); router.replace('/'); } }} />
  </Screen>;
}
