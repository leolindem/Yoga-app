import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet, Image, TouchableOpacity, Animated, FlatList } from "react-native";
import * as Haptics from "expo-haptics";

type WorkoutDetailsProps = {
  title: string;
  duration: string;
  image: any;
  stretches: any;
  setCountdown: (seconds: number) => void;
  setStarted: (started: boolean) => void;
  setCountdownFinished: (finished: boolean) => void;
};

export function WorkoutDetails({
  title,
  duration,
  image,
  stretches,
  setCountdown,
  setStarted,
  setCountdownFinished,
}: WorkoutDetailsProps) {
  const [showCloseTip, setShowCloseTip] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseTip(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title">{title}</ThemedText>
        <ThemedText style={styles.durationText}>
          Duration: {duration}
        </ThemedText>
        <Image source={image} style={styles.details_img} />
        <TouchableOpacity
          onPress={() => {
            setCountdown(3);
            setStarted(true);
            setCountdownFinished(false);
            Haptics.selectionAsync();
          }}
          style={styles.button}
        >
          <ThemedText style={styles.buttonText}>Start Workout</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={{ marginTop: 15 }}>
          Workouts:
        </ThemedText>
        <FlatList
          data={stretches}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <ThemedView style={styles.stretchesContainer}>
              <Image source={item.image} style={styles.image} />
              <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
              <ThemedText>{item.duration}s</ThemedText>
            </ThemedView>
          )}
          style={{ marginTop: 20 }}
        />
      </ThemedView>

      {showCloseTip && (
        <Animated.View
          style={{
            position: "absolute",
            top: 30,
            alignSelf: "center",
            opacity: fadeAnim,
            backgroundColor: "rgba(0,0,0,0.6)",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 12,
          }}
        >
          <ThemedText style={{ color: "white", fontSize: 14 }}>
            Swipe down to close
          </ThemedText>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  details_img: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 5,
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
  durationText: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "300",
    marginTop: 15,
  },
  image: {
    resizeMode: "cover",
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  stretchesContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#343635",
    alignSelf: "center",
    width: "90%",
    padding: 5,
    marginBottom: 10,
    justifyContent: "space-between"
  },
});
