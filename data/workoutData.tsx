import AsyncStorage from '@react-native-async-storage/async-storage';
import stretchesData from './stretchesData';

export type Workout = {
  title: string;
  totalDuration: string;
  stretches: {
    name: string;
    image: any;
    duration: number;
    changeSide: boolean;
  }[];
};

const defaultWorkouts: Record<string, Workout> = {
  "1": {
    title: "Morning Stretch",
    totalDuration: "2:00",
    stretches: [
      {
        name: "Hamstring",
        image: require("@/assets/images/hamstring.png"),
        duration: 100000000,
        changeSide: true,
      },
      {
        name: "Forward Bend",
        image: require("@/assets/images/forward_bend.png"),
        duration: 15,
        changeSide: false
      },
      {
        name: "Shoulder Stretch",
        image: require("@/assets/images/shoulder_stretch.png"),
        duration: 10,
        changeSide: true
      },
    ],
  },
  "2": {
    title: "End of day",
    totalDuration: "3:00",
    stretches: [
      {
        name: "Forward Bend",
        image: require("@/assets/images/forward_bend.png"),
        duration: 10,
        changeSide: true,
      },
      {
        name: "Hamstring Stretch",
        image: require("@/assets/images/hamstring_stretch.png"),
        duration: 15,
        changeSide: true
      },
      {
        name: "Shoulder Stretch",
        image: require("@/assets/images/shoulder_stretch.png"),
        duration: 10,
        changeSide: true
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
            // Map the stored image name to the actual image from stretchesData
            stretch.image = stretchesData[stretch.name] || require("@/assets/images/lunge.png");
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
          // Store the stretch name as the image identifier
          stretch.image = stretch.name;
        }
      });
    });
    await AsyncStorage.setItem('workouts', JSON.stringify(workoutsToSave));
  } catch (error) {
    console.error('Error saving workouts:', error);
  }
};

export default workoutDetails;
