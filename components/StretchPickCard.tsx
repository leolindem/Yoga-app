import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

type StrechCardProps = {
  title: string;
  imagePath: number;
  selected: boolean;
};

export function StretchPickCard({ title, imagePath, selected = false }: StrechCardProps) {
  return (
    <>
      <ThemedView style={!selected ? styles.card : styles.selectedCard }>
        <Image
          source={imagePath}
          style={styles.image}
        />
        <ThemedText type="defaultSemiBold" style={styles.stretchText}>
          {title}
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    margin: 20,
    padding: 10,
    borderColor: "#343635",
    borderWidth: 1,
    borderRadius: 10,
  },
  selectedCard : {
    alignItems: "center",
    margin: 20,
    padding: 10,
    borderColor: "#2ee866",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: "cover",
    borderRadius: 10,
    marginHorizontal: 25,
  },
  stretchText: {
    marginTop: 10,
  },
});
