import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type WorkoutFinishedProps = {
  currentStreak: number;
};

export function WorkoutFinished({ currentStreak }: WorkoutFinishedProps) {
  return (
    <>
      <ThemedView style={styles.done}>
        <ThemedText type="title">Workout Done!</ThemedText>
        <ThemedText style={styles.streakText}>
          Current Daily Streak: {currentStreak}
        </ThemedText>
        <ThemedView style={styles.doneButton}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <ThemedText style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  done: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  doneButton: {
    marginTop: 50,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    paddingHorizontal: 80,
  },
  streakText: {
    fontSize: 24,
    marginTop: 20,
  },
});
