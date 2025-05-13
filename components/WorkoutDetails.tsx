import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

type WorkoutDetailsProps = {
  title: string;
  image: any;
  setCountdown: (seconds: number) => void;
  setStarted: (started: boolean) => void;
  setCountdownFinished: (finished: boolean) => void;
};

export function WorkoutDetails({
  title,
  image,
  setCountdown,
  setStarted,
  setCountdownFinished,
}: WorkoutDetailsProps) {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title">{title}</ThemedText>
        <Image source={image} style={styles.details_img} />
        <TouchableOpacity
          onPress={() => {
            setCountdown(3);
            setStarted(true);
            setCountdownFinished(false);
          }}
          style={styles.button}
        >
          <ThemedText style={styles.buttonText}>Start Workout</ThemedText>
        </TouchableOpacity>
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
  details_img: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    paddingHorizontal: 80,
  },
});
