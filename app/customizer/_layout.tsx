import { Stack } from "expo-router";


export default function CustomizerLayout() {
    return (
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="timeScreen" options={{ headerShown: false }} />
      </Stack>
    );
}