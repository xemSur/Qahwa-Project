import { useCallback, useEffect, useState, type FormEvent } from "react";
import { providersApi, type Provider } from "../api";
import { Spinner, ErrorBox, Card, Field, PrimaryButton, GhostButton, inputCls, inputStyle, confirmDelete } from "../ui";

const emptyForm = {
  name: "",
  gender: "قهوجي",
  city: "الرياض",
  rating: "0",
  reviews: "0",
  experience: "",
  specialties: "",
  pricePerHour: "250",
  verified: "true",
  available: "true",
  image: "",
};

export default function ProvidersView() {
  const [items, setItems] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Provider | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await providersApi.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startAdd = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const startEdit = (p: Provider) => {
    setEditing(p);
    setForm({
      name: p.name,
      gender: p.gender,
      city: p.city,
      rating: String(p.rating ?? 0),
      reviews: String(p.reviews ?? 0),
      experience: p.experience || "",
      specialties: (p.specialties || []).join("، "),
      pricePerHour: String(p.pricePerHour ?? 0),
      verified: String(p.verified),
      available: String(p.available),
      image: p.image || "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      gender: form.gender,
      city: form.city,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      experience: form.experience.trim(),
      specialties: form.specialties.split("،").map((s) => s.trim()).filter(Boolean),
      pricePerHour: Number(form.pricePerHour) || 0,
      verified: form.verified === "true",
      available: form.available === "true",
      image: form.image.trim(),
    };
    try {
      if (editing) {
        await providersApi.update(editing.id, payload);
      } else {
        await providersApi.create(payload);
      }
      setForm(emptyForm);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Provider) => {
    if (!confirmDelete(`القهوجي "${p.name}"`)) return;
    try {
      await providersApi.remove(p.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    }
  };

  const set = (key: keyof typeof emptyForm, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="space-y-6">
      {error && <ErrorBox message={error} onRetry={load} />}

      <Card
        title={editing ? `تعديل: ${editing.name}` : "إضافة قهوجي جديد"}
        action={<button onClick={startAdd} className="text-xs text-amber-500 hover:underline">تفريغ النموذج</button>}
      >
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <Field label="الاسم *">
            <input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>
          <Field label="الجنس">
            <select className={inputCls} style={inputStyle} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
              <option>قهوجي</option>
              <option>قهوجية</option>
            </select>
          </Field>
          <Field label="المدينة">
            <input className={inputCls} style={inputStyle} value={form.city} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="التقييم">
            <input type="number" step="0.1" min={0} max={5} className={inputCls} style={inputStyle} value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </Field>
          <Field label="عدد التقييمات">
            <input type="number" className={inputCls} style={inputStyle} value={form.reviews} onChange={(e) => set("reviews", e.target.value)} />
          </Field>
          <Field label="سعر الساعة (ر.س)">
            <input type="number" className={inputCls} style={inputStyle} value={form.pricePerHour} onChange={(e) => set("pricePerHour", e.target.value)} />
          </Field>
          <Field label="الخبرة">
            <input className={inputCls} style={inputStyle} value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="مثال: 10 سنوات خبرة" />
          </Field>
          <Field label="التخصصات (مفصولة بفاصلة)">
            <input className={inputCls} style={inputStyle} value={form.specialties} onChange={(e) => set("specialties", e.target.value)} />
          </Field>
          <Field label="رابط الصورة">
            <input className={inputCls} style={inputStyle} value={form.image} onChange={(e) => set("image", e.target.value)} dir="ltr" />
          </Field>
          <Field label="موثّق">
            <select className={inputCls} style={inputStyle} value={form.verified} onChange={(e) => set("verified", e.target.value)}>
              <option value="true">نعم</option>
              <option value="false">لا</option>
            </select>
          </Field>
          <Field label="متاح">
            <select className={inputCls} style={inputStyle} value={form.available} onChange={(e) => set("available", e.target.value)}>
              <option value="true">متاح</option>
              <option value="false">محجوز</option>
            </select>
          </Field>
          <div className="flex items-end">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "إضافة"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {loading ? (
        <Spinner label="جاري التحميل..." />
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
          <div className="border-b px-5 py-4 font-bold" style={{ borderColor: "var(--color-stone-800)" }}>
            القهوجيون ({items.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right" style={{ color: "var(--color-stone-400)" }}>
                  <th className="px-5 py-3 font-semibold">الاسم</th>
                  <th className="px-5 py-3 font-semibold">المدينة</th>
                  <th className="px-5 py-3 font-semibold">التقييم</th>
                  <th className="px-5 py-3 font-semibold">السعر/ساعة</th>
                  <th className="px-5 py-3 font-semibold">الحالة</th>
                  <th className="px-5 py-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: "var(--color-stone-800)" }}>
                    <td className="px-5 py-3 font-semibold">{p.name}</td>
                    <td className="px-5 py-3">{p.city}</td>
                    <td className="px-5 py-3 text-amber-500">★ {p.rating} ({p.reviews})</td>
                    <td className="px-5 py-3">{p.pricePerHour} ر.س</td>
                    <td className="px-5 py-3">
                      <span className="inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
                        style={{ backgroundColor: p.available ? "var(--color-stone-800)" : "var(--color-stone-800)", color: p.available ? "var(--color-stone-300)" : "var(--color-stone-500)" }}>
                        {p.available ? (p.verified ? "موثّق ومتاح" : "متاح") : "محجوز"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <GhostButton onClick={() => startEdit(p)}>تعديل</GhostButton>
                        <GhostButton danger onClick={() => remove(p)}>حذف</GhostButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
