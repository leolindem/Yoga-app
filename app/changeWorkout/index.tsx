import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import workoutDetails, { loadWorkouts, saveWorkouts } from "@/data/workoutData";

export default function ChangeWorkoutScreen() {
  const [workouts, setWorkouts] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetch = async () => {
      const fresh = await loadWorkouts();
      setWorkouts(fresh);
    };
    fetch();
  }, []);

  const deleteWorkout = async (id: string) => {
    Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updated = { ...workouts };
          delete updated[id];
          setWorkouts(updated);

          delete workoutDetails[id]; // Also update the global object
          await saveWorkouts(workoutDetails); // Save latest data
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => {
    const [id, workout] = item;

    return (
      <ThemedView style={styles.card}>
        {workout.stretches?.[0]?.image && (
          <Image source={workout.stretches[0].image} style={styles.coverImage} />
        )}
        <ThemedText style={styles.title}>{workout.title}</ThemedText>
        <ThemedText style={styles.duration}>{workout.totalDuration}</ThemedText>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteWorkout(id)}>
          <ThemedText style={styles.deleteText}>✕</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  return (
    <FlatList
      data={Object.entries(workouts)}
      keyExtractor={([id]) => id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <ThemedView style={styles.empty}>
          <ThemedText>No saved workouts yet.</ThemedText>
        </ThemedView>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  duration: {
    marginTop: 4,
    color: "#000",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ffe6e6",
    borderRadius: 12,
    padding: 6,
    zIndex: 10,
  },
  deleteText: {
    fontSize: 18,
    color: "#ff0000",
    fontWeight: "bold",
  },
  coverImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  empty: {
    marginTop: 40,
    alignItems: "center",
  },
});
