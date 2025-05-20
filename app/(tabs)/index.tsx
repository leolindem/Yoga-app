import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

import { WorkoutCard } from "@/components/WorkoutCard";
import { Workout, loadWorkouts } from "@/data/workoutData";

export default function HomeScreen() {
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
      <SafeAreaView>
        <Image
          source={require("@/assets/images/Logo.png")}
          style={styles.image}
        ></Image>
        <FlatList
          data={workoutArray}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <WorkoutCard
              title={item.workout.title}
              time={item.workout.totalDuration}
              pathname={`/workout/${item.id}`}
              image_url={item.workout.stretches[0].image}
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
    marginTop: 15,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 20,
  },
});
