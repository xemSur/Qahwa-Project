import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen() {
  const { email, name, role, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("تسجيل الخروج", "هل أنت متأكد؟", [
      { text: "إلغاء", style: "cancel" },
      { text: "تسجيل خروج", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>{name?.charAt(0) || "م"}</Text>
        <Text style={styles.name}>{name || "المدير"}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>معلومات النظام</Text>
        <View style={styles.row}>
          <Text style={styles.label}>الإصدار</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>اللغة</Text>
          <Text style={styles.value}>العربية</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0a05", padding: 20 },
  card: { backgroundColor: "#1c1917", borderRadius: 20, borderWidth: 1, borderColor: "#292524", padding: 24, alignItems: "center", marginBottom: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#d97706", textAlign: "center", lineHeight: 64, fontSize: 28, fontWeight: "800", color: "#1c1917", overflow: "hidden" },
  name: { color: "#f5f5f4", fontSize: 20, fontWeight: "700", marginTop: 12 },
  email: { color: "#a8a29e", fontSize: 14, marginTop: 4 },
  role: { backgroundColor: "#292524", color: "#d97706", fontSize: 12, fontWeight: "600", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99, marginTop: 8 },
  section: { backgroundColor: "#1c1917", borderRadius: 16, borderWidth: 1, borderColor: "#292524", padding: 16, marginBottom: 20 },
  sectionTitle: { color: "#d6d3d1", fontSize: 14, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  label: { color: "#a8a29e", fontSize: 14 },
  value: { color: "#f5f5f4", fontSize: 14, fontWeight: "600" },
  logoutBtn: { backgroundColor: "#7f1d1d", borderRadius: 12, padding: 16, alignItems: "center", marginTop: "auto" },
  logoutText: { color: "#fca5a5", fontSize: 16, fontWeight: "700" },
});
