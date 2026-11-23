# cookbook

**Nasza kuchnia** (working name) — the family's own cooking recipes, in Polish, at
**https://kuchnia.jakub.page**: dinners, soups, breakfasts, desserts and snacks, and a finder for
"what can I make from what's at home".

| What                     | Where                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------- |
| Product vision           | [`docs/vision.md`](docs/vision.md)                                                    |
| Agent instructions       | [`CLAUDE.md`](CLAUDE.md) → [`docs/`](docs/)                                           |
| Netlify site, DNS, HTTPS | [`docs/standards/architecture.md` § Hosting](docs/standards/architecture.md#hosting)  |
| What's next              | [`docs/backlog.md`](docs/backlog.md) — the agreed queue and the owner's steps         |
| Research                 | [`docs/research/`](docs/research/) — editing options, ideas                           |
| How work is done         | [`docs/workflow.md`](docs/workflow.md); rules in [`docs/standards/`](docs/standards/) |

**Status:** a proof of concept — four draft recipes, the list with the finder, a recipe page.

## Developer setup

Needs **git** and **Node.js 24** (see [`.nvmrc`](.nvmrc)); npm comes with it.

```bash
git clone https://github.com/autioch/cookbook.git
```

```bash
npm ci
```

```bash
npm run dev
```

```bash
npm run ci
```

`npm ci` installs exactly what the lockfile pins; `npm run dev` serves the site at
http://localhost:4321/ (no Netlify headers locally); `npm run ci` is the gate — green before every
commit, and CI re-runs it. Every command: [CLAUDE.md § Commands](CLAUDE.md#commands).

## Agent setup (Claude Code)

The agent reads [`CLAUDE.md`](CLAUDE.md) on its own. Its MCP servers need tokens in environment
variables — which, and where to set them:
[development.md § MCP servers](docs/standards/development.md#mcp-servers).

Code: MIT.
