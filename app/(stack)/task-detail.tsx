import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import { PrioritySelector } from "@/components/PrioritySelector";
import { DueDatePicker } from "@/components/DueDatePicker";
import { TaskActions } from "@/components/TaskActions";

export default function TaskDetailScreen() {
  // Retrieve and parse the task from navigation params
  const { task } = useLocalSearchParams();
  const parsedTask = task ? JSON.parse(task as string) : {};
  const router = useRouter();

  const [description, setDescription] = useState(parsedTask.description || "");
  const [priority, setPriority] = useState(parsedTask.priority || "");
  const [dueDate, setDueDate] = useState(
    parsedTask.dueDate ? new Date(parsedTask.dueDate) : undefined
  );
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  // Save updated task to SecureStore and return to task list
  const handleSave = async () => {
    const saved = await SecureStore.getItemAsync("TASKS");
    let tasks = saved ? JSON.parse(saved) : [];
    tasks = tasks.map((t: any) =>
      t.id === parsedTask.id
        ? { ...t, priority, description, dueDate: dueDate?.toISOString() }
        : t
    );
    await SecureStore.setItemAsync("TASKS", JSON.stringify(tasks));
    router.back();
  };

  // Delete the task from SecureStore and return
  const handleDelete = async () => {
    const saved = await SecureStore.getItemAsync("TASKS");
    let tasks = saved ? JSON.parse(saved) : [];
    tasks = tasks.filter((t: any) => t.id !== parsedTask.id);
    await SecureStore.setItemAsync("TASKS", JSON.stringify(tasks));
    router.back();
  };

  const onDateChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const newDate = dueDate ? new Date(dueDate) : new Date();
      newDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      setDueDate(newDate);
    }
  };

  const onTimeChange = (_event: any, selectedTime?: Date) => {
    if (selectedTime) {
      const newDate = dueDate ? new Date(dueDate) : new Date();
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDueDate(newDate);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDEDED" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#507882" />
          </TouchableOpacity>

          <Text style={styles.heading}>Edit Task</Text>

          <PrioritySelector value={priority} onChange={setPriority} />

          <DueDatePicker
            dueDate={dueDate}
            showDateModal={showDateModal}
            showTimeModal={showTimeModal}
            setShowDateModal={setShowDateModal}
            setShowTimeModal={setShowTimeModal}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Add a description..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TaskActions onSave={handleSave} onDeleteConfirmed={handleDelete} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EDEDED",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});
