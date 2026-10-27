"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type TargetAndTransition } from "motion/react";
import { Words } from "./Reveal";
import { Grass, PearlRing, Sticker } from "./Decor";
import { useReady } from "./Ready";
import { contacts } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ready = useReady();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 900], [0, -90]);
  const y2 = useTransform(scrollY, [0, 900], [0, -170]);
  const y3 = useTransform(scrollY, [0, 900], [0, 60]);
  const rot = useTransform(scrollY, [0, 900], [0, 50]);

  const show = (
    o: TargetAndTransition = { opacity: 1, y: 0 },
  ): TargetAndTransition | undefined => (ready ? o : undefined);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-b from-blush via-[#ffe9f1] to-[#fdf3ea] pt-28 md:pt-24"
    >
      {/* клетка, тающая к центру */}
      <div className="gingham absolute inset-0 -z-20 opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 size-[520px] rounded-full bg-pink/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 size-[460px] rounded-full bg-leaf/40 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 pb-10 md:grid-cols-12 md:px-8">
        <div className="relative md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={show()}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-grass/30 bg-white/80 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-grass-deep shadow-sm backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-grass" />
            мастерская ароматических свечей
          </motion.p>

          <h1 className="font-serif text-[clamp(3.6rem,13vw,10.5rem)] leading-[0.9] tracking-tight">
            <span className="block">
              <Words text="Snow" delay={0.35} />
            </span>
            <span className="block italic text-rose">
              <Words text="firefly" delay={0.55} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={show()}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="mt-8 max-w-md text-lg leading-relaxed text-berry/80"
          >
            Ароматические свечи ручной работы из натуральных материалов.
            Никакого парафина — только тепло, уют и немного волшебства.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={show()}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#collection"
              className="rounded-full bg-rose px-7 py-3.5 text-sm text-white shadow-[0_5px_0_#b8436c] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_#b8436c]"
            >
              Смотреть свечи
            </a>
            <a
              href={contacts.telegramNastya}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-grass-deep bg-white/70 px-7 py-3 text-sm text-grass-deep transition hover:bg-grass-deep hover:text-white"
            >
              Написать в Telegram
            </a>
          </motion.div>

        </div>

        {/* коллаж */}
        <div className="relative mx-auto h-[540px] w-full max-w-md md:col-span-5 md:h-[640px]">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={show({ opacity: 1, scale: 1 })}
            transition={{ duration: 1.2, delay: 0.45, ease }}
            className="absolute right-2 top-2 aspect-[3/4] w-[70%]"
          >
            <div className="relative size-full overflow-hidden rounded-[50%] shadow-2xl shadow-rose/25">
              <Image
                src="/img/pears.jpg"
                alt="Свечи-груши на подсвечниках и на скатерти"
                fill
                priority
                sizes="(min-width:768px) 28vw, 70vw"
                className="object-cover"
              />
            </div>
            <PearlRing />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: -30, rotate: 0 }}
            animate={show({ opacity: 1, x: 0, rotate: -6 })}
            transition={{ duration: 1.1, delay: 0.85, ease }}
            className="polaroid absolute bottom-6 left-0 w-[46%]"
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/sheep.jpg"
                alt="Свеча-барашек с колокольчиком"
                fill
                sizes="(min-width:768px) 16vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-xl text-berry/80">
              барашек ♡
            </p>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={show({ opacity: 1, scale: 1 })}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="blob absolute left-[1%] top-[4%] size-28 overflow-hidden border-4 border-white shadow-lg md:size-36"
          >
            <Image
              src="/img/tarts-flame.jpg"
              alt="Горящая малиновая свеча-тарталетка"
              fill
              sizes="150px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ rotate: rot }}
            className="absolute bottom-[4%] right-[0%] size-32 text-white md:size-36"
          >
            <svg viewBox="0 0 200 200" className="size-full">
              <defs>
                <path
                  id="badge"
                  d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                />
              </defs>
              <circle cx="100" cy="100" r="98" fill="#4f8a3c" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#a9d18e" strokeDasharray="3 6" />
              <text fontSize="14" letterSpacing="3" fill="currentColor" fontWeight="600">
                <textPath href="#badge" textLength="460" lengthAdjust="spacing">
                  РУЧНАЯ РАБОТА ✿ БЕЗ ПАРАФИНА ✿
                </textPath>
              </text>
              <text x="100" y="118" textAnchor="middle" fontSize="52" fill="#f9a8c9">
                ♡
              </text>
            </svg>
          </motion.div>

          <Sticker kind="flower" className="right-[-6px] top-[42%]" size={44} rotate={-10} />
          <Sticker kind="sparkle" className="left-[48%] bottom-[38%]" size={30} delay={1.6} />
        </div>
      </div>

      <Grass />
    </section>
  );
}
