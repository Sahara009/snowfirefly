// Статичные позиции (без Math.random), чтобы не было рассинхрона SSR/клиента
const dots = [
  { l: 6, t: 22, s: 6, d: 9, dl: 0 },
  { l: 14, t: 68, s: 4, d: 11, dl: 2 },
  { l: 24, t: 40, s: 7, d: 8, dl: 1 },
  { l: 33, t: 82, s: 5, d: 12, dl: 3 },
  { l: 41, t: 18, s: 4, d: 10, dl: 4 },
  { l: 52, t: 58, s: 6, d: 9, dl: 0.5 },
  { l: 60, t: 30, s: 5, d: 13, dl: 2.5 },
  { l: 68, t: 76, s: 7, d: 10, dl: 1.5 },
  { l: 76, t: 14, s: 4, d: 8, dl: 3.5 },
  { l: 84, t: 52, s: 6, d: 11, dl: 0.8 },
  { l: 92, t: 34, s: 5, d: 9, dl: 2.2 },
  { l: 96, t: 80, s: 4, d: 12, dl: 4.2 },
];

export function Fireflies({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="firefly"
          style={
            {
              left: `${d.l}%`,
              top: `${d.t}%`,
              width: d.s * 2,
              height: d.s * 2,
              "--d": `${d.d}s`,
              "--delay": `${d.dl}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
