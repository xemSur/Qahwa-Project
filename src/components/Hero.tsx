import { motion } from "framer-motion";
import { cities } from "../data/providers";
import { stats, HERO_IMG } from "../data/content";
import { EASE_OUT_QUART } from "../lib/motion";
import Container from "./ui/Container";
import CountUp from "./ui/CountUp";
import AmbientGlow from "./ui/AmbientGlow";
import Tilt from "./ui/Tilt";

type Props = {
  city: string; setCity: (v: string) => void;
  date: string; setDate: (v: string) => void;
  time: string; setTime: (v: string) => void;
  duration: number; setDuration: (v: number) => void;
  gender: string; setGender: (v: "الكل" | "قهوجي" | "قهوجية") => void;
  guests: number; setGuests: (v: number) => void;
  setShowBooking: (v: boolean) => void;
  showToast: (msg: string) => void;
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_QUART, delay: 0.1 + i * 0.1 },
  }),
};

function parseStat(raw: string) {
  const match = raw.match(/^([\d.,]+)(.*)$/);
  if (!match) return { value: 0, suffix: "" };
  return { value: parseFloat(match[1].replace(/,/g, "")), suffix: match[2] };
}

const fieldCls =
  "mt-1 w-full rounded-lg border border-line bg-input px-2.5 py-2 text-sm text-strong outline-none transition focus:border-brand min-w-0";
const labelCls = "text-[11px] sm:text-xs text-muted";

