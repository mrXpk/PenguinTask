import { Card, Label, Penguin, Screen } from '@/components/ui-kit';
export default function Help() { return <Screen title="Help & Support" back><Penguin mood="encouraging" size={130} />{[
  ['How do I start?', 'Tap the green + button, choose a name and schedule, then save your task. Tap its circle on Home when you finish.'],
  ['How do streaks work?', 'A streak counts consecutive scheduled days you completed a habit. Rest days don’t break it. Today stays open until midnight. The dashboard shows your strongest habit streak.'],
  ['How do coins work?', 'Earn 10 coins the first time you complete a habit each day. Undoing and completing it again does not award more coins. Spend coins on companion cosmetics in Rewards.'],
  ['Where is my data?', 'Your information stays on this device. It survives restarting the app but may be removed if you uninstall or clear app storage. There is no cloud backup in this version.'],
  ['Why didn’t a reminder arrive?', 'Open Notifications, save your preferences again, and check device notification permissions and battery settings. Per-habit reminders follow the habit’s selected days.'],
  ['Something looks wrong?', 'For this testing release, report the screen, steps and app version to the person who invited you to test. You can retry a failed save without resetting your data.'],
].map(([title, text]) => <Card key={title}><Label bold style={{ marginBottom: 8 }}>{title}</Label><Label muted>{text}</Label></Card>)}</Screen>; }
