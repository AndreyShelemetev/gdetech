export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

// Значения ниже — из старого сайта gdetech.ru, не выдуманы.
// Число экспертов/резидентов считается динамически из content/team.ts и content/portfolio.ts.
export const baseStats: StatItem[] = [
  { value: 9, suffix: " млрд ₽", label: "заработали IT-компании Йошкар-Олы в 2026 году" },
  { value: 17, suffix: "+", label: "стартапов запущено при участии команды" },
  { value: 20, suffix: "+", label: "лет суммарного опыта в IT и бизнесе" },
];
