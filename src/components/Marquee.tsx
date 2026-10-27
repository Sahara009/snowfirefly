import { marquee } from "@/data/site";
import { Scallop } from "./Decor";

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="relative">
      <div className="overflow-hidden bg-grass-deep py-4 text-cream">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...row, ...row].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-serif text-xl italic md:text-2xl"
            >
              {t}
              <span className="not-italic text-pink">✿</span>
            </span>
          ))}
        </div>
      </div>
      <div className="relative h-0">
        <Scallop color="#2f5d34" size={40} />
      </div>
    </div>
  );
}
