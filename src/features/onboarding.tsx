import { Href, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES } from '@/lib/habits';
import { Profile, SCENES, Scene } from '@/lib/model';
import { useApp } from '@/state/app-state';
import { BootState, Button, Card, CategoryIcon, Choice, Field, IconButton, Label, Penguin, Screen, Scenery, Title, Wordmark, s } from '@/components/ui-kit';
import { ReminderEditor } from '@/components/reminder-editor';
import { palette as C, sceneColors } from '@/constants/design';
const steps = ['welcome', 'name', 'goals', 'challenge', 'task-goal', 'reminder', 'penguin', 'ready'] as const;
type Step = typeof steps[number];
export const sceneNames: Record<Scene, string> = { arctic: 'Happy Blue', forest: 'Forest Green', sunset: 'Sunset Orange', night: 'Night Mode' };
export function ScenePicker({ value, onChange }: { value: Scene; onChange: (scene: Scene) => void }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>{SCENES.map((scene, index) => <Pressable key={scene} accessibilityRole="radio" accessibilityState={{ checked: value === scene }} accessibilityLabel={sceneNames[scene]} onPress={() => onChange(scene)} style={{ width: '47%', flexGrow: 1, padding: 8, borderRadius: 18, borderWidth: 2, borderColor: scene === value ? C.green : C.border, backgroundColor: C.card }}>
    <View style={{ borderRadius: 12, backgroundColor: sceneColors[scene], padding: 8 }}><Penguin mood={index === 3 ? 'sleeping' : index === 2 ? 'encouraging' : 'waving'} size={100} /></View><Label bold style={{ textAlign: 'center', fontSize: 12, marginTop: 7 }}>{sceneNames[scene]}{value === scene ? ' ✓' : ''}</Label>
  </Pressable>)}</View>;
}
export default function Onboarding({ step }: { step: Step }) {
  const { data, ready, run, busy } = useApp();
  const [draft, setDraft] = useState<Profile>(data.profile);
  if (!ready) return <BootState />;
  const change = (patch: Partial<Profile>) => setDraft(current => ({ ...current, ...patch }));
  const next = async () => {
    const nextStep = steps[steps.indexOf(step) + 1] ?? 'ready';
    if (await run({ type: 'profile', patch: { ...draft, name: draft.name.trim(), onboardingStep: nextStep, onboardingComplete: step === 'ready' } })) {
      router.replace(step === 'ready' ? '/home' : `/onboarding/${nextStep}` as Href);
    }
  };
  if (step === 'welcome') return <Scenery style={{ flex: 1, borderRadius: 0 }}><SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 28, justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ gap: 18, paddingTop: 25 }}><Wordmark /><Label bold style={{ textAlign: 'center', fontSize: 17, lineHeight: 24 }}>Small steps,{ '\n' }big dreams!</Label></View>
      <Penguin mood="checklist" size={275} />
      <View style={{ alignSelf: 'stretch', gap: 12 }}><Button title="Get Started" icon="arrow-forward" onPress={() => void next()} disabled={busy} /><Label style={{ textAlign: 'center', fontSize: 12 }}>Your habits. Your pace. Your penguin.</Label></View>
    </View>
  </SafeAreaView></Scenery>;
  const titles: Record<Exclude<Step, 'welcome'>, string> = {
    name: 'What should we\ncall you?', goals: 'What are your\nmain goals?', challenge: 'What’s your biggest\nchallenge?',
    'task-goal': 'How many tasks\ndo you want to do daily?', reminder: 'When should we\nremind you?', penguin: 'Pick your penguin', ready: 'Your next chapter\nstarts small.',
  };
  const subtitles: Record<Exclude<Step, 'welcome'>, string> = {
    name: 'It’s nice to meet you!', goals: 'Select all that apply.', challenge: 'Choose one. We’re in this together.',
    'task-goal': 'Start small. Build the habit.', reminder: 'Make a little time for yourself.', penguin: 'Your style, your vibe!', ready: 'Pingu is ready to cheer you on.',
  };
  return <Screen footer={<><Button title={step === 'ready' ? 'Let’s Go!' : 'Continue'} icon="arrow-forward" disabled={busy} onPress={() => void next()} />{['name', 'goals', 'challenge', 'reminder'].includes(step) && <Pressable accessibilityRole="button" onPress={() => void next()} style={{ alignItems: 'center', minHeight: 44, justifyContent: 'center' }}><Label muted style={{ fontSize: 12 }}>Skip for now</Label></Pressable>}</>}>
    <View style={[s.row, { marginLeft: -12 }]}><IconButton name="arrow-back" label="Previous step" onPress={() => router.replace(`/onboarding/${steps[Math.max(0, steps.indexOf(step) - 1)]}` as Href)} /><View style={{ flex: 1, height: 4, borderRadius: 4, backgroundColor: C.border }}><View style={{ width: `${steps.indexOf(step) / (steps.length - 1) * 100}%`, height: 4, backgroundColor: C.green, borderRadius: 4 }} /></View><Label muted style={{ fontSize: 11 }}>{steps.indexOf(step)}/7</Label></View>
    <Title>{titles[step]}</Title><Label muted>{subtitles[step]}</Label>
    {step === 'name' && <><Penguin mood="checklist" size={185} /><Field label="Your name" placeholder="e.g. Pratap" value={draft.name} onChangeText={name => change({ name })} maxLength={40} autoComplete="given-name" /></>}
    {step === 'goals' && <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>{CATEGORIES.slice(0, 6).map(category => <Pressable key={category.id} accessibilityRole="checkbox" accessibilityState={{ checked: draft.goals.includes(category.id) }} onPress={() => change({ goals: draft.goals.includes(category.id) ? draft.goals.filter(g => g !== category.id) : [...draft.goals, category.id] })} style={{ width: '47%', flexGrow: 1, alignItems: 'center', padding: 16, gap: 8, borderRadius: 16, borderWidth: 1.5, borderColor: draft.goals.includes(category.id) ? C.green : C.border, backgroundColor: C.card }}><CategoryIcon name={category.icon} color={category.color} /><Label bold style={{ fontSize: 13 }}>{category.name}{draft.goals.includes(category.id) ? ' ✓' : ''}</Label></Pressable>)}</View>}
    {step === 'challenge' && <>{['Procrastination', 'Forgetting tasks', 'Staying consistent', 'Too many distractions', 'Low motivation'].map(challenge => <Choice key={challenge} title={challenge} selected={draft.challenge === challenge} onPress={() => change({ challenge })} />)}<Penguin mood="encouraging" size={125} /></>}
    {step === 'task-goal' && <>{[{ target: 3, title: '3 – 5', subtitle: 'Easy · a gentle beginning' }, { target: 5, title: '5 – 8', subtitle: 'Balanced · find your rhythm' }, { target: 8, title: '8 – 12', subtitle: 'Ambitious · make room to grow' }].map(option => <Choice key={option.target} title={option.title} subtitle={option.subtitle} selected={draft.target === option.target} onPress={() => change({ target: option.target })} />)}<Penguin mood="writing" size={175} /></>}
    {step === 'reminder' && <><ReminderEditor value={draft.dailyReminder} onChange={dailyReminder => change({ dailyReminder })} /><Penguin mood="sleeping" size={210} /><Label muted style={{ textAlign: 'center', fontSize: 12 }}>You can change this anytime in Settings.</Label></>}
    {step === 'penguin' && <><ScenePicker value={draft.scene} onChange={scene => change({ scene })} /><Label muted style={{ textAlign: 'center', fontSize: 12 }}>A little companion for every kind of day.</Label></>}
    {step === 'ready' && <><Scenery style={{ padding: 24 }}><Penguin mood="celebrating" size={230} /></Scenery><Card><Label bold style={{ textAlign: 'center', fontSize: 19 }}>{draft.name ? `You’ve got this, ${draft.name}!` : 'You’ve got this!'}</Label><Label muted style={{ textAlign: 'center', marginTop: 8 }}>Start with one habit. Every small step is a reason to celebrate.</Label></Card></>}
  </Screen>;
}

