import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, Href } from "expo-router";

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.title}>
          <ThemedText type="title">Streaks</ThemedText>
        </ThemedView>
        <ThemedText style={styles.streakNum}>0</ThemedText>
        <Link href={"/customizer" as Href} asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonText}>Create your workout</ThemedText>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 30,
  },
  streakNum: {
    marginTop: 30,
    fontSize: 150,
    lineHeight: 190,
  },
  streakContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FFFFFF", // White background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000", // Black text for contrast
    fontSize: 16,
    paddingHorizontal: 80,
  },
});
