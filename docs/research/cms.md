# Editing without Markdown — options (2026-11)

Input for the first decision ([backlog.md](../backlog.md)), not a rule. The question: how does the
owner's wife add and edit a recipe without touching Markdown, on a static site with no server?

**Verdict: viable without an admin panel of our own.** No login, no accounts and no server code on
the site: either a hosted editor that writes the recipe files to the repo, or the agent writing
them from what she sends. Both keep the site static and the CSP as it is.

| Option                                                                        | How she edits                                                                        | Cost to the site                                                                                                     | Verdict                                                                  |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Pages CMS** (hosted, open source; `.pages.yml` in the repo)                 | A form on app.pagescms.org; invited **by e-mail, no GitHub account** (collaborators) | None: a config file. A GitHub App with write access to this repo; her edits are commits (CI and Netlify run on them) | **Recommended to try first**                                             |
| **Agent writes it** (she sends text, a photo of a page, a link, a voice note) | Through the owner, or a chat session; the agent writes the file and opens a PR       | None                                                                                                                 | Works today; the fallback, and the way for bulk entry from old notebooks |
| Sveltia / Decap CMS at `/admin/`                                              | A form on our own site                                                               | A page loading a large script, a CSP opening `connect-src` to GitHub, an OAuth provider; she needs a GitHub account  | Possible, more to run and secure                                         |
| Decap + Netlify Identity / Git Gateway                                        | A form on our own site, e-mail login                                                 | Git Gateway is deprecated by Netlify (Identity's 2025 deprecation reportedly reversed in 2026; Git Gateway's not)    | No                                                                       |
| An admin panel of our own (login, database, functions)                        | Our own forms                                                                        | Server code, accounts, secrets, Netlify Functions quota                                                              | No — the most to build and secure for one editor                         |

**Open for the spec:** with Pages CMS, commits by a collaborator carry no name by default; whether
her edits go straight to `main` (CI and Netlify check them; a broken file fails the build and the
old site stays up) or through a branch the owner merges. Photos (uploads) — size limits and the
page weight budget.

Sources: [Pages CMS — Collaborators](https://pagescms.org/docs/configuration/collaborators/) ·
[Netlify — Deprecation of Netlify Identity](https://www.netlify.com/changelog/deprecation-netlify-identity/) ·
[Netlify forum — Identity is staying (Feb 2026)](https://answers.netlify.com/t/netlify-identity-is-staying-feb-2026-reversal-what-changed-whos-affected-and-how-to-proceed/162733) ·
[Decap discussion #7419](https://github.com/decaporg/decap-cms/discussions/7419) ·
[Sveltia CMS](https://github.com/sveltia/sveltia-cms)
