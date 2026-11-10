import { providers } from "../data/providers";
import { dashboardTips } from "../data/content";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import { CheckIcon } from "./ui/Icons";
import { cn } from "../utils/cn";

type Props = {
  activeTab: string;
  setActiveTab: (t: string) => void;
  onRegister: () => void;
};

const TABS = ["حجز", "تتبع", "لوحة التحكم"];

const features = [
  "تقويم حجوزات تفاعلي",
  "إحصائيات الدخل والتقييمات",
  "إدارة الباقات والأسعار",
  "محفظة وسحب فوري",
  "دعم فني 24/7",
];

export default function DashboardSection({ activeTab, setActiveTab, onRegister }: Props) {
  const tip = dashboardTips[Math.floor(Math.random() * dashboardTips.length)];

  return (
    <section className="border-y border-line bg-section">
      <Container className="py-20 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <SectionHeading
            title="إدارة حجوزاتك ودخلك بسهولة"
            eyebrow="لوحة تحكم مقدم الخدمة"
          />
          <ul className="mt-6 space-y-3">
            {features.map((i) => (
              <li key={i} className="flex items-center gap-3 text-default">
                <span className="size-6 grid place-items-center rounded-full bg-accent-600/15 text-accent-700 dark:text-accent-400 shrink-0">
                  <CheckIcon size={13} />
                </span>
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onRegister}>سجّل كمزود خدمة</Button>
            <button
              onClick={() => setActiveTab("تتبع")}
              className="rounded-xl border border-line-strong px-5 py-2.5 font-semibold text-default hover:border-brand hover:text-brand transition"
            >
              شاهد ديمو
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-brand/20 to-brand-800/20 blur-3xl rounded-[2rem]" />
            <div className="relative rounded-[1.5rem] border border-line overflow-hidden shadow-2xl bg-card">
              <div className="border-b border-line px-5 py-3 flex items-center gap-2">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-semibold transition",
                      activeTab === t
                        ? "bg-gradient-brand text-brand-ink"
                        : "text-muted hover:text-strong",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeTab === "حجز" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-line bg-elevated p-4">
                      <div className="text-xs text-faint">الحجز القادم</div>
                      <div className="mt-1 font-bold text-strong">حفل زفاف - فندق الفورسيزون</div>
                      <div className="text-sm text-muted">الرياض • السبت 8:00 م • 5 ساعات</div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded-full bg-accent-600/15 text-accent-700 dark:text-accent-400 px-2 py-0.5 text-xs font-bold">
                          مؤكد
                        </span>
                        <span className="text-xs text-faint">مدفوع بالكامل</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { l: "حجوزات الشهر", v: "18" },
                        { l: "التقييم", v: "4.9" },
                        { l: "الدخل", v: "9,400 ر.س" },
                      ].map((s) => (
                        <div key={s.l} className="rounded-xl border border-line bg-elevated p-3 text-center">
                          <div className="text-xl font-bold text-brand">{s.v}</div>
                          <div className="text-[11px] text-faint">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "تتبع" && (
                  <div className="rounded-xl border border-line bg-elevated p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-faint">القهوجي في الطريق</div>
                        <div className="font-bold text-strong">أبو ناصر • 4.9 ★</div>
                      </div>
                      <div className="size-10 rounded-full overflow-hidden border-2 border-brand">
                        <img
                          src={providers[0].image}
                          width={800}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="mt-4 h-32 rounded-lg border border-line bg-input grid place-items-center text-sm text-faint">
                      خريطة تتبع مباشر • يصل خلال 12 دقيقة
                    </div>
                    <button className="mt-3 w-full rounded-lg py-2 text-sm bg-elevated text-strong hover:bg-brand/10 transition">
                      تواصل الآن
                    </button>
                  </div>
                )}
                {activeTab === "لوحة التحكم" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-brand/40 bg-brand/10 p-4">
                      <div className="text-sm font-bold text-brand-700 dark:text-brand-200">نصيحة اليوم</div>
                      <p className="text-xs text-default mt-1">{tip}</p>
                    </div>
                    <div className="rounded-xl border border-line bg-elevated p-4">
                      <div className="text-xs mb-2 text-faint">أداء هذا الأسبوع</div>
                      <div className="h-20 flex items-end gap-1">
                        {[40, 65, 50, 80, 70, 90, 60].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-brand-700 to-brand-500"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
