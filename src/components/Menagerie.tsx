"use client";

import Image from "next/image";
import { Parallax, Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { menagerie } from "@/data/site";
import { Scallop } from "./Decor";

export function Menagerie() {
  return (
    <section className="relative overflow-hidden bg-blush pt-28 md:pt-40">
      <Scallop color="#fffaf4" size={44} />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 md:grid-cols-12 md:px-8 md:pb-36">
        <div className="md:col-span-5">
          <SectionTitle title="Зверята" sub="барашки, котики и болотные жабки" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-berry/75">
              Милые характерные фигурки, у которых есть лицо, настроение и
              даже наряд. Такие свечи жалко зажигать — но они того стоят.
            </p>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-2 gap-4 md:col-span-7 md:gap-6">
          <Parallax speed={30} className="col-span-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-xl shadow-rose/15">
              <Image
                src={menagerie.wide[0].src}
                alt={menagerie.wide[0].alt}
                fill
                sizes="(min-width:768px) 55vw, 95vw"
                className="object-cover"
              />
            </div>
          </Parallax>
          <Parallax speed={-30}>
            <div className="blob relative aspect-square overflow-hidden border-[6px] border-white shadow-xl shadow-rose/15">
              <Image
                src={menagerie.tall.src}
                alt={menagerie.tall.alt}
                fill
                sizes="(min-width:768px) 27vw, 47vw"
                className="object-cover"
              />
            </div>
          </Parallax>
          <Parallax speed={20}>
            <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-xl shadow-rose/15">
              <Image
                src={menagerie.wide[1].src}
                alt={menagerie.wide[1].alt}
                fill
                sizes="(min-width:768px) 27vw, 47vw"
                className="object-cover"
                style={{ objectPosition: "50% 100%" }}
              />
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
