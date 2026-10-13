import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { BootState, Button, Card, CategoryIcon, Choice, EmptyState, Field, Label, Penguin, Screen } from '@/components/ui-kit';
import { ReminderEditor } from '@/components/reminder-editor';
import { palette as C } from '@/constants/design';
import { CATEGORIES, CategoryId, Habit, HabitFrequency, Reminder, WEEKDAY_LABELS } from '@/lib/habits';
import { useApp } from '@/state/app-state';
function Form({ existing }: { existing?: Habit }) {
  const { run, busy, today, data } = useApp();
  const [name, setName] = useState(existing?.name ?? '');
  const [categoryId, setCategory] = useState<CategoryId>(existing?.categoryId ?? 'water');
  const [frequency, setFrequency] = useState<HabitFrequency>(existing?.frequency ?? 'daily');
  const [days, setDays] = useState<number[]>(existing?.customDays ?? []);
  const [note, setNote] = useState(existing?.note ?? '');
  const [reminder, setReminder] = useState<Reminder>(existing?.reminder ?? { enabled: false, hour: 9, minute: 0 });
  const valid = name.trim().length > 0 && (frequency !== 'custom' || days.length > 0);
  const save = async () => {
    if (!valid || busy) return;
    const category = CATEGORIES.find(c => c.id === categoryId)!;
    const current = existing ? data.habits.find(h => h.id === existing.id) : undefined;
    const habit: Habit = { id: existing?.id ?? `habit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: name.trim(), categoryId, icon: category.icon, color: category.color, createdAt: existing?.createdAt ?? today, completedDates: current?.completedDates ?? [], frequency, customDays: frequency === 'custom' ? days : [], note: note.trim(), reminder };
    if (await run({ type: 'saveHabit', habit })) { if (router.canGoBack()) router.back(); else router.replace('/home'); }
  };
  return <Screen title={existing ? 'Edit Task' : 'Add New Task'} back footer={<Button title={busy ? 'Saving…' : 'Save Task'} onPress={() => void save()} disabled={!valid || busy} />}>
    <Penguin mood="writing" size={145} /><Label bold style={{ textAlign: 'center', fontSize: 19, lineHeight: 26, marginBottom: 8 }}>What would you like{ '\n' }to achieve today?</Label>
    <Card><Field label="Task Name" placeholder="e.g. Read a book" value={name} onChangeText={setName} maxLength={80} /></Card>
    <Card><Label bold>Icon</Label><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 9 }}>{CATEGORIES.map(c => <Pressable key={c.id} accessibilityLabel={c.name} accessibilityRole="radio" accessibilityState={{ checked: c.id === categoryId }} onPress={() => setCategory(c.id)} style={{ padding: 4, borderRadius: 28, borderWidth: 2, borderColor: c.id === categoryId ? C.green : 'transparent' }}><CategoryIcon name={c.icon} color={c.color} size={38} /></Pressable>)}</View></Card>
    <Card><Label bold style={{ marginBottom: 10 }}>Frequency</Label><View style={{ gap: 8 }}>{(['daily', 'weekdays', 'custom'] as const).map(f => <Choice key={f} title={f === 'daily' ? 'Every day' : f === 'weekdays' ? 'Weekdays' : 'Choose days'} selected={frequency === f} onPress={() => setFrequency(f)} />)}</View>
      {frequency === 'custom' && <><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>{WEEKDAY_LABELS.map((day, i) => <Pressable key={day} accessibilityRole="checkbox" accessibilityState={{ checked: days.includes(i) }} onPress={() => setDays(days.includes(i) ? days.filter(d => d !== i) : [...days, i].sort())} style={{ minWidth: 46, minHeight: 46, padding: 8, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: days.includes(i) ? C.green : C.border }}><Label style={{ fontSize: 12, color: days.includes(i) ? 'white' : C.ink }}>{day}</Label></Pressable>)}</View>{!days.length && <Label style={{ color: C.red, marginTop: 7 }}>Choose at least one day.</Label>}</>}
    </Card>
    <ReminderEditor value={reminder} onChange={setReminder} />
    <Card><Field label="Notes (optional)" placeholder="A little reminder of your why…" value={note} onChangeText={setNote} multiline maxLength={500} style={{ minHeight: 80, textAlignVertical: 'top' }} /></Card>
  </Screen>;
}
export default function NewHabit() {
  const { habitId } = useLocalSearchParams<{ habitId?: string }>(); const { ready, data } = useApp();
  if (!ready) return <BootState />;
  const existing = data.habits.find(h => h.id === habitId);
  if (habitId && !existing) return <Screen title="Task not found" back><EmptyState title="This task is no longer here" detail="It may have been deleted. Your other habits are safe." action="Back home" onPress={() => router.replace('/home')} /></Screen>;
  return <Form key={existing?.id ?? 'new'} existing={existing} />;
}

