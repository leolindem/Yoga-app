import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity, StyleSheet } from "react-native";

type CheckboxButtonsProps = {
  typeSelected: string[];
  setTypeSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export function CheckboxButtons({
  typeSelected,
  setTypeSelected,
}: CheckboxButtonsProps) {
  
  const toggleType = (type: string) => {
    setTypeSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isSelected = (type: string) => typeSelected.includes(type);

  return (
    <>
      <ThemedView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            toggleType("dynamic");
          }}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <ThemedView
              style={[
                styles.button,
                isSelected("dynamic") && styles.selectedDynamicButton,
              ]}
            />
            <ThemedText>Dynamic</ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleType("static");
          }}
        >
          <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemedView
              style={[
                styles.button,
                isSelected("static") && styles.selectedStaticButton,
              ]}
            />
            <ThemedText>Static</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginRight: 5,
  },
  selectedDynamicButton: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7189FF",
    marginRight: 5,
    backgroundColor: "#7189FF",
  },
  selectedStaticButton: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#624CAB",
    marginRight: 5,
    backgroundColor: "#624CAB",
  },
});
