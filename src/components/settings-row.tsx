import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { Label, s } from './ui-kit';
import { palette as C } from '@/constants/design';
export function SettingsRow({ title, icon, detail, onPress, danger }: { title: string; icon: keyof typeof Ionicons.glyphMap; detail?: string; onPress: () => void; danger?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={[s.row, { minHeight: 58, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border }]}><Ionicons name={icon} size={21} color={danger ? C.red : C.ink} /><View style={{ flex: 1 }}><Label bold style={{ fontSize: 14, color: danger ? C.red : C.ink }}>{title}</Label>{detail && <Label muted style={{ fontSize: 11 }}>{detail}</Label>}</View><Ionicons name="chevron-forward" size={17} color={C.muted} /></Pressable>;
}
