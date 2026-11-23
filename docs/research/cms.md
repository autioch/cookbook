# Getting recipes in without Markdown — proposals (2026-11)

Input for the first decision ([backlog.md § Now](../backlog.md#now--her-first-look)), not a rule.
The question: how does the owner's wife add and edit a recipe, with neither her nor the owner
touching Markdown, on a static site with no server?

**Verdict: no admin panel of our own.** Every proposal below writes recipe files to the repo; the
site stays static, its CSP and [trust model](../standards/security.md#trust-model) unchanged.

## 1. Send it to the agent — works today (recommended now, and for the old notebooks)

She sends a recipe the way she has it: typed text, a photo of a notebook page, a link, a voice note
written out. The owner pastes it into a Claude session ("Dodaj przepis: …"); the agent writes the
file (amounts, steps, products for the finder), opens a PR, and its deploy preview shows the page.
She looks; "merge" publishes it. Corrections the same way ("w schabowym 4 jajka, nie 2").

- **For:** nothing to set up or learn; handles messy input (a photographed page); the agent keeps
  the format and the finder's products consistent.
- **Against:** goes through the owner and a session; minutes to hours, not instant.

## 2. Pages CMS — a form she fills herself (try next)

A hosted, open-source editor for files in a GitHub repo
([docs](https://pagescms.org/docs/)). She's invited **by e-mail, no GitHub account**
([collaborators](https://pagescms.org/docs/configuration/collaborators/)), opens
app.pagescms.org, sees „Przepisy”, edits or adds one in a form (title, summary, meals, servings,
times, ingredients, steps, notes); saving commits the file and Netlify publishes it in a minute or
two.

- **Set-up:** the owner installs the Pages CMS GitHub App on `autioch/cookbook` and invites her;
  the agent writes `.pages.yml` (the form, from `src/content.config.ts`).
- **Open, settled by a trial:** the docs show lists of objects but no list inside a list
  ([list](https://pagescms.org/docs/configuration/content/list/)) — our ingredients are sections
  of items. If the form can't, the model flattens (each ingredient names its part of the dish).
  Also untested: use on a phone; its pricing (open source, self-hostable, the hosted app's terms
  unstated).
- **For:** she's independent; edits are git commits (history, undo).
- **Against:** a third-party app with write access to the repo; her saves go to `main` (a broken
  file fails the build and the old site stays up) unless we route them through a branch; a form is
  slower than typing for a long recipe.

## 3. A Google Form — an alternative to 2, if a form suits her but Pages CMS doesn't

She fills a Google Form („Nowy przepis”) on her phone; answers land in a Sheet; the agent turns
new rows into files and a PR. Needs the session's Google Drive access and the owner to trigger it.
Good for new recipes, poor for editing an existing one — that goes back to 1.

## 4. A form on our own site — only if it must be on `kuchnia.jakub.page`

Asked by the owner: a form on the site itself, Firebase or the like. The ease she gets comes from
what she has to type, not from where the form lives — a form with fields is the same work in Pages
CMS, Decap or one we build.

| Option                                         | How                                                                                                                                                     | Cost to us                                                                                                                                                                                         | Verdict                                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **„Wklej cokolwiek”**: our `/dodaj/` form + AI | She pastes text, a link or a photo of a notebook page; a Netlify Function asks Claude to fill the recipe file and opens a PR; she gets the preview link | The site's first server code: a function, an API key, a login and abuse limits, cents per recipe. Needs the owner's OK (CLAUDE.md: static, no server) and a Feature spec with a threat model first | **The one that truly saves her typing** — option 1 automated; build it only once 1 shows what she sends |
| Decap CMS at `/admin/` + DecapBridge           | A form on our domain; invited by e-mail, no GitHub account ([Decap #7419](https://github.com/decaporg/decap-cms/discussions/7419)); saves to the repo   | A config file; a looser CSP on `/admin/` only; login through a small third-party service; dated UI, weak on a phone                                                                                | Possible, if our domain is a must                                                                       |
| TinaCMS + TinaCloud                            | Visual editing over the page preview ([Astro docs](https://docs.astro.build/en/guides/cms/tina-cms))                                                    | React and its own build step; free for 2 users per a review, not confirmed by Tina                                                                                                                 | Too heavy for one editor                                                                                |

## Not recommended

| Option                                                           | Why not                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Firebase, Supabase or another hosted database + our own form** | Nothing easier for her (the same fields to fill), and the recipes leave git. The site then reads them either in the browser (the Firebase SDK, ~100 KB against a 10 KB script budget; recipes invisible to search and print without a script; the CSP opened to Google) or at build time (a rebuild after each save needs Cloud Functions, Blaze plan only, a payment card: [Firebase pricing](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans); a scheduled rebuild costs build minutes and lags). No history or undo, backups our job, and the form, editing and validation ours to build |
| Sveltia CMS at `/admin/`                                         | Its authenticator covers GitHub and GitLab only: she'd need an account ([sveltia-cms-auth](https://www.github.com/sveltia/sveltia-cms-auth))                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Decap + Netlify Identity / Git Gateway                           | Git Gateway is deprecated by Netlify ([changelog](https://www.netlify.com/changelog/deprecation-netlify-identity/); Identity's deprecation reportedly reversed in 2026, [forum](https://answers.netlify.com/t/netlify-identity-is-staying-feb-2026-reversal-what-changed-whos-affected-and-how-to-proceed/162733))                                                                                                                                                                                                                                                                                                   |
| An admin panel of our own (login, database, functions)           | Server code, accounts, secrets and the Netlify Functions quota — the most to build and secure, for one editor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

**Recommendation:** 1 now. If she likes it, automate it as „Wklej cokolwiek” (4) — the owner
decides, then a Feature spec. Pages CMS (2) as the form if she wants to type herself; Decap (4) only
if the form must be on our domain; 3 as a fallback. Firebase: no. Her doc lists 1–3; 4 joins it
once the owner decides.
