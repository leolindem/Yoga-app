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

type WorkoutCardProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  time: string;
  pathname: string;
};

export function WorkoutCard({
  style,
  title,
  time,
  pathname,
}: WorkoutCardProps) {
  return (
    <>
      <Link href={pathname as Href} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <ThemedView style={styles.card}>
            <Image
              source={require("@/assets/images/pose1.png")}
              style={styles.image}
            />
            <ThemedText>{title}</ThemedText>
            <ThemedText>{time}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    margin: 20,
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 80,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
