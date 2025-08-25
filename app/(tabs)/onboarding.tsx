import { View, Text } from 'react-native';

export default function Onboarding() {
  return (
    <View style={{ flex: 1, padding: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
        You are not your thoughts.
      </Text>
      <Text style={{ marginVertical: 16, fontSize: 16, textAlign: 'center' }}>
        Your mind’s chatter is not your essence. NeuroPilot is your cockpit: learn to observe, not identify, and gently pilot your day.
      </Text>
      <Text style={{ marginTop: 32, fontSize: 14, fontStyle: 'italic', textAlign: 'center' }}>
        (Read our full “Operating Manual for the Mind” in More > About)
      </Text>
    </View>
  );
}
