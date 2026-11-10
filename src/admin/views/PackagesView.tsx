import { useCallback, useEffect, useState, type FormEvent } from "react";
import { packagesApi, type Package } from "../api";
import { Spinner, ErrorBox, Card, Field, PrimaryButton, GhostButton, inputCls, inputStyle, confirmDelete } from "../ui";

const emptyForm = {
  name: "",
  price: "",
  priceValue: "500",
  popular: "false",
  color: "from-amber-500 to-orange-600",
  features: "",
  includes: "",
};

export default function PackagesView() {
  const [items, setItems] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Package | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await packagesApi.list());
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

  const startEdit = (p: Package) => {
    setEditing(p);
    setForm({
      name: p.name,
      price: p.price,
      priceValue: String(p.priceValue ?? 0),
      popular: String(!!p.popular),
      color: p.color || "",
      features: (p.features || []).join("\n"),
      includes: (p.includes || []).join("\n"),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      price: form.price.trim() || "—",
      priceValue: Number(form.priceValue) || 0,
      popular: form.popular === "true",
      color: form.color.trim() || "from-amber-500 to-orange-600",
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      includes: form.includes.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await packagesApi.update(editing.id, payload);
      } else {
        await packagesApi.create(payload);
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

  const remove = async (p: Package) => {
    if (!confirmDelete(`الباقة "${p.name}"`)) return;
    try {
      await packagesApi.remove(p.id);
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
        title={editing ? `تعديل: ${editing.name}` : "إضافة باقة جديدة"}
        action={<button onClick={startAdd} className="text-xs text-amber-500 hover:underline">تفريغ النموذج</button>}
      >
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <Field label="اسم الباقة *">
            <input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>
          <Field label="السعر (نص)">
            <input className={inputCls} style={inputStyle} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="مثال: من 1,200 ر.س" />
          </Field>
          <Field label="القيمة الرقمية (ر.س)">
            <input type="number" className={inputCls} style={inputStyle} value={form.priceValue} onChange={(e) => set("priceValue", e.target.value)} />
          </Field>
          <Field label="الأكثر طلباً">
            <select className={inputCls} style={inputStyle} value={form.popular} onChange={(e) => set("popular", e.target.value)}>
              <option value="true">نعم</option>
              <option value="false">لا</option>
            </select>
          </Field>
          <Field label="لون الشارة (Tailwind)">
            <input className={inputCls} style={inputStyle} value={form.color} onChange={(e) => set("color", e.target.value)} dir="ltr" />
          </Field>
          <div className="md:col-span-3">
            <Field label="المميزات (سطر لكل ميزة)">
              <textarea className={inputCls} style={inputStyle} rows={3} value={form.features} onChange={(e) => set("features", e.target.value)} />
            </Field>
          </div>
          <div className="md:col-span-3">
            <Field label="يشمل (سطر لكل عنصر)">
              <textarea className={inputCls} style={inputStyle} rows={2} value={form.includes} onChange={(e) => set("includes", e.target.value)} />
            </Field>
          </div>
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
            الباقات ({items.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right" style={{ color: "var(--color-stone-400)" }}>
                  <th className="px-5 py-3 font-semibold">الاسم</th>
                  <th className="px-5 py-3 font-semibold">السعر</th>
                  <th className="px-5 py-3 font-semibold">المميزات</th>
                  <th className="px-5 py-3 font-semibold">مميزة</th>
                  <th className="px-5 py-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: "var(--color-stone-800)" }}>
                    <td className="px-5 py-3 font-semibold">{p.name}</td>
                    <td className="px-5 py-3 text-amber-500">{p.price}</td>
                    <td className="px-5 py-3" style={{ color: "var(--color-stone-300)" }}>
                      <div className="max-w-[260px] truncate">{p.features.join(" • ")}</div>
                    </td>
                    <td className="px-5 py-3">{p.popular ? "⭐" : "—"}</td>
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
