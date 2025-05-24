import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { deleteWorkout } from "@/data/workoutData";
import * as Haptics from "expo-haptics";
import React from "react";

type EditWorkoutCardProps = {
  title: string;
  image_url: any;
  id: string;
  setModalVisible: (visible: boolean) => void;
  setSelectedWorkout: (workoutName: string) => void;
  setSelectedId: (id: string) => void;
};

export function EditworkoutCard({
  title,
  image_url,
  id,
  setModalVisible,
  setSelectedWorkout,
  setSelectedId
}: EditWorkoutCardProps) {
  return (
    <>
      <ThemedView style={styles.card}>
        <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={image_url} style={styles.image} />
          <ThemedText type="defaultSemiBold" style={styles.stretchText}>
            {title}
          </ThemedText>
        </ThemedView>
        <TouchableOpacity
          onPress={() => {
            setSelectedWorkout(title);
            setSelectedId(id)
            setModalVisible(true);
          }}
        >
          <ThemedText
            style={{ marginRight: 10, fontWeight: "bold", color: "red" }}
          >
            Delete
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    padding: 10,
    borderColor: "#343635",
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 10,
  },
  stretchText: {
    fontSize: 20,
    lineHeight: 20,
    marginLeft: 15
  },
});
