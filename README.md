# Snowfirefly — сайт-портфолио бренда свечей

Next.js 15 (App Router) · Tailwind CSS 4 · motion (Framer Motion) · Lenis (плавный скролл)

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # проверка production-сборки
```

## Где что менять

- `src/data/site.ts` — ВСЕ тексты, контакты, список коллекций, подписи к фото
- `public/img/` — фото, `public/video/` — видео (mp4, без звука, ≤ 3 МБ каждое)
- `src/components/` — секции страницы (Hero, About, Collections, ...)
- Цвета — в `src/app/globals.css` (переменные `:root`)

## Выкладка на бесплатный хостинг — Netlify (рекомендуется)

Почему Netlify: бесплатный тариф, разрешён коммерческий сайт, бесплатный адрес `*.netlify.app`,
свой домен с HTTPS подключается бесплатно, и там же бесплатно работает вход в админку.
(У Vercel бесплатный Hobby — только для некоммерческих проектов.)

1. Создать репозиторий на GitHub и залить туда проект (без `node_modules` и `.next` — они в `.gitignore`):
   ```bash
   git init && git add . && git commit -m "Snowfirefly"
   git branch -M main
   git remote add origin https://github.com/<логин>/snowfirefly.git
   git push -u origin main
   ```
2. app.netlify.com → Add new site → Import an existing project → GitHub → выбрать репозиторий.
   Настройки подтянутся из `netlify.toml` → Deploy.
3. Site configuration → Change site name → например `snowfirefly` → сайт будет на `https://snowfirefly.netlify.app`.
4. Свой домен (когда купят): Domain management → Add a domain → следовать подсказкам
   (у регистратора прописать DNS-запись, которую покажет Netlify). HTTPS включится сам.

Каждый `git push` в `main` — автоматическая пересборка сайта.

### Запасной вариант — Cloudflare Pages
Build command: `STATIC_EXPORT=1 npm run build`, Output directory: `out`, переменная `NODE_VERSION=22`.
Бесплатный адрес `*.pages.dev`, свой домен тоже можно. Но вход в админку там придётся поднимать отдельно
(свой OAuth-прокси), поэтому для админки удобнее Netlify.

## Админка: Настя сама добавляет свечи

Админка — Sveltia CMS (бесплатная, удобная на телефоне, интерфейс на русском), адрес `https://snowfirefly.netlify.app/admin/`.
Вход через GitHub: OAuth-приложение GitHub подключено в Netlify (Project configuration → Security → OAuth).

Как устроено:
- Каждая свеча — отдельный файл `src/data/products/<id>.json`. Админка создаёт/правит/удаляет эти файлы и коммитит в GitHub.
- Перед сборкой скрипт `scripts/build-products.mjs` собирает их в `src/data/products.json`, который читает сайт
  (запускается сам перед `npm run dev` и `npm run build`).
- Netlify пересобирает сайт после каждого сохранения — изменения видны через 1–2 минуты.
- Фото при загрузке автоматически уменьшаются до 1600px и переводятся в WebP.
- Поля: название, фото, категория, описание, цена (пусто — «цена по запросу»), витрина «Коллекции»,
  «скрыть с сайта», порядок (0 — новинки в начале), кадрирование, видео, обложка видео, дата.
- На телефоне: войти один раз на компьютере → в меню профиля «Войти с мобильного» → QR-код.

Доступ новому человеку: репозиторий → Settings → Collaborators → Add people (нужен аккаунт GitHub с правом записи).

## Корзина и заказ

- Каталог берёт товары из `src/data/products/*.json` (собираются в `src/data/products.json`, читаются через `collections` в `src/data/site.ts`).
- `price` — цена в тенге; без цены пишется «цена по запросу». `featured: true` — товар в витрине «Коллекции».
- «Оформить в Telegram» открывает личный чат Насти `t.me/snownastya` с готовым текстом заказа в поле ввода
  (параметр `?text=`) — покупателю остаётся нажать «Отправить». Текст заодно копируется в буфер.
  Запасная ссылка — WhatsApp. Ник и номер — в `contacts` в `src/data/site.ts`.
- Корзина сохраняется в браузере посетителя (localStorage).

## Музыка

- Трек: massobeats — gingersweet (Free To Use, freetouse.com), файл `public/audio/gingersweet.mp3`.
  Кредит указан в футере.
- Заменить: положить свой mp3 в `public/audio` и поменять `SRC` в `src/components/Music.tsx`.
- Включается после первого клика по странице (так требуют браузеры); кнопка с нотой в шапке выключает, выбор запоминается.
