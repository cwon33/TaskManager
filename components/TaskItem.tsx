import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDetails: (task: Task) => void;
}

// Single task row with completion toggle and detail link
export const TaskItem = ({ task, onToggle, onDetails }: Props) => (
  <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.taskItem}>
    <View style={styles.taskContent}>
      {/* Completion toggle icon */}
      <Ionicons
        name={task.completed ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={task.completed ? "#507882" : "#ccc"}
        style={styles.icon}
      />

      {/* Task text */}
      <View style={styles.textContainer}>
        <Text style={[styles.text, task.completed && styles.completed]}>
          {task.text}
        </Text>
      </View>

      {/* Details icon */}
      <TouchableOpacity onPress={() => onDetails(task)}>
        <Ionicons name="ellipsis-vertical" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  taskItem: {
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
    paddingVertical: 10,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
