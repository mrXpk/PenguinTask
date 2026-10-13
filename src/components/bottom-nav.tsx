import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Label } from './ui-kit';
import { palette as C } from '@/constants/design';
const tabs = [
  { label: 'Home', href: '/home', icon: 'home' },
  { label: 'Progress', href: '/progress', icon: 'bar-chart' },
  { label: 'Add', href: '/new-habit', icon: 'add' },
  { label: 'Rewards', href: '/rewards', icon: 'gift' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
] as const;
export function BottomNav() {
  const pathname = usePathname(); const insets = useSafeAreaInsets();
  return <View style={{ flexDirection: 'row', paddingBottom: Math.max(insets.bottom, 10), paddingTop: 8, paddingHorizontal: 10, backgroundColor: C.background, borderTopWidth: 1, borderTopColor: C.border }}>
    {tabs.map(tab => <Pressable key={tab.label} accessibilityRole={tab.label === 'Add' ? 'button' : 'tab'} accessibilityLabel={tab.label === 'Add' ? 'Add task' : tab.label} accessibilityState={{ selected: pathname === tab.href }} onPress={() => tab.label === 'Add' ? router.push('/new-habit') : router.navigate(tab.href)} style={{ flex: 1, minHeight: 52, alignItems: 'center', justifyContent: 'center' }}>
      <View style={tab.label === 'Add' ? { width: 52, height: 52, marginTop: -26, borderRadius: 26, backgroundColor: C.green, borderWidth: 4, borderColor: C.background, alignItems: 'center', justifyContent: 'center' } : undefined}>
        <Ionicons name={tab.icon} size={tab.label === 'Add' ? 30 : 22} color={tab.label === 'Add' ? 'white' : pathname === tab.href ? C.green : C.muted} />
      </View>
      {tab.label !== 'Add' && <Label bold style={{ fontSize: 10, lineHeight: 18, color: pathname === tab.href ? C.green : C.muted }}>{tab.label}</Label>}
    </Pressable>)}
  </View>;
}

