# GdeTech — стартап-хаб

Редизайн сайта [gdetech.ru](https://gdetech.ru/): пространство и команда экспертов вместо персонажа-основателя,
футуристичный анимированный дизайн, вход через Yandex ID / VK ID / e-mail-код, две формы лидогенерации и админка.

## Стек

Next.js 15 (App Router, TypeScript) · Tailwind CSS 4 · Motion (Framer Motion) · PostgreSQL + Prisma ·
кастомная cookie-сессионная авторизация (без JWT) · Docker Compose.

## Быстрый старт (MVP-превью)

```bash
docker compose up --build
```

Откройте [http://localhost:3001](http://localhost:3001).

### Вход в админку

1. Откройте [http://localhost:3001/admin/login](http://localhost:3001/admin/login) и нажмите «Войти».
2. Введите e-mail администратора — по умолчанию `andrey.shelemetev@gmail.com` (переменная `ADMIN_EMAIL`).
3. SMTP по умолчанию выключен (`SMTP_ENABLED=false`), поэтому код входа не отправляется письмом,
   а возвращается прямо в форме («Dev-режим: код — ******») и дублируется в логах контейнера `web`:
   ```bash
   docker compose logs -f web
   ```
4. Введите код — попадёте в `/admin/leads`, где видны обе формы сайта (заявки на вступление и на встречу
   с экспертом) со сменой статуса.

Вход по e-mail-коду работает точно так же и для обычных посетителей сайта (кнопка «Войти» в шапке).

## Yandex ID / VK ID

Оба провайдера подключены в коде, но выключены по умолчанию (`YANDEX_AUTH_ENABLED=false`,
`VK_AUTH_ENABLED=false`), пока не заведены реальные приложения:

- Yandex ID: создайте приложение в [кабинете OAuth Яндекса](https://oauth.yandex.ru/), укажите redirect URI
  `https://ваш-домен/api/auth/yandex/callback`, впишите `YANDEX_CLIENT_ID` / `YANDEX_CLIENT_SECRET` в `.env`.
- VK ID: создайте приложение в [кабинете VK ID](https://id.vk.com/business/go/docs/ru/vkid/latest/vk-id/connection/create-application),
  укажите redirect URI `https://ваш-домен/api/auth/vk/callback`, впишите `VK_CLIENT_ID` в `.env`.

После этого включите `YANDEX_AUTH_ENABLED=true` / `VK_AUTH_ENABLED=true` (и соответствующие
`NEXT_PUBLIC_*_AUTH_ENABLED`, они вшиваются в сборку — потребуется пересобрать `web`).

## Реальная отправка почты

Заполните `SMTP_USERNAME` / `SMTP_PASSWORD` (по умолчанию рассчитано на Yandex 360, `smtp.yandex.ru:465`)
и поставьте `SMTP_ENABLED=true`.

## Локальная разработка без Docker

```bash
npm install
cp .env.example .env   # укажите DATABASE_URL на локальный Postgres
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Структура

- `src/app` — страницы и API-роуты (App Router).
- `src/components/sections` — секции лендинга.
- `src/content` — весь текстовый контент (команда, резиденты, услуги, FAQ и т.д.) — редактируется без БД.
- `src/lib` — авторизация, БД, e-mail, валидация.
- `prisma/schema.prisma` — модель данных (пользователи/сессии/лиды).
- `docs/image-prompts.md` — промпты для генерации недостающих изображений нейросетью.

## Что осознанно не сделано в этом MVP

Реальные `client_id/secret` для Yandex ID / VK ID, реальная отправка почты, продакшн-домен и HTTPS,
CMS для контента (правится в `src/content/*.ts`), мультиязычность, платные тарифы (на старом сайте цен
не было — не придумывались).
