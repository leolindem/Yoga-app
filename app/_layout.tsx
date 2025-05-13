import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="workout/[id]"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            header: () => (
              <View style={{ alignItems: "center", paddingTop: 10 }}>
                <View
                  style={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "#ccc",
                    marginBottom: 0,
                    marginTop: 10
                  }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="customizer" options={{
          headerBackTitle: "Back", title: "Custom Workout", headerBlurEffect: "light"
        }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
