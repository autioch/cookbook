# Styling & responsive conventions

**Scope — the visual _how_.** The platform floor is in [CLAUDE.md](../../CLAUDE.md); verification
in [development.md § Testing](development.md#testing); the CSS layers in
[development.md § Code structure](development.md#code-structure). Who reads the site, and why the
floor below sits above WCAG AA: [vision.md § Who it's for](../vision.md#who-its-for).

## Direction

**A family recipe notebook** (owner: "jak za dawnych lat w zeszytach"): warm paper, dark ink, a
fountain-pen blue accent, a school notebook's red margin down each recipe tile. Plain and legible
— the notebook is a hint, not a costume: no handwriting fonts, no ruled-paper texture under text.
A proposal for the owner's wife to judge (backlog § Now).

## Ground rules — the floor

For any reader in a kitchen — normal sizes, a higher contrast, everything scaling:

- **Size.** **Normal sizes**: the body at the browser's own size (`--fs-body` 1 rem,
  16 px by default), small text no smaller than 0.875 rem. **Everything scales**: every size,
  space and breakpoint in `rem` or `em`, never `px` for text, so the browser's text size and zoom
  enlarge the whole page.
- **Line-height.** Multi-line body text ≥ **1.5** (the base is 1.6); a line ≤ `--measure`
  (40 rem, ~70 characters).
- **Contrast.** **AAA, 7 : 1, for every text**, the secondary one included; **3 : 1** for control
  edges, focus rings and icons. **Never colour alone** — a state also has a word or a shape.
- **Targets & focus.** Pointer targets ≥ **44×44 px** (WCAG 2.5.5), spaced so a shaking finger
  doesn't hit the neighbour. Every interactive element keyboard reachable with a **visible focus ring** (3 px
  `--accent`, offset 3 px). Links in running text are always underlined; a list of pages is tiles
  with a border, underlined on hover and focus (owner: no rule and underline on every row).
- **Words over icons.** Every button and link says what it does in words; an icon only beside
  them. No hover-only content, no swipe-only gesture, no tooltip as the only explanation.
- **Forms.** A visible label above every field (never a placeholder as the label), the unit beside
  it, `inputmode="decimal"` for amounts with a comma accepted, an error in words next to the field.
- **Motion.** None. Any added is opt-in, never conveys state, and honours reduced motion.
- **Zoom.** 200 % and 400 % keep everything readable and reachable with no sideways scroll.

## Palette

Tokens in `src/shared/styles.css`; contrasts in its comments. A starting set, kept to the floor.

| Token         | Value     | Use                                          |
| ------------- | --------- | -------------------------------------------- |
| `--bg`        | `#fbf8f3` | The page — warm paper                        |
| `--surface`   | `#ffffff` | A card, a field                              |
| `--ink`       | `#1c1a17` | Text (16.4 : 1 on `--bg`)                    |
| `--muted`     | `#4a453d` | Secondary text (9.0 : 1 on `--bg`)           |
| `--line`      | `#cfc7b8` | Rules (decorative only — not a control edge) |
| `--accent`    | `#1f3b70` | Ink blue: links, focus (10.3 : 1 on `--bg`)  |
| `--on-accent` | `#ffffff` | Text on the blue: the call (11 : 1)          |
| `--chip`      | `#efe7d6` | A chosen chip, a hover fill                  |
| `--margin`    | `#d0574a` | The notebook's red margin — decoration only  |
| `--note`      | `#fbf0c4` | A draft's mark (ink 15 : 1 on it)            |

### Theme

Light only, regardless of the operating-system preference (owner; a dark one only if the owner's
wife asks). Keep `color-scheme: light` in the
document metadata and root CSS in sync.

### Type

Atkinson Hyperlegible Next (`--font`, `src/shared/fonts.css`), the system face until it
loads. Headings 700, strong 650; no weight under 400 for text.

### Print

A recipe prints black on white: the title, the summary, the facts, the ingredients, the steps, the
notes; no site chrome, no tick boxes, no draft mark, no sources.

## Bands

One column that widens; a media query only where a layout must change shape. Name a band here
when a query adds one; keep them few; reflow with CSS only. The page never scrolls sideways at
320 px.

| Band  | Width         | What changes                                                                                            |
| ----- | ------------- | ------------------------------------------------------------------------------------------------------- |
| phone | 320 px and up | One column, `--gutter`                                                                                  |
| wide  | 64rem and up  | Recipe page: steps at `--measure`, ingredients beside them, sticky; the page `--container` (72rem) wide |

The list's tiles fill the width in columns of at least 20rem (a grid, no query).

## Words

- The product is **Nasza kuchnia** (`SITE_NAME`, a working name) in every visitor-facing text;
  `cookbook` only as an identifier (the repo).
- One word for one thing: **przepis**, **składniki**, **przygotowanie**, **porcja**, **posiłek**
  (śniadanie, obiad, zupa, kolacja, deser, przekąska).
- Amounts with a comma decimal and a no-break space ("0,5 l", "1 łyżka"); times as "1 godz.
  15 min".
