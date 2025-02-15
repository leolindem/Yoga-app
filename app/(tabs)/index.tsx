import { StyleSheet, SafeAreaView, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WorkoutCard } from "@/components/WorkoutCard";
import workoutDetails, { Workout } from "@/data/workoutData";

const workouts = [
  { id: "1", title: "Morning Yoga", time: "2:00" },
  { id: "2", title: "Flexibility", time: "1:00" },
  { id: "3", title: "Strength", time: "2:40" },
  { id: "4", title: "Relaxation", time: "2:30" },
  { id: "5", title: "Core Workout", time: "3:00" },
  { id: "6", title: "Power Yoga", time: "4:00" },
];

export default function HomeScreen() {

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
            columnWrapperStyle={{ justifyContent: "space-around" }}
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
    alignItems: 'center'
  },
});
