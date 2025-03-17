import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Image,
  TouchableOpacity,
} from "react-native";

type StrechCardProps = {
  title: string;
  image_path: string;
};

export function StretchPickCard({
  title,
  image_path,
}: StrechCardProps) {
  return (
    <>
          <ThemedView style={styles.card}>
            <Image
              source={require("@/assets/images/pose1.png")}
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
