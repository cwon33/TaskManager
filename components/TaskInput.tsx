import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  input: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

// Input field and add button for entering a new task
export const TaskInput = ({ input, onChange, onSubmit }: Props) => {
  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit();
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={input}
        onChangeText={onChange}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#507882",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
