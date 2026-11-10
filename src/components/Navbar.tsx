import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./ui/Icons";
import Button from "./ui/Button";

type Props = { onBook: () => void };

export default function Navbar({ onBook }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const ThemeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "التبديل للوضع الفاتح" : "التبديل للوضع الداكن"}
      className="size-9 grid place-items-center rounded-xl border border-line text-muted hover:text-brand hover:border-brand transition"
    >
      {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 backdrop-blur-xl transition-all duration-300",
          scrolled ? "shadow-md" : "",
        )}
        style={{ backgroundColor: scrolled ? "var(--nav-bg)" : "color-mix(in srgb, var(--nav-bg) 60%, transparent)" }}
      >
        {/* خيط ذهبي سفلي فاخر */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-gold-500/70 to-transparent" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-[64px] sm:h-[70px] flex items-center justify-between gap-3">
          <a href="#" className="flex items-center gap-3 min-w-0 group">
            <img
              src="/logoqahwa.png"
              alt="شعار قهوجية الحجاز"
              width={36}
              height={36}
              className="size-9 sm:size-10 rounded-2xl object-cover shrink-0 shadow-gold ring-1 ring-gold-500/50 transition group-hover:scale-105"
            />
            <div className="min-w-0">
              <div className="text-[19px] sm:text-[22px] leading-none font-bold tracking-wide truncate font-display text-gold">
                قهوجية الحجاز
              </div>
              <div className="hidden sm:block text-[11px] text-muted -mt-0.5 tracking-widest">ضيافة أصيلة • حجز فوري</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                className="text-muted hover:text-gold-300 transition relative after:absolute after:bottom-[-6px] after:right-0 after:h-px after:w-0 after:bg-gradient-to-l after:from-gold-500 after:to-gold-300 after:transition-all hover:after:w-full"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {ThemeToggle}
            <Button shape="pill" size="sm" onClick={onBook} className="hidden sm:inline-flex">
              احجز الآن
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
              className="md:hidden size-9 grid place-items-center rounded-xl border border-line text-strong hover:border-brand transition"
            >
              <MenuIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 md:hidden backdrop-blur-sm"
              style={{ backgroundColor: "var(--modal-overlay)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed top-0 bottom-0 right-0 z-50 md:hidden w-[280px] bg-page border-l border-line flex flex-col shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="flex items-center justify-between p-4 border-b border-line">
                <span className="font-bold font-display text-strong">القائمة</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="size-9 grid place-items-center rounded-xl border border-line text-muted hover:text-brand transition"
                >
                  <CloseIcon size={18} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1" onClick={() => setMenuOpen(false)}>
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l}`}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-default hover:bg-elevated hover:text-brand transition"
                  >
                    {l}
                  </a>
                ))}
              </nav>
              <div className="p-4 border-t border-line space-y-3">
                <Button fullWidth onClick={() => { setMenuOpen(false); onBook(); }}>
                  احجز الآن
                </Button>
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>الوضع الفاتح</span>
                  {ThemeToggle}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
