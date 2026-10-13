import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputProps, TextProps, View, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { font, palette as C, sceneColors } from '@/constants/design';
import { Scene } from '@/lib/model';
import { useApp } from '@/state/app-state';
export function Label({ style, muted, bold, ...props }: TextProps & { muted?: boolean; bold?: boolean }) {
  return <Text {...props} style={[{ fontFamily: bold ? font.bold : font.regular, fontSize: 15, lineHeight: 22, color: muted ? C.muted : C.ink }, style]} />;
}
export function Title({ children, small = false }: { children: ReactNode; small?: boolean }) { return <Label accessibilityRole="header" style={{ fontFamily: font.heavy, fontSize: small ? 21 : 28, lineHeight: small ? 28 : 35 }}>{children}</Label>; }
export function Button({ title, onPress, secondary, disabled, icon, testID }: { title: string; onPress: () => void; secondary?: boolean; disabled?: boolean; icon?: keyof typeof Ionicons.glyphMap; testID?: string }) {
  return <Pressable testID={testID} accessibilityRole="button" accessibilityState={{ disabled: !!disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => ({ opacity: disabled ? 0.45 : pressed ? 0.8 : 1, borderRadius: 28, overflow: 'hidden' })}>
    <LinearGradient colors={secondary ? [C.card, C.card] : ['#54A555', '#23813F']} style={[s.button, secondary && { borderColor: C.border }]}>
      <Label bold style={{ color: secondary ? C.green : 'white', fontSize: 16, textAlign: 'center' }}>{title}</Label>
      {icon && <Ionicons name={icon} size={19} color={secondary ? C.green : 'white'} />}
    </LinearGradient>
  </Pressable>;
}
export function IconButton({ name, onPress, label }: { name: keyof typeof Ionicons.glyphMap; onPress: () => void; label: string }) { return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={s.iconButton}><Ionicons name={name} size={23} color={C.ink} /></Pressable>; }
export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) { return <View style={[s.card, style]}>{children}</View>; }
export function Field({ label, ...props }: TextInputProps & { label: string }) { return <View style={{ gap: 7 }}><Label bold>{label}</Label><TextInput accessibilityLabel={label} placeholderTextColor={C.muted} {...props} style={[s.input, props.style]} /></View>; }
export function Screen({ children, title, back, footer, scroll = true }: { children: ReactNode; title?: string; back?: boolean; footer?: ReactNode; scroll?: boolean }) {
  return <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {title && <View style={s.header}>{back && <IconButton name="arrow-back" label="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/home')} />}<View style={{ flex: 1 }}><Title small>{title}</Title></View></View>}
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>{children}</ScrollView> : <View style={[s.content, { flex: 1 }]}>{children}</View>}
      {footer && <SafeAreaView edges={['bottom']} style={s.footer}>{footer}</SafeAreaView>}
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
const artwork = {
  checklist: require('../../assets/art/checklist.png'), waving: require('../../assets/art/waving.png'),
  celebrating: require('../../assets/art/celebrating.png'), writing: require('../../assets/art/writing.png'),
  encouraging: require('../../assets/art/encouraging.png'), sleeping: require('../../assets/art/sleeping.png'),
};
export type Mood = keyof typeof artwork;
export function Penguin({ mood = 'waving', size = 140, scene, equipped = false }: { mood?: Mood; size?: number; scene?: Scene; equipped?: boolean }) {
  const { data } = useApp();
  const accessory = equipped ? data.profile.accessory : null;
  return <View accessible accessibilityLabel={`Pingu ${mood}`} style={{ width: size, height: size, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: scene ? sceneColors[scene] : 'transparent' }}>
    <Image source={artwork[accessory === 'crown' ? 'checklist' : mood]} style={{ width: '100%', height: '100%' }} contentFit="contain" />
    {accessory === 'scarf' && <Svg pointerEvents="none" width={size} height={size} style={StyleSheet.absoluteFill}><Path d={`M ${size*.32} ${size*.52} Q ${size*.5} ${size*.64} ${size*.7} ${size*.52} L ${size*.7} ${size*.6} Q ${size*.5} ${size*.71} ${size*.32} ${size*.6} Z M ${size*.6} ${size*.6} L ${size*.69} ${size*.6} L ${size*.74} ${size*.85} L ${size*.64} ${size*.85} Z`} fill="#C97554" /></Svg>}
  </View>;
}
export function Scenery({ children, style, twilight = false }: { children?: ReactNode; style?: StyleProp<ViewStyle>; twilight?: boolean }) {
  return <View style={[{ backgroundColor: C.ice, overflow: 'hidden', borderRadius: 22 }, style]}><Image source={require('../../assets/art/arctic.png')} contentFit="cover" style={StyleSheet.absoluteFill} />{twilight && <View style={[StyleSheet.absoluteFill, { backgroundColor: '#6C65A744' }]} />}{children}</View>;
}
export function Wordmark() { return <Image accessible accessibilityLabel="Penguin Task" source={require('../../assets/art/wordmark.png')} contentFit="contain" style={{ width: 250, height: 162, alignSelf: 'center' }} />; }
export function ProgressRing({ completed, total, size = 122, percentFirst = false }: { completed: number; total: number; size?: number; percentFirst?: boolean }) {
  const percent = total ? Math.round(completed / total * 100) : 0; const radius = 48; const circumference = Math.PI * radius * 2;
  return <View accessible accessibilityLabel={`${completed} of ${total} complete, ${percent} percent`} style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg viewBox="0 0 112 112" style={StyleSheet.absoluteFill}><Circle cx="56" cy="56" r={radius} fill="none" stroke={C.track} strokeWidth="9" /><Circle cx="56" cy="56" r={radius} fill="none" stroke={C.green} strokeWidth="9" strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={circumference * (1 - Math.min(1, percent / 100))} strokeLinecap="round" rotation="-90" origin="56,56" /></Svg>
    <Label style={{ fontSize: percentFirst ? 28 : 24, lineHeight: 32, fontFamily: font.heavy }}>{percentFirst ? `${percent}%` : `${completed}/${total}`}</Label>
    <Label muted style={{ fontSize: 13 }}>{percentFirst ? `${completed}/${total} completed` : `${percent}%`}</Label>
  </View>;
}
export function CategoryIcon({ name, color, size = 42 }: { name: string; color: string; size?: number }) {
  const valid = name in Ionicons.glyphMap ? name as keyof typeof Ionicons.glyphMap : 'sparkles';
  return <LinearGradient colors={[color, color]} style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FFFFFF66' }}><Ionicons name={valid} size={size * .52} color="white" /></LinearGradient>;
}
export function Stat({ icon, value, label }: { icon: keyof typeof Ionicons.glyphMap; value: number | string; label: string }) { return <View style={s.row}><Ionicons name={icon} size={25} color={C.gold} /><View><Label bold style={{ fontSize: 19 }}>{value}</Label><Label muted style={{ fontSize: 12 }}>{label}</Label></View></View>; }
export function Section({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) { return <View style={[s.row, { justifyContent: 'space-between', marginTop: 7 }]}><Label bold style={{ fontSize: 18 }}>{title}</Label>{action && <Pressable accessibilityRole="button" onPress={onPress} style={{ minHeight: 48, justifyContent: 'center' }}><Label style={{ color: C.green, fontSize: 13 }}>{action} ›</Label></Pressable>}</View>; }
export function Choice({ title, subtitle, selected, onPress, children }: { title: string; subtitle?: string; selected?: boolean; onPress: () => void; children?: ReactNode }) { return <Pressable accessibilityRole="radio" accessibilityState={{ checked: !!selected }} onPress={onPress} style={[s.choice, selected && { borderColor: C.green, backgroundColor: '#F4F9EC' }]}>{children}<View style={{ flex: 1 }}><Label bold>{title}</Label>{subtitle && <Label muted style={{ fontSize: 12 }}>{subtitle}</Label>}</View><Ionicons name={selected ? 'checkmark-circle' : 'ellipse-outline'} size={21} color={selected ? C.green : '#B1BCB9'} /></Pressable>; }
export function EmptyState({ title = 'No tasks yet!', detail = 'Small steps start here. Add your first habit and let’s grow together.', action = 'Add your first task', onPress = () => router.push('/new-habit') }: { title?: string; detail?: string; action?: string; onPress?: () => void }) { return <View style={{ alignItems: 'center', gap: 14, paddingVertical: 24 }}><Penguin mood="encouraging" size={180} /><Title small>{title}</Title><Label muted style={{ textAlign: 'center', maxWidth: 275 }}>{detail}</Label><View style={{ alignSelf: 'stretch', marginTop: 8 }}><Button title={action} onPress={onPress} icon="add" /></View></View>; }
export function BootState() {
  const { error, retry } = useApp();
  return <SafeAreaView style={[s.safe, { justifyContent: 'center', padding: 28, gap: 20 }]}><Penguin mood="sleeping" size={170} /><Title small>{error ? 'Let’s try that again' : 'Getting your little world ready…'}</Title>{error ? <><Label>{error}</Label><Button title="Retry loading" onPress={() => void retry()} /></> : <ActivityIndicator color={C.green} />}</SafeAreaView>;
}
export const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28, gap: 14, flexGrow: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, gap: 6, minHeight: 52 },
  footer: { backgroundColor: C.background, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14, gap: 10 },
  card: { backgroundColor: C.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: C.border, shadowColor: '#26311F', shadowOpacity: .04, shadowRadius: 5, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  button: { minHeight: 50, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 28, borderWidth: 1, borderColor: '#2C7C4055', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  iconButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  input: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 13, minHeight: 50, fontFamily: font.medium, fontSize: 16, color: C.ink },
  choice: { borderWidth: 1.5, borderColor: C.border, backgroundColor: C.card, minHeight: 64, borderRadius: 16, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center' },
});

