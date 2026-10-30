"use client";

import { Parallax, Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { LoopVideo } from "./LoopVideo";
import { Scallop } from "./Decor";

const clips = [
  { src: "/video/ornaments-1.mp4", poster: "/video/ornaments-1.jpg", speed: 50 },
  { src: "/video/ornaments-2.mp4", poster: "/video/ornaments-2.jpg", speed: -20 },
  { src: "/video/newyear-table.mp4", poster: "/video/newyear-table.jpg", speed: 60 },
];

export function NewYear() {
  return (
    <section className="relative overflow-hidden bg-[#fdf3ea] py-24 md:py-36">
      <Scallop color="#e7f1dc" size={44} />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <SectionTitle title="Ёлочные" accent="игрушки" sub="новогодняя коллекция ✿" />
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-berry/75">
              Свечи в виде винтажных ёлочных игрушек — как из бабушкиной
              коробки. С петелькой: можно повесить на ёлку или подарить.
            </p>
            <a
              href="#catalog"
              className="mt-6 inline-block rounded-full bg-rose px-7 py-3.5 text-sm text-white shadow-[0_5px_0_#b8436c] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_#b8436c]"
            >
              Смотреть в каталоге
            </a>
          </Reveal>
        </div>

        <div className="relative mt-16 grid grid-cols-3 gap-3 md:gap-8">
          {clips.map((c) => (
            <Parallax key={c.src} speed={c.speed}>
              <div className="aspect-[9/16] overflow-hidden rounded-[1.25rem] border-4 border-white shadow-2xl shadow-rose/20 md:rounded-[2rem] md:border-[6px]">
                <LoopVideo src={c.src} poster={c.poster} className="size-full object-cover" />
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
