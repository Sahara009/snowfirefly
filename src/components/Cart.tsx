"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { collections, type Collection } from "@/data/site";
import { startScroll, stopScroll } from "@/lib/scroll";

type Line = { id: string; qty: number };

type CartCtx = {
  lines: Line[];
  items: (Line & { product: Collection })[];
  count: number;
  add: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  open: boolean;
  setOpen: (v: boolean) => void;
  bump: number; // растёт при каждом добавлении — для анимации свечи в шапке
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "snowfirefly-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);

  // корзина переживает перезагрузку страницы (только в этом браузере)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Line[];
        setLines(parsed.filter((l) => collections.some((c) => c.id === l.id) && l.qty > 0));
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  const add = useCallback((id: string) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      return found
        ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...ls, { id, qty: 1 }];
    });
    setBump((b) => b + 1);
  }, []);

  const dec = useCallback((id: string) => {
    setLines((ls) =>
      ls.flatMap((l) => (l.id !== id ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [])),
    );
  }, []);

  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const items = lines.flatMap((l) => {
      const product = collections.find((c) => c.id === l.id);
      return product ? [{ ...l, product }] : [];
    });
    return {
      lines,
      items,
      count: lines.reduce((s, l) => s + l.qty, 0),
      add,
      dec,
      remove,
      clear,
      qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
      open,
      setOpen,
      bump,
    };
  }, [lines, open, bump, add, dec, remove, clear]);

  // пока корзина открыта — плавный скролл страницы на паузе
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (open) stopScroll();
    else startScroll();
  }, [open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

/** Свеча-иконка: зажигается, когда в корзине что-то есть */
export function CandleIcon({ lit, className = "" }: { lit: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden>
      {lit && (
        <g className="animate-flicker">
          <ellipse cx="16" cy="9" rx="7" ry="9" fill="#ffd36b" opacity="0.35" />
          <path d="M16 2c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C11 8.5 13 6 16 2z" fill="#ffb347" />
          <path d="M16 6.5c1.6 2.2 2.6 3.6 2.6 5.2a2.6 2.6 0 0 1-5.2 0c0-1.6 1-3 2.6-5.2z" fill="#fff3b0" />
        </g>
      )}
      <path d="M16 14.5v3" stroke="#3b1a2b" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="8" y="17" width="16" height="20" rx="4" fill="#f58db9" />
      <path
        d="M8 21c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v1.5c0 1-1 1.6-1.8 1.1-.6-.4-1.4 0-1.4.8v2.2c0 .9-1.3 1-1.5.1l-.4-1.7c-.2-.8-1.3-.9-1.6-.1l-.3.8c-.3.8-1.5.7-1.6-.2l-.3-2.1c-.1-.8-1.2-1-1.6-.3-.4.7-1.5.4-1.5-.4V21z"
        fill="#ffd0e2"
      />
      <rect x="6" y="36" width="20" height="3" rx="1.5" fill="#4f8a3c" />
    </svg>
  );
}
