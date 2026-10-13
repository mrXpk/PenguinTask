import { Switch, View } from 'react-native';
import { useState } from 'react';
import { Reminder } from '@/lib/habits';
import { Card, Field, Label, s } from './ui-kit';
import { palette as C } from '@/constants/design';
export function ReminderEditor({ value, onChange }: { value: Reminder; onChange: (next: Reminder) => void }) {
  const [hour, setHour] = useState(String(value.hour).padStart(2, '0')); const [minute, setMinute] = useState(String(value.minute).padStart(2, '0'));
  return <Card><View style={[s.row, { justifyContent: 'space-between' }]}><View style={{ flex: 1 }}><Label bold>Gentle reminders</Label><Label muted style={{ fontSize: 12 }}>A little nudge, at your own pace.</Label></View><Switch accessibilityLabel="Enable reminders" value={value.enabled} trackColor={{ true: C.green }} onValueChange={enabled => onChange({ ...value, enabled })} /></View>
    {value.enabled && <View style={[s.row, { marginTop: 16 }]}><View style={{ flex: 1 }}><Field label="Hour (0–23)" keyboardType="number-pad" maxLength={2} value={hour} onChangeText={text => { setHour(text.replace(/\D/g, '')); if (text !== '' && +text >= 0 && +text < 24) onChange({ ...value, hour: +text }); }} onBlur={() => setHour(String(value.hour).padStart(2, '0'))} /></View><View style={{ flex: 1 }}><Field label="Minute (0–59)" keyboardType="number-pad" maxLength={2} value={minute} onChangeText={text => { setMinute(text.replace(/\D/g, '')); if (text !== '' && +text >= 0 && +text < 60) onChange({ ...value, minute: +text }); }} onBlur={() => setMinute(String(value.minute).padStart(2, '0'))} /></View></View>}
  </Card>;
}

