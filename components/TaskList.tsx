import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskItem } from "./TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  description?: string;
  dueDate?: string;
}

interface Props {
  tasks: Task[];
  collapsed: Record<string, boolean>;
  onToggleSection: (key: string) => void;
  onToggleTask: (id: number) => void;
  onDetails: (task: Task) => void;
  showCompleted: boolean;
}

export const TaskList = ({
  tasks,
  collapsed,
  onToggleSection,
  onToggleTask,
  onDetails,
  showCompleted,
}: Props) => {
  const filtered = tasks.filter((t) => showCompleted || !t.completed);

  const grouped = {
    high: filtered.filter((t) => t.priority === "high"),
    medium: filtered.filter((t) => t.priority === "medium"),
    low: filtered.filter((t) => t.priority === "low"),
    none: filtered.filter((t) => !t.priority),
  };

  const sectionOrder: {
    key: keyof typeof grouped;
    label: string;
    color: string;
  }[] = [
    { key: "high", label: "High Priority", color: "#ae9b9b" },
    { key: "medium", label: "Medium Priority", color: "#c2b090" },
    { key: "low", label: "Low Priority", color: "#9db4aa" },
    { key: "none", label: "Unprioritized", color: "#999" },
  ];

  return (
    <>
      {sectionOrder.map(({ key, label, color }) => {
        const sectionTasks = grouped[key];
        const isCollapsed = collapsed[key];
        if (sectionTasks.length === 0) return null;

        return (
          <View key={key} style={styles.section}>
            <TouchableOpacity
              onPress={() => onToggleSection(key)}
              style={styles.header}
            >
              <Text style={[styles.title, { color }]}>
                {label} ({sectionTasks.length})
              </Text>
              <Ionicons
                name={isCollapsed ? "chevron-down" : "chevron-up"}
                size={20}
                color={color}
              />
            </TouchableOpacity>

            {!isCollapsed &&
              sectionTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDetails={onDetails}
                />
              ))}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});
