import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, RefreshControl } from "react-native";
import { bookingsApi } from "../services/api";

type Booking = {
  id: number; customerName: string; customerPhone: string;
  city: string; eventDate: string; duration: number; guests: number;
  totalPrice: number; status: string; createdAt: string;
};

const statusColors: Record<string, string> = {
  PENDING: "#eab308", CONFIRMED: "#22c55e", IN_PROGRESS: "#06b6d4",
  COMPLETED: "#6b7280", CANCELLED: "#ef4444",
};

const statusLabels: Record<string, string> = {
  PENDING: "قيد الانتظار", CONFIRMED: "مؤكد", IN_PROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتمل", CANCELLED: "ملغي",
};

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try { setBookings(await bookingsApi.getAll()); } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await bookingsApi.updateStatus(id, status);
      load();
    } catch (err: any) { Alert.alert("خطأ", err.message); }
  };

  const showActions = (item: Booking) => {
    Alert.alert(item.customerName, "تحديث حالة الحجز", [
      { text: "تأكيد", onPress: () => updateStatus(item.id, "CONFIRMED") },
      { text: "قيد التنفيذ", onPress: () => updateStatus(item.id, "IN_PROGRESS") },
      { text: "إكمال", onPress: () => updateStatus(item.id, "COMPLETED") },
      { text: "إلغاء", style: "destructive", onPress: () => updateStatus(item.id, "CANCELLED") },
      { text: "رجوع", style: "cancel" },
    ]);
  };

  const renderItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity style={styles.card} onLongPress={() => showActions(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.customerName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] + "30", borderColor: statusColors[item.status] }]}>
          <Text style={[styles.statusText, { color: statusColors[item.status] }]}>{statusLabels[item.status] || item.status}</Text>
        </View>
      </View>
      <Text style={styles.meta}>{item.customerPhone}</Text>
      <Text style={styles.meta}>{item.city} • {item.eventDate || "تاريخ غير محدد"} • {item.duration} ساعات • {item.guests} ضيف</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{item.totalPrice?.toLocaleString()} ر.س</Text>
        <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString("ar-SA")}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={bookings}
      keyExtractor={(i) => String(i.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} tintColor="#d97706" />}
      ListEmptyComponent={<Text style={styles.empty}>لا توجد حجوزات</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0a05" },
  list: { padding: 16 },
  card: { backgroundColor: "#1c1917", borderRadius: 12, borderWidth: 1, borderColor: "#292524", padding: 16, marginBottom: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { color: "#f5f5f4", fontSize: 16, fontWeight: "700" },
  statusBadge: { borderRadius: 99, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2 },
  statusText: { fontSize: 11, fontWeight: "600" },
  meta: { color: "#a8a29e", fontSize: 12, marginTop: 4 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  price: { color: "#d97706", fontSize: 16, fontWeight: "700" },
  dateText: { color: "#57534e", fontSize: 11 },
  empty: { color: "#57534e", textAlign: "center", marginTop: 40, fontSize: 16 },
});
