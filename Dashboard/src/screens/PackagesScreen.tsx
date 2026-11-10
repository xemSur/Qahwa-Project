import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, RefreshControl, TextInput, Modal } from "react-native";
import { packagesApi } from "../services/api";

type Package = {
  id: number; name: string; price: string; popular: boolean;
  features: string; includes: string; color: string; priceValue: number;
};

export default function PackagesScreen() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [form, setForm] = useState({ name: "", price: "", popular: false, features: "", includes: "", color: "from-amber-500 to-orange-600", priceValue: "" });

  const load = useCallback(async () => {
    try { setPackages(await packagesApi.getAll()); } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    try {
      const data = { ...form, priceValue: parseFloat(form.priceValue) };
      if (editing) await packagesApi.update(editing.id, data);
      else await packagesApi.create(data);
      setModal(false);
      setEditing(null);
      setForm({ name: "", price: "", popular: false, features: "", includes: "", color: "from-amber-500 to-orange-600", priceValue: "" });
      load();
    } catch (err: any) { Alert.alert("خطأ", err.message); }
  };

  const renderItem = ({ item }: { item: Package }) => (
    <TouchableOpacity style={styles.card} onLongPress={() => Alert.alert("خيارات", "", [
      { text: "تعديل", onPress: () => { setEditing(item); setForm({ name: item.name, price: item.price, popular: item.popular, features: item.features, includes: item.includes, color: item.color, priceValue: String(item.priceValue) }); setModal(true); }},
      { text: "حذف", style: "destructive", onPress: async () => { await packagesApi.delete(item.id); load(); }},
      { text: "إلغاء", style: "cancel" },
    ])}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        {item.popular && <Text style={styles.popular}>الأكثر طلباً</Text>}
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} tintColor="#d97706" />}
        ListHeaderComponent={() => (
          <TouchableOpacity style={styles.addBtn} onPress={() => { setEditing(null); setForm({ name: "", price: "", popular: false, features: "", includes: "", color: "from-amber-500 to-orange-600", priceValue: "" }); setModal(true); }}>
            <Text style={styles.addBtnText}>+ إضافة باقة</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{editing ? "تعديل" : "إضافة"} باقة</Text>
            <TextInput style={styles.input} placeholder="اسم الباقة" placeholderTextColor="#78716c" value={form.name} onChangeText={(t) => setForm(p => ({...p, name: t}))} />
            <View style={styles.row}>
              <TextInput style={[styles.input, styles.half]} placeholder="السعر (نص)" placeholderTextColor="#78716c" value={form.price} onChangeText={(t) => setForm(p => ({...p, price: t}))} />
              <TextInput style={[styles.input, styles.half]} placeholder="القيمة الرقمية" placeholderTextColor="#78716c" value={form.priceValue} onChangeText={(t) => setForm(p => ({...p, priceValue: t}))} keyboardType="numeric" />
            </View>
            <TextInput style={styles.input} placeholder="المميزات (مفصولة بفواصل)" placeholderTextColor="#78716c" value={form.features} onChangeText={(t) => setForm(p => ({...p, features: t}))} />
            <TextInput style={styles.input} placeholder="يشمل (مفصولة بفواصل)" placeholderTextColor="#78716c" value={form.includes} onChangeText={(t) => setForm(p => ({...p, includes: t}))} />
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
  popular: { backgroundColor: "#d97706", color: "#1c1917", fontSize: 10, fontWeight: "700", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  price: { color: "#d97706", fontSize: 18, fontWeight: "800", marginTop: 8 },
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
