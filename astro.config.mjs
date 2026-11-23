// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import { defineConfig } from 'astro/config';
import { ORIGIN } from './scripts/dist.mjs';
import { typesetPlugin } from './src/shared/typeset.ts';

export default defineConfig({
  site: ORIGIN,
  // Every page is a folder (/przepisy/szakszuka/), the same URL Netlify serves without a redirect.
  trailingSlash: 'always',
  // Markdown gets the no-break spaces the templates get from typeset() (polish-copy § Typography).
  markdown: {
    // Polish quotes are typed („…”), never made from straight ones.
    processor: satteri({
      hastPlugins: [typesetPlugin],
      features: { smartPunctuation: false },
    }),
  },
  build: {
    // The CSP allows stylesheets from 'self' only — never inline <style>.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // One stylesheet: split per page it'd come as several small files in no fixed order.
      cssCodeSplit: false,
      // Never inline an asset as a data: URL or a script into the page — the CSP blocks both.
      assetsInlineLimit: 0,
    },
  },
});
