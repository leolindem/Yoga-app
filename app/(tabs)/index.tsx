import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WorkoutCard } from "@/components/WorkoutCard";
import workoutDetails, { Workout, loadWorkouts } from "@/data/workoutData";

export default function HomeScreen() {
  useEffect(() => {
    loadWorkouts();
  }, []);

  const workoutArray: Workout[] = Object.values(workoutDetails);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Good Stretch</ThemedText>
          <FlatList
            data={workoutArray}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 16 }}
            renderItem={({ item, index }) => (
              <WorkoutCard
                title={item.title}
                time={item.totalDuration}
                pathname={`/workout/${(index + 1).toString()}`}
              />
            )}
            contentContainerStyle={styles.grid}
          />
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  grid: {
    paddingVertical: 20,
    flex: 1,
  },
});
