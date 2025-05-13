import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

type ControlButtonsProps = {
  currentStretchIndex: number;
  isChangingSides: boolean;
  setCurrentStretchIndex: (index: number) => void;
  togglePause: () => void;
  paused: boolean;
  playIcon: any;
  pauseIcon: any;
};

export function ControlButtons({
  currentStretchIndex,
  isChangingSides,
  setCurrentStretchIndex,
  togglePause,
  paused,
  playIcon,
  pauseIcon
}: ControlButtonsProps) {
  return (
    <>
      <ThemedView style={styles.controlButtonsContainer}>
        <TouchableOpacity
          onPress={() => {
            if (currentStretchIndex > 0 && !isChangingSides) {
              setCurrentStretchIndex(currentStretchIndex - 1);
            }
          }}
          disabled={isChangingSides}
        >
          <Image
            source={require("@/assets/images/back_white.png")}
            style={[
              styles.controlButtons,
              isChangingSides && styles.disabledButton,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePause} disabled={isChangingSides}>
          <Image
            source={paused ? playIcon : pauseIcon}
            style={[
              styles.pauseButton,
              isChangingSides && styles.disabledButton,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!isChangingSides) {
              setCurrentStretchIndex(currentStretchIndex + 1);
            }
          }}
          disabled={isChangingSides}
        >
          <Image
            source={require("@/assets/images/skip_white.png")}
            style={[
              styles.controlButtons,
              isChangingSides && styles.disabledButton,
            ]}
          />
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  controlButtons: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  pauseButton: {
    width: 80,
    height: 80,
    marginHorizontal: 30,
  },
  controlButtonsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginTop: 50,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
