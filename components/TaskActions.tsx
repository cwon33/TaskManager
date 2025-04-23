// components/TaskActions.tsx
import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";

interface Props {
  onSave: () => void;
  onDeleteConfirmed: () => void;
}

export const TaskActions = ({ onSave, onDeleteConfirmed }: Props) => {
  const confirmDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDeleteConfirmed,
      },
    ]);
  };

  return (
    <View style={styles.row}>
      <Button title="Save" onPress={onSave} color="#6aa4b9" />
      <Button title="Delete" onPress={confirmDelete} color="#ae9b9b" />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
});
