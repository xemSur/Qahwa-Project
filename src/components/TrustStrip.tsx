import Container from "./ui/Container";
import { LockIcon, ShieldCheckIcon, ClockIcon, CreditCardIcon } from "./ui/Icons";

const items = [
  { icon: ShieldCheckIcon, title: "قهوجيون موثّقون", desc: "تحقق من الهوية وتدريب معتمد" },
  { icon: LockIcon, title: "دفع آمن 100%", desc: "تشفير SSL وحماية كاملة لبياناتك" },
  { icon: ClockIcon, title: "حجز خلال 60 ثانية", desc: "تأكيد فوري عبر واتساب" },
  { icon: CreditCardIcon, title: "طرق دفع متعددة", desc: "فيزا، ماستركارد، مدى، آبل باي" },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-gold-500/20 bg-section">
      {/* خيطان ذهبيان أعلى وأسفل الشريط */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-500/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-gold-500/60 to-transparent" />
      <Container className="py-9 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3 group">
            <span className="size-11 shrink-0 grid place-items-center rounded-full gold-frame text-gold-400 shadow-gold transition group-hover:scale-110">
              <item.icon size={19} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold font-display text-strong">{item.title}</div>
              <div className="text-xs text-muted truncate">{item.desc}</div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
