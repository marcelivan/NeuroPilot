import { View, Text, Pressable, Alert } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { deleteAll } from '../../src/lib/db';

export default function Settings(){
  const rate = async () => { if (await StoreReview.hasAction()) { StoreReview.requestReview(); } };
  const feedback = () => { /* open mailto: or feedback form */ };
  const wipe = () => Alert.alert('Delete account data', 'This removes local data. Continue?',[
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: () => { deleteAll(); } }
  ]);
  return (
    <View style={{ padding: 16, gap: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: '800' }}>Settings</Text>
      <Pressable onPress={rate}><Text>Love our free app? Rate it</Text></Pressable>
      <Pressable onPress={feedback}><Text>Have feedback? Write us</Text></Pressable>
      <Pressable onPress={wipe}><Text style={{ color: 'red' }}>Delete account data</Text></Pressable>
    </View>
  );
}
