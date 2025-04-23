import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { FilterToggle } from "@/components/FilterToggle";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  description?: string;
  dueDate?: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showCompleted, setShowCompleted] = useState(true);
  const { updated } = useLocalSearchParams(); // used to re-trigger on return from task detail screen
  const router = useRouter();

  // Load collapsed state and showCompleted toggle on mount
  useEffect(() => {
    const loadSettings = async () => {
      const show = await SecureStore.getItemAsync("SHOW_COMPLETED");
      const state = await SecureStore.getItemAsync("COLLAPSED_STATE");
      if (show !== null) setShowCompleted(show === "true");
      if (state) setCollapsed(JSON.parse(state));
    };
    loadSettings();
  }, []);

  // Load tasks from storage every time the screen refocuses (after editing a task)
  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        const saved = await SecureStore.getItemAsync("TASKS");
        if (saved) setTasks(JSON.parse(saved));
      };
      loadTasks();
    }, [updated])
  );

  // Persist tasks to storage whenever they change
  useEffect(() => {
    SecureStore.setItemAsync("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleShowCompleted = () => {
    const updated = !showCompleted;
    setShowCompleted(updated);
    SecureStore.setItemAsync("SHOW_COMPLETED", updated.toString());
  };

  // Toggle collapsed state of a task section
  const toggleSection = (key: string) => {
    const updated = { ...collapsed, [key]: !collapsed[key] };
    setCollapsed(updated);
    SecureStore.setItemAsync("COLLAPSED_STATE", JSON.stringify(updated));
  };

  // Open task detail screen with serialized task object
  const openTaskDetails = (task: Task) => {
    router.push({
      pathname: "/task-detail",
      params: { task: JSON.stringify(task) },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Just Due It!</Text>
        <TaskInput input={input} onChange={setInput} onSubmit={addTask} />
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          <TaskList
            tasks={tasks}
            collapsed={collapsed}
            onToggleSection={toggleSection}
            onToggleTask={toggleTask}
            onDetails={openTaskDetails}
            showCompleted={showCompleted}
          />
        </ScrollView>
        <FilterToggle value={showCompleted} onToggle={toggleShowCompleted} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64,
    backgroundColor: "#EDEDED",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#507882",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  list: {
    paddingBottom: 100,
  },
});
