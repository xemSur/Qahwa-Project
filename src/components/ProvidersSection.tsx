import { useMemo } from "react";
import type { Provider } from "../data/providers";
import { providers, cities } from "../data/providers";
import { cn } from "../utils/cn";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal, { RevealItem } from "./ui/Reveal";
import Tilt from "./ui/Tilt";
import { Rating } from "./ui/Badge";
import EmptyState from "./ui/EmptyState";
import { SearchIcon, ShieldCheckIcon, UsersIcon } from "./ui/Icons";

type Props = {
  city: string; setCity: (v: string) => void;
  gender: string; setGender: (v: any) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (p: Provider | null) => void;
  setShowBooking: (v: boolean) => void;
};

export default function ProvidersSection({ city, setCity, gender, setGender, setSelectedProvider, setShowBooking }: Props) {
  const filtered = useMemo(() => {
    return providers.filter((p) => (gender === "الكل" || p.gender === gender) && (city === "الكل" || city === "" || p.city === city));
  }, [gender, city]);

  return (
    <section id="القهوجيين" className="border-y border-line bg-section">
      <Container className="py-20">
        <SectionHeading
          title="قهوجيين وقهوجيات معتمدين"
          subtitle={
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheckIcon size={14} className="text-accent-600 dark:text-accent-400" />
              تقييمات حقيقية • تحقق من الهوية • تدريب معتمد
            </span>
          }
        >
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 sm:flex-none rounded-xl border border-line bg-input px-3 py-2 text-sm text-strong outline-none focus:border-brand transition"
            >
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="flex-1 sm:flex-none rounded-xl border border-line bg-input px-3 py-2 text-sm text-strong outline-none focus:border-brand transition"
            >
              {["الكل", "قهوجي", "قهوجية"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
        </SectionHeading>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<SearchIcon size={28} />}
            title={`لا يوجد مزودين متاحين في ${city} حالياً`}
            description="جرّب مدينة أخرى أو وسّع نطاق البحث لعرض قهوجيين آخرين."
          />
        ) : (
          <Reveal stagger={0.06} className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <RevealItem key={p.id} className="h-full">
                <Tilt intensity={9} lift={28}>
                <div className="group h-full rounded-2xl card-3d overflow-hidden transition border border-line/60 hover:border-gold-500/60">
                  <div className="relative h-56 overflow-hidden" style={{ transform: "translateZ(16px)" }}>
                    <img
                      src={p.image}
                      width={800}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-1">
                      {p.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                          <ShieldCheckIcon size={11} /> موثّق
                        </span>
                      )}
                      <span className="rounded-full bg-black/60 backdrop-blur px-2 py-0.5 text-[10px] text-brand-200">{p.gender}</span>
                      {!p.available && <span className="rounded-full bg-danger-600/90 px-2 py-0.5 text-[10px] text-white">محجوز</span>}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-strong truncate">{p.name}</h4>
                      <Rating value={p.rating} reviews={p.reviews} />
                    </div>
                    <div className="text-xs mt-1 text-muted flex items-center gap-1">
                      <UsersIcon size={12} /> {p.city} • {p.experience}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-elevated px-2 py-0.5 text-[10px] text-default">{s}</span>
                      ))}
                      {p.specialties.length > 2 && (
                        <span className="rounded-full bg-elevated px-2 py-0.5 text-[10px] text-faint">
                          +{p.specialties.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-bold text-gold font-display">{p.pricePerHour} ر.س/س</div>
                      <button
                        onClick={() => { setSelectedProvider(p); setShowBooking(true); }}
                        disabled={!p.available}
                        style={{ transform: "translateZ(22px)" }}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-bold transition",
                          p.available
                            ? "bg-gradient-brand text-brand-ink shadow-md hover:brightness-110 active:scale-95"
                            : "bg-elevated text-faint cursor-not-allowed",
                        )}
                      >
                        {p.available ? "احجز" : "غير متاح"}
                      </button>
                    </div>
                  </div>
                </div>
                </Tilt>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
