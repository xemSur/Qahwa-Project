import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "../../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** أقصى زاوية إمالة بالدرجات */
  intensity?: number;
  /** مسافة الرفع نحو المشاهد (translateZ) بالبكسل */
  lift?: number;
  /** تكبير خفيف عند التحويم */
  scale?: number;
  /** إظهار وهج ضوئي يتبع الماوس */
  glare?: boolean;
  /** إظهار وهج ذهبي حاد على الحافة */
  edge?: boolean;
  /** صنف انحناء الحواف المطابق للبطاقة (للهج والحافة) */
  radiusClass?: string;
};

/**
 * حاوية ثلاثية الأبعاد: تميل بحسب موضع الماوس داخل البطاقة،
 * ترفع المحتوى نحو المشاهد، وتُظهر وهجاً ضوئياً متحركاً.
 * تحترم إعداد تقليل الحركة وتعود لتصميم مسطح تلقائياً.
 */
export default function Tilt({
  children,
  className,
  intensity = 9,
  lift = 24,
  scale = 1.02,
  glare = true,
  edge = true,
  radiusClass = "rounded-2xl",
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // موضع الماوس مُطبَّع (0 → 1) — البداية في المنتصف
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const spring = { stiffness: 240, damping: 24, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const rotateY = useTransform(sx, [0, 1], [intensity, -intensity]);
  const rotateX = useTransform(sy, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255, 240, 190, 0.16), rgba(212, 175, 55, 0.08) 40%, transparent 62%)`;

  if (reduced) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={cn("group/tilt h-full [perspective:1300px]", className)}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", z: lift }}
        whileHover={{ scale }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative h-full w-full will-change-transform"
      >
        {children}

        {/* وهج الحافة الذهبي (3D bevel) */}
        {edge && (
          <span
            aria-hidden="true"
            style={{ transform: "translateZ(18px)" }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          >
            <span className={cn("absolute inset-0 shadow-[inset_0_1px_0_rgba(255,240,200,0.35),inset_0_-1px_0_rgba(0,0,0,0.55)]", radiusClass)} />
          </span>
        )}

        {/* وهج ضوئي يتبع الماوس — أعلى الطبقات */}
        {glare && (
          <motion.span
            aria-hidden="true"
            style={{ backgroundImage: glareBg, transform: "translateZ(24px)" }}
            className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100", radiusClass)}
          />
        )}
      </motion.div>
    </div>
  );
}
