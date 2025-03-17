import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
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

  return (
    <>
      <ThemedText>Choose the Stretches</ThemedText>
      <FlatList
        data={stretchArray}
        keyExtractor={([name]) => name}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        renderItem={({ item }) => {
          const [name, image] = item;
          return (
            <TouchableOpacity onPress={() => toggleSelection(name)}>
              <ThemedView>
                <StretchPickCard
                  title={name}
                  imagePath={image}
                  selected={selectedStretches[name] || false}
                />
              </ThemedView>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
