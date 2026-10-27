"use client";

import { Reveal, Words } from "./Reveal";

/** Крупное название секции + рукописная подпись под ним */
export function SectionTitle({
  title,
  accent,
  sub,
  align = "left",
  tone = "dark",
  className = "",
  size = "lg",
}: {
  size?: "lg" | "md";
  title: string;
  accent?: string;
  sub?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <h2
        className={`font-serif leading-[0.88] tracking-tight ${
          size === "lg" ? "text-[clamp(2.5rem,10vw,8.5rem)]" : "text-[clamp(2.75rem,7vw,6rem)]"
        }`}
      >
        <Words text={title} inView />
        {accent && (
          <>
            <br />
            <span className={`italic ${tone === "light" ? "text-pink" : "text-rose"}`}>
              <Words text={accent} inView delay={0.2} />
            </span>
          </>
        )}
      </h2>
      {sub && (
        <Reveal delay={0.3} y={16}>
          <p
            className={`mt-5 inline-block -rotate-2 font-hand text-2xl md:text-3xl ${
              tone === "light" ? "text-leaf" : "text-grass-deep"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
