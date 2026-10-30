"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
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

/**
 * Заголовок, который выезжает по словам.
 * Следим за видимостью всей строки (обёртки), а не каждого спрятанного слова:
 * Safari на iPhone считает спрятанное слово «невидимым» и иногда не запускает анимацию.
 */
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
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const show = inView ? seen : ready;
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="-mb-[0.14em] -mt-[0.12em] inline-block overflow-hidden pb-[0.14em] pt-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: show ? 0 : "115%" }}
            transition={{ duration: 1, delay: delay + i * 0.1, ease }}
          >
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Фото, которое «проявляется» снизу вверх.
 * Видимость отслеживается по внешнему блоку, который всегда виден (надёжно на iPhone).
 * Внутренний слой — absolute inset-0, поэтому className должен задавать размер (aspect-*).
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  zoom = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  zoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: zoom ? 1.1 : 1 }}
        animate={
          seen
            ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
            : { clipPath: "inset(100% 0% 0% 0%)", scale: zoom ? 1.1 : 1 }
        }
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}
