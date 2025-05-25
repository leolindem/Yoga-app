import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useCallback } from 'react';
import 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import { View, Text, Image, Animated } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pillTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        Animated.sequence([
          Animated.timing(pillTranslateY, {
            toValue: 10,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(pillTranslateY, {
            toValue: 0,
            friction: 3,
            useNativeDriver: true,
          }),
        ]).start();
      }, 5000);

      return () => clearTimeout(timer);
    }, [])
  );

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
                <Animated.View
                  style={{
                    transform: [{ translateY: pillTranslateY }],
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "#ccc",
                      marginBottom: 0,
                      marginTop: 10,
                    }}
                  />
                </Animated.View>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="customizer"
          options={{
            headerBackTitle: "Back",
            title: "Custom Workout",
            headerBlurEffect: "light",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
