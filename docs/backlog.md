# Backlog

The one source of truth for future work (owner): every agreed idea, open decision and owner step.
**One group is "Now"** — the one the work is on; the rest wait in the order shown. Delete an item
when its PR merges or the owner has done it; a new idea is added once the owner agrees it.
Not yet agreed: [research/ideas.md](research/ideas.md).

## Now — her first look

The proof of concept is for the owner's wife to judge (owner: experiment first, spec after, in
stages). What her verdict decides, each with a recommendation:

- **How recipes get in** — the proposals, in the order to try: [research/cms.md](research/cms.md).
  Recommended: send to the agent now (works today, and for the old notebooks); if she likes it,
  automate it as „Wklej cokolwiek” on our site (server code — owner to decide; her doc gets it
  after); Firebase rejected. Pages CMS tried
  next (the owner installs its GitHub App; the agent writes `.pages.yml`; a trial shows whether
  its form handles ingredients in sections, else the model flattens). Then: her edits straight to
  `main`, or through a PR the owner merges.
- **What a recipe holds** — which of the facts stay (heat, children's verdict, time, servings),
  what's missing (a photo, a difficulty, a log of when it was cooked, tags beyond meals).
- **The finder** — whether ticking products works for her; what counts as always at home
  (now: sól, pieprz, olej, woda, cukier). With 26 recipes the list has 90 products, a long
  scroll on a phone: a typed box, or grouping (warzywa, nabiał, mięso), is due.
- **Versions of one dish** — the family's links repeat a dish from different sites (cashew cheese:
  Olga Smile, Ervegan). Recommended: one page per dish with a section per version (as Dżem
  wiśniowy does now); the other way is separate pages that link each other.
- **The look** — the notebook idea (paper, fountain-pen blue, a red margin), the font, the name
  „Nasza kuchnia”.
- **Whose site it says it is** — the footer and Prywatność name the owner (`AUTHOR`); she runs it.
  Her name too, hers alone, or a family name.
- **Competitors** — compared in [research/comparison.md](research/comparison.md); she picks rows
  on a temporary page on a deploy preview, and her summary comes back here.

## Later

- **A knowledge base** (owner) — techniques, substitutions, kitchen measures; sourced.
- **A shopping list** (owner) — several recipes summed into one list; tinctures' Lista zakupów is
  the model.
- **Scaling to servings** — needs units with fixed names (tinctures' `scale.ts`).
- **The drafts cooked and corrected** — all 26 recipes are web drafts (`status: szkic`,
  [sources.md](sources.md)); the family corrects amounts and estimated servings and adds heat and
  the children's verdict once cooked.
- **A dark theme** — only if she wants it (owner).

## Owner

Steps only the owner can take, when they choose.

- **Send your wife https://kuchnia.jakub.page/wybor/**: what's on the site, the decisions,
  the comparison's rows and the ideas, each with an answer to tick and a note, and a box for her
  own ideas. It remembers her answers on her phone; „Wyślij Kubie” sends you the summary. Paste
  it to the agent: the answers come back into this backlog and the page is removed.
- **Paste the recipes the agent couldn't use** from your list:
  - Ervegan, [twarożek z nerkowców](https://ervegan.com/2015/01/idealny-twarozek-z-orzechow-nerkowca/):
    the site blocks bots (captcha). It becomes the second version of Ser z nerkowców.
  - Joe Monster, [kurczak jak z KFC](https://joemonster.org/art/37126/Jak_w_domu_zrobic_kurczaka_dokladnie_takiego_jak_z_KFC):
    the site blocks bots (403).
  - Winiary, [sorbety i lody](https://www.winiary.pl/porady/sorbety-i-lody-domowe-idealne-na-lato/):
    an article with four recipes, most without amounts (the sorbet has no fruit weight). Which one,
    and a page with amounts?
  - Wikipedia, [Arancini](https://pl.wikipedia.org/wiki/Arancini): a description with no amounts.
    A recipe page for it is needed.
  - Magiczny Składnik, [frytki](https://magicznyskladnik.pl/magazyn/jak-smazyc-frytki-test-10-odmian-ziemniakow-i-7-metod-smazenia/):
    a test of methods, with no potato amounts. Material for the knowledge base, not a recipe.
  - Skipped: the second Joe Monster link is a joke article, not a recipe; the surimi salad link
    was in the list twice and became one recipe.
- **Repo settings** as on `tinctures`: Dependabot security updates on; the npm auto-triage preset
  for development alerts.
- **Netlify**: confirm the build settings in the UI are empty (`netlify.toml` holds them) and HTTPS
  is forced on `kuchnia.jakub.page`. Turn off the Netlify Drawer on deploy previews (Project
  configuration → Build & deploy → Deploy Previews): it injects `/.netlify/scripts/` into preview
  pages, which the CSP blocks; production must have none (architecture.md § Hosting).
