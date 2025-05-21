import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, Image } from "react-native";

type StrechCardProps = {
  title: string;
  imagePath: number;
  type: string;
  selected: boolean;
};

export function StretchPickCard({
  title,
  imagePath,
  type,
  selected = false,
}: StrechCardProps) {
  return (
    <>
      <ThemedView style={!selected ? styles.card : styles.selectedCard}>
        <Image source={imagePath} style={styles.image} />
        <ThemedText type="defaultSemiBold" style={styles.stretchText}>
          {title}
        </ThemedText>
        <ThemedView
          style={
            type === "dynamic"
              ? styles.typeDynamicContainer
              : styles.typeStaticContainer
          }
        >
          <ThemedText>{type}</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
    borderColor: "#343635",
    borderWidth: 1,
    borderRadius: 10,
  },
  selectedCard: {
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 10,
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
  typeDynamicContainer: {
    backgroundColor: "#7189FF",
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 15,
  },
  typeStaticContainer: {
    backgroundColor: "#624CAB",
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 15,
  },
});
