import { getCollection, type CollectionEntry } from 'astro:content';
import { productOf } from './labels';

export type Recipe = CollectionEntry<'recipes'>;

/** Every recipe, A–Z by title. */
export async function allRecipes(): Promise<Recipe[]> {
  const collator = new Intl.Collator('pl');
  return (await getCollection('recipes')).sort((a, b) =>
    collator.compare(a.data.title, b.data.title),
  );
}

/** What a recipe needs, as the finder knows it, each once; optional extras left out. */
export function productsOf(recipe: Recipe): string[] {
  return [
    ...new Set(
      recipe.data.ingredients.flatMap((s) => s.items.filter((i) => !i.optional).map(productOf)),
    ),
  ];
}
