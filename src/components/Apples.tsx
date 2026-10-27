"use client";

import { Parallax, Reveal, Words } from "./Reveal";
import { LoopVideo } from "./LoopVideo";
import { Scallop } from "./Decor";

const clips = [
  { src: "/video/apple-1.mp4", poster: "/video/apple-1.jpg", speed: 50 },
  { src: "/video/apple-2.mp4", poster: "/video/apple-2.jpg", speed: -10 },
  { src: "/video/apple-3.mp4", poster: "/video/apple-3.jpg", speed: 70 },
];

export function Apples() {
  return (
    <section className="relative overflow-hidden bg-sage py-24 md:py-36">
      <Scallop color="#1f3b26" size={44} />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <h2 className="font-serif text-[clamp(2.5rem,10vw,8.5rem)] leading-[0.88] tracking-tight">
            <Words text="Свечи" inView />
            <br />
            <span className="italic text-grass-deep">
              <Words text="яблоки" inView delay={0.2} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-berry/75">
              Совсем как настоящие — с хвостиком, румяным боком и надкусом.
              Кажется, их можно съесть, но лучше зажечь.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid grid-cols-3 gap-3 md:gap-8">
          {clips.map((c, i) => (
            <Parallax key={c.src} speed={c.speed * (i === 1 ? -1 : 1)}>
              <div className="aspect-[9/16] overflow-hidden rounded-[1.25rem] border-4 border-white shadow-2xl shadow-grass/25 md:rounded-[2rem] md:border-[6px]">
                <LoopVideo
                  src={c.src}
                  poster={c.poster}
                  className="size-full object-cover"
                />
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
