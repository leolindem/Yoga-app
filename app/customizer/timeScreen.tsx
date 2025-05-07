import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

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
    const totalSeconds = Object.values(timedStretchDict).reduce((a, b) => a + b, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const totalDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Create new workout object
    const newWorkout = {
      title: "Custom Workout",
      totalDuration: totalDuration,
      stretches: Object.entries(timedStretchDict).map(([name, duration]) => ({
        name: name,
        image: stretchData[name][0],
        duration: duration,
        changeSide: stretchData[name][1]
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

      <TouchableOpacity onPress={saveWorkout}>
        <ThemedView style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Save Workout</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  strechContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
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
});
