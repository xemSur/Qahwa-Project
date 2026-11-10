import { howItWorks } from "../data/content";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal, { RevealItem } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

export default function HowItWorksSection() {
  return (
    <section id="كيف نعمل" className="py-20">
      <Container>
        <SectionHeading title="كيف تعمل المنصة؟" align="center" />
        <Reveal stagger className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {howItWorks.map((s, i) => (
            <RevealItem key={s.t}>
              <Tilt intensity={7} lift={20}>
              <div className="relative h-full rounded-2xl card-3d p-5 sm:p-6">
                <div style={{ transform: "translateZ(30px)" }} className="size-11 grid place-items-center rounded-xl bg-gradient-brand bg-[length:200%_auto] animate-gold-shine text-brand-ink font-black shadow-gold">
                  {i + 1}
                </div>
                <h4 className="mt-4 font-bold text-strong">{s.t}</h4>
                <p className="text-sm mt-1 text-muted">{s.d}</p>
                {i < howItWorks.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -left-3 -translate-y-1/2 size-2 rotate-45 bg-gradient-brand shadow-glow"
                  />
                )}
              </div>
              </Tilt>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
