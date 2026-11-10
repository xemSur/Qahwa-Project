import { packages } from "../data/packages";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal, { RevealItem } from "./ui/Reveal";
import Tilt from "./ui/Tilt";
import { cn } from "../utils/cn";

type Props = { setPackageId: (id: string) => void; setShowBooking: (v: boolean) => void };

export default function PackagesSection({ setPackageId, setShowBooking }: Props) {
  return (
    <section id="الباقات" className="py-20">
      <Container>
        <SectionHeading
          title="باقات الضيافة"
          subtitle="أسعار شفافة تشمل المعدات والمواد والخدمة. تخصيص كامل حسب مناسبتك."
          align="center"
        />
        <Reveal stagger={0.07} className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {packages.map((pkg) => (
            <RevealItem key={pkg.id} className="h-full">
              <Tilt intensity={8} lift={26}>
              <div
                className={cn(
                  "relative h-full rounded-2xl card-3d transition",
                  pkg.popular
                    ? "gold-frame shadow-gold lg:scale-[1.04] hover:shadow-gold"
                    : "hover:shadow-lg",
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand bg-[length:200%_auto] animate-gold-shine px-4 py-1 text-xs font-bold text-brand-ink z-10 shadow-gold tracking-wide">
                    ✦ الأكثر طلباً ✦
                  </div>
                )}
                <div className="h-full p-7 flex flex-col">
                  <div className={cn(
                    "inline-flex self-start rounded-full px-3.5 py-1 text-xs font-bold",
                    pkg.popular
                      ? "bg-gradient-brand text-brand-ink shadow-md"
                      : cn("bg-gradient-to-l text-stone-900", pkg.color),
                  )}>
                    {pkg.price}
                  </div>
                  <h3 className={cn("mt-4 text-[20px] font-bold font-display text-3d", pkg.popular ? "text-gold" : "text-strong")}>{pkg.name}</h3>
                  <ul className="mt-5 space-y-2 text-sm text-default flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-brand">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5 border-t border-line">
                    <div className="text-xs mb-2 text-faint">يشمل:</div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((i) => (
                        <span
                          key={i}
                          className="rounded-full border border-line bg-input px-2.5 py-1 text-xs text-default"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => { setPackageId(pkg.id); setShowBooking(true); }}
                    style={{ transform: "translateZ(20px)" }}
                    className={cn(
                      "mt-6 w-full rounded-xl py-2.5 font-semibold transition",
                      pkg.popular
                        ? "bg-gradient-brand bg-[length:200%_auto] animate-gold-shine text-brand-ink shadow-gold hover:brightness-110"
                        : "border border-line-strong text-default hover:border-gold-500/70 hover:text-gold-400",
                    )}
                  >
                    اختر الباقة
                  </button>
                </div>
              </div>
              </Tilt>
            </RevealItem>
          ))}
        </Reveal>
        <div className="mt-8 text-center text-xs text-faint">
          متوسط الأسعار: قهوجي للساعة 200-800 ر.س • باقة كاملة 500 إلى عدة آلاف حسب الخدمة
        </div>
      </Container>
    </section>
  );
}
