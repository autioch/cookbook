# Architecture

What the repo is and where things live. [development.md](development.md) owns conventions and
commands; [security.md](security.md) the posture; [docs/vision.md](../vision.md) the product;
[styling.md](styling.md) the look.

## Layout

Feature folders: the site shell every page shares (`shared/`, with the styles), then one folder
per page area (`recipes/`). Each component is a folder: its `.astro`, its `.css` and, when it
has behaviour, its DOM script (`kebab-case.ts`), its logic in a plain module beside it with a
`.test.ts`.

```text
src/
├─ content/recipes/      # one Markdown file per recipe (vision.md § The recipe file)
├─ content.config.ts     # the recipes' schema: the build fails on a wrong file
├─ pages/                # routes only: index, przepisy/ (the list, [slug] a recipe), o-stronie,
│                        # prywatnosc, 404; endpoints robots.txt.ts, sitemap.xml.ts,
│                        # .well-known/security.txt.ts
├─ recipes/              # RecipePage, RecipeList, Finder (match.ts its logic, finder.ts the page);
│                        # labels.ts (meals, heat, statuses and amounts in Polish), recipes.ts
│                        # (the collection A–Z, a recipe's products), jsonLd.ts
└─ shared/               # the site shell: styles.css (tokens, reset, base), fonts.css, consts.ts
                         # (AUTHOR, SITE_NAME), pages.ts (menu, footer, sitemap), slug.ts,
                         # typeset.ts (no-break spaces, also in Markdown); PageLayout, SiteHeader,
                         # SiteFooter, PrintButton
public/                  # favicon.svg, apple-touch-icon.png, og.png
design/                  # never published: the icon's source and icons.mjs, which renders the PNGs
scripts/                 # never published: check-repo; on dist/ the gate's check-* (shared helpers and
                         # ORIGIN in dist.mjs); a11y (CI; browser.mjs drives the browser); live-* (weekly)
astro.config.mjs         # site (ORIGIN from dist.mjs), trailing slashes, build options
netlify.toml             # build, the Netlify host's redirect, security headers
docs/                    # agent docs, the vision, research — never published
```

## Rendering

- **Astro, static output.** `npm run build` writes `dist/`; no adapter, no on-demand rendering, no
  server code — a Netlify Function is a last resort, agreed with the owner first.
- **Scripts:** two, each our TypeScript module in an Astro `<script>`, bundled to `_astro/*.js`
  (`assetsInlineLimit: 0` keeps it out of the page): the print button and the list's finder. No
  UI framework. **The markup is complete without them:** the list shows every recipe, and a
  control that needs a script is hidden until it runs (the finder's `hidden`, the print button's
  `@media (scripting: none)`). A recipe's ticked ingredients are CSS (`:has(:checked)`).
- **Styles:** tokens, reset and base rules in `src/shared/styles.css`; component styles beside
  their markup. No inline `<style>` — `inlineStylesheets: 'never'` keeps CSS in a file the CSP
  allows; one bundled stylesheet (`cssCodeSplit: false`).
- **Fonts:** Atkinson Hyperlegible Next (from tinctures; the owner's wife may pick another), self-hosted from
  `@fontsource-variable/atkinson-hyperlegible-next`, latin and latin-ext only, both preloaded —
  it tells I, l and 1, O and 0 apart, which amounts need. Never a font CDN.
- **URLs:** every page a folder with a trailing slash (`trailingSlash: 'always'`), Polish slugs
  without diacritics (`/przepisy/zupa-pomidorowa/`); a recipe's slug is its file name.
- **Language:** Polish (`lang="pl"`, `og:locale` `pl_PL`). Docs, code and comments stay English.
- **Theme:** light only, regardless of the OS scheme (`color-scheme: light`).

## Browsers

**The current stable Chrome, Edge, Firefox and Safari (macOS and iOS)**. Astro's default build
target; nothing lowered, polyfilled or given a fallback. A CSS or JS feature is fine once all four
ship it (Baseline "newly available" — ESLint's `css/use-baseline` enforces it for CSS). An
iPad stuck on an old iOS is the case to watch in the drive.

## State ownership

| State                   | Owner                                                  |
| ----------------------- | ------------------------------------------------------ |
| Product scope and rules | `docs/vision.md`                                       |
| Recipes                 | `src/content/recipes/`, schema in `content.config.ts`  |
| Pages, menu, sitemap    | `src/shared/pages.ts`                                  |
| Site origin             | `scripts/dist.mjs` `ORIGIN`                            |
| Headers, CSP, build     | `netlify.toml`                                         |
| Dependency versions     | `package.json` + `package-lock.json`; Node in `.nvmrc` |
| DNS record `kuchnia`    | Netlify DNS zone `jakub.page`                          |

## Hosting

- **Netlify project** `qb-cookbook` (id `5fa2a664-5679-46a2-89c1-7c193feaf990`), deploying `main`
  from `autioch/cookbook`; every PR gets a deploy preview
  (`deploy-preview-N--qb-cookbook.netlify.app`). Build settings come from `netlify.toml`; the UI
  holds none.
- **Domain** `kuchnia.jakub.page`, the primary domain; `qb-cookbook.netlify.app` 301s
  to it (`netlify.toml`). `jakub.page` uses Netlify DNS, so the record lives in that zone — never
  at the registrar. HTTPS: Let's Encrypt via Netlify, forced.
- **Caching, no service worker.** `/_astro/` is content-hashed and cached a year (`immutable`); a
  page revalidates.
- **Nothing injected into production HTML** — no badge, no snippets, form detection off.

## Design goals

Little to maintain: few dependencies, built-ins first, one place per fact. Nothing in
`node_modules` reaches the browser, so only a security fix to a production dependency forces a
change.
