import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.title}>
        <ThemedText type="title">Streaks</ThemedText>
      </ThemedView>

      <ThemedText style={styles.streakNum}>0</ThemedText>

      <Link href="/customizer" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Create your workout</ThemedText>
        </TouchableOpacity>
      </Link>

      <Link href="../changeWorkout" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Edit your workouts</ThemedText>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
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
    marginTop: 20, // Adds spacing between buttons
  },
  buttonText: {
    color: "#000000", // Black text
    fontSize: 16,
    paddingHorizontal: 80,
  },
});
