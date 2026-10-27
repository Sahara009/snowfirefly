"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Sticker } from "./Decor";
import { values } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-16 py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="relative md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="polaroid relative mx-auto w-full max-w-md"
          >
            <span className="tape -top-3 left-6 rotate-[-12deg]" />
            <span className="tape tape-green -top-3 right-6 rotate-[10deg]" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/img/nastya.jpg"
                alt="Анастасия, создатель бренда Snowfirefly, с десертными свечами"
                fill
                sizes="(min-width:768px) 36vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="absolute bottom-2.5 left-0 right-0 text-center font-hand text-2xl text-berry/80">
              Анастасия — создатель бренда ♡
            </p>
          </motion.div>
          <Sticker kind="flower" className="-left-3 top-1/3" size={52} rotate={-12} />
        </div>

        <div className="md:col-span-7 md:pl-8">
          <SectionTitle title="О бренде" sub="привет, я Анастасия — и это Snowfirefly ♡" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-berry/80">
              Я делаю ароматические свечи вручную — в форме цветов, фруктов и
              десертов. Все свечи из натуральных материалов, и в них нет
              парафина. Каждую я собираю с мыслью, чтобы в вашем доме стало
              чуточку уютнее.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.small} delay={0.1 * i}>
                <div
                  className={`h-full rounded-3xl p-5 transition hover:-translate-y-1 md:p-6 ${
                    i % 3 === 0 ? "bg-sage" : "bg-blush"
                  }`}
                >
                  <p
                    className={`font-serif text-4xl md:text-5xl ${
                      i % 3 === 0 ? "text-grass-deep" : "text-rose"
                    }`}
                  >
                    {v.big}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest">
                    {v.small}
                  </p>
                  <p className="mt-2 text-sm text-berry/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
