import { testimonials } from "../data/content";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Reveal, { RevealItem } from "./ui/Reveal";
import Tilt from "./ui/Tilt";
import { QuoteIcon } from "./ui/Icons";
import { Rating } from "./ui/Badge";

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title="ماذا يقول عملاؤنا" align="center" />
        <Reveal stagger={0.07} className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((r) => (
            <RevealItem key={r.n}>
              <Tilt intensity={7} lift={22}>
              <figure className="h-full rounded-2xl card-3d p-6 relative overflow-hidden">
                <QuoteIcon size={56} style={{ transform: "translateZ(6px)" }} className="absolute -top-2 left-4 text-brand/10" />
                <div style={{ transform: "translateZ(20px)" }}>
                  <Rating value={5} />
                  <blockquote className="mt-3 leading-7 text-default relative">“{r.t}”</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <div className="font-bold text-strong">{r.n}</div>
                    <div className="text-xs text-faint">{r.c}</div>
                  </figcaption>
                </div>
              </figure>
              </Tilt>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
