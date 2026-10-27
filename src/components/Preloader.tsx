"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Grass, Sticker } from "./Decor";

const ease = [0.76, 0, 0.24, 1] as const;

export function Preloader({ onReveal }: { onReveal: () => void }) {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const start = performance.now();
    const MIN = 2400; // минимум, чтобы анимация успела «сыграть»
    const MAX = 7000; // страховка, если что-то грузится вечно
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    let raf = 0;
    let done = false;
    let t2: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (done) return;
      done = true;
      setPct(100);
      t2 = setTimeout(() => {
        setShow(false);
        onReveal();
      }, 500);
    };
    const tick = (t: number) => {
      const el = t - start;
      const cap = loaded ? 100 : 92;
      const eased = 1 - Math.pow(1 - Math.min(el / MIN, 1), 3);
      setPct((p) => Math.max(p, Math.round(Math.min(cap, eased * 100))));
      if ((el >= MIN && loaded) || el >= MAX) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t2);
      window.removeEventListener("load", onLoad);
    };
  }, [onReveal]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {show && (
        <motion.div
          key="preloader"
          exit={{ y: "-105%" }}
          transition={{ duration: 1.1, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush via-[#fde8f0] to-sage"
          aria-label="Загрузка"
          role="status"
        >
          <div className="gingham absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_75%)]" />

          {/* наклейки вокруг */}
          <Sticker kind="flower" className="left-[12%] top-[18%]" size={46} rotate={-12} />
          <Sticker kind="sparkle" className="left-[20%] bottom-[30%]" size={34} delay={1.1} />
          <Sticker kind="leaf" className="right-[18%] bottom-[34%]" size={44} rotate={20} delay={0.3} />

          {/* логотип */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -80 }}
            transition={{ type: "spring", stiffness: 110, damping: 11, delay: 0.15 }}
            className="relative size-[min(62vw,300px)]"
          >
            <svg viewBox="0 0 200 200" className="animate-spin-slow absolute -inset-[17%] size-[134%] text-grass-deep">
              <defs>
                <path id="pre-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
              </defs>
              <text fontSize="11" letterSpacing="3" fill="currentColor" fontWeight="600">
                <textPath href="#pre-ring" textLength="548" lengthAdjust="spacing">
                  РУЧНАЯ РАБОТА ✿ БЕЗ ПАРАФИНА ✿ С ЛЮБОВЬЮ ✿ АЛМАТЫ ✿
                </textPath>
              </text>
            </svg>

            <motion.div
              className="absolute inset-[-6%] rounded-full bg-white/70 blur-2xl"
              animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative size-full rounded-full ring-[6px] ring-white shadow-[0_25px_50px_-12px_rgba(229,98,143,0.55)]"
              animate={{ rotate: [-3, 3, -3], y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/img/logo-hq.png"
                alt="Snowfirefly"
                fill
                priority
                sizes="300px"
                className="rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* прогресс */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mt-14 w-[min(70vw,280px)] text-center"
          >
            <p className="font-hand text-2xl text-grass-deep">
              зажигаем свечи… <span className="tabular-nums">{pct}%</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink via-rose to-grass transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
          </motion.div>

          {/* луг растёт вместе с загрузкой */}
          <div
            className="absolute inset-x-0 bottom-0 origin-bottom transition-transform duration-300"
            style={{ transform: `scaleY(${0.15 + (pct / 100) * 0.85})` }}
          >
            <Grass className="h-[90px] md:h-[140px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