export default function Hero(props: Props) {
  const { city, setCity, date, setDate, time, setTime, duration, setDuration, gender, setGender, guests, setGuests, setShowBooking, showToast } = props;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          width={1800}
          height={1200}
          fetchPriority="high"
          className="w-full h-full object-cover opacity-85 animate-ken-burns will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-page via-[var(--hero-overlay)] to-page" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_20%,var(--glow-brand),transparent_60%)]" />
        {/* فخامة: تدرج ذهبي سفلي ناعم */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-page to-transparent" />
      </div>
      <AmbientGlow position="bottom-center" />

      {/* مشهد ثلاثي الأبعاد: عناصر معلّقة بعمق مختلف */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 scene-deep hidden sm:block">
        <div className="depth-3d absolute inset-0">
          <span style={{ transform: "translateZ(90px)" }} className="absolute top-[18%] left-[6%]">
            <span className="block size-3 rotate-45 bg-gradient-brand shadow-gold animate-float-slow" />
          </span>
          <span style={{ transform: "translateZ(150px)" }} className="absolute top-[30%] left-[13%]">
            <span className="block size-2 rotate-45 bg-gold-300/70 shadow-gold animate-float-slow [animation-delay:1.4s]" />
          </span>
          <span style={{ transform: "translateZ(60px)" }} className="absolute bottom-[22%] left-[42%]">
            <span className="block size-2.5 rotate-45 bg-gold-400/60 shadow-gold animate-float-slow [animation-delay:2.6s]" />
          </span>
        </div>
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
        <div className="min-w-0">
          <motion.div
            custom={0} variants={rise} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 rounded-full gold-frame glass-panel px-4 py-1.5 text-[11px] sm:text-xs text-gold-200"
          >
            <span className="size-2 rounded-full bg-accent-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            متاح الآن في 15 مدينة • حجز خلال 60 ثانية
          </motion.div>

          <motion.h1
            custom={1} variants={rise} initial="hidden" animate="visible"
            className="mt-5 sm:mt-6 text-[36px] sm:text-[58px] lg:text-[68px] leading-[1.18] font-bold break-words font-display text-3d text-strong"
          >
            القهوجي اللي يشرف <span className="text-gold">مجلسك</span>
          </motion.h1>

          <motion.div custom={2} variants={rise} initial="hidden" animate="visible" className="mt-4 ornament justify-start!">
            <span />
          </motion.div>

          <motion.p
            custom={3} variants={rise} initial="hidden" animate="visible"
            className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-7 sm:leading-8 max-w-xl text-default"
          >
            منصة قهوجية الحجاز | قهوجي المدينة المنورة. تربطك بأفضل القهوجيين والقهوجيات المحترفين في السعودية والخليج. قهوجية وصبابين المدينة المنورة للضيافة والمناسبات. حجز فوري، دفع آمن، وتقييمات حقيقية. ضيافة أصيلة بمعايير فاخرة.
          </motion.p>

          <motion.div
            custom={4} variants={rise} initial="hidden" animate="visible"
            className="mt-6 sm:mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setShowBooking(true)}
              className="rounded-full bg-gradient-brand bg-[length:200%_auto] animate-gold-shine px-8 py-3.5 text-sm sm:text-base font-bold text-brand-ink shadow-gold hover:brightness-110 hover:-translate-y-0.5 active:translate-y-[1px] transition"
            >
              احجز قهوجي الآن
            </button>
          </motion.div>

          <motion.div
            custom={5} variants={rise} initial="hidden" animate="visible"
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-lg"
          >
            {stats.map((s) => {
              const { value, suffix } = parseStat(s.n);
              return (
                <div key={s.l} className="min-w-0 border-r-2 border-gold-500/40 pr-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-gold font-display">
                    <CountUp value={value} suffix={suffix} decimals={value % 1 !== 0 ? 1 : 0} />
                  </div>
                  <div className="text-[11px] sm:text-xs mt-0.5 text-muted">{s.l}</div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_QUART, delay: 0.3 }}
          className="relative min-w-0 scene"
        >
          {/* منصة ذهبية ثلاثية الأبعاد تحت البطاقة */}
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 inset-x-6 h-24 platform rounded-full" />

          <div className="absolute -inset-5 bg-[radial-gradient(50%_50%_at_50%_30%,var(--glow-brand),transparent_70%)] blur-2xl rounded-[2.5rem]" />

          <Tilt intensity={7} lift={30} scale={1.015} radiusClass="rounded-[1.8rem]" className="relative">
          <div className="relative rounded-[1.8rem] gold-frame card-3d overflow-hidden shadow-gold mx-auto w-full max-w-md lg:max-w-none">
            <div className="bg-gradient-brand bg-[length:200%_auto] animate-gold-shine px-5 sm:px-6 py-4 flex items-center justify-between">
              <div className="font-bold font-display text-lg text-brand-ink">حجز سريع</div>
              <div className="text-xs bg-black/25 text-brand-ink px-2.5 py-1 rounded-full font-bold tracking-wide">✦ فوري</div>
            </div>
            <div className="p-3.5 sm:p-4 space-y-2.5">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <div className="min-w-0">
                  <label className={labelCls}>المدينة</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className={fieldCls}>
                    {[...new Set(cities)].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="min-w-0">
                  <label className={labelCls}>التاريخ</label>
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`${fieldCls} [color-scheme:dark]`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                <div className="min-w-0">
                  <label className={labelCls}>الوقت</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${fieldCls} [color-scheme:dark]`} />
                </div>
                <div className="min-w-0">
                  <label className={labelCls}>المدة</label>
                  <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className={fieldCls}>
                    {[3, 4, 5, 6, 8, 10].map((h) => <option key={h} value={h}>{h} ساعات</option>)}
                  </select>
                </div>
                <div className="min-w-0 col-span-2 sm:col-span-1">
                  <label className={labelCls}>الضيوف</label>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    inputMode="numeric"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(10, Math.min(500, Number(e.target.value) || 10)))}
                    className={fieldCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>نوع مقدم الخدمة</label>
                <div className="mt-1 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {(["الكل", "قهوجي", "قهوجية"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        gender === g
                          ? "bg-brand text-brand-ink border-brand shadow-md"
                          : "border-line bg-input text-default hover:border-brand"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setShowBooking(true); showToast("تم حفظ تفضيلاتك ✅"); }}
                className="w-full rounded-xl bg-gradient-brand bg-[length:200%_auto] animate-gold-shine py-3.5 font-bold text-brand-ink shadow-gold hover:brightness-110 active:scale-[0.99] transition"
              >
                احجز الآن
              </button>
              <div className="flex items-center gap-2 text-[11px] justify-center text-faint">
                <span className="size-1.5 rounded-full bg-accent-500" />
                متاح
              </div>
            </div>
          </div>
          </Tilt>
        </motion.div>
      </Container>
    </section>
  );
}
