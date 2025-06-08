# Project Architecture Overview

This document provides a high level overview of the Yoga App project structure, key components and how data flows through the application. It is intended for new contributors to quickly get familiar with the codebase.

## Directory Layout

```
├── app/              # Route based screens used by Expo Router
│   ├── (tabs)/       # Main tab navigator screens
│   ├── customizer/   # Screens for building a custom workout
│   ├── edit/         # Screen to remove saved workouts
│   ├── workout/      # Workout player modal
│   ├── +not-found.tsx
│   └── _layout.tsx   # Root navigator layout
├── components/       # Reusable UI and feature components
├── constants/        # Theme constants (e.g. Colors)
├── data/             # Data persistence helpers
├── hooks/            # Custom React hooks
├── assets/           # Images, fonts and audio used by the app
├── scripts/          # Utility scripts (e.g. project reset)
└── docs/             # Project documentation
```

The application uses **Expo Router** which relies on the files inside `app/` to automatically create screens and navigators. Layout files (e.g. `_layout.tsx`) define navigators and screen options while the remainder of the file tree represents individual screens.

## Navigation

- `app/_layout.tsx` defines the root `Stack` navigator. It configures the modal presentation for screens such as `workout/[id]` and sets up a custom header.
- The `(tabs)` folder configures a bottom tab navigator. Two tabs are provided: the home screen (`index.tsx`) and the settings screen (`settings.tsx`).
- Additional folders under `app/` map to routes in the application, for example `customizer/timeScreen.tsx` or `edit/index.tsx`.

## Components

UI and feature components live in `components/`. Some notable ones include:

- `WorkoutCard` – card used on the home screen to launch a workout.
- `WorkoutDetails` – shows stretch details before starting a workout.
- `ControlButtons`, `WorkoutFinished` – used by `workout/[id].tsx` while playing a workout.
- `StretchPickCard`, `CheckboxButtons` – used in the customizer flow.
- `ui/` contains smaller presentational pieces (icons, tab bar background etc.).

All text and view components are wrapped in `ThemedText` and `ThemedView` which apply colors based on the current theme with the help of hooks in `hooks/`.

## Data Handling

Workout, streak and stretch information is stored under `data/`.

- `workoutData.tsx` keeps a set of default workouts and exposes `loadWorkouts`, `addWorkout` and `deleteWorkout` helpers. Data is persisted using `AsyncStorage` so workouts remain across sessions.
- `streakData.tsx` tracks the user's workout streak using the same storage mechanism.
- `stretchesData.tsx` exports metadata for individual stretches used by both the workout player and customizer screens.

## Assets

Images for stretches and the application icon reside inside the `assets/` directory. Fonts and an audio effect used when a stretch completes are also stored here.

## Useful Scripts & Configuration

- `package.json` defines common Expo scripts (`npm start`, `npm run android`, etc.) and a Jest configuration. Currently there is a snapshot test located at `components/__tests__/ThemedText-test.tsx`.
- `scripts/reset-project.js` can reset the repository back to a starter template by moving the main folders to `app-example/`.
- `app.json` and `eas.json` hold the Expo and EAS (Expo Application Services) configuration for building the application.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npx expo start
   ```
3. Run tests
   ```bash
   npm test
   ```

## Additional Notes

The project is written in **TypeScript** and uses path aliases (see `tsconfig.json`) allowing imports starting with `@/` to reference the project root.

The codebase aims to support both light and dark themes. Colors are defined in `constants/Colors.ts`, and `hooks/useThemeColor.ts` resolves the appropriate color based on the user's device settings.

