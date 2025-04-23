import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

// Root layout that wraps the app in a SafeArea and sets navigation stack behavior
export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#EDEDED" barStyle="dark-content" />
      {/* Navigation stack (uses file-based routing via expo-router) */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#EDEDED" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(stack)/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(stack)/task-detail"
          options={{
            presentation: "card",
            animation: "default",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
