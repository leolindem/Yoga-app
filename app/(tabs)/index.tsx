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
      <SafeAreaView>
        <ThemedText type="title" style={styles.container}>Good Stretch</ThemedText>
        <FlatList
          data={workoutArray}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item, index }) => (
            <WorkoutCard
              title={item.title}
              time={item.totalDuration}
              pathname={`/workout/${(index + 1).toString()}`}
              image_url={item.stretches[0].image}
            />
          )}
          contentContainerStyle={styles.grid}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignSelf: "center",
    paddingTop: 20,
  },
  grid: {
    paddingBottom: 150,
    marginTop: 35,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    gap: 10,
  },
});
