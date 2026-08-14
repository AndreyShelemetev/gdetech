export interface ServiceItem {
  title: string;
  description: string;
  icon: "invest" | "learn" | "infra" | "team" | "network" | "mentor";
}

export const services: ServiceItem[] = [
  {
    title: "Инвестиции",
    description: "Инвестируем сами или помогаем привлечь финансирование под ваш проект.",
    icon: "invest",
  },
  {
    title: "Обучение",
    description: "Учим разрабатывать проект от идеи до выхода на рынок вместе с экспертами хаба.",
    icon: "learn",
  },
  {
    title: "Инфраструктура",
    description: "Даём офис, рабочие места и сервера — сфокусируйтесь на продукте, а не на быте.",
    icon: "infra",
  },
  {
    title: "Команда",
    description: "Помогаем собрать команду специалистов под задачи вашего стартапа.",
    icon: "team",
  },
  {
    title: "Единомышленники",
    description: "Знакомим с предпринимателями, которые смотрят в одну сторону с вами.",
    icon: "network",
  },
  {
    title: "Наставники",
    description: "Делимся опытом и связями, которые нарабатывались годами в IT и бизнесе.",
    icon: "mentor",
  },
];

export interface VibeCodingItem {
  title: string;
  description: string;
  icon: "bolt" | "chip" | "megaphone";
}

export const vibeCodingServices: VibeCodingItem[] = [
  {
    title: "Вайб-кодинг",
    description:
      "Соберём рабочий MVP вместе с вами через AI-инструменты — быстро, без раздутой команды разработки.",
    icon: "bolt",
  },
  {
    title: "Подписки на нейросети",
    description:
      "Поможем оформить и купить доступ к популярным нейросетям — ChatGPT Plus, Claude, Midjourney и другим.",
    icon: "chip",
  },
  {
    title: "Настройка рекламы",
    description: "Настроим Яндекс.Директ, VK Рекламу и таргет — приведём первых пользователей к продукту.",
    icon: "megaphone",
  },
];
