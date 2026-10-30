"use client";

import Image from "next/image";
import { ClipReveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Scallop } from "./Decor";
import { fireGallery } from "@/data/site";

export function FireGallery() {
  return (
    <section className="relative isolate overflow-hidden bg-forest pb-28 pt-28 text-cream md:pb-40 md:pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[700px] -translate-x-1/2 rounded-full bg-rose/25 blur-[140px]" />
      <Scallop color="#fff1f5" size={44} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          title="Огонь"
          accent="и лепестки"
          sub="когда свеча горит, она оживает"
          align="center"
          tone="light"
        />

        <div className="mt-16 columns-2 gap-4 md:columns-3 md:gap-6">
          {fireGallery.map((g, i) => (
            <ClipReveal
              key={g.src}
              zoom
              delay={(i % 2) * 0.12}
              className={`relative mb-4 break-inside-avoid overflow-hidden rounded-3xl border-4 border-white/10 md:mb-6 ${
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width:768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] hover:scale-105"
              />
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
