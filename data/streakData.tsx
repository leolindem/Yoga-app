import AsyncStorage from '@react-native-async-storage/async-storage';

interface StreakData {
  currentStreak: number;
  lastWorkoutDate: string | null;
}

const STREAK_KEY = 'streak_data';

export const getStreakData = async (): Promise<StreakData> => {
  try {
    const data = await AsyncStorage.getItem(STREAK_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return { currentStreak: 0, lastWorkoutDate: null };
  } catch (error) {
    console.error('Error loading streak data:', error);
    return { currentStreak: 0, lastWorkoutDate: null };
  }
};

export const updateStreak = async (): Promise<number> => {
  try {
    const data = await getStreakData();
    const today = new Date().toISOString().split('T')[0];
    console.log("updating")
    if (!data.lastWorkoutDate) {
      // First workout ever
      await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({
        currentStreak: 1,
        lastWorkoutDate: today
      }));
      return 1;
    }

    const lastWorkout = new Date(data.lastWorkoutDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (data.lastWorkoutDate === today) {
      // Already worked out today
      return data.currentStreak;
    } else if (lastWorkout.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
      // Worked out yesterday, increment streak
      const newStreak = data.currentStreak + 1;
      await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({
        currentStreak: newStreak,
        lastWorkoutDate: today
      }));
      return newStreak;
    } else {
      // Streak broken, reset to 1
      await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({
        currentStreak: 1,
        lastWorkoutDate: today
      }));
      return 1;
    }
  } catch (error) {
    console.error('Error updating streak:', error);
    return 0;
  }
}; 