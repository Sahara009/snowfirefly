"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Scallop } from "./Decor";
import { unboxing, pets, contacts, tgLink } from "@/data/site";

export function Gifts() {
  return (
    <section
      id="gifts"
      className="relative scroll-mt-16 overflow-hidden bg-blush py-24 md:py-36"
    >
      <Scallop color="#e7f1dc" size={44} />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:grid-cols-2 md:px-8">
        <div>
          <SectionTitle
            title="Упаковка"
            accent="и подарки"
            sub="открываешь коробку — а там забота"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-berry/75">
              Свечи приезжают в аккуратных пакетиках с ленточками, вместе с
              открыткой и спичками. Получается готовый подарок — для себя или
              для близкого человека.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="relative mt-10 flex gap-5 rounded-[2rem] bg-white p-6 shadow-xl shadow-pink/10">
              <span className="text-5xl">🐾</span>
              <div>
                <h3 className="font-serif text-2xl">Подарок для питомца</h3>
                <p className="mt-2 text-sm leading-relaxed text-berry/75">
                  При заказе на сумму выше 6&nbsp;000&nbsp;₸ дарю игрушку для
                  котика или собачки. Просто напишите про питомца и пришлите
                  фото.
                </p>
                <div className="mt-4 flex gap-3">
                  {pets.map((p) => (
                    <div
                      key={p.src}
                      className="relative size-20 overflow-hidden rounded-2xl md:size-24"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <a
                  href={tgLink("Здравствуйте! Хочу заказать свечи и получить игрушку для питомца 🐾")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm text-rose underline underline-offset-4"
                >
                  Рассказать про питомца
                </a>
              </div>
            </div>
          </Reveal>

          <p className="mt-6 text-xs text-berry/50">
            Вопросы по заказу: {contacts.phoneDisplay}
          </p>
        </div>

        <div className="relative grid grid-cols-2 gap-4 md:gap-6">
          {unboxing.map((u, i) => (
            <motion.div
              key={u.src}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: u.rotate }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`polaroid relative ${i % 2 ? "mt-8" : ""}`}
            >
              <span
                className={`tape left-1/2 -top-3 -translate-x-1/2 ${i % 3 === 1 ? "tape-green" : ""}`}
                style={{ rotate: `${(i % 2 ? 6 : -6)}deg` }}
              />
              <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={u.src}
                alt={u.alt}
                fill
                sizes="(min-width:768px) 22vw, 45vw"
                className="object-cover"
              />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
