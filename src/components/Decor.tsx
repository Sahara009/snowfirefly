// Декоративные элементы в пикми-стиле: наклейки, трава, фестоны, жемчуг.
// Без "use client" — чистая разметка, можно использовать где угодно.

type StickerKind = "flower" | "heart" | "sparkle" | "leaf";

export function Sticker({
  kind,
  className = "",
  color,
  center = "#ffd36b",
  rotate = 0,
  delay = 0,
  size = 40,
}: {
  kind: StickerKind;
  className?: string;
  color?: string;
  center?: string;
  rotate?: number;
  delay?: number;
  size?: number;
}) {
  const style = {
    width: size,
    height: size,
    "--r": `${rotate}deg`,
    "--delay": `${delay}s`,
  } as React.CSSProperties;

  return (
    <span aria-hidden className={`bob pointer-events-none absolute block ${className}`} style={style}>
      <svg viewBox="0 0 40 40" className="size-full drop-shadow-[0_3px_0_rgba(255,255,255,0.9)]">
        {kind === "flower" && (
          <>
            <g fill={color ?? "#f58db9"} stroke="#fff" strokeWidth="1.5">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="20" cy="10.5" rx="7" ry="9" transform={`rotate(${a} 20 20)`} />
              ))}
            </g>
            <circle cx="20" cy="20" r="5.5" fill={center} stroke="#fff" strokeWidth="1.5" />
          </>
        )}
        {kind === "heart" && (
          <path
            d="M20 35C6 25 2 16 8 10c5-5 11-2 12 2 1-4 7-7 12-2 6 6 2 15-12 25z"
            fill={color ?? "#e5628f"}
            stroke="#fff"
            strokeWidth="2"
          />
        )}
        {kind === "sparkle" && (
          <path
            d="M20 2c1 12 6 17 18 18-12 1-17 6-18 18-1-12-6-17-18-18 12-1 17-6 18-18z"
            fill={color ?? "#ffd36b"}
            stroke="#fff"
            strokeWidth="1.5"
          />
        )}
        {kind === "leaf" && (
          <>
            <path
              d="M6 34C6 16 18 5 36 4c0 18-11 30-30 30z"
              fill={color ?? "#6aa84f"}
              stroke="#fff"
              strokeWidth="2"
            />
            <path d="M8 32C16 22 24 14 33 7" stroke="#e7f1dc" strokeWidth="1.5" fill="none" />
          </>
        )}
      </svg>
    </span>
  );
}

// детерминированный «рандом», чтобы SSR и клиент совпадали
const rnd = (i: number) => {
  const x = Math.sin(i * 999.7) * 10000;
  return x - Math.floor(x);
};
const f = (n: number) => n.toFixed(1);

const BLADES = Array.from({ length: 110 }, (_, i) => {
  const x = i * (1200 / 110) + rnd(i) * 9;
  const h = 26 + rnd(i + 3) * 64;
  const lean = (rnd(i + 7) - 0.5) * 30;
  const w = 7 + rnd(i + 11) * 7;
  return { x, h, lean, w, g: i % 3 };
});

/** Травка с цветочками. tones — от тёмного (задний план) к светлому */
export function Grass({
  tones = ["#2f5d34", "#4f8a3c", "#6aa84f"],
  flowers = true,
  className = "h-[70px] md:h-[110px]",
}: {
  tones?: [string, string, string];
  flowers?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
    >
      {[0, 1, 2].map((g) => (
        <g
          key={g}
          className="sway"
          fill={tones[g]}
          style={{ animationDelay: `${-g * 1.3}s`, animationDuration: `${4 + g}s` }}
        >
          {BLADES.filter((b) => b.g === g).map((b, i) => (
            <path
              key={i}
              d={`M${f(b.x - b.w / 2)} 101 Q${f(b.x + b.lean * 0.3)} ${f(100 - b.h * 0.6)} ${f(b.x + b.lean)} ${f(100 - b.h)} Q${f(b.x + b.lean * 0.2 + b.w * 0.25)} ${f(100 - b.h * 0.5)} ${f(b.x + b.w / 2)} 101Z`}
            />
          ))}
        </g>
      ))}
      <rect x="0" y="96" width="1200" height="5" fill={tones[0]} />
      {flowers &&
        BLADES.filter((_, i) => i % 9 === 4).map((b, i) => (
          <g key={i} className="sway" style={{ animationDelay: `${-i * 0.7}s` }}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx={f(b.x + b.lean)}
                cy={f(100 - b.h - 3.2)}
                rx="2.6"
                ry="3.4"
                fill={i % 2 ? "#ffffff" : "#f9a8c9"}
                transform={`rotate(${a} ${f(b.x + b.lean)} ${f(100 - b.h)})`}
              />
            ))}
            <circle cx={f(b.x + b.lean)} cy={f(100 - b.h)} r="2" fill="#ffd36b" />
          </g>
        ))}
    </svg>
  );
}

/** Фестоны (волнистый край). Цвет — фон предыдущей секции, «свисает» вниз */
export function Scallop({
  color,
  size = 36,
  className = "",
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-10 ${className}`}
      style={{
        height: size / 2,
        background: `radial-gradient(circle at ${size / 2}px 0, ${color} ${size / 2}px, transparent ${size / 2 + 0.5}px) 0 0 / ${size}px ${size / 2}px repeat-x`,
      }}
    />
  );
}

/** Жемчужная рамка-овал (контейнер должен быть aspect-[3/4]) */
export function PearlRing({ count = 36 }: { count?: number }) {
  const pts = Array.from({ length: count }, (_, i) => {
    const t = (i / count) * Math.PI * 2;
    return [150 + 141 * Math.cos(t), 200 + 191 * Math.sin(t)];
  });
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-3 z-10">
      <svg viewBox="0 0 300 400" className="size-full overflow-visible">
        <defs>
          <radialGradient id="pearl" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fdebf2" />
            <stop offset="100%" stopColor="#e7b9cb" />
          </radialGradient>
        </defs>
        {pts.map(([x, y], i) => (
          <circle key={i} cx={f(x)} cy={f(y)} r="8" fill="url(#pearl)" />
        ))}
      </svg>
    </div>
  );
}

/** Рукописная стрелочка */
export function HandArrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 70"
      className={`pointer-events-none ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12c22-8 48-6 64 10 12 12 16 26 34 34" />
      <path d="M90 58l15-2-7-13" />
    </svg>
  );
}
