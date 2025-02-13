import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, ViewStyle, StyleProp, Image } from "react-native";


type WorkoutCardProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  time: string;
}

export function WorkoutCard({style, title, time} : WorkoutCardProps){
    return (
      <>
        <ThemedView style={styles.card}>
          <Image source={require('@/assets/images/pose1.png')} style={styles.image}/>
          <ThemedText>{title}</ThemedText>
          <ThemedText>{time}</ThemedText>
        </ThemedView>
      </>
    );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    margin: 20,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  }

})