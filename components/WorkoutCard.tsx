import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link, Href } from "expo-router";
import React from "react";

type WorkoutCardProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  time: string;
  pathname: string;
  image_url: any;
};

export function WorkoutCard({
  style,
  title,
  time,
  pathname,
  image_url,
}: WorkoutCardProps) {
  return (
    <>
      <Link href={pathname as Href} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <ThemedView style={styles.card}>
            <Image
              source={image_url}
              style={styles.image}
            />
            <ThemedText type="defaultSemiBold" style={styles.stretchText}>
              {title}
            </ThemedText>
            <ThemedText type="defaultSemiBold">{time}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    // margin: 10,
    marginBottom: 15,
    padding: 10,
    borderColor: "#343635",
    borderWidth: 1,
    borderRadius: 10,
    width: 160,
    height: 200,
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: "cover",
    borderRadius: 10,
  },
  stretchText: {
    marginTop: 10,
  },
});
