import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, Href } from "expo-router";
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getStreakData } from '@/data/streakData';
import React from 'react';

export default function TabTwoScreen() {
  const [currentStreak, setCurrentStreak] = useState(0);

  const loadStreak = async () => {
    const streakData = await getStreakData();
    setCurrentStreak(streakData.currentStreak);
  };

  // Load streak data when component mounts
  useEffect(() => {
    loadStreak();
  }, []);

  // Reload streak data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadStreak();
    }, [])
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.title}>
          <ThemedText type="title">Streaks</ThemedText>
        </ThemedView>
        <ThemedText style={styles.streakNum}>{currentStreak}</ThemedText>
        <Link href={"/customizer" as Href} asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonText}>
              Create your workout
            </ThemedText>
          </TouchableOpacity>
        </Link>
        <Link href={"/edit" as Href} asChild>
          <TouchableOpacity style={styles.editButton}>
            <ThemedText style={styles.buttonText}>
              Edit Workouts
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    marginBottom: 0,
  },
  streakNum: {
    marginTop: 10,
    fontSize: 150,
    lineHeight: 190,
  },
  streakContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    paddingHorizontal: 80,
  },
  editButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 43,
    borderRadius: 5,
    marginTop: 30,
  },
});
