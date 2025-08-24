import { View, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { init, upsertToday, markStep } from '../../src/lib/db';

export default function Evening() {
  const [sessionId, setSessionId] = useState<number | null>(null);

  useEffect(() => {
    init();
    setSessionId(upsertToday());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Evening Review</Text>
      <Text>Review wins, slips, lessons; note 3 struggle gratitudes and a shadow truth.</Text>
      <Button title="Mark as Done" onPress={() => sessionId && markStep(sessionId, 'evening')} />
    </View>
  );
}
