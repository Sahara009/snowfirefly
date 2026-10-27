"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contacts, nav } from "@/data/site";
import { useReady } from "./Ready";
import { CandleIcon, useCart } from "./Cart";
import { MusicToggle } from "./Music";
import { Grass } from "./Decor";
import { startScroll, stopScroll } from "@/lib/scroll";

const ease = [0.76, 0, 0.24, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const burger = useRef<HTMLButtonElement>(null);
  const ready = useReady();
  const { count, setOpen: openCart, bump } = useCart();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // меню открыто — страница не скроллится, Esc закрывает
  useEffect(() => {
    if (!open) return;
    stopScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      startScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    const r = burger.current?.getBoundingClientRect();
    if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setOpen((o) => !o);
  };

  const circle = (radius: string) => `circle(${radius} at ${origin.x}px ${origin.y}px)`;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "bg-cream/80 shadow-[0_1px_0_rgba(59,26,43,0.06)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <span className="relative block size-9 overflow-hidden rounded-full shadow-md shadow-pink/30 ring-2 ring-white">
              <Image src="/img/logo-hq.png" alt="Snowfirefly" fill sizes="40px" className="object-cover" />
            </span>
            <span className="font-serif text-lg italic tracking-wide">Snowfirefly</span>
          </a>

          <div className="flex items-center gap-1 md:gap-3">
            <MusicToggle />

            {/* свеча-корзина: без кружка, сама по себе */}
            <button
              onClick={() => {
                setOpen(false);
                openCart(true);
              }}
              aria-label={`Корзина, товаров: ${count}`}
              className="group relative flex h-12 w-10 items-center justify-center"
            >
              <motion.span
                key={bump}
                initial={bump ? { rotate: -18, scale: 1.3 } : false}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 9 }}
                className="block transition-transform group-hover:-rotate-6"
              >
                <CandleIcon lit={count > 0} className="h-10 w-8 drop-shadow-[0_4px_6px_rgba(229,98,143,0.25)]" />
              </motion.span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 bottom-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-grass-deep px-1 text-[11px] font-semibold text-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href={contacts.telegramNastya}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-grass-deep px-5 py-2 text-sm text-cream shadow-[0_4px_0_#1f3b26] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#1f3b26] lg:block"
            >
              Написать
            </a>

            <button
              ref={burger}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              onClick={toggle}
              className={`relative flex size-11 flex-col items-center justify-center gap-1.5 rounded-full transition-colors duration-500 ${
                open ? "bg-grass-deep" : "bg-rose"
              }`}
            >
              <span
                className={`h-[2px] w-5 rounded-full bg-white transition duration-300 ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 rounded-full bg-white transition duration-300 ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* меню раскрывается большим кругом из кнопки */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            data-lenis-prevent
            initial={{ clipPath: circle("0px") }}
            animate={{ clipPath: circle("150vmax") }}
            exit={{ clipPath: circle("0px") }}
            transition={{ duration: 0.9, ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-gradient-to-br from-blush via-[#fde6ef] to-sage"
          >
            <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 pb-8 pt-24 md:px-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ul>
                  {nav.map((n, i) => (
                    <li key={n.href} className="overflow-hidden border-b border-berry/10 last:border-0">
                      <motion.a
                        href={n.href}
                        onClick={() => setOpen(false)}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex items-baseline gap-4 py-1.5 font-serif text-[clamp(2.1rem,min(5vw,7.5vh),4.5rem)] leading-[1.15] transition-colors hover:text-rose md:py-2"
                      >
                        <span className="w-8 shrink-0 font-sans text-xs text-grass md:w-12 md:text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="transition-all duration-500 group-hover:translate-x-3 group-hover:italic">
                          {n.label}
                        </span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:items-center lg:text-center"
              >
                <div className="polaroid relative hidden w-56 rotate-3 lg:block">
                  <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src="/img/peony-lit.jpg" alt="Свечи-пионы" fill sizes="224px" className="object-cover" />
                  </div>
                  <p className="absolute bottom-2.5 left-0 right-0 text-center font-hand text-xl text-berry/80">
                    с любовью ♡
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm lg:justify-center">
                  <a href={contacts.telegramNastya} target="_blank" rel="noreferrer" className="hover:text-rose">
                    Telegram
                  </a>
                  <a href={contacts.whatsapp} target="_blank" rel="noreferrer" className="hover:text-rose">
                    WhatsApp
                  </a>
                  <a href={contacts.instagram} target="_blank" rel="noreferrer" className="hover:text-rose">
                    Instagram
                  </a>
                </div>
                <span className="font-hand text-2xl text-grass-deep lg:hidden">с любовью, Анастасия ♡</span>
              </motion.div>
            </div>
            <div className="pointer-events-none shrink-0">
              <Grass className="h-[50px] md:h-[70px]" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
