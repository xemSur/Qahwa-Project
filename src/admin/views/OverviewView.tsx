import { useEffect, useState } from "react";
import { dashboardApi, bookingsApi, type Stats, type Booking } from "../api";
import { Spinner, ErrorBox } from "../ui";

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
      <div className={`text-2xl font-extrabold ${accent ? "text-amber-500" : ""}`}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: "var(--color-stone-400)" }}>{label}</div>
    </div>
  );
}

export default function OverviewView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, b] = await Promise.all([dashboardApi.stats(), bookingsApi.list()]);
      setStats(s);
      setRecent(b.slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Spinner label="جاري تحميل الإحصائيات..." />;
  if (error) return <ErrorBox message={error} onRetry={load} />;

  const statusCounts = [
    { label: "قيد الانتظار", value: stats?.pendingBookings ?? 0, cls: "text-amber-300" },
    { label: "مؤكدة", value: stats?.confirmedBookings ?? 0, cls: "text-emerald-300" },
    { label: "مكتملة", value: stats?.completedBookings ?? 0, cls: "text-stone-300" },
    { label: "ملغاة", value: stats?.cancelledBookings ?? 0, cls: "text-red-300" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="إجمالي الحجوزات" value={stats?.totalBookings ?? 0} accent />
        <StatCard label="الإيرادات (ر.س)" value={(stats?.totalRevenue ?? 0).toLocaleString()} accent />
        <StatCard label="القهوجيون" value={stats?.totalProviders ?? 0} />
        <StatCard label="متوسط التقييم" value={stats?.averageRating ?? 0} />
        <StatCard label="الباقات" value={stats?.totalPackages ?? 0} />
        <StatCard label="آراء العملاء" value={stats?.totalTestimonials ?? 0} />
        <StatCard label="رسائل غير مقروءة" value={stats?.unreadMessages ?? 0} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
          <h3 className="font-bold mb-4">حالات الحجوزات</h3>
          <div className="space-y-3">
            {statusCounts.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--color-stone-300)" }}>{s.label}</span>
                <span className={`font-bold ${s.cls}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
          <h3 className="font-bold mb-4">أحدث الحجوزات</h3>
          {recent.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--color-stone-500)" }}>لا توجد حجوزات بعد.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{b.customerName || "بدون اسم"}</div>
                    <div className="text-xs truncate" style={{ color: "var(--color-stone-500)" }}>
                      {b.city || "—"} • {b.eventDate ? new Date(b.eventDate).toLocaleDateString("ar-SA") : "—"}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs rounded-full px-2.5 py-1 font-bold" style={{ backgroundColor: "var(--color-stone-800)", color: "var(--color-stone-300)" }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
