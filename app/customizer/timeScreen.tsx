import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StretchTimingScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Timing' }} />
      <ThemedText>Hello</ThemedText>
    </>
  );
}

const styles = StyleSheet.create({
});
