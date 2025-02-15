import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import workoutDetails from "@/data/workoutData";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const workout = workoutDetails[id as string];
  const router = useRouter();

  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const [seconds, setSeconds] = useState(workout.stretches[0].duration);
  const [progress, setProgress] = useState(0);
  const totalStretches = workout.stretches.length;

  useEffect(() => {
    if (currentStretchIndex >= totalStretches) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;

        if (currentStretchIndex < totalStretches - 1){
          setCurrentStretchIndex((prevIndex) => prevIndex + 1);
          return workout.stretches[currentStretchIndex + 1].duration;
        } else {
          clearInterval(interval);
          setCurrentStretchIndex(totalStretches);
          return 0;
        }
      });

      setProgress((prev) =>
        prev >= 1
          ? 0
          : prev + 1 / workout.stretches[currentStretchIndex].duration
      );
    }, 1000);

    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [currentStretchIndex]);

  return (
    <>
      <ThemedView style={styles.workoutTitle}>
        <ThemedText>
          Workout {currentStretchIndex + 1} of {totalStretches}
        </ThemedText>
        <ThemedText>{workout.title}</ThemedText>
      </ThemedView>

      {currentStretchIndex < totalStretches ? (
        <ThemedView style={styles.container} darkColor="#000000">
          <ThemedView darkColor="#000000" style={styles.workout_container}>
            <Image
              source={workout.stretches[currentStretchIndex].image}
              style={styles.image}
            />
            <ProgressBar
              width={300}
              height={20}
              color="white"
              borderRadius={20}
              progress={progress}
            />
            <ThemedText type="title" style={{ marginTop: 30 }}>
              {seconds}s
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView style={styles.done}>
          <ThemedText type="title">Workout Done!</ThemedText>
          <ThemedView style={styles.doneButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}
            >
              <ThemedText style={styles.buttonText}>Back</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  workout_container: {
    alignItems: "center",
  },
  workoutTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 150,
    marginBottom: 20,
  },
  done: {
    flex: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  doneButton: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#FFFFFF", // White background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000", // Black text for contrast
    fontSize: 16,
    paddingHorizontal: 80
  },
});
