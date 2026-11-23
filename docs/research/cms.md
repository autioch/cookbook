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

## Not recommended

| Option                                                 | Why not                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sveltia or Decap CMS at `/admin/`                      | A large script on our own site, the CSP opened to GitHub, an OAuth provider to run; she'd need a GitHub account                                                                                                                                                                                                    |
| Decap + Netlify Identity / Git Gateway                 | Git Gateway is deprecated by Netlify ([changelog](https://www.netlify.com/changelog/deprecation-netlify-identity/); Identity's deprecation reportedly reversed in 2026, [forum](https://answers.netlify.com/t/netlify-identity-is-staying-feb-2026-reversal-what-changed-whos-affected-and-how-to-proceed/162733)) |
| An admin panel of our own (login, database, functions) | Server code, accounts, secrets and the Netlify Functions quota — the most to build and secure, for one editor                                                                                                                                                                                                      |

**Recommendation:** 1 now; trial 2 once she's seen the site; 3 only if she wants a form and 2
fails.
