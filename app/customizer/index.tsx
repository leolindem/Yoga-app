import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Link, Href } from "expo-router";
import stretchData from "@/data/stretchesData";
import { StretchPickCard } from "@/components/StretchPickCard";

export default function CustomizerScreen() {
  const stretchArray = Object.entries(stretchData);
  const [selectedStretches, setSelectedStretches] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSelection = (name: string) => {
    setSelectedStretches((prevSelected) => ({
      ...prevSelected,
      [name]: !prevSelected[name],
    }));
  };

  const selectedStretchesParam = encodeURIComponent(
    JSON.stringify(selectedStretches)
  );
  return (
    <>
      <ThemedText style={styles.title}>Choose the Stretches</ThemedText>
      <FlatList
        data={stretchArray}
        keyExtractor={([name]) => name}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const [name, imageUrl] = item;
          return (
            <TouchableOpacity onPress={() => toggleSelection(name)}>
              <ThemedView>
                <StretchPickCard
                  title={name}
                  imagePath={imageUrl[0]}
                  selected={selectedStretches[name] || false}
                />
              </ThemedView>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.ListStyle}
      />
      <ThemedView style={styles.ListSpace}></ThemedView>
      {Object.values(selectedStretches).filter(Boolean).length > 0 ? (
        <Link
          href={
            `/customizer/timeScreen?selectedStretches=${selectedStretchesParam}` as Href
          }
          asChild
        >
          <TouchableOpacity>
            <ThemedView style={styles.buttonContainer}>
              <ThemedText style={styles.buttonText}>Continue</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </Link>
      ) : (
        <ThemedView style={styles.disabledButtonContainer}>
          <ThemedText style={styles.disabledButtonText}>Continue</ThemedText>
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 30,
    lineHeight: 30,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
  },
  buttonText: {
    color: "#000000",
    fontSize: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  disabledButtonContainer: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "#c9c7c7",
    borderRadius: 7,
  },
  disabledButtonText: {
    color: "#575757",
    fontSize: 25,
    lineHeight: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  ListSpace: {
    marginTop: 100,
  },
  ListStyle : {
    marginHorizontal: 5
  }
});
