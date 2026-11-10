import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>☕</Text>
      <ActivityIndicator size="large" color="#d97706" style={{ marginTop: 20 }} />
      <Text style={styles.text}>جاري التحميل...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0a05",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 48 },
  text: { color: "#d6d3d1", marginTop: 12, fontSize: 16 },
});
