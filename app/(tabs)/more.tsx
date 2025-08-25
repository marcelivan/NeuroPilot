import { View, Text, Pressable, Linking, ScrollView } from 'react-native';

function Tile({ title, subtitle, url }: { title: string; subtitle: string; url: string }){
  return (
    <Pressable onPress={() => Linking.openURL(url)} style={{ paddingVertical: 18 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>{title}</Text>
      <Text style={{ color: '#666' }}>{subtitle}</Text>
    </Pressable>
  );
}

export default function More(){
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '800' }}>More</Text>
      <Tile title="Manage ADHD in a fun way" subtitle="Bite-size coaching with memes" url="https://apps.apple.com/xyz" />
      <Tile title="Focus & sleep" subtitle="Try white and brown noises" url="https://apps.apple.com/abc" />
      <Tile title="Know someone with ADHD?" subtitle="Share our free app" url="share://app" />
      <Tile title="Settings" subtitle="Preferences and data" url="/settings" />
    </ScrollView>
  );
}
