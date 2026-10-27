"use client";

import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { places } from "@/data/site";

export function Buy() {
  return (
    <section id="buy" className="relative scroll-mt-16 pb-40 pt-20 md:pb-56 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle title="Где купить" sub="свечи можно найти совсем рядом" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {places.map((p, i) => (
            <Reveal key={p.title} delay={0.12 * i}>
              <div className={`group flex h-full flex-col rounded-[2rem] border-2 p-8 transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${i === 1 ? "border-grass/30 bg-sage hover:shadow-grass/20" : "border-pink/30 bg-white hover:shadow-pink/20"}`}>
                <p className="text-xs uppercase tracking-[0.3em] text-grass">
                  {p.kicker}
                </p>
                <h3 className="mt-4 font-serif text-3xl">{p.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-berry/70">
                  {p.text}
                </p>
                <span className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm transition ${i === 1 ? "bg-white text-grass-deep group-hover:bg-grass-deep group-hover:text-white" : "bg-blush text-rose group-hover:bg-rose group-hover:text-white"}`}>
                  {p.chip}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
