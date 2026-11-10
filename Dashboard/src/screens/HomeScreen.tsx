import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { dashboardApi } from "../services/api";
import StatCard from "../components/StatCard";

type Stats = {
  totalProviders: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalPackages: number;
  totalTestimonials: number;
  unreadMessages: number;
  totalRevenue: number;
  averageRating: number;
};

export default function HomeScreen() {
  const { name } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#d97706" />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>مرحباً، {name || "المدير"}</Text>
        <Text style={styles.date}>نظرة عامة على المنصة</Text>
      </View>

      {stats && (
        <>
          <Text style={styles.sectionTitle}>الحجوزات</Text>
          <View style={styles.grid}>
            <StatCard label="إجمالي الحجوزات" value={stats.totalBookings} />
            <StatCard label="قيد الانتظار" value={stats.pendingBookings} color="#eab308" />
            <StatCard label="مؤكدة" value={stats.confirmedBookings} color="#22c55e" />
            <StatCard label="مكتملة" value={stats.completedBookings} color="#06b6d4" />
            <StatCard label="ملغية" value={stats.cancelledBookings} color="#ef4444" />
          </View>

          <Text style={styles.sectionTitle}>مقدمي الخدمة</Text>
          <View style={styles.row}>
            <StatCard label="القهوجيين" value={stats.totalProviders} />
            <StatCard label="متوسط التقييم" value={stats.averageRating.toFixed(1)} color="#22c55e" />
          </View>

          <Text style={styles.sectionTitle}>المحتوى</Text>
          <View style={styles.row}>
            <StatCard label="الباقات" value={stats.totalPackages} color="#a855f7" />
            <StatCard label="التقييمات" value={stats.totalTestimonials} color="#06b6d4" />
            <StatCard label="رسائل غير مقروءة" value={stats.unreadMessages} color="#ef4444" />
          </View>

          <View style={styles.revenueCard}>
            <Text style={styles.revenueLabel}>الإيرادات التقديرية</Text>
            <Text style={styles.revenueValue}>{stats.totalRevenue.toLocaleString()} ر.س</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0a05" },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 26, fontWeight: "800", color: "#f5f5f4" },
  date: { fontSize: 14, color: "#a8a29e", marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#d6d3d1", marginTop: 20, marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  row: { flexDirection: "row", gap: 10 },
  revenueCard: {
    marginTop: 24,
    backgroundColor: "#1c1917",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d97706",
    padding: 24,
    alignItems: "center",
  },
  revenueLabel: { fontSize: 14, color: "#a8a29e" },
  revenueValue: { fontSize: 32, fontWeight: "800", color: "#d97706", marginTop: 4 },
});
