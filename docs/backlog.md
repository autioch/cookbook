# Backlog

The one source of truth for future work (owner): every agreed idea, open decision and owner step.
**One group is "Now"** — the one the work is on; the rest wait in the order shown. Delete an item
when its PR merges or the owner has done it; a new idea is added once the owner agrees it.
Not yet agreed: [research/ideas.md](research/ideas.md).

## Now — her first look

The proof of concept is for the owner's wife to judge (owner: experiment first, spec after, in
stages). What her verdict decides, each with a recommendation:

- **How recipes get in** — Pages CMS (a hosted form, she's invited by e-mail, no GitHub account;
  recommended to try) · the agent writes them from what she sends (works today) · an editor on
  our own site · a panel of our own (no): [research/cms.md](research/cms.md). Then: her edits
  straight to `main`, or through a PR the owner merges.
- **What a recipe holds** — which of the facts stay (heat, children's verdict, time, servings),
  what's missing (a photo, a difficulty, a log of when it was cooked, tags beyond meals).
- **The finder** — whether ticking products works for her; what counts as always at home
  (now: sól, pieprz, olej, woda, cukier); a typed box once the list grows.
- **The look** — the notebook idea (paper, fountain-pen blue, a red margin), the font, the name
  „Nasza kuchnia”.
- **Competitors** — the sites she and the owner use; then a comparison in `docs/research/`.

## Later

- **A knowledge base** (owner) — techniques, substitutions, kitchen measures; sourced.
- **A shopping list** (owner) — several recipes summed into one list; tinctures' Lista zakupów is
  the model.
- **Scaling to servings** — needs units with fixed names (tinctures' `scale.ts`).
- **The four drafts cooked and corrected** — Schabowy, Zupa pomidorowa, Tosty francuskie,
  Szakszuka are web drafts (`status: szkic`).
- **A dark theme** — only if she wants it (owner).

## Owner

Steps only the owner can take, when they choose.

- **Show the deploy preview to your wife** and note what she says — in chat, or here.
- **Send the sites you both use** for recipes, for the comparison.
- **Repo settings** as on `tinctures`: Dependabot security updates on; the npm auto-triage preset
  for development alerts.
- **Netlify**: confirm the build settings in the UI are empty (`netlify.toml` holds them) and HTTPS
  is forced on `kuchnia.jakub.page`.
