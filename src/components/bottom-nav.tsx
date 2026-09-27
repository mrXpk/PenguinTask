import { router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TabItem = {
  label: string;
  href: string;
  icon: string;
  activeIcon?: string;
  action?: boolean;
};

const tabs: TabItem[] = [
  { label: 'Home', href: '/', icon: 'home-outline', activeIcon: 'home' },
  { label: 'Progress', href: '/progress', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
  { label: 'Add', href: '/new-habit', icon: 'add-circle', activeIcon: 'add-circle', action: true },
  { label: 'Settings', href: '/settings', icon: 'settings-outline', activeIcon: 'settings' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <View pointerEvents="box-none" style={styles.navWrap}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const isAddAction = tab.action;
          const iconName = isAddAction ? tab.icon : isActive && tab.activeIcon ? tab.activeIcon : tab.icon;

          return (
            <Pressable
              key={tab.label}
              onPress={() => {
                if (tab.action) {
                  router.push('/new-habit');
                  return;
                }

                if (pathname !== tab.href) {
                  router.navigate(tab.href as any);
                }
              }}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.navItem,
                isAddAction && styles.navItemAction,
                isActive && !isAddAction && styles.navItemActive,
                pressed && styles.navItemPressed,
              ]}>
              <View style={[styles.iconWrap, isActive && !isAddAction && styles.iconWrapActive, isAddAction && styles.iconWrapAction]}>
                <Ionicons
                  name={iconName as any}
                  size={isAddAction ? 24 : 19}
                  color={isAddAction ? '#FFFFFF' : isActive ? '#3C2A1A' : '#7C6855'}
                />
              </View>
              {!isAddAction && <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.label}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F1E8',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#EFD8BF',
    paddingVertical: 10,
    paddingHorizontal: 8,
    height: 82,
    shadowColor: '#2E251D',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 },
    elevation: 7,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  navItemAction: {
    flex: 1.06,
    minHeight: 64,
  },
  navItemActive: {
    backgroundColor: '#F2E5D2',
    shadowColor: '#7C5B3A',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
  },
  navItemPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: '#FFFDF9',
    shadowColor: '#B38E62',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapAction: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#C8844D',
    shadowColor: '#A35E2E',
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C6855',
    letterSpacing: 0.2,
  },
  navLabelActive: {
    color: '#4A311A',
  },
});
