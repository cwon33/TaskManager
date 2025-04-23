import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#EDEDED" barStyle="dark-content" />
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
