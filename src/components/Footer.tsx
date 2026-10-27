"use client";

import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Grass } from "./Decor";
import { contacts } from "@/data/site";

const links = [
  { label: "Telegram", href: contacts.telegramNastya },
  { label: "Instagram", href: contacts.instagram },
  { label: "Telegram-канал", href: contacts.telegram },
  { label: "WhatsApp", href: contacts.whatsapp },
];

export function Footer() {
  return (
    <footer
      id="contacts"
      className="relative isolate scroll-mt-16 bg-forest pt-16 text-cream"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-full">
        <Grass tones={["#1f3b26", "#2a4d31", "#3c6b3e"]} className="h-[90px] md:h-[140px]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <SectionTitle
          title="Контакты"
          sub="напишите мне — подберу свечу ♡"
          align="center"
          tone="light"
        />

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-cream/30 px-8 py-4 transition hover:-translate-y-1 hover:border-pink hover:bg-pink hover:text-berry"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={`tel:+77002517416`}
            className="mt-8 inline-block font-serif text-3xl italic text-cream/90 transition hover:text-pink md:text-4xl"
          >
            {contacts.phoneDisplay}
          </a>
        </Reveal>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-20 select-none overflow-hidden whitespace-nowrap text-center font-serif text-[22vw] italic leading-[0.8] text-pink/15"
      >
        Snowfirefly
      </p>

      <div className="relative border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Snowfirefly · Ароматические свечи ручной работы
        <span className="mt-2 block text-[11px] text-cream/35">
          Музыка: massobeats — gingersweet (Free To Use, freetouse.com)
        </span>
      </div>
    </footer>
  );
}
