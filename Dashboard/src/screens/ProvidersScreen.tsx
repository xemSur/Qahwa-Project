import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, RefreshControl, TextInput, Modal } from "react-native";
import { providersApi } from "../services/api";

type Provider = {
  id: number; name: string; gender: string; city: string;
  rating: number; reviews: number; experience: string;
  specialties: string; pricePerHour: number; verified: boolean; available: boolean;
};

export default function ProvidersScreen() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Provider | null>(null);
  const [form, setForm] = useState({ name: "", gender: "قهوجي", city: "الرياض", experience: "", specialties: "", pricePerHour: "", verified: false, available: true });

  const load = useCallback(async () => {
    try { setProviders(await providersApi.getAll()); } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = (id: number, name: string) => {
    Alert.alert("تأكيد", `حذف ${name}؟`, [
      { text: "إلغاء", style: "cancel" },
      { text: "حذف", style: "destructive", onPress: async () => {
        await providersApi.delete(id);
        load();
      }},
    ]);
  };

  const handleSave = async () => {
    try {
      const data = { ...form, pricePerHour: parseFloat(form.pricePerHour), rating: 0, reviews: 0 };
      if (editing) await providersApi.update(editing.id, data);
      else await providersApi.create(data);
      setModal(false);
      setEditing(null);
      setForm({ name: "", gender: "قهوجي", city: "الرياض", experience: "", specialties: "", pricePerHour: "", verified: false, available: true });
      load();
    } catch (err: any) { Alert.alert("خطأ", err.message); }
  };

  const renderItem = ({ item }: { item: Provider }) => (
    <TouchableOpacity style={styles.card} onLongPress={() => handleDelete(item.id, item.name)}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.badges}>
          {item.verified && <Text style={styles.verifiedBadge}>موثّق</Text>}
          <Text style={[styles.availBadge, !item.available && styles.unavail]}>{item.available ? "متاح" : "مشغول"}</Text>
        </View>
      </View>
      <Text style={styles.meta}>{item.gender} • {item.city} • {item.experience}</Text>
      <Text style={styles.meta}>★ {item.rating} ({item.reviews} تقييم)</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{item.pricePerHour} ر.س/س</Text>
        <TouchableOpacity onPress={() => { setEditing(item); setForm({ name: item.name, gender: item.gender, city: item.city, experience: item.experience, specialties: item.specialties, pricePerHour: String(item.pricePerHour), verified: item.verified, available: item.available }); setModal(true); }}>
          <Text style={styles.editBtn}>تعديل</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={providers}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} tintColor="#d97706" />}
        ListHeaderComponent={() => (
          <TouchableOpacity style={styles.addBtn} onPress={() => { setEditing(null); setForm({ name: "", gender: "قهوجي", city: "الرياض", experience: "", specialties: "", pricePerHour: "", verified: false, available: true }); setModal(true); }}>
            <Text style={styles.addBtnText}>+ إضافة قهوجي</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{editing ? "تعديل" : "إضافة"} مقدم خدمة</Text>
            <TextInput style={styles.input} placeholder="الاسم" placeholderTextColor="#78716c" value={form.name} onChangeText={(t) => setForm(p => ({...p, name: t}))} />
            <View style={styles.row}>
              <TextInput style={[styles.input, styles.half]} placeholder="المدينة" placeholderTextColor="#78716c" value={form.city} onChangeText={(t) => setForm(p => ({...p, city: t}))} />
              <TextInput style={[styles.input, styles.half]} placeholder="السعر/ساعة" placeholderTextColor="#78716c" value={form.pricePerHour} onChangeText={(t) => setForm(p => ({...p, pricePerHour: t}))} keyboardType="numeric" />
            </View>
            <TextInput style={styles.input} placeholder="الخبرة (مثال: 5 سنوات)" placeholderTextColor="#78716c" value={form.experience} onChangeText={(t) => setForm(p => ({...p, experience: t}))} />
            <TextInput style={styles.input} placeholder="التخصصات (مفصولة بفواصل)" placeholderTextColor="#78716c" value={form.specialties} onChangeText={(t) => setForm(p => ({...p, specialties: t}))} />
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModal(false)}><Text style={styles.cancelText}>إلغاء</Text></TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}><Text style={styles.saveText}>حفظ</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0a05" },
  list: { padding: 16 },
  addBtn: { backgroundColor: "#d97706", borderRadius: 12, padding: 16, alignItems: "center", marginBottom: 16 },
  addBtnText: { color: "#1c1917", fontSize: 16, fontWeight: "700" },
  card: { backgroundColor: "#1c1917", borderRadius: 12, borderWidth: 1, borderColor: "#292524", padding: 16, marginBottom: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { color: "#f5f5f4", fontSize: 16, fontWeight: "700" },
  badges: { flexDirection: "row", gap: 6 },
  verifiedBadge: { backgroundColor: "#059669", color: "white", fontSize: 10, fontWeight: "700", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  availBadge: { backgroundColor: "#292524", color: "#22c55e", fontSize: 10, fontWeight: "700", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  unavail: { color: "#ef4444" },
  meta: { color: "#a8a29e", fontSize: 12, marginTop: 4 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  price: { color: "#d97706", fontSize: 16, fontWeight: "700" },
  editBtn: { color: "#d97706", fontSize: 14, fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 20 },
  modal: { backgroundColor: "#1c1917", borderRadius: 20, padding: 24, borderWidth: 1, borderColor: "#292524" },
  modalTitle: { color: "#f5f5f4", fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#292524", borderRadius: 10, padding: 12, color: "#f5f5f4", marginBottom: 10, textAlign: "right" },
  row: { flexDirection: "row", gap: 10 },
  half: { flex: 1 },
  btnRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  cancelBtn: { flex: 1, backgroundColor: "#292524", borderRadius: 10, padding: 14, alignItems: "center" },
  cancelText: { color: "#a8a29e", fontWeight: "600" },
  saveBtn: { flex: 1, backgroundColor: "#d97706", borderRadius: 10, padding: 14, alignItems: "center" },
  saveText: { color: "#1c1917", fontWeight: "700" },
});
