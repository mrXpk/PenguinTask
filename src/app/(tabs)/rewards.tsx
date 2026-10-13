import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Button, Card, Label, Penguin, Scenery, Screen, Title, s } from '@/components/ui-kit';
import { palette as C } from '@/constants/design';
import { coinBalance, REWARDS } from '@/lib/model';
import { useApp } from '@/state/app-state';
export default function Rewards() {
  const { data, run, today, busy } = useApp(); const coins = coinBalance(data);
  return <Screen title="Little Rewards"><Scenery twilight={!!data.profile.backdrop} style={{ padding: 20, alignItems: 'center', gap: 8 }}><View style={[s.row, { alignSelf: 'flex-end', backgroundColor: '#FFF3C8', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }]}><Ionicons name="ellipse" color={C.gold} size={18} /><Label bold>{coins}</Label></View><Penguin mood="encouraging" size={155} equipped /><Title small>Penguin Coins</Title><Label style={{ textAlign: 'center', fontSize: 13 }}>Complete habits. Collect little joys.{ '\n' }Make this world your own.</Label></Scenery>
    <Label muted style={{ fontSize: 12, textAlign: 'center' }}>+10 coins for each habit’s first completion of the day</Label>
    {REWARDS.map(reward => { const owned = data.owned.includes(reward.id); const equipped = data.profile.accessory === reward.id || data.profile.backdrop === reward.id; return <Card key={reward.id}><View style={s.row}><View style={{ width: 52, height: 52, borderRadius: 17, backgroundColor: `${reward.color}25`, justifyContent: 'center', alignItems: 'center' }}><Ionicons name={reward.icon} color={reward.color} size={30} /></View><View style={{ flex: 1 }}><Label bold>{reward.title}</Label><Label muted style={{ fontSize: 12 }}>{reward.subtitle}</Label><Label bold style={{ color: '#AA791F', fontSize: 12 }}>{owned ? 'Yours to keep' : `${reward.cost} coins`}</Label></View></View><View style={{ marginTop: 14 }}><Button title={equipped ? 'Equipped ✓' : owned ? 'Equip' : coins < reward.cost ? `${reward.cost - coins} more coins to go` : 'Redeem'} disabled={busy || equipped || (!owned && coins < reward.cost)} secondary={!owned && coins < reward.cost} onPress={() => void run(owned ? { type: 'equip', id: reward.id } : { type: 'redeem', id: reward.id, date: today })} /></View></Card>; })}
    <Label muted style={{ textAlign: 'center', fontSize: 12 }}>Earned with little steps. Never bought with money.</Label>
  </Screen>;
}
