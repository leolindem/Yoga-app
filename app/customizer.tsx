import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import stretchData from "@/data/stretchesData";
import { StretchPickCard } from "@/components/StretchPickCard";

export default function CustomizerScreen() {
  const stretchArray = Object.entries(stretchData);
  return (
    <>
      <ThemedText>Choose the Stretches</ThemedText>
      <FlatList
        data={stretchArray}
        keyExtractor={([name], index) => `${name}-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        renderItem={({ item }) => {
          const [name, image] = item;
          return (
            <ThemedView>
              <StretchPickCard title={name} image_path={image} />
            </ThemedView>
          );
        }}
      />
    </>
  );
}
