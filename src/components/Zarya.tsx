"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { contacts } from "@/data/site";

const photos = [
  { src: "/img/zarya-jars.jpg", alt: "Брелоки-баночки ЗАРЯ на полке", rotate: -6 },
  { src: "/img/zarya-earrings.jpg", alt: "Серьги-баночки с помидорами ЗАРЯ", rotate: 4 },
  { src: "/img/zarya-keychains.jpg", alt: "Брелоки ЗАРЯ на солнце", rotate: -2 },
];

/** Маленькая приписка про второй бренд Насти — ЗАРЯ (украшения и брелоки) */
export function Zarya() {
  return (
    <Reveal className="mt-16 md:mt-20">
      <div className="flex flex-col items-center gap-8 rounded-[2rem] border border-berry/10 bg-white/70 p-6 md:flex-row md:gap-10 md:p-8">
        <div className="flex shrink-0 -space-x-6">
          {photos.map((p) => (
            <div
              key={p.src}
              className="relative h-28 w-20 overflow-hidden rounded-2xl border-4 border-white shadow-lg md:h-36 md:w-28"
              style={{ rotate: `${p.rotate}deg` }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="112px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="text-center md:text-left">
          <p className="font-hand text-2xl text-grass-deep md:text-3xl">P.S. ещё немного обо мне ♡</p>
          <p className="mt-2 max-w-xl leading-relaxed text-berry/75">
            Кроме свечей, я делаю украшения и брелоки — это мой второй бренд{" "}
            <span className="font-semibold text-berry">ЗАРЯ</span>. Если хочешь,
            загляни и туда.
          </p>
        </div>

        <a
          href={contacts.zarya}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full border-2 border-berry/15 px-6 py-3 text-sm transition hover:border-rose hover:bg-rose hover:text-white md:ml-auto"
        >
          ЗАРЯ в Instagram →
        </a>
      </div>
    </Reveal>
  );
}
