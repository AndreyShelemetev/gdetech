# Промпты для генерации изображений

Логотип, иконки и фон hero сделаны в коде (SVG/CSS/motion) — генерировать их не нужно.
Фото людей — заглушки (аватар с инициалами), реальные фото добавите сами в `content/team.ts`
(поле можно добавить, например `photoUrl`, и подключить в `src/components/sections/Team.tsx` вместо `<Avatar />`).

Ниже — 6 изображений, которые стоит сгенерировать нейросетью (Midjourney / DALL·E / Stable Diffusion и т.п.).
Единый стиль: тёмный футуризм, неоновые градиенты индиго → фиолетовый → голубой, стекло (glassmorphism),
мягкий объёмный свет, без явного текста на картинке.

Складывайте готовые файлы в `public/images/` строго под указанными именами — компоненты уже на них ссылаются.

---

## 1. `public/images/og-share.jpg` — соц-превью (OG-картинка)

**Размер:** 1200×630

```
Dark futuristic tech hub interior, abstract glowing indigo and violet gradient light trails,
glassmorphism panels, subtle grid floor reflections, cinematic wide shot, no text, no logos,
high contrast, premium startup brand aesthetic, 1200x630, --ar 1200:630
```

## 2. `public/images/hero-poster.jpg` — постер для hero-секции (фолбэк при reduced-motion)

**Размер:** 1920×1080

```
Abstract futuristic network of glowing nodes and light trails in deep navy space,
indigo-violet-cyan gradient particles, soft depth of field, minimal, elegant, premium tech brand
background, no text, cinematic, 16:9, --ar 16:9
```

## 3. `public/images/space-workspace.jpg` — рабочие места коворкинга

**Размер:** 1600×1200 (4:3)

```
Modern loft-style coworking workspace interior, ergonomic chairs, dual monitors on wooden desks,
warm ambient lighting mixed with cool indigo neon accent lighting, exposed brick and dark ceiling,
plants, photorealistic architectural photography, wide angle, evening mood, --ar 4:3
```

## 4. `public/images/space-meeting-room.jpg` — конференц-зал

**Размер:** 1600×1200 (4:3)

```
Small modern conference room in a tech coworking space, large 75-inch TV screen on the wall,
comfortable chairs around a round table, wireless microphone on the table, dark walls with subtle
indigo neon strip lighting, glass wall partition, photorealistic interior photography, --ar 4:3
```

## 5. `public/images/space-lounge.jpg` — зона отдыха

**Размер:** 1600×1200 (4:3)

```
Cozy lounge and relaxation area inside a futuristic tech coworking space, bean bag chairs,
cushioned window seating, designer furniture, soft violet and cyan ambient lighting, large windows
with city view at dusk, photorealistic interior photography, --ar 4:3
```

## 6. `public/images/space-event.jpg` — кухня / мероприятия

**Размер:** 1600×1200 (4:3)

```
Loft-style kitchen and event space in a tech startup hub, hi-tech coffee machine, people mingling
at a casual meetup in the background (silhouettes, not detailed faces), warm string lighting mixed
with indigo neon accents, photorealistic interior photography, candid atmosphere, --ar 4:3
```

---

### Совет

Если хотите вместо AI-картинок использовать настоящие фото пространства — просто положите их
в `public/images/` под теми же именами и тем же соотношением сторон, ничего в коде менять не придётся.
