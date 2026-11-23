import type { satteri } from '@astrojs/markdown-satteri';
import { slug } from './slug.ts';

/**
 * No-break spaces where Polish typesetting wants them: between a number and the word or unit after
 * it, so "95 %", "250 ml" or "9 dniach" never splits a line; after "ok."; and after a one-letter
 * word (a, i, o, u, w, z), so it never ends one (polish-copy § Typography).
 */
export function typeset(text: string): string {
  return text
    .replace(/(\d) (?=[%\p{L}])/gu, '$1\u00a0')
    .replace(/\bok\. (?=\d)/g, 'ok.\u00a0')
    .replace(/(?<=^|\s|\()([aiouwzAIOUWZ]) /g, '$1\u00a0');
}

type HastPlugin = NonNullable<NonNullable<Parameters<typeof satteri>[0]>['hastPlugins']>[number];

/**
 * The same in Markdown: a Sätteri hast plugin over every text node (astro.config.mjs). It also
 * gives each heading its id from slug(), so "Owoce z zamrażarki" is #owoce-z-zamrazarki — before
 * Astro's own ids, which would drop the no-break space and read "owoce-zzamrażarki".
 */
export const typesetPlugin = {
  name: 'typeset',
  text(node, ctx) {
    const value = typeset(node.value);
    if (value !== node.value) {
      ctx.setField(node, 'value', value);
    }
  },
  element: {
    filter: ['h2', 'h3', 'h4', 'h5', 'h6'],
    visit(node, ctx) {
      if (node.properties.id === undefined) {
        ctx.setProperty(node, 'id', slug(ctx.textContent(node)));
      }
    },
  },
} satisfies HastPlugin;
