/** The recipe file's fixed words and how the page says them in Polish (docs/vision.md § The recipe file). */

/** A recipe's meals; one recipe may be several (toasts: śniadanie and kolacja). */
export const CATEGORIES = {
  sniadanie: 'Śniadanie',
  obiad: 'Obiad',
  zupa: 'Zupa',
  kolacja: 'Kolacja',
  deser: 'Deser',
  przekaska: 'Przekąska',
} as const;
export type Category = keyof typeof CATEGORIES;
export const CATEGORY_IDS = Object.keys(CATEGORIES) as [Category, ...Category[]];

/** How hot it is, 0–3; said in words, never by a colour or a chilli icon alone. */
export const SPICE = ['łagodne', 'lekko pikantne', 'pikantne', 'bardzo ostre'] as const;

/** Did the children like it — the family's own verdict, shown only where given. */
export const KIDS = {
  tak: 'smakowało',
  'tak-sobie': 'tak sobie',
  nie: 'nie smakowało',
} as const;
export type Kids = keyof typeof KIDS;
export const KIDS_IDS = Object.keys(KIDS) as [Kids, ...Kids[]];

/** A draft is taken from the web and waits for the family to cook and correct it. */
export const STATUS = {
  szkic: 'Do sprawdzenia',
  sprawdzony: 'Sprawdzony w domu',
} as const;
export type Status = keyof typeof STATUS;
export const STATUS_IDS = Object.keys(STATUS) as [Status, ...Status[]];

export interface Ingredient {
  name: string;
  amount?: number | undefined;
  unit?: string | undefined;
  note?: string | undefined;
  /** What the finder knows it as ("ziemniaki" for "młode ziemniaki"); the name when absent. */
  product?: string | undefined;
  optional?: boolean | undefined;
}

/** "45 min", "1 godz. 15 min" — a time in minutes, as a kitchen says it. */
export function minutesText(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) {
    return `${rest} min`;
  }
  return rest === 0 ? `${hours} godz.` : `${hours} godz. ${rest} min`;
}

/** "1,5 kg", "2 łyżki" — an amount with a comma decimal; empty when there's none. */
export function amountText(ingredient: Ingredient): string {
  const amount =
    ingredient.amount === undefined
      ? ''
      : new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 2 }).format(ingredient.amount);
  return [amount, ingredient.unit ?? ''].filter(Boolean).join(' ');
}

/** "4 porcje", "1 porcja", "5 porcji" — Polish plural for a count. */
export function portionsText(count: number): string {
  const units = count % 10;
  const tens = count % 100;
  if (count === 1) {
    return '1 porcja';
  }
  const word = units >= 2 && units <= 4 && (tens < 12 || tens > 14) ? 'porcje' : 'porcji';
  return `${count} ${word}`;
}

/** The product the finder matches on, lower case. */
export function productOf(ingredient: Ingredient): string {
  return (ingredient.product ?? ingredient.name).toLowerCase();
}
