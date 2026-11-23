# Product vision

The contract: what the site is, for whom, and the rules every page keeps. Decided points are marked
(owner); the rest is proposed — a proof of concept for the owner's wife to judge. Her verdict
starts the real spec, in stages ([workflow.md § Feature](workflow.md#feature)); the open decisions
are in [backlog.md](backlog.md).

## What it is

**A family cookbook** (owner) — the recipes the family has cooked or wants to cook, written down so
that one day you can pick something: like the recipe notebooks kept by hand in the old days.
Dinners, soups, breakfasts, desserts (fruit ones too), snacks for guests. Working name
**Nasza kuchnia** (`SITE_NAME`), at `kuchnia.jakub.page`; the name is the owners' to settle.

**Who runs it** (owner): the owner's wife, day to day. Neither she nor the owner edits Markdown by
hand — how recipes get in is the first open decision
([research/cms.md](research/cms.md)).

**What it does that a notebook doesn't:**

- **„Co mam w domu?”** (owner) — tick the products at home (several at once), pick a meal, and the
  list keeps the recipes that use them, the fewest missing first, each saying what's missing.
  Salt, pepper, oil, water and sugar count as always at home; an optional extra (a garnish, a
  topping) never counts as missing.
- **A recipe page that is the recipe** — the facts to choose by, the ingredients per part of the
  dish, the steps; ticking an ingredient crosses it out; prints on paper.
- **The family's verdicts** (owner, to be shaped) — how hot it is, whether the children liked it,
  how long it takes.

## Who it's for

The family and their friends, adults and children alike, on a phone in the kitchen with wet
hands, on a tablet, at a desk choosing the week's dinners. Normal sizes that scale with the
browser, high contrast, words on every control, a 44 px target
([styling.md § Ground rules](standards/styling.md#ground-rules--the-floor)).

## Principles

- **The recipe first.** Nothing between the title and the ingredients that a cook doesn't need on
  the day: no story, no "why I love this dish". Notes come after the steps.
- **The family's recipes.** Every amount and step is the family's own, or a draft the family asked
  for: a recipe found on the web, rewritten fresh (never copied), marked „Do sprawdzenia”
  (`status: szkic`) with its sources named until the family cooks and corrects it.
- **A notebook, not a magazine.** No ads, no shop, no affiliate links, no brands, no health or
  diet claims, no calorie counts unless the owners ask.
- **Static, private.** Every page is built ahead; the finder runs in the browser on what's on the
  page and keeps the choice in the URL (`?mam=jajka,chleb&posilek=sniadanie`), so it can be sent.
  Nothing a visitor ticks leaves their device. The page is complete without scripts: the list
  shows every recipe.
- **Polish only**, Polish slugs (`/przepisy/zupa-pomidorowa/`). Docs and code stay English.
- **Light theme only** (owner) — a dark one if the owner's wife wants it.

## The recipe file

One Markdown file per recipe, `src/content/recipes/<slug>.md`; the schema in
`src/content.config.ts` fails the build on a missing or wrong field. It holds the title, a
one-sentence summary, the meals (`categories`: sniadanie, obiad, zupa, kolacja, deser, przekaska —
several allowed), the status (`szkic`, `sprawdzony`), servings, time (hands-on and total minutes),
optionally the heat (`spice`, 0–3) and the children's verdict (`kids`: tak, tak-sobie, nie), the
ingredients and the steps — each a list of sections, one per part of the dish (the cutlet, the
potatoes, the salad) — and the sources. An ingredient has a name, optionally an amount, a unit, a
note, the `product` the finder knows it by (the name when absent) and `optional`. The body holds
the family's notes.

## The recipe page

Top down: back to the list and „Drukuj przepis”, across the page; the title; a draft's mark; the
summary; the facts (meal, time, servings, heat, children) in a card; **Składniki**, a checklist
per section; **Przygotowanie**, numbered per section; **Uwagi**; **Na podstawie** (the sources).
From 64rem two columns from the top (owner): the title, the steps, the notes and the sources on
the left; the facts card and the ingredients on the right, kept in view while the steps scroll
when they fit the window. Printed: the title, the facts, the ingredients
and the steps.

## Site map

| Page          | URL                 | Holds                                                        |
| ------------- | ------------------- | ------------------------------------------------------------ |
| Strona główna | `/`                 | What it is in a sentence; the call to the finder; meals      |
| Przepisy      | `/przepisy/`        | „Co mam w domu?” and every recipe A–Z                        |
| A recipe      | `/przepisy/<slug>/` | § The recipe page                                            |
| O stronie     | `/o-stronie/`       | Whose recipes and where the drafts come from                 |
| Prywatność    | `/prywatnosc/`      | What the host sees of a visit; nothing collected, no cookies |

The menu and footer come from `src/shared/pages.ts`. `robots.txt` lets every crawler in;
`sitemap.xml` lists every page; a recipe carries schema.org `Recipe` data (JSON-LD).
