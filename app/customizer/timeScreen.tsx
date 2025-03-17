import { useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function StretchTimingScreen() {
  const { selectedStretches } = useLocalSearchParams() as {
    selectedStretches?: string;
  };
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

  return (
    <>
      <ThemedText type="title" style={styles.title}>
        Selected Stretches
      </ThemedText>
      {Object.entries(timedStretchDict).map(([name, duration]) => (
        <ThemedView key={name} style={styles.strechContainer}>
          <ThemedText style={styles.stretchText}>{`${name}`}</ThemedText>
          <ThemedView style={styles.timeContainer}>
            <TouchableOpacity onPress={() => timeMinus(name)}>
              <Image
                source={require("@/assets/images/minus-white.png")}
                style={styles.images}
              ></Image>
            </TouchableOpacity>
            <ThemedText style={styles.timeDigits}>{duration}s</ThemedText>
            <TouchableOpacity onPress={() => timePlus(name)}>
              <Image
                source={require("@/assets/images/plus-symbol-white.png")}
                style={styles.images}
              ></Image>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  strechContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginLeft: 20,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
  },
  title: {
    alignSelf: "center",
    marginTop: 20,
  },
  images: {
    width: 20,
    height: 20,
    marginHorizontal: 20,
    resizeMode: "cover",
  },
});
