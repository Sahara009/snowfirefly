"use client";

import { useEffect, useRef, useState } from "react";
import { useReady } from "./Ready";

const KEY = "snowfirefly-music";
const SRC = "/audio/gingersweet.mp3"; // massobeats — gingersweet (freetouse.com); заменить можно любым mp3 в public/audio
const VOLUME = 0.25;

/**
 * Фоновая музыка. Браузеры не дают играть звук без действия пользователя,
 * поэтому музыка включается после первого клика/тапа/клавиши на странице
 * (если человек раньше её не выключал). Кнопка — включить/выключить.
 */
export function MusicToggle({ className = "" }: { className?: string }) {
  const ready = useReady();
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [wantOn, setWantOn] = useState(true);

  const fadeTo = (target: number, then?: () => void) => {
    const a = audio.current;
    if (!a) return;
    if (fade.current) clearInterval(fade.current);
    let guard = 0; // на iOS громкость менять нельзя — не крутимся вечно
    fade.current = setInterval(() => {
      const step = 0.03;
      if (++guard > 60) {
        if (fade.current) clearInterval(fade.current);
        then?.();
        return;
      }
      const v = a.volume + (target > a.volume ? step : -step);
      if (Math.abs(target - a.volume) <= step) {
        a.volume = target;
        if (fade.current) clearInterval(fade.current);
        then?.();
      } else a.volume = Math.min(1, Math.max(0, v));
    }, 40);
  };

  const play = () => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(VOLUME);
      })
      .catch(() => setPlaying(false));
  };

  const pause = () => {
    fadeTo(0, () => audio.current?.pause());
    setPlaying(false);
  };

  // создаём плеер и читаем сохранённый выбор
  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.preload = "none";
    audio.current = a;
    try {
      if (localStorage.getItem(KEY) === "off") setWantOn(false);
    } catch {}
    return () => {
      a.pause();
      if (fade.current) clearInterval(fade.current);
    };
  }, []);

  // автозапуск после первого взаимодействия
  useEffect(() => {
    if (!ready || !wantOn) return;
    const start = () => {
      if (!audio.current?.paused) return;
      play();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, wantOn]);

  // на скрытой вкладке — тишина
  useEffect(() => {
    const onVis = () => {
      const a = audio.current;
      if (!a) return;
      if (document.hidden) a.pause();
      else if (playing) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playing]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы этот клик не считался «первым взаимодействием»
    if (playing) {
      pause();
      setWantOn(false);
      try {
        localStorage.setItem(KEY, "off");
      } catch {}
    } else {
      setWantOn(true);
      try {
        localStorage.setItem(KEY, "on");
      } catch {}
      play();
    }
  };

  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={toggle}
      aria-label={playing ? "Выключить музыку" : "Включить музыку"}
      title={playing ? "Выключить музыку" : "Включить музыку"}
      className={`group relative flex size-10 items-center justify-center rounded-full transition hover:bg-white/60 ${className}`}
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="eq-bar w-[3px] rounded-full bg-grass"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5 text-berry/70" aria-hidden>
          <path
            d="M9 18V6l10-2v12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
          <circle cx="16.5" cy="16" r="2.5" fill="currentColor" />
          <path d="M3 3l18 18" stroke="#e5628f" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
