import React from "react";
import { View, Text, Switch, StyleSheet, Platform } from "react-native";

interface Props {
  value: boolean;
  onToggle: () => void;
}

// Toggle switch for showing/hiding completed tasks in the list
export const FilterToggle = ({ value, onToggle }: Props) => (
  <View style={styles.container}>
    <Switch
      value={value}
      onValueChange={onToggle}
      thumbColor={value ? "#A8CAD6" : "#D5E3E4"}
      trackColor={{ false: "#D5E3E4", true: "#D5E3E4" }}
    />
    <Text style={styles.text}>Show Completed</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
    gap: 6,
  },
  text: {
    fontSize: 16,
    color: "#A8CAD6",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});
