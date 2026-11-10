import { useState, type FormEvent } from "react";
import { auth, tokenStore, type AuthUser } from "./api";
import Logo from "../components/Logo";

type Props = { onSuccess: (user: AuthUser) => void };

export default function LoginScreen({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const user = await auth.login(email, password);
      tokenStore.save(user.token);
      onSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none";
  const inputStyle = { backgroundColor: "var(--input-bg)", borderColor: "var(--color-stone-800)", color: "var(--color-stone-100)" };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto"><Logo size={64} /></div>
          <h1 className="mt-4 text-2xl font-bold" style={{ fontFamily: "'Amiri', serif" }}>
            لوحة تحكم قهوجية الحجاز
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--color-stone-400)" }}>
            سجل الدخول لإدارة الحجوزات والمحتوى
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border p-6 space-y-4" style={{ borderColor: "var(--color-stone-800)", backgroundColor: "var(--card-bg)" }}>
          <div>
            <label className="text-xs" style={{ color: "var(--color-stone-400)" }}>البريد الإلكتروني</label>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              style={inputStyle}
              placeholder="admin@qahwaji.com"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-xs" style={{ color: "var(--color-stone-400)" }}>كلمة المرور</label>
            <input
              type="password"
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              style={inputStyle}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-3 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-l from-amber-500 to-orange-600 py-3 font-bold text-stone-900 shadow-lg shadow-amber-900/30 hover:brightness-110 disabled:opacity-60 transition"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
          <a href="/" className="block text-center text-xs hover:text-amber-500 transition" style={{ color: "var(--color-stone-500)" }}>
            ← العودة إلى الموقع
          </a>
        </form>
      </div>
    </div>
  );
}
