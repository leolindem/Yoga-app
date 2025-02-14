export type Workout = {
  title: string;
  totalDuration: string;
  stretches: {
    name: string;
    image: any;
    duration: number;
  }[];
};

const workoutDetails: Record<string, Workout> = {
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
};

export default workoutDetails;
