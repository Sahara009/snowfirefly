"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CandleIcon, useCart } from "./Cart";
import { tgLink, waLink } from "@/data/site";

const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₸";

export function CartDrawer() {
  const { open, setOpen, items, count, add, dec, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);

  // Telegram подставляет текст в поле ввода по ссылке ?text=.
  // На всякий случай кладём его и в буфер — если клиент проигнорирует, можно просто вставить.
  const copyOrder = () => {
    try {
      navigator.clipboard?.writeText(message).then(() => setCopied(true)).catch(() => {});
    } catch {}
  };

  const allPriced = items.length > 0 && items.every((i) => typeof i.product.price === "number");
  const total = allPriced
    ? items.reduce((s, i) => s + (i.product.price ?? 0) * i.qty, 0)
    : null;

  const message = [
    "Здравствуйте, Анастасия! Хочу оформить заказ с сайта Snowfirefly ✿",
    "",
    ...items.map(
      (i, n) =>
        `${n + 1}. ${i.product.title} × ${i.qty}` +
        (typeof i.product.price === "number" ? ` — ${fmt(i.product.price * i.qty)}` : ""),
    ),
    ...(total !== null ? ["", `Итого: ${fmt(total)} (без доставки)`] : []),
    "",
    ...(name ? [`Имя: ${name}`] : []),
    ...(city ? [`Город доставки: ${city}`] : []),
    ...(comment ? [`Комментарий: ${comment}`] : []),
    "",
    "Подскажите, пожалуйста, стоимость, сроки и как оплатить 🙏",
  ].join("\n");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-berry/30 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            data-lenis-prevent
            role="dialog"
            aria-label="Корзина"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col overflow-y-auto bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-berry/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <CandleIcon lit={count > 0} className="h-9 w-7" />
                <h2 className="font-serif text-3xl">Корзина</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть корзину"
                className="flex size-10 items-center justify-center rounded-full text-2xl transition hover:bg-blush"
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <CandleIcon lit={false} className="h-24 w-20 opacity-70" />
                <p className="mt-6 font-serif text-2xl">Пока пусто</p>
                <p className="mt-2 text-sm text-berry/60">
                  Добавьте свечи из каталога — и эта свечка загорится ✨
                </p>
                <a
                  href="#catalog"
                  onClick={() => setOpen(false)}
                  className="mt-8 rounded-full bg-grass-deep px-6 py-3 text-sm text-cream"
                >
                  Открыть каталог
                </a>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-berry/10 px-6">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-4 py-5">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-blush">
                        {i.product.image || i.product.poster ? (
                          <Image
                            src={(i.product.image || i.product.poster)!}
                            alt={i.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                            style={{ objectPosition: i.product.position }}
                          />
                        ) : i.product.video ? (
                          <video
                            src={`${i.product.video}#t=0.1`}
                            muted
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 size-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif text-lg leading-tight">{i.product.title}</p>
                          <button
                            onClick={() => remove(i.id)}
                            className="text-xs text-berry/40 transition hover:text-rose"
                          >
                            убрать
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-berry/50">
                          {typeof i.product.price === "number"
                            ? fmt(i.product.price)
                            : "цену уточним в чате"}
                        </p>
                        <div className="mt-auto flex items-center gap-3 pt-2">
                          <button
                            onClick={() => dec(i.id)}
                            aria-label="Меньше"
                            className="flex size-8 items-center justify-center rounded-full border border-berry/15 transition hover:border-rose hover:text-rose"
                          >
                            −
                          </button>
                          <span className="w-5 text-center tabular-nums">{i.qty}</span>
                          <button
                            onClick={() => add(i.id)}
                            aria-label="Больше"
                            className="flex size-8 items-center justify-center rounded-full border border-berry/15 transition hover:border-grass hover:text-grass-deep"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 space-y-3 px-6">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full rounded-2xl border border-berry/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-grass"
                  />
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Город доставки"
                    className="w-full rounded-2xl border border-berry/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-grass"
                  />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Пожелания: аромат, цвет, открытка, питомец 🐾"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-berry/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-grass"
                  />
                </div>

                <div className="mt-auto space-y-3 px-6 pb-8 pt-6">
                  <div className="rounded-2xl bg-sage px-4 py-3 text-xs leading-relaxed text-grass-deep">
                    Откроется чат с Анастасией в Telegram — сообщение с заказом уже
                    будет в поле ввода, останется нажать «Отправить». Анастасия
                    подтвердит цену и сроки и пришлёт реквизиты для оплаты. Доставка СДЭК или
                    Казпочтой оплачивается отдельно. От 6&nbsp;000&nbsp;₸ — игрушка
                    для питомца в подарок 🐾
                  </div>
                  {total !== null && (
                    <p className="flex justify-between font-serif text-xl">
                      <span>Итого</span>
                      <span>{fmt(total)}</span>
                    </p>
                  )}
                  <a
                    href={tgLink(message)}
                    onClick={copyOrder}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-full bg-grass-deep py-4 text-center text-cream shadow-[0_5px_0_#1f3b26] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_#1f3b26]"
                  >
                    Оформить в Telegram · {count} шт.
                  </a>
                  {copied && (
                    <p className="text-center text-xs text-grass-deep">
                      Текст заказа скопирован ✿ если он не появился в чате — просто вставьте его
                    </p>
                  )}
                  <a
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-xs text-berry/50 underline-offset-4 transition hover:text-grass-deep hover:underline"
                  >
                    или написать в WhatsApp
                  </a>
                  <button
                    onClick={clear}
                    className="block w-full text-center text-xs text-berry/40 transition hover:text-rose"
                  >
                    очистить корзину
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
