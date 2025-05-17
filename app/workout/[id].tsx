import { useState, useEffect, useRef } from "react";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { Workout, loadWorkouts } from "@/data/workoutData";
import { ChangeSymbol } from "@/components/ui/ChangeSymbol";
import { updateStreak } from "@/data/streakData";
import { WorkoutFinished } from "@/components/WorkoutFinished";
import { ControlButtons } from "@/components/ControlButtons";
import { WorkoutDetails } from "@/components/WorkoutDetails";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const [workoutArray, setWorkoutArray] = useState<Record<string, Workout>>({});
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isChangingSides, setIsChangingSides] = useState(false);
  const [changeSidesCountdown, setChangeSidesCountdown] = useState(5);
  const [hasChangedSides, setHasChangedSides] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const changeSidesIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const loadWorkoutsData = async () => {
      const loadedWorkouts = await loadWorkouts();
      setWorkoutArray(loadedWorkouts ?? {});
    };
    loadWorkoutsData();
  }, []);

  const workout = workoutArray[id as string];
  const totalStretches = workout?.stretches?.length ?? 0;
  const pauseIcon = require("@/assets/images/pause_white.png");
  const playIcon = require("@/assets/images/play_white.png");

  useEffect(() => {
    if (workout) {
      setSeconds(workout.stretches[0].duration);
    }
  }, [workout]);

  useEffect(() => {
    if (isChangingSides) {
      changeSidesIntervalRef.current = setInterval(() => {
        setChangeSidesCountdown((prev) => {
          if (prev <= 1) {
            setIsChangingSides(false);
            setChangeSidesCountdown(5);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 5;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (changeSidesIntervalRef.current) {
          clearInterval(changeSidesIntervalRef.current);
          changeSidesIntervalRef.current = null;
        }
      };
    }
  }, [isChangingSides]);

  useEffect(() => {
    if (
      !workout ||
      paused ||
      currentStretchIndex >= totalStretches ||
      !started ||
      !countdownFinished ||
      isChangingSides
    )
      return;

    const currentStretch = workout.stretches[currentStretchIndex];
    const halfDuration = Math.floor(currentStretch.duration / 2);

    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (
          prevSeconds === halfDuration &&
          currentStretch.changeSide &&
          !isChangingSides &&
          !hasChangedSides
        ) {
          setIsChangingSides(true);
          setHasChangedSides(true);
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return prevSeconds;
        }

        if (prevSeconds > 0) return prevSeconds - 1;

        if (currentStretchIndex < totalStretches - 1) {
          setCurrentStretchIndex((prevIndex) => prevIndex + 1);
          return workout.stretches[currentStretchIndex + 1].duration;
        } else {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setCurrentStretchIndex(totalStretches);
          return 0;
        }
      });

      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1 / currentStretch.duration;
        if (
          newProgress >= 0.5 &&
          currentStretch.changeSide &&
          !isChangingSides &&
          !hasChangedSides
        ) {
          return 0.5;
        }
        return newProgress >= 1 ? 0 : newProgress;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    workout,
    currentStretchIndex,
    paused,
    started,
    countdown,
    isChangingSides,
    hasChangedSides,
    totalStretches,
  ]);

  useEffect(() => {
    if (workout && currentStretchIndex < totalStretches) {
      setProgress(0);
      setSeconds(workout.stretches[currentStretchIndex].duration);
      setHasChangedSides(false);
    }
  }, [workout, currentStretchIndex, totalStretches]);

  useEffect(() => {
    if (started && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setCountdownFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [started, countdown]);

  useEffect(() => {
    if (currentStretchIndex >= totalStretches) {
      updateStreak().then((newStreak) => {
        setCurrentStreak(newStreak);
      });
    }
  }, [currentStretchIndex, totalStretches]);

  const togglePause = () => {
    setPaused((prev) => !prev);
    if (paused && intervalRef.current === null) {
      setPaused(false);
    } else {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  };

  if (!workout) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Loading workout...</ThemedText>
      </ThemedView>
    );
  }

  if (!started) {
    return (
      <WorkoutDetails
        title={workout.title}
        duration={workout.totalDuration}
        image={workout.stretches[0].image}
        setCountdown={setCountdown}
        setStarted={setStarted}
        setCountdownFinished={setCountdownFinished}
      />
    );
  }

  if (countdown > 0) {
    return (
      <ThemedView style={styles.countdown_container}>
        <ThemedText style={styles.countdown}>{countdown}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <ThemedView style={styles.workoutTitle}>
        <ThemedText>
          Workout {currentStretchIndex + 1} of {totalStretches}
        </ThemedText>
        <ThemedText>{workout.title}</ThemedText>
      </ThemedView>

      {currentStretchIndex < totalStretches ? (
        <ThemedView style={styles.container}>
          <ThemedView style={styles.workout_container}>
            <Image
              source={workout.stretches[currentStretchIndex].image}
              style={styles.image}
            />
            {workout.stretches[currentStretchIndex].changeSide ? (
              <ThemedView style={styles.progressContainer}>
                <ProgressBar
                  width={300}
                  height={20}
                  color="white"
                  borderRadius={20}
                  progress={progress}
                  style={styles.progressBar}
                />
                <ChangeSymbol style={styles.ChangeSymbolStyle} />
              </ThemedView>
            ) : (
              <ProgressBar
                width={300}
                height={20}
                color="white"
                borderRadius={20}
                progress={progress}
              />
            )}

            {isChangingSides ? (
              <ThemedView style={styles.changeSidesContainer}>
                <ThemedText type="title" style={styles.changeSidesText}>
                  Change Sides
                </ThemedText>
                <ThemedText type="title" style={styles.changeSidesCountdown}>
                  {changeSidesCountdown}s
                </ThemedText>
              </ThemedView>
            ) : (
              <ThemedText type="title" style={{ marginTop: 30 }}>
                {seconds}s
              </ThemedText>
            )}

            <ControlButtons
              currentStretchIndex={currentStretchIndex}
              isChangingSides={isChangingSides}
              setCurrentStretchIndex={setCurrentStretchIndex}
              togglePause={togglePause}
              paused={paused}
              playIcon={playIcon}
              pauseIcon={pauseIcon}
            />
          </ThemedView>
        </ThemedView>
      ) : (
        <WorkoutFinished currentStreak={currentStreak} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  workout_container: {
    alignItems: "center",
  },
  workoutTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 300,
    height: "40%",
    resizeMode: "cover",
    borderRadius: 150,
    marginBottom: 20,
  },
  countdown_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  countdown: {
    fontSize: 150,
    fontWeight: "bold",
    lineHeight: 150,
  },
  progressContainer: {
    position: "relative",
    marginTop: 20,
    width: 300,
    height: 20,
  },
  progressBar: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  ChangeSymbolStyle: {
    position: "absolute",
    top: -13,
    left: "46%",
    transform: [{ translateX: -10 }],
    zIndex: 2,
  },
  changeSidesContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  changeSidesText: {
    lineHeight: 25,
    fontSize: 24,
    marginBottom: 10,
  },
  changeSidesCountdown: {
    lineHeight: 36,
    fontSize: 36,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
