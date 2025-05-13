import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import workoutDetails, { saveWorkouts } from "@/data/workoutData";
import stretchData from "@/data/stretchesData";

export default function StretchTimingScreen() {
  const { selectedStretches } = useLocalSearchParams() as {
    selectedStretches?: string;
  };
  const router = useRouter();
  const stretches = selectedStretches
    ? JSON.parse(decodeURIComponent(selectedStretches))
    : {};
  const defaultDuration = 30;

  const [timedStretchDict, setTimedStretchDict] = useState<{
    [key: string]: number;
  }>(() => {
    const initialDict: { [key: string]: number } = {};
    Object.keys(stretches).forEach((stretchName) => {
      if (stretches[stretchName]) {
        initialDict[stretchName] = defaultDuration;
      }
    });
    return initialDict;
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  const timeMinus = (stretchName: string) => {
    setTimedStretchDict((prevDict) => ({
      ...prevDict,
      [stretchName]: Math.max(15, prevDict[stretchName] - 15),
    }));
  };

  const timePlus = (stretchName: string) => {
    setTimedStretchDict((prevDict) => ({
      ...prevDict,
      [stretchName]: prevDict[stretchName] + 15,
    }));
  };

  const saveWorkout = async () => {
    // Calculate total duration
    const totalSeconds = Object.values(timedStretchDict).reduce(
      (a, b) => a + b,
      0
    );
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const totalDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Create new workout object
    const newWorkout = {
      title: name,
      totalDuration: totalDuration,
      stretches: Object.entries(timedStretchDict).map(([name, duration]) => ({
        name: name,
        image: stretchData[name][0],
        duration: duration,
        changeSide: stretchData[name][1],
      })),
    };

    // Add new workout to workoutDetails
    const newId = (Object.keys(workoutDetails).length + 1).toString();
    workoutDetails[newId] = newWorkout;

    // Save to AsyncStorage
    await saveWorkouts();

    // Navigate back to main screen
    router.replace("/");
  };

  return (
    <>
      <ThemedText type="title" style={styles.title}>
        Selected Stretches
      </ThemedText>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(timedStretchDict).map(([name, duration]) => (
          <ThemedView key={name} style={styles.strechContainer}>
            <ThemedText style={styles.stretchText}>{`${name}`}</ThemedText>
            <ThemedView style={styles.timeContainer}>
              <TouchableOpacity onPress={() => timeMinus(name)}>
                <Image
                  source={require("@/assets/images/minus-white.png")}
                  style={styles.images}
                />
              </TouchableOpacity>
              <ThemedText style={styles.timeDigits}>{duration}s</ThemedText>
              <TouchableOpacity onPress={() => timePlus(name)}>
                <Image
                  source={require("@/assets/images/plus-symbol-white.png")}
                  style={styles.images}
                />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <ThemedView style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Save Workout</ThemedText>
        </ThemedView>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={styles.centeredView}>
            <ThemedView style={styles.modalContent}>
              <ThemedText style={{ color: "#000000", fontWeight: "bold" }}>
                Name the workout
              </ThemedText>
              <TextInput
                keyboardType="default"
                placeholder="Workout Name"
                placeholderTextColor={"#55565B"}
                maxLength={10}
                style={styles.input}
                onChangeText={setName}
              ></TextInput>
              <ThemedView style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveWorkout}
                  disabled={name.trim().length == 0}
                  style={name.trim().length == 0 && { opacity: 0.5 }}
                >
                  <ThemedText style={styles.modalButtonText}>Accept</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  strechContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  timeDigits: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "bold",
  },
  stretchText: {
    marginLeft: 0,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
  },
  title: {
    alignSelf: "center",
    marginTop: 20,
  },
  images: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
    resizeMode: "cover",
  },
  buttonContainer: {
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    marginTop: 100,
  },
  buttonText: {
    color: "#000000",
    fontSize: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingBottom: 20, // makes room for the button below
    paddingHorizontal: 16,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    maxWidth: 300,
  },
  input: {
    borderWidth: 1,
    height: 50,
    padding: 10,
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
    backgroundColor: "#FFFFFF",
  },
  modalButtonText: {
    color: "#007AFF",
    fontSize: 20,
  },
  modalButton: {
    height: "20%",
  },
});
