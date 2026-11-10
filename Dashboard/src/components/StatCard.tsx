import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  value: string | number;
  color?: string;
};

export default function StatCard({ label, value, color = "#d97706" }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#1c1917",
    borderRadius: 12,
    borderLeftWidth: 3,
    padding: 16,
    minWidth: 100,
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
  },
  label: {
    fontSize: 12,
    color: "#a8a29e",
    marginTop: 4,
  },
});
