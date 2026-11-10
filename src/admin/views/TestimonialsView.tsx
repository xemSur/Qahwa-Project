import { useCallback, useEffect, useState, type FormEvent } from "react";
import { testimonialsApi, type Testimonial } from "../api";
import { Spinner, ErrorBox, Card, Field, PrimaryButton, inputCls, inputStyle, confirmDelete } from "../ui";

const emptyForm = { n: "", c: "", t: "" };

export default function TestimonialsView() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await testimonialsApi.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.n.trim() || !form.t.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await testimonialsApi.create({ n: form.n.trim(), c: form.c.trim(), t: form.t.trim() });
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (x: Testimonial) => {
    if (!confirmDelete(`تقييم "${x.n}"`)) return;
    try {
      await testimonialsApi.remove(x.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    }
  };

  return (
    <div className="space-y-6">
      {error && <ErrorBox message={error} onRetry={load} />}

      <Card title="إضافة تقييم جديد">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <Field label="الاسم *">
            <input className={inputCls} style={inputStyle} value={form.n} onChange={(e) => setForm((f) => ({ ...f, n: e.target.value }))} required />
          </Field>
          <Field label="نوع المناسبة">
            <input className={inputCls} style={inputStyle} value={form.c} onChange={(e) => setForm((f) => ({ ...f, c: e.target.value }))} placeholder="مثال: زواج أخي" />
          </Field>
          <Field label="النص *">
            <input className={inputCls} style={inputStyle} value={form.t} onChange={(e) => setForm((f) => ({ ...f, t: e.target.value }))} required />
          </Field>
          <div className="flex items-end">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "جاري الحفظ..." : "إضافة"}
            </PrimaryButton>
          </div>
        </form>
      </Card>

      {loading ? (
        <Spinner label="جاري التحميل..." />
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
          <div className="border-b px-5 py-4 font-bold" style={{ borderColor: "var(--color-stone-800)" }}>
            التقييمات ({items.length})
          </div>
          {items.length === 0 ? (
            <p className="p-8 text-center text-sm" style={{ color: "var(--color-stone-500)" }}>لا توجد تقييمات.</p>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--color-stone-800)" }}>
              {items.map((x) => (
                <div key={x.id} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <div className="font-bold text-amber-500">★ {x.n}</div>
                    {x.c && <div className="text-xs" style={{ color: "var(--color-stone-500)" }}>{x.c}</div>}
                    <p className="mt-1 text-sm leading-6" style={{ color: "var(--color-stone-300)" }}>"{x.t}"</p>
                  </div>
                  <button
                    onClick={() => remove(x)}
                    className="shrink-0 rounded-lg border border-red-900/50 px-2 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 transition"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
