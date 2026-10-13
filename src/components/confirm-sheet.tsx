import { Modal, View } from 'react-native';
import { Button, Card, Label, Title } from './ui-kit';
export function ConfirmSheet({ visible, title, detail, action, onCancel, onConfirm, busy }: { visible: boolean; title: string; detail: string; action: string; onCancel: () => void; onConfirm: () => void; busy?: boolean }) {
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}><View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#102A3D99' }}><Card style={{ gap: 18 }}><Title small>{title}</Title><Label>{detail}</Label><Button title={action} disabled={busy} onPress={onConfirm} /><Button title="Keep it" secondary onPress={onCancel} disabled={busy} /></Card></View></Modal>;
}

