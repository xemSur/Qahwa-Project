import { footerSections } from "../data/content";
import Container from "./ui/Container";
import Logo from "./Logo";
import { WhatsAppIcon, PhoneIcon, MailIcon } from "./ui/Icons";

const socials = [
  { icon: WhatsAppIcon, label: "واتساب", href: "https://wa.me/966500129783" },
  { icon: PhoneIcon, label: "اتصال", href: "tel:+966500129783" },
  { icon: MailIcon, label: "بريد", href: "mailto:info@qahwaji.com" },
];

type Props = { onRegister: () => void };

export default function Footer({ onRegister }: Props) {
  return (
    <footer className="border-t border-line bg-section">
      <Container className="py-12 grid md:grid-cols-5 gap-10 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <span className="text-xl font-bold font-display text-strong">قهوجية الحجاز</span>
          </div>
          <p className="mt-3 leading-7 text-muted">
            منصة حجوزات القهوجيين والقهوجيات في السعودية والخليج. قهوجية المدينة المنورة للضيافة والمناسبات. ضيافة أصيلة بتقنية حديثة.
          </p>
          <div className="mt-4 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="size-9 grid place-items-center rounded-xl border border-line text-muted hover:border-brand hover:text-brand transition"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>
        {footerSections.map((col) => (
          <div key={col.h}>
            <div className="font-bold mb-3 text-strong">{col.h}</div>
            <ul className="space-y-2 text-muted">
              {col.l.map((i) => (
                <li key={i}>
                  {i === "انضم كمزود" ? (
                    <button onClick={onRegister} className="hover:text-brand transition text-right">
                      {i}
                    </button>
                  ) : (
                    <span className="hover:text-brand cursor-pointer transition">{i}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-line py-6 text-center text-xs flex items-center justify-center gap-2 text-faint">
        © 2026 قهوجية الحجاز. جميع الحقوق محفوظة. صنع بحب للضيافة العربية.
        <a href="/admin" className="hover:text-brand transition">• لوحة التحكم</a>
      </div>
    </footer>
  );
}
