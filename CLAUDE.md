# CLAUDE.md — Agent Instructions for cookbook

Always-loaded. It tells you **what to do when, and what to read first**; match the request to a row
in the routing table below and follow that path. One skill: `polish-copy`, for every Polish text the
site shows.

## What this is

**Nasza kuchnia** (working name) — the family's own cooking recipes in Polish, a home notebook
made a site, at **kuchnia.jakub.page**: dinners, soups, breakfasts, desserts, snacks for guests; a
page per recipe that **is the recipe**, and a finder for "what can I make from what's at home".
The owner's wife runs it and decides what it becomes; readers: family and friends. The product contract is [docs/vision.md](docs/vision.md).
Stack: **Astro (static output) · TypeScript, no UI framework · npm · Netlify** — no server code
([architecture.md § Rendering](docs/standards/architecture.md#rendering)).
The config, gate scripts and process come from the owner's `autioch/tinctures` (itself from
`autioch/card-game-almanac`); the site's own code and look go their own way. Every change ships to
a production standard.

**Status: experiment first (owner)** — a proof of concept for the owner's wife to judge; her verdict
starts the real spec ([backlog.md](docs/backlog.md)). After a break → [workflow.md § Returning](docs/workflow.md#returning).

## Working style

- Short, concise, direct. Cut filler; don't sugar-coat.
- **Vet every request against industry standards, security, and common sense; push back hard when it
  fails.** The owner relies on this — it's the job, not a courtesy. When a request is wrong, unsafe, or has
  a clearly better option, **lead with the objection, the evidence, and the better option, then
  wait**. "Don't build this" is a valid outcome. Bluntness must be earned by evidence, not opinion.
  If it passes, proceed.
- **Decide vs. ask — by reversibility × blast radius.** Don't stop on every unknown. **Reversible,
  low-blast** (naming, layout, a local refactor): pick the sensible default, act, note it. **Always
  ask** when it's **irreversible or high-blast** — deleting or overwriting user data, security,
  anything **leaving the machine** (push, deploy, send, publish), or money.
  A recurring ask becomes a codified default or an automated check, not a standing prompt.
  **Codified:** every change ends in a PR — push the branch, open it as a **draft** so the owner can
  look (diff, deploy preview); "merge" from the owner → mark it ready, CI merges on green
  ([workflow.md § Close-out](docs/workflow.md#close-out)). All of it runs without asking. Asked to
  merge right away → open it ready.
- **Trust these instructions.** When a detail is missing, search **narrowly** for that one thing —
  don't re-explore the repo. The "Read first" column is the whole reading list for a path.
- **Ask with options.** When you do stop, offer multiple choice with your recommendation first, and
  record the answer where the work lives — not only in chat.
- After git actions, report the result in **one line** — no summaries or next-step suggestions
  unless asked.
- **Durable rules live in the repo, not memory.** A convention that must hold across sessions belongs
  in tracked markdown, never only in agent memory.

## What to do when

Match the request to the **first row that fits**, then follow that path in
[workflow.md](docs/workflow.md). When two rows fit, **take the heavier one** — a change escalates
mid-flight, it doesn't balloon in place.

| The request is…                                                                               | Path                                                                                                                                             | Read first                                                                                                    |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **A question** — "how does X work", "where is Y"                                              | Answer it. No branch, no commit.                                                                                                                 | only the files in question                                                                                    |
| **An unproven idea** — "can we…", "would it work if…", anything with a real feasibility doubt | [**Investigate**](docs/workflow.md#investigate) — de-risk, give a verdict, **don't build**. "No" is a win.                                       | whatever the question needs                                                                                   |
| **A trivial edit** — wording, a config value, a pointer fix; no code, no judgment             | [**Direct**](docs/workflow.md#direct) — edit → gate → branch → PR                                                                                | just the file                                                                                                 |
| **A bug**                                                                                     | [**Fix**](docs/workflow.md#fix) — reproduce it **observed broken** first, then fix                                                               | [development.md § Testing](docs/standards/development.md#testing) + the code at fault                         |
| **A bounded change** — one behavior: a copy/style edit, a header, a config change             | [**Bounded**](docs/workflow.md#bounded) — pin the edges → branch → build → verify → close out                                                    | [development.md](docs/standards/development.md) + the source it touches                                       |
| **A real feature** — a new page, a build step, any script, or open product questions          | [**Feature**](docs/workflow.md#feature) — agree a spec → ordered plan → build step by step → review → reconcile → close out                      | [architecture.md](docs/standards/architecture.md) + [development.md](docs/standards/development.md)           |
| **"Review this" / "is this safe"**                                                            | [**Review pass**](docs/workflow.md#the-review-pass) — findings only; don't fix unless asked                                                      | [security.md](docs/standards/security.md) + [development.md § Testing](docs/standards/development.md#testing) |
| **Docs drifted**, or you just changed code                                                    | [**Sync**](docs/workflow.md#sync) — the doc-sync map decides which docs                                                                          | [development.md § keeping docs in sync](docs/standards/development.md#keeping-docs-in-sync)                   |
| **Recipe content** — a new recipe, a fact, a safety line; any visitor-facing text             | **Bounded** — `src/content/recipes/<slug>.md` + [sources.md](docs/sources.md), per [vision.md § The recipe file](docs/vision.md#the-recipe-file) | [vision.md](docs/vision.md) + the sources + `.claude/skills/polish-copy/SKILL.md`                             |
| **A cleanup** — "porządki w kodzie", "uprość kod", "clean up the code"                        | [**Cleanup**](docs/workflow.md#cleanup) — run the on-demand checks, report findings, fix what the owner picks                                    | [development.md](docs/standards/development.md)                                                               |
| **Reusing something from `autioch/tinctures` or `autioch/card-game-almanac`**                 | **Bounded** or **Feature** by size — copy the file (`gh api …/contents/<path>`), adapt it to this site                                           | that file + [architecture.md](docs/standards/architecture.md)                                                 |

**Two reads are conditional, on every path:** touch anything visual →
[styling.md](docs/standards/styling.md); touch headers, redirects, a third-party origin, client
storage or secrets → [security.md](docs/standards/security.md).

**Before you verify anything, read [development.md § Testing](docs/standards/development.md#testing).** It is the testing source of
truth — what to check, how, and the traps that make a check pass without exercising anything.

**"What's next?"** → [backlog.md](docs/backlog.md), the agreed queue and the owner's steps; work
agreed in chat goes there, and leaves when its PR merges. Ideas not yet agreed, other sites
compared: [docs/research/](docs/research/) — input, not rules.

## Always, whatever the path

- **The gate is green before every commit** — `npm run ci`. CI re-runs
  it on every PR and push to `main`. Never leave the tree broken.
- **Docs ship with the change.** Code or config changes update the affected prose in the **same
  commit** — never a tree where docs contradict code. Which docs: the
  [doc-sync map](docs/standards/development.md#keeping-docs-in-sync).
- **Claims trace to evidence.** A green gate alone is not "verified". Say what you ran and what it
  showed; say plainly what is still owed. **Flag it owed, never fake it.**
- **Docs you author obey the doc bar** — short, blunt, **pointer-first**: state the **current**
  behavior and **why** — the argument, never the history (that's `git log`; an owner's decision is
  marked `(owner)`, never dated), never research notes,
  never a speculative future (future work lives only in [backlog.md](docs/backlog.md)) — and
  **link the doc that owns a rule instead of restating it**. Loaded docs are paid context: this file stays **≤ 175 lines** and stays a router; each
  standards doc stays **≤ 350**.
- **Production quality is the floor**, not "good enough for now". WCAG AA, keyboard-complete,
  responsive from 320 px is the binding baseline for UI work — **for any reader, in a kitchen**:
  normal sizes that all scale with the browser's zoom and text size, AAA text contrast, words on
  every control
  ([styling.md § Ground rules](docs/standards/styling.md#ground-rules--the-floor)). **Polish only,
  light theme** (owner; dark maybe later): visitor-facing text in Polish; docs and code stay English.
- **A family notebook, not a magazine.** No ads, no selling, no brands, no health or diet
  claims ([vision.md § Principles](docs/vision.md#principles)).
- **Static, no server.** Every page is built ahead; a script only works on what's on the page.
  A Netlify Function eats the Free plan's hard quota — only as a last resort, **confirmed by the
  owner** first. What a visitor types never leaves their device; an origin the page talks to,
  client storage or a third-party script changes the
  [trust model](docs/standards/security.md#trust-model) — rewrite it first.
- **Recipes are the family's.** An amount or step comes from the family or from a draft the
  family asked for (status `szkic`, its sources named); never invented; text is written fresh,
  never copied from another site or a book ([vision.md § Principles](docs/vision.md#principles)).
- **Scripts are our own TypeScript modules**, bundled into `_astro/` — no UI framework, nothing inline.
- **Native first:** no tool or dependency where a built-in (Node, npm, Astro, the platform) meets
  every requirement. Versions exact, each ≥ 2 weeks old:
  [development.md](docs/standards/development.md#conventions).
- **The current stable Chrome, Edge, Firefox and Safari (macOS, iOS)** — nothing older, no
  polyfills, no fallbacks ([architecture.md § Browsers](docs/standards/architecture.md#browsers)).

## Commands

| Command                              | Purpose                                                                                                                                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                             | Install exactly what `package-lock.json` pins                                                                                                                                                               |
| `npm run ci`                         | The gate: format → lint → knip (dead code) → `check:repo` (pinned actions, exact versions, secrets) → `check:types` → tests → build → `check:html`, `check:css`, `check:csp`, `check:links`, `check:weight` |
| `npm run fix`                        | ESLint autofix, then Prettier — run before the gate                                                                                                                                                         |
| `npm run dev`                        | Local preview :4321 (`.claude/launch.json` → `site`)                                                                                                                                                        |
| `npm run a11y`                       | Accessibility over the build (CI runs it too); `BROWSER=<path>` picks the browser                                                                                                                           |
| `npm run live:links`, `live:headers` | Against the network, weekly in CI: every external link; the live site's headers against `netlify.toml` (`-- <URL>` for a deploy preview)                                                                    |

## Git

One branch per unit of work, never a commit straight to `main`; push at close-out and open a draft
PR; "merge" → mark it ready, CI merges on green. **One rule for GitHub, every session:** plain
`git` for commits and push; for PRs and other GitHub calls, **`gh` where it's installed** (the
desktop app), **else the session's built-in GitHub tools** (claude.ai/code cloud, which has no
`gh`). No GitHub MCP server in `.mcp.json` and no GitHub token to keep (owner). Mechanics: [workflow.md § Committing](docs/workflow.md#committing).

## Hosting

Netlify project `qb-cookbook` runs `npm run build` and publishes `dist/` from `main` —
[netlify.toml](netlify.toml) holds the build, the redirect and the security headers. Production:
`https://kuchnia.jakub.page` (canonical; `qb-cookbook.netlify.app` redirects). Site and domain: [architecture.md § Hosting](docs/standards/architecture.md#hosting);
owner to-dos: [backlog.md § Owner](docs/backlog.md#owner).

## MCP servers

`.mcp.json` defines `context7`, `chrome-devtools`, `netlify` — agent tooling only. Their
tokens and where they're set: [development.md § MCP servers](docs/standards/development.md#mcp-servers).

**A token fails → stop.** When a server fails to connect for auth reasons, or a call using a token
returns 401/403 or "bad credentials" (the MCP servers, `gh`, the Netlify CLI), **stop the work** —
no workarounds, no retries with another tool. End the turn with a standalone line in bold, first in
the message: **"Token `<NAME>` is invalid — regenerate it"** plus where it's set
([development.md § MCP servers](docs/standards/development.md#mcp-servers)). A 404 or "permission"
error from a token that otherwise works is a repo setting, not the token — check that first.

## Gotchas

- **Shell:** run git, npm and npx through **Bash**, not PowerShell 5.1 (it wraps native stderr as
  error records and reports false failures).
- **Permission prompts:** `.claude/settings.json` allowlists the routine commands. A compound
  command prompts if _any_ part is unlisted — so run from the repo root (never `cd … &&`), one
  allowlisted command per call, and read or search with the file tools, not shell pipes.
- **Only `dist/` is public** — what `src/` and `public/` build to. Docs and this file never ship.
- **No inline `<style>` or `<script>`** in the output — the CSP blocks them; `astro.config.mjs`
  sets `inlineStylesheets: 'never'` and `assetsInlineLimit: 0`. JSON-LD is data, not script, and is
  fine. An HTML comment in a template ships; put the comment in the frontmatter.
- **The CSP blocks every `fetch`** — no `connect-src`, so it falls back to `default-src 'none'`
  (`check:csp` holds it). The local preview has no Netlify headers, CSP or redirects, so only the
  deploy preview shows a miss.
- **A link that starts a template line loses the space before it** (`opisuje<a>przepis</a>`): end
  the line before with `{' '}`. `check:links` fails a link glued to a word.
- **Netlify skips the deploy** when a commit changes nothing that builds the site (the `ignore`
  command in `netlify.toml`) — a docs-only PR has no deploy preview, by design.
- **`npm ci` fails with EPERM** while VS Code is open — its Astro extension locks
  `@astrojs/compiler-binding-*`. Close VS Code, or restore with `npm install` (same lockfile).
- Use the dedicated file tools, never shell `cat` / `Get-Content`.
