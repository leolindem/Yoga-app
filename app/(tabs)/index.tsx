import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, Image } from "react-native";

import { WorkoutCard } from "@/components/WorkoutCard";
import { Workout, loadWorkouts } from "@/data/workoutData";

export default function HomeScreen() {
  const [workoutArray, setWorkoutArray] = useState<Workout[]>([]);
  useEffect(() => {
    const loadWorkoutsData = async () => {
      const loadedWorkouts = await loadWorkouts();
      setWorkoutArray(Object.values(loadedWorkouts ?? {}));
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
