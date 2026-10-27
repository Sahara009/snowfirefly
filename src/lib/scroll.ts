// Общий доступ к плавному скроллу (Lenis) для шапки, меню и корзины.
// Не через window.lenis — это имя уже занято типами самой библиотеки.
type Scroller = { stop: () => void; start: () => void };

let current: Scroller | null = null;

export const setScroller = (s: Scroller | null) => {
  current = s;
};

export const stopScroll = () => current?.stop();
export const startScroll = () => current?.start();
