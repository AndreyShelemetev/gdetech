export interface PathStage {
  step: number;
  title: string;
  description: string;
  timeframe?: string;
}

export const startupPath: PathStage[] = [
  {
    step: 1,
    title: "Идея",
    description: "Формулируем идею вместе — менторы помогают её доработать или предлагают своё направление.",
    timeframe: "1 месяц",
  },
  {
    step: 2,
    title: "Исследование",
    description: "Анализируем рынок, определяем аудиторию и оцениваем риски перед стартом разработки.",
  },
  {
    step: 3,
    title: "Разработка MVP",
    description: "Личный наставник ведёт команду через сборку первой версии продукта.",
    timeframe: "3 месяца",
  },
  {
    step: 4,
    title: "Полноценный продукт",
    description: "Дорабатываем конкурентоспособную версию продукта для полноценного выхода на рынок.",
    timeframe: "6 месяцев",
  },
  {
    step: 5,
    title: "Фандрайзинг",
    description: "Находим инвесторов для дальнейшего развития проекта.",
  },
  {
    step: 6,
    title: "Масштабирование",
    description: "Выстраиваем коммерческие процессы устоявшегося бизнеса.",
  },
];
