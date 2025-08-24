import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>NeuroPilot</Text>
      <Link href="/(tabs)/morning">Start Morning →</Link>
      <Link href="/(tabs)/daytime">Daytime tools</Link>
      <Link href="/(tabs)/evening">Evening review</Link>
    </View>
  );
}
