# Just Due It — React Native Task Manager

A simple, responsive task manager built with React Native using Expo. This app allows users to add, complete, view, and organize tasks by priority, with a description and due date selection — all handled via local state.

## 📱 Features

- ✅ Add new tasks with a quick input field
- 📂 Group tasks by **priority level**: High, Medium, Low, or Unprioritized
- 🎯 Mark tasks as complete/incomplete
- 🗂 Expand or collapse sections to declutter views
- 📅 Add optional **description**, **due date**, and **time**
- 👁 Toggle visibility of completed tasks
- 🧠 All data is stored **locally** using `expo-secure-store`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator or Android Emulator, or the **Expo Go app** on your phone

### Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Libraries Used

| Library                                                                                                   | Purpose                                                                             |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`react-native`](https://reactnative.dev/)                                                                | Base framework for building native apps using React components                      |
| [`expo`](https://expo.dev/)                                                                               | Simplifies setup, builds, and deployment of React Native apps                       |
| [`expo-router`](https://expo.github.io/router/)                                                           | Declarative file-based routing system for React Native navigation                   |
| [`expo-secure-store`](https://docs.expo.dev/versions/latest/sdk/securestore/)                             | Secure local storage for persisting tasks, collapsed state, and toggle preferences  |
| [`@react-native-community/datetimepicker`](https://github.com/react-native-datetimepicker/datetimepicker) | Native date and time picker modal components                                        |
| [`@expo/vector-icons`](https://icons.expo.dev/)                                                           | Provides a large set of customizable icons (checkmarks, add button, ellipsis, etc.) |
