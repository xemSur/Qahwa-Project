import { useCallback, useEffect, useState } from "react";
import { bookingsApi, type Booking } from "../api";
import { Spinner, ErrorBox, StatusBadge, BOOKING_STATUSES, confirmDelete } from "../ui";

export default function BookingsView() {
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await bookingsApi.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id: number, status: string) => {
    try {
      await bookingsApi.setStatus(id, status);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    }
  };

  const remove = async (id: number, name: string) => {
    if (!confirmDelete(`الحجز "${name}"`)) return;
    try {
      await bookingsApi.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    }
  };

  if (loading) return <Spinner label="جاري تحميل الحجوزات..." />;
  if (error) return <ErrorBox message={error} onRetry={load} />;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
      <div className="border-b px-5 py-4 font-bold" style={{ borderColor: "var(--color-stone-800)" }}>
        الحجوزات ({items.length})
      </div>
      {items.length === 0 ? (
        <p className="p-8 text-center text-sm" style={{ color: "var(--color-stone-500)" }}>لا توجد حجوزات بعد.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right" style={{ color: "var(--color-stone-400)" }}>
                <th className="px-5 py-3 font-semibold">العميل</th>
                <th className="px-5 py-3 font-semibold">المدينة</th>
                <th className="px-5 py-3 font-semibold">التاريخ</th>
                <th className="px-5 py-3 font-semibold">الضيوف</th>
                <th className="px-5 py-3 font-semibold">الإجمالي</th>
                <th className="px-5 py-3 font-semibold">الحالة</th>
                <th className="px-5 py-3 font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="border-t" style={{ borderColor: "var(--color-stone-800)" }}>
                  <td className="px-5 py-3">
                    <div className="font-semibold">{b.customerName || "بدون اسم"}</div>
                    {b.customerPhone && <div className="text-xs" style={{ color: "var(--color-stone-500)" }} dir="ltr">{b.customerPhone}</div>}
                  </td>
                  <td className="px-5 py-3">{b.city || "—"}</td>
                  <td className="px-5 py-3" style={{ color: "var(--color-stone-300)" }}>
                    {b.eventDate ? new Date(b.eventDate).toLocaleDateString("ar-SA") : "—"}
                  </td>
                  <td className="px-5 py-3">{b.guests ?? "—"}</td>
                  <td className="px-5 py-3 font-bold text-amber-500">
                    {b.totalPrice ? `${Number(b.totalPrice).toLocaleString()} ر.س` : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={b.status}
                        onChange={(e) => setStatus(b.id, e.target.value)}
                        className="rounded-lg border px-2 py-1.5 text-xs outline-none"
                        style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--color-stone-700)", color: "var(--color-stone-100)" }}
                      >
                        {BOOKING_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => remove(b.id, b.customerName || "")}
                        className="rounded-lg border border-red-900/50 px-2 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 transition"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
