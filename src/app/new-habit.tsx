import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useHabits } from '@/hooks/use-habits';
import { COLOR_OPTIONS, FREQUENCY_OPTIONS, HABIT_TEMPLATES, Habit, HabitFrequency, ICON_OPTIONS, WEEKDAY_LABELS } from '@/lib/habits';

export default function NewHabitScreen() {
  const { habits, updateHabits } = useHabits();
  const params = useLocalSearchParams<{ habitId?: string }>();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🌞');
  const [customIconValue, setCustomIconValue] = useState('');
  const [color, setColor] = useState('#7BDFF2');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [customDays, setCustomDays] = useState<number[]>([]);
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const existing = habits.find((habit) => habit.id === params.habitId);
    if (!existing) {
      setIsEditing(false);
      return;
    }

    setName(existing.name);
    setIcon(existing.icon);
    setCustomIconValue(existing.icon);
    setColor(existing.color);
    setFrequency(existing.frequency ?? 'daily');
    setCustomDays(existing.customDays ?? []);
    setNote(existing.note ?? '');
    setIsEditing(true);
  }, [habits, params.habitId]);

  const previewIcon = customIconValue.trim() || icon;
  const isValid = useMemo(() => name.trim().length > 0, [name]);

  const toggleCustomDay = (dayNumber: number) => {
    setCustomDays((current) =>
      current.includes(dayNumber) ? current.filter((day) => day !== dayNumber) : [...current, dayNumber].sort((a, b) => a - b),
    );
  };

  const handleCreate = async () => {
    if (!isValid) return;

    const resolvedIcon = customIconValue.trim() || icon;

    const nextHabit: Habit = {
      id: isEditing && params.habitId ? params.habitId : `habit-${Date.now()}`,
      name: name.trim(),
      icon: resolvedIcon,
      color,
      createdAt: isEditing && params.habitId ? habits.find((habit) => habit.id === params.habitId)?.createdAt ?? new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      completedDates: isEditing && params.habitId ? habits.find((habit) => habit.id === params.habitId)?.completedDates ?? [] : [],
      frequency,
      customDays: frequency === 'custom' ? customDays : [],
      note: note.trim(),
    };

    if (isEditing && params.habitId) {
      const updatedHabits = habits.map((habit) => (habit.id === params.habitId ? nextHabit : habit));
      await updateHabits(updatedHabits);
      router.back();
      return;
    }

    await updateHabits([nextHabit, ...habits]);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>×</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{isEditing ? 'Edit habit' : 'New habit'}</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.previewCard}>
          <View style={[styles.previewIcon, { backgroundColor: color }]}>
            <Text style={styles.previewIconText}>{previewIcon}</Text>
          </View>
          <Text style={styles.previewText}>{name || 'My new habit'}</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Quick start</Text>
          <View style={styles.templateRow}>
            {HABIT_TEMPLATES.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => {
                  setName(template.name);
                  setIcon(template.icon);
                  setColor(template.color);
                  setFrequency(template.frequency);
                  setNote(template.note);
                }}
                style={styles.templateChip}>
                <Text style={styles.templateEmoji}>{template.icon}</Text>
                <Text style={styles.templateLabel}>{template.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Habit name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Brush teeth"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            maxLength={28}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Choose icon</Text>
          <TextInput
            value={customIconValue}
            onChangeText={(value) => {
              setCustomIconValue(value);
              if (value.trim()) {
                setIcon(value.trim());
              }
            }}
            placeholder="Type any emoji…"
            placeholderTextColor="#94A3B8"
            style={styles.iconInput}
            maxLength={2}
          />
          <View style={styles.optionGrid}>
            {ICON_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setIcon(option);
                  setCustomIconValue(option);
                }}
                style={[styles.optionChip, option === previewIcon && styles.optionSelected]}>
                <Text style={styles.optionEmoji}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Pick a color</Text>
          <View style={styles.colorGrid}>
            {COLOR_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => setColor(option)}
                style={[styles.colorChip, { backgroundColor: option }, option === color && styles.colorSelected]}
              />
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.frequencyRow}>
            {FREQUENCY_OPTIONS.map((option) => (
              <Pressable
                key={option}
                onPress={() => setFrequency(option)}
                style={[styles.frequencyChip, frequency === option && styles.frequencyChipSelected]}>
                <Text style={[styles.frequencyLabel, frequency === option && styles.frequencyLabelSelected]}>
                  {option === 'daily' ? 'Daily' : option === 'weekdays' ? 'Weekdays' : 'Custom'}
                </Text>
              </Pressable>
            ))}
          </View>

          {frequency === 'custom' && (
            <View style={styles.customDayRow}>
              {WEEKDAY_LABELS.map((label, index) => (
                <Pressable
                  key={label}
                  onPress={() => toggleCustomDay(index)}
                  style={[styles.dayChip, customDays.includes(index) && styles.dayChipSelected]}>
                  <Text style={[styles.dayLabel, customDays.includes(index) && styles.dayLabelSelected]}>{label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Habit note</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Why do you want to keep this habit?"
            placeholderTextColor="#94A3B8"
            style={styles.noteInput}
            multiline
            maxLength={120}
          />
        </View>

        <Pressable
          onPress={handleCreate}
          disabled={!isValid}
          style={({ pressed }) => [
            styles.createButton,
            { backgroundColor: isValid ? '#FFB703' : '#E2E8F0' },
            pressed && { transform: [{ scale: 0.98 }] },
          ]}>
          <Text style={styles.buttonText}>{isValid ? (isEditing ? 'Save changes' : 'Create habit') : 'Add a name'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F9FF',
  },
  container: {
    padding: 20,
    paddingBottom: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  backText: {
    fontSize: 28,
    color: '#1E293B',
    fontWeight: '700',
    lineHeight: 28,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  spacer: {
    width: 42,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
    marginBottom: 26,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  previewIcon: {
    width: 84,
    height: 84,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  previewIconText: {
    fontSize: 42,
  },
  previewText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  templateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  templateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFDFB',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E8DCC9',
  },
  templateEmoji: {
    fontSize: 16,
  },
  templateLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3A2B1D',
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    borderColor: '#0F172A',
    borderWidth: 2,
    backgroundColor: '#F8FAFC',
  },
  optionEmoji: {
    fontSize: 26,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorChip: {
    width: 38,
    height: 38,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: '#0F172A',
  },
  frequencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  frequencyChipSelected: {
    backgroundColor: '#FFF7D6',
    borderColor: '#F4C95D',
  },
  frequencyLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  frequencyLabelSelected: {
    color: '#0F172A',
  },
  customDayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  dayChip: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  dayLabelSelected: {
    color: '#FFFFFF',
  },
  noteInput: {
    minHeight: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    textAlignVertical: 'top',
  },
  createButton: {
    marginTop: 12,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
});
