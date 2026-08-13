export interface AmenityItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const amenities: AmenityItem[] = [
  {
    title: "Конференц-зал",
    description: "75-дюймовый телевизор, беспроводной микрофон и колонка, удобные кресла для встреч и презентаций.",
    image: "/images/space-meeting-room.jpg",
    imageAlt: "Конференц-зал коворкинга GdeTech",
  },
  {
    title: "Рабочие места",
    description: "Столы в лофт-стиле, эргономичные кресла, мониторы, беспроводные клавиатуры и мыши.",
    image: "/images/space-workspace.jpg",
    imageAlt: "Рабочие места в коворкинге GdeTech",
  },
  {
    title: "Зона отдыха",
    description: "Бинбэги, мягкие подоконники и дизайнерская мебель — переключиться и подумать в тишине.",
    image: "/images/space-lounge.jpg",
    imageAlt: "Зона отдыха коворкинга GdeTech",
  },
  {
    title: "Кухня и мероприятия",
    description: "Кухня в стиле лофт/хай-тек с кофемашиной, регулярные встречи и митапы IT-сообщества.",
    image: "/images/space-event.jpg",
    imageAlt: "Кухня и пространство для мероприятий GdeTech",
  },
];
