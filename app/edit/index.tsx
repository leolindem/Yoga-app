import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, FlatList, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import { EditworkoutCard } from "@/components/EditWorkoutCard";
import { Workout, deleteWorkout, loadWorkouts } from "@/data/workoutData";

export default function EditWorkout() {
  const [workoutArray, setWorkoutArray] = useState<
    { id: string; workout: Workout }[]
  >([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const fetchWorkouts = async () => {
    const loadedWorkouts = await loadWorkouts();
    const workoutList = Object.entries(loadedWorkouts ?? {}).map(
      ([id, workout]) => ({
        id,
        workout,
      })
    );
    setWorkoutArray(workoutList);
  };

  useEffect(() => {
    fetchWorkouts();
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
            setModalVisible={setModalVisible}
            setSelectedWorkout={setSelectedWorkout}
            setSelectedId={setSelectedId}
          />
        )}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ThemedView style={styles.centeredView}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={{ color: "#000000" }}>
              Are you sure you want to delete:
            </ThemedText>
            <ThemedText style={{ color: "#000000", fontWeight: "bold" }}>
              {selectedWorkout}
            </ThemedText>
            <ThemedView style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              >
                <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteWorkout(selectedId);
                  setModalVisible(false);
                  fetchWorkouts();
                }}
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              >
                <ThemedText style={styles.modalButtonText}>Confirm</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    alignSelf: "stretch",
  },
  modalButtonText: {
    color: "#007AFF",
    fontSize: 20,
  },
});
