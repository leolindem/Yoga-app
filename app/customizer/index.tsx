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
  console.log(stretchArray)
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
      <ThemedText>Choose the Stretches</ThemedText>
      <FlatList
        data={stretchArray}
        keyExtractor={([name]) => name}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        renderItem={({ item }) => {
          const [name, imageUrl] = item;
          return (
            <TouchableOpacity onPress={() => toggleSelection(name)}>
              <ThemedView>
                <StretchPickCard
                  title={name}
                  imagePath={imageUrl}
                  selected={selectedStretches[name] || false}
                />
              </ThemedView>
            </TouchableOpacity>
          );
        }}
      />
      <ThemedView style={styles.ListSpace}></ThemedView>
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
    </>
  );
}

const styles = StyleSheet.create({
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
  ListSpace: {
    marginTop: 100,
  },
});
