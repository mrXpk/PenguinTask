import { router } from 'expo-router';
import { useState } from 'react';
import { BootState, Button, Field, Label, Penguin, Screen } from '@/components/ui-kit';
import { ScenePicker } from '@/features/onboarding';
import { Profile } from '@/lib/model';
import { useApp } from '@/state/app-state';
function ProfileForm({ profile }: { profile: Profile }) {
  const { run, busy } = useApp(); const [name, setName] = useState(profile.name); const [scene, setScene] = useState(profile.scene);
  return <Screen title="Your Profile" back footer={<Button title="Save Changes" disabled={busy} onPress={async () => { if (await run({ type: 'profile', patch: { name: name.trim(), scene } })) router.back(); }} />}><Penguin size={145} scene={scene} equipped /><Field label="Your name" value={name} maxLength={40} onChangeText={setName} placeholder="What should Pingu call you?" /><Label bold style={{ marginTop: 14 }}>Your companion</Label><ScenePicker value={scene} onChange={setScene} /><Label muted style={{ fontSize: 12 }}>Your habits are saved on this device. No account needed.</Label></Screen>;
}
export default function ProfileScreen() { const { data, ready } = useApp(); return ready ? <ProfileForm profile={data.profile} /> : <BootState />; }
