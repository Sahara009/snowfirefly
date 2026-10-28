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

Админка — Decap CMS, бесплатная, открывается на `https://<сайт>/admin`.
Товары хранятся в `src/data/products.json`; админка правит этот файл и коммитит в GitHub,
Netlify пересобирает сайт — новая свеча появляется через 1–2 минуты.

Настройка (один раз, ~15 минут):
1. В `public/admin/config.yml` уже стоит `repo: Sahara009/snowfirefly` (если репозиторий другой — поменять и запушить).
2. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://snowfirefly.netlify.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   Сохранить Client ID и сгенерировать Client Secret.
3. Netlify → Project configuration → Security → OAuth → Authentication Providers → Install Provider → GitHub → вставить ID и Secret.
4. У Насти должен быть аккаунт на GitHub; добавить её в репозиторий: Settings → Collaborators → Add people.
5. Настя открывает `/admin`, входит через GitHub → «Каталог» → «Свечи» → «Добавить свечу».

Советы Насте: фото лучше вертикальные и лёгкие (до 1–2 МБ, можно сжать на squoosh.app),
ID — латиницей и не повторяться, категория выбирается из списка.

## Корзина и заказ

- Каталог берёт товары из `src/data/products.json` (через `collections` в `src/data/site.ts`).
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
