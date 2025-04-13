import React, { useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WorkoutCard } from "@/components/WorkoutCard";
import { loadWorkouts, Workout } from "@/data/workoutData";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const [workouts, setWorkouts] = useState<Record<string, Workout>>({});

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const saved = await loadWorkouts();
        setWorkouts(saved);
      };
      fetch();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedText type="title" style={styles.container}>
        Good Stretch
      </ThemedText>

      <FlatList
        data={Object.entries(workouts)}
        keyExtractor={([id]) => id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 16 }}
        renderItem={({ item }) => {
          const [id, workout] = item;
          return (
            <WorkoutCard
              title={workout.title}
              time={workout.totalDuration}
              pathname={`/workout/${id}`}
              image_url={workout.stretches[0]?.image}
            />
          );
        }}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText>No saved workouts yet.</ThemedText>
          </ThemedView>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: "flex-start",
    alignSelf: "center",
    paddingTop: 20,
  },
  grid: {
    paddingBottom: 50,
  },
  empty: {
    marginTop: 40,
    alignItems: "center",
  },
});
