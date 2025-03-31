import AsyncStorage from '@react-native-async-storage/async-storage';

export type Workout = {
  title: string;
  totalDuration: string;
  stretches: {
    name: string;
    image: any;
    duration: number;
  }[];
};

const defaultWorkouts: Record<string, Workout> = {
  "1": {
    title: "Morning Stretch",
    totalDuration: "2:00",
    stretches: [
      {
        name: "Lunge",
        image: require("@/assets/images/lunge.png"),
        duration: 10,
      },
      {
        name: "Hamstring Stretch",
        image: require("@/assets/images/hamstring_stretch.png"),
        duration: 15,
      },
      {
        name: "Shoulder Stretch",
        image: require("@/assets/images/shoulder_stretch.png"),
        duration: 10,
      },
    ],
  },
  "2": {
    title: "End of day Stretch",
    totalDuration: "3:00",
    stretches: [
      {
        name: "Lunge",
        image: require("@/assets/images/lunge.png"),
        duration: 10,
      },
      {
        name: "Hamstring Stretch",
        image: require("@/assets/images/hamstring_stretch.png"),
        duration: 15,
      },
      {
        name: "Shoulder Stretch",
        image: require("@/assets/images/shoulder_stretch.png"),
        duration: 10,
      },
    ],
  },
};

let workoutDetails: Record<string, Workout> = { ...defaultWorkouts };

// Load workouts from AsyncStorage
export const loadWorkouts = async () => {
  try {
    const storedWorkouts = await AsyncStorage.getItem('workouts');
    if (storedWorkouts) {
      const parsedWorkouts = JSON.parse(storedWorkouts);
      // Convert stored image strings back to require statements
      Object.keys(parsedWorkouts).forEach(key => {
        parsedWorkouts[key].stretches.forEach((stretch: any) => {
          if (typeof stretch.image === 'string') {
            stretch.image = require("@/assets/images/lunge.png"); // Default image
          }
        });
      });
      workoutDetails = parsedWorkouts;
    }
  } catch (error) {
    console.error('Error loading workouts:', error);
  }
};

// Save workouts to AsyncStorage
export const saveWorkouts = async () => {
  try {
    // Convert require statements to strings before saving
    const workoutsToSave = { ...workoutDetails };
    Object.keys(workoutsToSave).forEach(key => {
      workoutsToSave[key].stretches.forEach((stretch: any) => {
        if (typeof stretch.image === 'object') {
          stretch.image = 'lunge.png'; // Store image name as string
        }
      });
    });
    await AsyncStorage.setItem('workouts', JSON.stringify(workoutsToSave));
  } catch (error) {
    console.error('Error saving workouts:', error);
  }
};

export default workoutDetails;
