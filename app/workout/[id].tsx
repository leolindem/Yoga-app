import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Image } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const [seconds, setSeconds] = useState(60);
  const [progress, setProgress] = useState(0);
  let barIncrement = 1 / 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setProgress((prev) => prev + barIncrement);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ThemedView style={styles.workoutTitle}>
        <ThemedText>Workout 1 of 5</ThemedText>
      </ThemedView>

      <ThemedView style={styles.container} darkColor="#000000">
        <ThemedView darkColor="#000000" style={styles.workout_container}>
          <Image
            source={require("@/assets/images/lunge.png")}
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
});
