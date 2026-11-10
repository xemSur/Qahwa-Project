import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("تنبيه", "يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("خطأ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.card}>
        <Text style={styles.icon}>☕</Text>
        <Text style={styles.title}>قهوجية الحجاز</Text>
        <Text style={styles.subtitle}>لوحة التحكم</Text>

        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#78716c"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          placeholderTextColor="#78716c"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0a05", justifyContent: "center", alignItems: "center", padding: 20 },
  card: {
    width: "100%", maxWidth: 400, backgroundColor: "#1c1917", borderRadius: 24,
    borderWidth: 1, borderColor: "#292524", padding: 32, alignItems: "center",
  },
  icon: { fontSize: 56 },
  title: { fontSize: 28, fontWeight: "800", color: "#f5f5f4", marginTop: 8 },
  subtitle: { fontSize: 14, color: "#d97706", marginBottom: 32 },
  input: {
    width: "100%", backgroundColor: "#292524", borderRadius: 12, borderWidth: 1,
    borderColor: "#44403c", padding: 14, fontSize: 16, color: "#f5f5f4",
    textAlign: "right", marginBottom: 12,
  },
  button: { width: "100%", backgroundColor: "#d97706", borderRadius: 12, padding: 16, alignItems: "center", marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#1c1917", fontSize: 16, fontWeight: "700" },
});
