import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, useMotionSafe } from "../../lib/motion";
import { cn } from "../../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger children instead of animating the block as a whole */
  stagger?: boolean | number;
  delay?: number;
  /** Render as a different element (default: div) */
  as?: "div" | "section" | "ul" | "li";
};

export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as = "div",
}: Props) {
  const allow = useMotionSafe();
  const M = motion[as];

  if (!allow) {
    return <div className={className}>{children}</div>;
  }

  return (
    <M
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger ? staggerContainer(typeof stagger === "number" ? stagger : 0.08, delay) : fadeUp}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>;
}
