import { lazy, Suspense, useEffect, useState } from "react";
import { auth, tokenStore, type AuthUser } from "./api";
import LoginScreen from "./LoginScreen";
import Logo from "../components/Logo";
import { Spinner } from "./ui";
import {
  CalendarDaysIcon,
  DashboardIcon,
  GiftIcon,
  StarIcon,
  UserCircleIcon,
} from "../components/ui/Icons";

const OverviewView = lazy(() => import("./views/OverviewView"));
const BookingsView = lazy(() => import("./views/BookingsView"));
const ProvidersView = lazy(() => import("./views/ProvidersView"));
const PackagesView = lazy(() => import("./views/PackagesView"));
const TestimonialsView = lazy(() => import("./views/TestimonialsView"));

type TabId = "overview" | "bookings" | "providers" | "packages" | "testimonials";

const TABS: { id: TabId; label: string; icon: typeof DashboardIcon }[] = [
  { id: "overview", label: "نظرة عامة", icon: DashboardIcon },
  { id: "bookings", label: "الحجوزات", icon: CalendarDaysIcon },
  { id: "providers", label: "القهوجيون", icon: UserCircleIcon },
  { id: "packages", label: "الباقات", icon: GiftIcon },
  { id: "testimonials", label: "التقييمات", icon: StarIcon },
];

function Shell({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>("overview");
  const active = TABS.find((t) => t.id === tab);

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 border-l flex-col sticky top-0 h-screen" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--bg-section)" }}>
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "var(--color-stone-800)" }}>
          <Logo size={40} />
          <div>
            <div className="font-bold" style={{ fontFamily: "'Amiri', serif" }}>قهوجية الحجاز</div>
            <div className="text-[11px] text-amber-500">لوحة التحكم</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${tab === t.id ? "bg-amber-500 text-stone-900" : ""}`}
              style={tab !== t.id ? { color: "var(--color-stone-300)" } : {}}
            >
              <span><t.icon size={18} /></span>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="border-t px-5 py-4 space-y-3" style={{ borderColor: "var(--color-stone-800)" }}>
          <div className="text-sm">
            <div className="font-bold truncate">{user.name}</div>
            <div className="text-[11px] truncate" style={{ color: "var(--color-stone-500)" }} dir="ltr">{user.email}</div>
          </div>
          <div className="flex gap-2">
            <a href="/" className="flex-1 text-center rounded-lg border px-2 py-1.5 text-xs font-bold transition hover:border-amber-700" style={{ borderColor: "var(--color-stone-700)", color: "var(--color-stone-300)" }}>
              الموقع
            </a>
            <button onClick={onLogout} className="flex-1 rounded-lg border border-red-900/50 px-2 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-950/40">
              خروج
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 border-b backdrop-blur" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--nav-bg)" }}>
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="md:hidden shrink-0"><Logo size={32} /></span>
              <h1 className="text-base sm:text-lg font-bold truncate">{active?.label}</h1>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a href="/" className="text-xs hover:text-amber-500 transition hidden sm:block" style={{ color: "var(--color-stone-400)" }}>
                qahwa.xemsys.com
              </a>
              <button onClick={onLogout} className="md:hidden rounded-lg border border-red-900/50 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 transition">
                خروج
              </button>
            </div>
          </div>
          {/* Mobile horizontal tab bar */}
          <nav className="md:hidden flex gap-2 overflow-x-auto px-4 pb-3 -mt-1" dir="rtl">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${tab === t.id ? "bg-amber-500 text-stone-900" : ""}`}
                style={tab !== t.id ? { color: "var(--color-stone-300)", backgroundColor: "var(--card-bg)", border: "1px solid var(--color-stone-800)" } : {}}
              >
                <span className="inline-flex items-center gap-1.5"><t.icon size={16} /> {t.label}</span>
              </button>
            ))}
          </nav>
        </header>
        <div className="p-4 sm:p-6">
          <Suspense fallback={<Spinner label="جاري التحميل..." />}>
            {tab === "overview" && <OverviewView />}
            {tab === "bookings" && <BookingsView />}
            {tab === "providers" && <ProvidersView />}
            {tab === "packages" && <PackagesView />}
            {tab === "testimonials" && <TestimonialsView />}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = tokenStore.get();
        if (token) {
          const info = await auth.verify();
          setUser({ token, name: info.name, email: info.email, role: info.role });
        }
      } catch {
        tokenStore.clear();
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const handleLogin = (u: AuthUser) => setUser(u);
  const handleLogout = () => {
    tokenStore.clear();
    setUser(null);
  };

  if (checking) return <Spinner label="جاري التحقق من الجلسة..." />;

  if (!user) {
    return <LoginScreen onSuccess={handleLogin} />;
  }

  return <Shell user={user} onLogout={handleLogout} />;
}
