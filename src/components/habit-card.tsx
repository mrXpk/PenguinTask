import { useRef } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

import { Habit, getCurrentStreak } from '@/lib/habits';

type HabitCardProps = {
  habit: Habit;
  isDoneToday: boolean;
  onToggle: (habitId: string) => void;
  onPress: (habitId: string) => void;
  onLongPress?: (habitId: string, rect: { x: number; y: number; width: number; height: number }) => void;
  onDragStart?: (habitId: string) => void;
  onDragMove?: (habitId: string, dy: number) => void;
  onDragEnd?: (habitId: string) => void;
  isSelected?: boolean;
  isDragging?: boolean;
};

export function HabitCard({
  habit,
  isDoneToday,
  onToggle,
  onPress,
  onLongPress,
  onDragStart,
  onDragMove,
  onDragEnd,
  isSelected,
  isDragging,
}: HabitCardProps) {
  const cardRef = useRef<View>(null);
  const dragHandleResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 4 || Math.abs(gestureState.dx) > 4,
      onPanResponderGrant: () => {
        onDragStart?.(habit.id);
      },
      onPanResponderMove: (_, gestureState) => {
        onDragMove?.(habit.id, gestureState.dy);
      },
      onPanResponderRelease: () => {
        onDragEnd?.(habit.id);
      },
      onPanResponderTerminate: () => {
        onDragEnd?.(habit.id);
      },
    }),
  ).current;

  const streak = getCurrentStreak(habit.completedDates);

  const handleLongPress = () => {
    if (!onLongPress) return;

    cardRef.current?.measureInWindow((x, y, width, height) => {
      onLongPress(habit.id, { x, y, width, height });
    });
  };

  return (
    <View ref={cardRef} style={[styles.cardWrapper, isSelected && styles.cardWrapperSelected, isDragging && styles.cardWrapperDragging]}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onPress(habit.id)}
        onLongPress={handleLongPress}
        style={({ pressed }) => [
          styles.card,
          isDoneToday ? styles.cardDone : styles.cardPending,
          isSelected && styles.cardSelected,
          isDragging && styles.cardDragging,
          { transform: [{ scale: pressed ? 0.985 : 1 }], opacity: pressed ? 0.98 : 1 },
        ]}>
        <View style={styles.row}>
          <View style={styles.leftGroup}>
            <View style={[styles.iconWrap, { backgroundColor: habit.color }]}>
              <Text style={styles.icon}>{habit.icon}</Text>
            </View>

            <Text style={styles.title} numberOfLines={1}>{habit.name}</Text>
          </View>

          <View style={styles.rightGroup}>
            <View style={[styles.streakPill, isDoneToday && styles.streakPillActive]}>
              <Text style={[styles.streakText, isDoneToday && styles.streakTextActive]}>
                {streak > 0 ? `🔥 ${streak}d` : 'New'}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isDoneToday ? `Mark ${habit.name} as not done today` : `Mark ${habit.name} as done today`}
              onPress={(event) => {
                event.stopPropagation();
                onToggle(habit.id);
              }}
              style={({ pressed }) => [
                styles.checkButton,
                {
                  backgroundColor: isDoneToday ? habit.color : '#F7F1E8',
                  borderColor: isDoneToday ? habit.color : '#D3AA7E',
                  transform: [{ scale: pressed ? 0.94 : 1 }],
                },
              ]}>
              <Text style={styles.checkMark}>{isDoneToday ? '✓' : '+'}</Text>
            </Pressable>

            <View {...dragHandleResponder.panHandlers} style={styles.dragHandle}>
              <Text style={styles.dragHandleText}>⋮⋮</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
  },
  cardWrapperSelected: {
    shadowColor: '#6D5EF5',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  cardWrapperDragging: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  card: {
    borderRadius: 16,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderWidth: 1,
    shadowColor: '#2A1D12',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardPending: {
    backgroundColor: '#FFFDFB',
    borderColor: '#F0E1CF',
  },
  cardDone: {
    backgroundColor: '#FFF9F4',
    borderColor: '#F0D4A8',
  },
  cardSelected: {
    borderColor: '#6D5EF5',
    backgroundColor: '#FAF8FF',
  },
  cardDragging: {
    borderColor: '#6D5EF5',
    backgroundColor: '#F6F3FF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    gap: 8,
  },
  leftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#2A1D12',
    letterSpacing: -0.2,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakPill: {
    backgroundColor: '#F5EBDD',
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  streakPillActive: {
    backgroundColor: '#E7D1AA',
  },
  streakText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#6B4D2B',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  streakTextActive: {
    color: '#4E3623',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 14,
  },
  dragHandle: {
    width: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: '#F3E6D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandleText: {
    color: '#6B4D2B',
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 10,
  },
});
