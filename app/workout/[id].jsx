import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Button, Modal } from "react-native";

export default function WorkoutDetailScreen() {
    const { id } = useLocalSearchParams();

    return(
        <ThemedView>
            <ThemedText>{id}</ThemedText>
        </ThemedView>
    );
}