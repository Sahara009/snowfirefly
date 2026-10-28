"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionTitle } from "./SectionTitle";
import { CandleIcon, useCart } from "./Cart";
import { LoopVideo } from "./LoopVideo";
import { collections } from "@/data/site";

const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₸";

export function Catalog() {
  const { add, dec, qtyOf, count, setOpen } = useCart();
  const tags = useMemo(() => ["Все", ...Array.from(new Set(collections.map((c) => c.tag)))], []);
  const [tag, setTag] = useState("Все");
  const list = tag === "Все" ? collections : collections.filter((c) => c.tag === tag);

  return (
    <section id="catalog" className="relative scroll-mt-16 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle title="Каталог" sub="собирайте корзину — оформим в чате ♡" />
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 rounded-full border border-berry/10 bg-white px-5 py-3 text-sm transition hover:border-grass"
          >
            <CandleIcon lit={count > 0} className="h-7 w-5" />
            Корзина · {count}
          </button>
        </div>

        {/* фильтры */}
        <div className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`relative isolate shrink-0 rounded-full px-5 py-2.5 text-sm transition ${
                tag === t ? "text-cream" : "text-berry/70 hover:text-berry"
              }`}
            >
              {tag === t && (
                <motion.span
                  layoutId="catalog-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-grass-deep"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {t}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((c) => {
              const qty = qtyOf(c.id);
              const img = c.image || c.poster;
              return (
                <motion.article
                  layout
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-blush">
                    {img ? (
                      <Image
                        src={img}
                        alt={c.title}
                        fill
                        sizes="(min-width:1024px) 22vw, (min-width:768px) 30vw, 46vw"
                        style={{ objectPosition: c.position }}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : c.video ? (
                      <LoopVideo
                        src={c.video}
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    {qty > 0 && (
                      <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-grass-deep text-sm text-cream shadow">
                        {qty}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-grass">{c.tag}</p>
                  <h3 className="mt-1 font-serif text-xl leading-tight md:text-2xl">{c.title}</h3>
                  <p className="mt-1 text-sm text-berry/50">
                    {typeof c.price === "number" ? fmt(c.price) : "цена по запросу"}
                  </p>

                  <div className="mt-4">
                    {qty === 0 ? (
                      <button
                        onClick={() => add(c.id)}
                        className="w-full rounded-full border border-berry/15 py-2.5 text-sm transition hover:border-grass-deep hover:bg-grass-deep hover:text-cream"
                      >
                        В корзину
                      </button>
                    ) : (
                      <div className="flex items-center justify-between rounded-full bg-sage px-2 py-1.5 text-grass-deep">
                        <button
                          onClick={() => dec(c.id)}
                          aria-label="Меньше"
                          className="flex size-8 items-center justify-center rounded-full transition hover:bg-white"
                        >
                          −
                        </button>
                        <span className="text-sm tabular-nums">{qty} в корзине</span>
                        <button
                          onClick={() => add(c.id)}
                          aria-label="Больше"
                          className="flex size-8 items-center justify-center rounded-full transition hover:bg-white"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
