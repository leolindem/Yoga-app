import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, Image } from "react-native";

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
          <Image
            source={require("@/assets/images/Logo.png")}
            style={styles.image}
          ></Image>
        {/* <ThemedText type="title" style={styles.container}>
          Good Stretch
        </ThemedText> */}

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
    marginTop: 20
  },
});
