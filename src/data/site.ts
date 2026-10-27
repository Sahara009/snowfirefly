// Весь контент сайта живёт здесь — меняем тексты и фото в одном месте.
import products from "./products.json";

export const contacts = {
  phoneDisplay: "+7 700 251 74 16",
  whatsapp: "https://wa.me/77002517416",
  telegram: "https://t.me/snowfirefly", // канал
  telegramNastya: "https://t.me/snownastya", // личный чат — сюда приходят заказы
  // TODO: проверить ник инстаграма Насти
  instagram: "https://instagram.com/snowfirefly",
};

export const waLink = (text: string) =>
  `${contacts.whatsapp}?text=${encodeURIComponent(text)}`;

/** Ссылка на личный чат Насти с готовым текстом в поле ввода (Telegram: t.me/<ник>?text=) */
export const tgLink = (text: string) =>
  `${contacts.telegramNastya}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "#about", label: "О бренде" },
  { href: "#catalog", label: "Каталог" },
  { href: "#gifts", label: "Подарки" },
  { href: "#corporate", label: "Бизнесу" },
  { href: "#buy", label: "Где купить" },
  { href: "#contacts", label: "Контакты" },
];

export const marquee = [
  "ароматические свечи ручной работы",
  "натуральные материалы",
  "никакого парафина",
  "доставка по всему миру",
  "каждая свеча — с заботой",
];

export type Collection = {
  id: string;
  title: string;
  text: string;
  tag: string;
  image?: string;
  video?: string;
  poster?: string;
  position?: string; // object-position для кадрирования
  price?: number; // цена в тенге; если не указана — «цена по запросу»
  featured?: boolean; // показывать в витрине «Коллекции»
};

// Товары живут в products.json — его редактирует админка (/admin).
// Можно править и руками: те же поля, что в типе Collection выше.
export const collections: Collection[] = (products as unknown as { items: Collection[] }).items;

export const fireGallery = [
  { src: "/img/rose-flame.jpg", alt: "Свеча-роза с горящим фитилём" },
  { src: "/img/tarts-flame.jpg", alt: "Горящая малиновая свеча-тарталетка" },
  { src: "/img/peony-flame.jpg", alt: "Горящая свеча среди пионов" },
  { src: "/img/rose-close.jpg", alt: "Лепестки свечи-розы крупным планом" },
  { src: "/img/apple-close.jpg", alt: "Свеча-яблоко крупным планом" },
  { src: "/img/peonies-field.jpg", alt: "Поле свечей-пионов" },
];

export const menagerie = {
  wide: [
    { src: "/img/sheep-pair.jpg", alt: "Два барашка-свечи у окна" },
    { src: "/img/cats-trio.jpg", alt: "Три котика-клоуна в колпачках" },
  ],
  tall: { src: "/img/sheep-close.jpg", alt: "Два барашка нос к носу" },
};

export const pets = [
  { src: "/img/pet-bunny.jpg", alt: "Плюшевый зайчик в подарок" },
  { src: "/img/pet-dog.jpg", alt: "Собачка с игрушкой-морковкой" },
];

export const unboxing = [
  { src: "/img/box-cat.jpg", alt: "Коробка с открыткой", rotate: -5 },
  { src: "/img/peonies-wrap.jpg", alt: "Пионы в переливающейся плёнке с бантиками", rotate: 4 },
  { src: "/img/box-2.jpg", alt: "Свечи в прозрачных пакетиках с ленточками", rotate: 3 },
  { src: "/img/thank-you.jpg", alt: "Стикер Thank you на коробке", rotate: -4 },
  { src: "/img/bow-wrap.jpg", alt: "Посылка со стикерами-бантиками", rotate: -2 },
  { src: "/img/postcard.jpg", alt: "Открытка и спички", rotate: 5 },
];

export const values = [
  { big: "0", small: "парафина", text: "Только натуральные материалы." },
  { big: "100%", small: "ручная работа", text: "Каждая свеча — отдельная маленькая история." },
  { big: "∞", small: "доставка", text: "По всему миру: СДЭК или Казпочта." },
  { big: "+1", small: "подарок", text: "Игрушка для вашего котика или собачки." },
];

export const corporate = {
  lead: "Ароматические свечи — стильный и универсальный подарок, который создаёт атмосферу уюта, заботы и внимания. Идеально для сотрудников, партнёров, клиентов и гостей мероприятий.",
  points: [
    "Любые свечи из ассортимента",
    "Стоимость рассчитывается индивидуально",
    "Подбор упаковки и оформления",
    "Сроки согласовываются заранее",
    "Скидки в зависимости от объёма заказа",
  ],
};

export const places = [
  {
    title: "Каспи магазин",
    kicker: "Весь Казахстан",
    text: "Введите в поиске Kaspi слово Snowfirefly — откроются все товары продавца. Там ещё больше позиций, чем на сайте.",
    chip: "Snowfirefly",
  },
  {
    title: "На полках в Алматы",
    kicker: "Магазины-партнёры",
    text: "Мои свечи можно найти в ArtDani, «Операционной» и других местах. Полный список — в телеграм-канале.",
    chip: "ArtDani · Операционная",
  },
  {
    title: "Доставка",
    kicker: "По всему миру",
    text: "Отправляю по городам и странам службой СДЭК или Казпочтой. Доставка оплачивается отдельно — напрямую курьерской службе.",
    chip: "СДЭК · Казпочта",
  },
];
