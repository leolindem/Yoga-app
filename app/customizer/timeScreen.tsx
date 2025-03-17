import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StretchTimingScreen() {
  const { selectedStretches } = useLocalSearchParams() as {
    selectedStretches?: string;
  };
  const stretches = selectedStretches
    ? JSON.parse(decodeURIComponent(selectedStretches))
    : {};

  return (
    <>
      <ThemedText>Selected Stretches:</ThemedText>
      {Object.entries(stretches).map(([name, isSelected]) =>
        isSelected ? <ThemedText key={name}>{name}</ThemedText> : null
      )}
    </>
  );
}

const styles = StyleSheet.create({
});
