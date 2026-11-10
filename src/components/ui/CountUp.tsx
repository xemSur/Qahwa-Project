import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  /** Raw target value, e.g. 2400 */
  value: number;
  /** Prefix shown before the number */
  prefix?: string;
  /** Suffix shown after the number, e.g. "+" or " ر.س" */
  suffix?: string;
  /** Number of decimals (default 0) */
  decimals?: number;
  /** Duration in ms (default 1400) */
  duration?: number;
  className?: string;
};

export default function CountUp({ value, prefix, suffix, decimals = 0, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix ?? ""}${v.toLocaleString("ar-SA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix ?? ""}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: duration / 1000, ease: [0.25, 1, 0.5, 1] });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}
