type StretchType = "static" | "dynamic";
type BodyPart =
  | "legs"
  | "hamstrings"
  | "glutes"
  | "hips"
  | "calves"
  | "back"
  | "full body"
  | "core"
  |  "shoulder";

interface WorkoutDetail {
  image: any;
  changeSide: boolean;
  type: StretchType;
  bodyPart: BodyPart;
  tags?: string[];
}

const workoutDetails: Record<string, WorkoutDetail> = {
  "Calf Stretch": {
    image: require("@/assets/images/calf_stretch.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "calves",
    tags: ["warmup"],
  },
  "Hamstring": {
    image: require("@/assets/images/hamstring.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "hamstrings",
  },
  "forward fold": {
    image: require("@/assets/images/forward_bend.png"),
    changeSide: false,
    type: "static",
    bodyPart: "hamstrings",
  },
  "Piriformis": {
    image: require("@/assets/images/piriformis.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "glutes",
  },
  "Child Pose": {
    image: require("@/assets/images/child_pose.png"),
    changeSide: false,
    type: "static",
    bodyPart: "back",
    tags: ["restorative"],
  },
  "Standing Calf": {
    image: require("@/assets/images/standing_calf_stretch.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "calves",
  },
  "Lunging Hip Flexor": {
    image: require("@/assets/images/lunging_hip_flexor.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "hips",
  },
  "Happy Baby": {
    image: require("@/assets/images/happy_baby.png"),
    changeSide: false,
    type: "static",
    bodyPart: "hips",
  },
  "Frog Stretch": {
    image: require("@/assets/images/frog_pose.png"),
    changeSide: false,
    type: "static",
    bodyPart: "hips",
  },
  "Sphinx Pose": {
    image: require("@/assets/images/sphinx.png"),
    changeSide: false,
    type: "static",
    bodyPart: "back",
  },
  "Leg Swings": {
    image: require("@/assets/images/leg_swings.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "legs",
  },
  "High Knees": {
    image: require("@/assets/images/high_knees.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "full body",
  },
  "Figure 4": {
    image: require("@/assets/images/figure_4.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "glutes",
  },
  "Butt Kicks": {
    image: require("@/assets/images/butt_kicks.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "legs",
  },
  "Arm Swings": {
    image: require("@/assets/images/arm_swings.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "shoulder",
  },
  "Side Bend": {
    image: require("@/assets/images/side_bend.png"),
    changeSide: true,
    type: "dynamic",
    bodyPart: "shoulder",
  },
  "Butterfly": {
    image: require("@/assets/images/butterfly.png"),
    changeSide: false,
    type: "static",
    bodyPart: "legs",
  },
  "Cross Body": {
    image: require("@/assets/images/cross_body.png"),
    changeSide: true,
    type: "static",
    bodyPart: "shoulder",
  },
};

export default workoutDetails;
