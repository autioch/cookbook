// Every indexable page: the home page, the site map's pages, every recipe.
import type { APIContext } from 'astro';
import { allRecipes } from '../recipes/recipes';
import { PAGES } from '../shared/pages';

export async function GET({ site }: APIContext): Promise<Response> {
  const paths = [
    '/',
    ...PAGES.map((page) => page.path),
    ...(await allRecipes()).map((r) => `/przepisy/${r.id}/`),
  ];
  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...paths.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`),
      '</urlset>',
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
