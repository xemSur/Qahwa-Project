import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "./Icons";
import { cn } from "../../utils/cn";

type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

type Props = {
  items: AccordionItem[];
  className?: string;
};

export default function Accordion({ items, className }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border bg-card transition",
              isOpen ? "border-brand/60 shadow-md" : "border-line",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-right font-semibold text-strong transition"
            >
              <span>{item.question}</span>
              <ChevronDownIcon
                size={16}
                className={cn("shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-sm leading-7 text-default">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
