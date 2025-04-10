import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ChangeSymbolProps {
  style?: StyleProp<ViewStyle>;
}

export function ChangeSymbol({ style }: ChangeSymbolProps) {
  return (
      <View style={style}>
        <View style={styles.circle}>
          <Image
            source={require("@/assets/images/arrow_circle_black.png")}
            style={styles.image}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 120 / 2,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  }
});
