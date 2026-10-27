"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReady } from "./Ready";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Картинка/блок, который «плывёт» с другой скоростью при скролле */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Заголовок, который выезжает по словам */
export function Words({
  text,
  className,
  delay = 0,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const ready = useReady();
  const anim = inView
    ? { whileInView: { y: 0 }, viewport: { once: true, margin: "-60px" } }
    : { animate: ready ? { y: 0 } : { y: "115%" } };
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="-mb-[0.14em] -mt-[0.12em] inline-block overflow-hidden pb-[0.14em] pt-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            {...anim}
            transition={{ duration: 1, delay: delay + i * 0.1, ease }}
          >
            {w}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
