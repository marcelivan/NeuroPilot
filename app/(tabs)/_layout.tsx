import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { paddingTop: 6, height: Platform.select({ ios: 92, default: 70 }) }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="morning" options={{ title: 'Morning' }} />
      <Tabs.Screen name="daytime" options={{ title: 'Day' }} />
      <Tabs.Screen name="evening" options={{ title: 'Evening' }} />
    </Tabs>
  );
}
