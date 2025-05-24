import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { EditworkoutCard } from "@/components/EditWorkoutCard";
import { Workout, loadWorkouts } from "@/data/workoutData";

export default function EditWorkout() {
  const [workoutArray, setWorkoutArray] = useState<
    { id: string; workout: Workout }[]
  >([]);

  useEffect(() => {
    const loadWorkoutsData = async () => {
      const loadedWorkouts = await loadWorkouts();
      const workoutList = Object.entries(loadedWorkouts ?? {}).map(
        ([id, workout]) => ({
          id,
          workout,
        })
      );
      setWorkoutArray(workoutList);
    };
    loadWorkoutsData();
  }, []);

  return (
    <>
      <ThemedText style={styles.title}>Select Workout to Edit</ThemedText>
      <FlatList
        data={workoutArray}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <EditworkoutCard
            title={item.workout.title}
            image_url={item.workout.stretches[0].image}
            id={item.id}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 15
  },
});
