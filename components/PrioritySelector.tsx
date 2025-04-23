import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const PrioritySelector = ({ value, onChange }: Props) => {
  const levels = [
    { label: "Low", color: "#9db4aa", value: "low" },
    { label: "Medium", color: "#c2b090", value: "medium" },
    { label: "High", color: "#ae9b9b", value: "high" },
  ];

  return (
    <>
      <Text style={styles.label}>Priority:</Text>
      <View style={styles.row}>
        {levels.map(({ label, color, value: val }) => (
          <TouchableOpacity
            key={val}
            onPress={() => onChange(value === val ? "" : val)}
            style={[
              styles.button,
              { backgroundColor: color },
              value === val && styles.selected,
            ]}
          >
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selected: {
    borderColor: "#507882",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});
