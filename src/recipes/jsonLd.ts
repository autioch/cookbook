/** A recipe page's schema.org `Recipe` data (JSON-LD): search engines and AI agents read it as data. */

import { amountText, CATEGORIES, type Category, type Ingredient } from './labels.ts';

interface RecipeData {
  title: string;
  summary: string;
  categories: Category[];
  servings: number;
  time: { active: number; total: number };
  ingredients: { items: Ingredient[] }[];
  steps: { items: string[] }[];
  sources: { url: string }[];
}

/** The JSON-LD for one recipe, safe inside a `<script>`: no `<` ends it early. */
export function recipeJsonLd(
  recipe: RecipeData,
  url: string,
  author: { name: string; url: string },
  site: { name: string; url: string },
): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.summary,
    url,
    inLanguage: 'pl',
    recipeCategory: recipe.categories.map((c) => CATEGORIES[c]),
    recipeYield: String(recipe.servings),
    prepTime: `PT${recipe.time.active}M`,
    totalTime: `PT${recipe.time.total}M`,
    author: { '@type': 'Person', name: author.name, url: author.url },
    recipeIngredient: recipe.ingredients.flatMap((s) =>
      s.items.map((i) => [amountText(i), i.name].filter(Boolean).join(' ')),
    ),
    recipeInstructions: recipe.steps.flatMap((s) =>
      s.items.map((text) => ({ '@type': 'HowToStep', text })),
    ),
    ...(recipe.sources.length > 0 && { citation: recipe.sources.map((s) => s.url) }),
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
  };
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
