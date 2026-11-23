/**
 * „Co mam w domu?” without the DOM: which recipes the chosen products make, ranked by what's still
 * missing, and the choice in the URL (?mam=jajka,pomidory&posilek=sniadanie).
 */

/** Always at home, so never "missing" and not offered as a choice. */
export const PANTRY: readonly string[] = ['sól', 'pieprz', 'olej', 'woda', 'cukier'];

export interface Candidate {
  id: string;
  title: string;
  products: readonly string[];
  categories: readonly string[];
}

export interface Choice {
  have: readonly string[];
  category: string | undefined;
}

export interface Match {
  id: string;
  /** What the recipe needs that isn't chosen, pantry left out. */
  missing: string[];
}

/** The products a recipe needs, pantry left out, each once. */
export function needed(products: readonly string[]): string[] {
  return [...new Set(products)].filter((p) => !PANTRY.includes(p));
}

/**
 * The recipes to show, in order. Nothing chosen: every recipe of the category, A–Z. Products
 * chosen: only the recipes that use at least one, the fewest missing first, then A–Z.
 */
export function rank(candidates: readonly Candidate[], choice: Choice): Match[] {
  const collator = new Intl.Collator('pl');
  const have = new Set(choice.have);
  return candidates
    .filter((c) => choice.category === undefined || c.categories.includes(choice.category))
    .map((c) => {
      const products = needed(c.products);
      return {
        id: c.id,
        title: c.title,
        missing: products.filter((p) => !have.has(p)),
        used: products.filter((p) => have.has(p)).length,
      };
    })
    .filter((m) => have.size === 0 || m.used > 0)
    .sort(
      (a, b) =>
        (have.size === 0 ? 0 : a.missing.length - b.missing.length) ||
        collator.compare(a.title, b.title),
    )
    .map(({ id, missing }) => ({ id, missing }));
}

/** "Masz wszystko." / "Brakuje: cebula, czosnek." — under a recipe once something is chosen. */
export function missingText(missing: readonly string[]): string {
  return missing.length === 0 ? 'Masz wszystko.' : `Brakuje: ${missing.join(', ')}.`;
}

/** "Pasują 3 przepisy." — what a screen reader hears after a choice. */
export function countText(shown: number): string {
  if (shown === 0) {
    return 'Żaden przepis nie pasuje.';
  }
  if (shown === 1) {
    return 'Pasuje 1 przepis.';
  }
  const units = shown % 10;
  const tens = shown % 100;
  const few = units >= 2 && units <= 4 && (tens < 12 || tens > 14);
  return few ? `Pasują ${shown} przepisy.` : `Pasuje ${shown} przepisów.`;
}

const HAVE = 'mam';
const CATEGORY = 'posilek';

/** The choice from the URL, keeping only products and categories the page knows. */
export function readChoice(
  search: string,
  products: readonly string[],
  categories: readonly string[],
): Choice {
  const params = new URLSearchParams(search);
  const have = (params.get(HAVE) ?? '').split(',').filter((p) => products.includes(p));
  const category = params.get(CATEGORY) ?? undefined;
  return {
    have,
    category: category !== undefined && categories.includes(category) ? category : undefined,
  };
}

/** The URL's query for a choice; an empty choice clears it. */
export function writeChoice(search: string, choice: Choice): string {
  const params = new URLSearchParams(search);
  if (choice.have.length > 0) {
    params.set(HAVE, choice.have.join(','));
  } else {
    params.delete(HAVE);
  }
  if (choice.category !== undefined) {
    params.set(CATEGORY, choice.category);
  } else {
    params.delete(CATEGORY);
  }
  const query = params.toString().replaceAll('%2C', ',');
  return query ? `?${query}` : '';
}
