import { Link, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Image } from "react-native";

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
  const timedStretchDict: { [key: string]: number } = {};

  Object.keys(stretches).forEach((stretchName) => {
    if (stretches[stretchName]) {
      timedStretchDict[stretchName] = defaultDuration;
    }
  });

  return (
    <>
      <ThemedText type="title" style={styles.title}>
        Selected Stretches
      </ThemedText>
      {Object.entries(timedStretchDict).map(([name, duration]) => (
        <ThemedView key={name} style={styles.strechContainer}>
          <ThemedText style={styles.stretchText}>{`${name}`}</ThemedText>
          <ThemedView style={styles.timeContainer}>
            <Image
              source={require("@/assets/images/minus-white.png")}
              style={styles.images}
            ></Image>
            <ThemedText style={styles.timeDigits}>{duration}s</ThemedText>
            <Image
              source={require("@/assets/images/plus-symbol-white.png")}
              style={styles.images}
            ></Image>
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
