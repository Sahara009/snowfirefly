"use client";

import Image from "next/image";
import { ClipReveal, Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { corporate, tgLink } from "@/data/site";

export function Corporate() {
  return (
    <section id="corporate" className="relative scroll-mt-16 bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          title="Корпоративные"
          accent="подарки"
          sub="подарок, который действительно запомнится"
        />

        <div className="mt-16 grid gap-14 md:grid-cols-12 md:items-center">
          {/* фото */}
          <div className="relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
            <ClipReveal className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
              <Image
                src="/img/box-1.jpg"
                alt="Коробка со свечами-пионами в подарочной упаковке"
                fill
                sizes="(min-width:768px) 38vw, 90vw"
                className="object-cover"
              />
            </ClipReveal>
            <Reveal
              delay={0.4}
              className="absolute -bottom-6 -right-2 size-36 overflow-hidden rounded-full border-[6px] border-cream md:-right-8 md:size-44"
            >
              <div className="relative size-full">
                <Image
                  src="/img/peonies-wrap.jpg"
                  alt="Свечи в подарочной плёнке с бантиками"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* текст */}
          <div className="md:col-span-7 md:pl-6">
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-berry/80">{corporate.lead}</p>
            </Reveal>

            <ol className="mt-10 border-t border-berry/10">
              {corporate.points.map((p, i) => (
                <Reveal key={p} delay={0.06 * i} y={16}>
                  <li className="flex items-baseline gap-6 border-b border-berry/10 py-5">
                    <span className="w-10 shrink-0 font-serif text-2xl italic text-grass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href={tgLink("Здравствуйте! Хочу обсудить корпоративный заказ свечей Snowfirefly.")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-grass-deep px-8 py-4 text-sm text-cream shadow-[0_5px_0_#1f3b26] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_#1f3b26]"
                >
                  Обсудить заказ в Telegram
                </a>
                <p className="max-w-xs text-sm text-berry/60">
                  Каждый заказ обсуждается лично — чтобы предложить именно ваш вариант.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
