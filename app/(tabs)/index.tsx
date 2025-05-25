import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Animated
} from "react-native";

import { WorkoutCard } from "@/components/WorkoutCard";
import { Workout, loadWorkouts } from "@/data/workoutData";

export default function HomeScreen() {
  const [workoutArray, setWorkoutArray] = useState<
    { id: string; workout: Workout }[]
  >([]);

  const scrollY = useRef(new Animated.Value(0)).current;

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

  const logoOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.FlatList
          data={workoutArray}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          ListHeaderComponent={
            <Animated.Image
              source={require("@/assets/images/Logo.png")}
              style={[styles.image, { opacity: logoOpacity }]}
            />
          }
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
    paddingBottom: 100,
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
    marginTop: 10,
  },
});
