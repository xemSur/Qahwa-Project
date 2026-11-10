import { tasks, places, skills, HERO_IMG } from "../data/content";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal, { RevealItem } from "./ui/Reveal";
import Tilt from "./ui/Tilt";
import { CheckIcon, SparklesIcon } from "./ui/Icons";

const HOSPITALITY_IMG = "https://images.pexels.com/photos/14941019/pexels-photo-14941019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200";
const DATES_IMG = "https://images.pexels.com/photos/32692732/pexels-photo-32692732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200";

export default function ServicesSection() {
  return (
    <>
      <section id="الخدمات" className="py-16">
        <Container>
          <SectionHeading
            title="مهام القهوجي المحترف"
            subtitle="خدمة متكاملة من التحضير إلى التقديم وفق أصول الضيافة السعودية"
            eyebrow="معايير الجودة • ISO Hospitality"
          />
          <Reveal stagger={0.06} className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((t, i) => (
              <RevealItem key={t.title}>
                <Tilt intensity={6} lift={18}>
                <div className="relative h-full rounded-2xl card-3d p-5 overflow-hidden">
                  <div style={{ transform: "translateZ(24px)" }} className="absolute top-4 left-5 text-5xl font-black text-faint/60">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-lg text-strong relative">{t.title}</h3>
                  <p className="text-sm mt-1 leading-6 text-muted relative">{t.desc}</p>
                </div>
                </Tilt>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-section">
        <Container className="py-16 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <h3 className="text-[28px] font-bold mb-6 font-display text-strong">أماكن العمل</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {places.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-sm transition hover:border-brand/60"
                >
                  <span className="size-8 grid place-items-center rounded-lg bg-brand/15 text-brand shrink-0">
                    <CheckIcon size={16} />
                  </span>
                  <span className="text-sm text-default">{p}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-line shadow-md">
              <img src={HOSPITALITY_IMG} width={1200} height={800} loading="lazy" decoding="async" className="h-56 w-full object-cover opacity-90" alt="" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-[28px] font-bold mb-6 font-display text-strong">المهارات المطلوبة</h3>
            <ul className="space-y-3">
              {skills.map((s) => (
                <li key={s} className="flex items-start gap-3 text-default">
                  <span className="mt-1 size-5 grid place-items-center rounded-full bg-accent-600/15 text-accent-700 dark:text-accent-400 shrink-0">
                    <SparklesIcon size={12} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <img src={HERO_IMG} width={1200} height={800} loading="lazy" decoding="async" className="h-40 w-full object-cover rounded-2xl border border-line" alt="" />
              <img src={DATES_IMG} width={1200} height={800} loading="lazy" decoding="async" className="h-40 w-full object-cover rounded-2xl border border-line" alt="" />
            </div>
            <div className="mt-6 rounded-2xl border border-brand/40 bg-brand/10 p-4 text-sm text-brand-700 dark:text-brand-200">
              💡 فرصة تجارية: حوّل المهنة إلى مشروع متنقل بسيارة أو مقطورة ضيافة مع حجز مباشر وباقات للمناسبات.
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
