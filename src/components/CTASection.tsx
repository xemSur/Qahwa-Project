import { HERO_IMG } from "../data/content";
import Container from "./ui/Container";
import AmbientGlow from "./ui/AmbientGlow";
import { WhatsAppIcon } from "./ui/Icons";

type Props = { onBook: () => void };

export default function CTASection({ onBook }: Props) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="absolute inset-0">
        <img src={HERO_IMG} width={1800} height={1200} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-10" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-page to-page/80" />
      </div>
      <AmbientGlow position="center" />
      <Container maxWidth="narrow" className="relative py-16 sm:py-20 text-center scene">
        <div className="depth-3d">
        <div className="ornament mb-6">
          <span />
        </div>
        <h2 className="text-[30px] sm:text-[40px] lg:text-[44px] font-bold leading-snug break-words font-display text-3d text-strong">
          جاهز تشرف ضيوفك <span className="text-gold">بضيافة تليق بهم؟</span>
        </h2>
        <p className="mt-4 text-default">احجز قهوجي محترف خلال دقيقة. دفع آمن، إلغاء مرن، ودعم 24/7</p>
        <div style={{ transform: "translateZ(45px)" }} className="mt-8 flex justify-center gap-3 flex-wrap">
          <button
            onClick={onBook}
            className="rounded-full bg-gradient-brand bg-[length:200%_auto] animate-gold-shine sheen px-8 sm:px-9 py-3.5 text-sm sm:text-base font-bold text-brand-ink shadow-gold hover:brightness-110 hover:-translate-y-0.5 active:translate-y-[1px] transition"
          >
            ابدأ الحجز الآن
          </button>
          <a
            href="https://wa.me/966500129783"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full gold-frame glass-panel px-6 sm:px-7 py-3 text-sm sm:text-base font-semibold text-gold-200 hover:brightness-125 transition"
          >
            <WhatsAppIcon size={17} />
            تواصل واتساب
          </a>
        </div>
        </div>
      </Container>
    </section>
  );
}
