"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LoopVideo } from "./LoopVideo";
import { HandArrow } from "./Decor";
import { SectionTitle } from "./SectionTitle";
import { collections } from "@/data/site";

const featured = collections.filter((c) => c.featured);

export function Collections() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      setDesktop(mq.matches);
      if (track.current && mq.matches) {
        setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  return (
    <section
      id="collection"
      ref={outer}
      className="relative scroll-mt-16 bg-gradient-to-b from-cream via-sage to-cream"
      style={desktop ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      <div
        className={
          desktop
            ? "sticky top-0 flex h-screen flex-col justify-start overflow-hidden pt-24"
            : "py-20"
        }
      >
        <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between px-5 md:mb-10 md:px-8">
          <SectionTitle title="Коллекции" sub="свечи, которые цветут" size="md" />
          <p className="relative hidden items-center gap-2 font-hand text-2xl text-grass-deep md:flex">
            листайте вниз — поедет вбок
            <HandArrow className="h-10 w-16 rotate-[20deg]" />
          </p>
        </div>

        <motion.div
          ref={track}
          style={desktop ? { x } : undefined}
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-5 pb-6 md:snap-none md:gap-8 md:overflow-visible md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] md:pb-0"
        >
          {featured.map((c) => (
            <article
              key={c.id}
              className="group w-[76vw] shrink-0 snap-center md:w-[min(22vw,calc((100svh-330px)*0.75))] md:max-w-[360px]"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-b-[2rem] rounded-t-[999px] border-[6px] border-white bg-blush shadow-xl shadow-grass/15"
              >
                {c.video ? (
                  <LoopVideo
                    src={c.video}
                    poster={c.poster}
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                ) : c.image ? (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width:768px) 25vw, 76vw"
                    style={{ objectPosition: c.position }}
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                ) : null}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-sage/95 px-4 py-1 text-[11px] uppercase tracking-widest text-grass-deep backdrop-blur">
                  {c.tag}
                </span>
              </div>
              <div className="px-2 pt-5">
                <h3 className="font-serif text-2xl md:text-3xl">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-berry/70">
                  {c.text}
                </p>
              </div>
            </article>
          ))}

          <article className="flex w-[76vw] shrink-0 snap-center items-center md:w-[24vw] md:max-w-[360px]">
            <div className="relative rounded-[2rem] bg-grass-deep p-8 text-cream">
              <p className="font-serif text-3xl leading-tight">
                Это только
                <br />
                <span className="italic text-pink">избранное</span>
              </p>
              <p className="mt-4 text-sm text-cream/70">
                Все свечи — в каталоге ниже: добавляйте в корзину и оформляйте в чате.
              </p>
              <a
                href="#catalog"
                className="mt-6 inline-block rounded-full bg-pink px-6 py-3 text-sm text-berry shadow-[0_4px_0_#e5628f] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#e5628f]"
              >
                Весь каталог
              </a>
            </div>
          </article>
        </motion.div>

        {desktop && (
          <div className="mx-auto mt-10 h-px w-full max-w-7xl overflow-hidden bg-berry/10 px-8">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px origin-left bg-grass"
            />
          </div>
        )}
      </div>
    </section>
  );
}
