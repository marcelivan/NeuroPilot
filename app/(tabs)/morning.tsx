import { View, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { init, upsertToday, markStep } from '../../src/lib/db';

export default function Morning() {
  const [sessionId, setSessionId] = useState<number | null>(null);

  useEffect(() => {
    init();
    setSessionId(upsertToday());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Morning Ritual</Text>
      <Text>Silence timer, record 3 obstacles (with if-then plans), add Memento Mori, set your intention.</Text>
      <Button title="Mark as Done" onPress={() => sessionId && markStep(sessionId, 'morning')} />
    </View>
  );
}
