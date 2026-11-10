import { faqData } from "../data/content";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Accordion from "./ui/Accordion";

export default function FAQSection() {
  return (
    <section id="الأسئلة الشائعة" className="border-y border-line bg-section">
      <Container maxWidth="narrow" className="py-20">
        <SectionHeading
          title="الأسئلة الشائعة"
          subtitle="أجوبة سريعة لأكثر الأسئلة شيوعاً"
          align="center"
        />
        <Accordion
          className="mt-12"
          items={faqData.map((item) => ({ id: item.q, question: item.q, answer: item.a }))}
        />
      </Container>
    </section>
  );
}
