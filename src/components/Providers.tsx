"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { ReadyContext } from "./Ready";
import { Preloader } from "./Preloader";
import { CartProvider } from "./Cart";
import { CartDrawer } from "./CartDrawer";
import { setScroller } from "@/lib/scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const onReveal = useCallback(() => setReady(true), []);

  useEffect(() => {
    // мягкий инерционный скролл
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    setScroller(lenis);
    lenis.stop(); // пока идёт прелоадер
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // плавные якоря
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector<HTMLElement>(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -70, duration: 1.6, force: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
      setScroller(null);
    };
  }, []);

  useEffect(() => {
    if (ready) lenisRef.current?.start();
  }, [ready]);

  return (
    <ReadyContext.Provider value={ready}>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          <Preloader onReveal={onReveal} />
          {children}
          <CartDrawer />
        </CartProvider>
      </MotionConfig>
    </ReadyContext.Provider>
  );
}
