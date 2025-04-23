import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  dueDate?: Date;
  showDateModal: boolean;
  showTimeModal: boolean;
  setShowDateModal: (val: boolean) => void;
  setShowTimeModal: (val: boolean) => void;
  onDateChange: (_: any, date?: Date) => void;
  onTimeChange: (_: any, time?: Date) => void;
}

export const DueDatePicker = ({
  dueDate,
  showDateModal,
  showTimeModal,
  setShowDateModal,
  setShowTimeModal,
  onDateChange,
  onTimeChange,
}: Props) => {
  return (
    <>
      <Text style={styles.label}>Due Date & Time:</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDateModal(true)}
        >
          <Text style={styles.text}>
            {dueDate ? dueDate.toLocaleDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTimeModal(true)}
        >
          <Text style={styles.text}>
            {dueDate
              ? dueDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Select Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Modal */}
      {showDateModal && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, date) => {
            setShowDateModal(false);
            onDateChange(event, date);
          }}
        />
      )}

      {/* Time Modal */}
      {showTimeModal && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, time) => {
            setShowTimeModal(false);
            onTimeChange(event, time);
          }}
        />
      )}
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
    gap: 12,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});
