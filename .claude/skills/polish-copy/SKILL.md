---
name: polish-copy
description: Write or edit visitor-facing Polish text for the family cookbook site (a page, a recipe, a step, a label, a meta description) so it reads like a person wrote it, not a language model. Use before writing any text that ships in src/, and to review a draft.
---

# Polish copy that doesn't read as AI

The site is a family's recipe notebook: the family and friends cook from it, in a kitchen, on a
phone. Text that reads like a chatbot — or like a food magazine selling a lifestyle — loses their
trust. This skill is built
on Wikipedia's field guide [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
(WikiProject AI Cleanup), carried over to Polish. Its own warning applies here too: **the signs are
symptoms, not the problem.** Scrubbing words from a hollow text leaves a hollow text. Start from
facts, then write; check the signs last.

## 1. Before writing

- **Know what you are saying.** Gather the facts first: the amount, the time, the source. A
  sentence with no fact in it ("Kuchnia to fascynujący świat smaków") is cut, not reworded.
- **A recipe is the family's**, or a draft they asked for with its sources named; never invent an
  amount, a step or a "U nas w domu…". **Every claim about history, health or food safety has a
  source** you have actually read
  ([vision.md § Principles](../../../docs/vision.md#principles)). No source → no sentence. Never
  invent a book, a page number, an ISBN, an "expert", a museum or a date. Never write around a gap
  ("brak dostępnych informacji", "nie jest szeroko udokumentowane") — leave the gap out.
- **Who reads this part?** Someone with the pan in front of them: say what to do, with what, how
  much and how long. No health or diet claims ("zdrowe", "fit", "detoks")
  ([vision.md § Principles](../../../docs/vision.md#principles)).
- **The mood is a home notebook, calm**
  ([styling.md § Direction](../../../docs/standards/styling.md#direction)): plain kitchen words,
  plain modern spelling, no stylised archaism and no food-blog gush.

## 2. Words that give a model away

Avoid these, above all when two or more land close together. One alone is not a crime; a cluster
is the tell.

| Avoid                                                                                                                         | Write instead                                        |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| kluczowy, istotny, ważny, niezwykle ważny, odgrywa kluczową rolę                                                              | say what it does: "bez cukru owoce nie puszczą soku" |
| stanowi, pełni funkcję, służy jako, jawi się jako, reprezentuje                                                               | jest, ma                                             |
| bogaty, barwny, fascynujący, niezwykły, wyjątkowy, magiczny, niezapomniany, ponadczasowy, aromatyczny, wyborny, rozgrzewający | a concrete detail instead of the adjective           |
| świadectwo, dziedzictwo, trwały ślad, głęboko zakorzeniony, wpisał się na stałe                                               | the fact: who, when, where                           |
| ponadto, dodatkowo, co więcej, warto zauważyć, warto podkreślić, należy pamiętać, nie bez powodu                              | nothing — or "i", "też", a new sentence              |
| podkreślając, odzwierciedlając, przyczyniając się do, sprawiając, że… (trailing "-ąc" clauses)                                | a separate sentence, or cut                          |
| w dzisiejszych czasach, w erze, w świecie, gdzie…, na przestrzeni wieków                                                      | a date or nothing                                    |
| związany z, w związku z, powiązany z (vague link between two things)                                                          | the actual relation: "robiono ją w…"                 |
| eksperci uważają, wielu twierdzi, mówi się, źródła podają                                                                     | name the source, or drop the claim                   |
| idealny, doskonały, perfekcyjny, gwarantuje sukces, niebo w gębie, rozpływa się w ustach                                      | what it tastes like and what to serve it with        |
| praktyczny, jasny, przejrzysty, solidny, niezawodny, po cichu (the newest models' favourites)                                 | show it                                              |

## 3. Shapes that give a model away

- **Negative parallelism**: "To nie tylko zupa, to tradycja", "nie chodzi o X, lecz o Y". Say
  the thing once.
- **Rule of three**: three adjectives, three parallel clauses, "chrupiący, soczysty i aromatyczny"
  on every recipe. Use a list of three only when there are exactly three things.
- **Inflated significance**: telling the reader something matters instead of showing it
  ("schabowy odegrał kluczową rolę w polskiej kulturze"). Drop it or give the fact.
- **Tidy endings**: a paragraph or a page that ends by restating itself — "Podsumowując…",
  "Jak widać…", "Smacznego!". End on the last fact or step.
- **Challenges-and-future sections**: "Mimo wyzwań…", "Przyszłość kuchni". Not here.
- **Elegant variation**: cycling synonyms for one thing (danie → potrawa → specjał → przysmak).
  Repeat the right word. The site's words are fixed in
  [styling.md § Words](../../../docs/standards/styling.md#words).
- **Uniform rhythm**: every sentence 10–15 words, same shape, full stop after full stop. Real text
  mixes a short sentence with a longer one that carries a clause.
- **Hedging and chat leftovers**: "Mam nadzieję, że to pomoże", "Oczywiście!", "Warto wiedzieć,
  że…", "Pamiętaj, że…" at the start of a tip.
- **Promises about the future**: "wkrótce", "już niedługo", "będzie tu", "W budowie", "pracujemy
  nad". The site reads as finished.
- **A heading per two sentences**, or a heading that names a category ("Znaczenie kulturowe",
  "Ciekawostki i wyróżnienia"). A heading says what the reader will find.
- **Advertising tone**: "Delektuj się", "odkryj smak", "dla koneserów", "Smacznego!". The site
  describes a method, it doesn't sell a dish.

## 4. Typography and markup

- **Dashes**: Polish uses the spaced en dash ( – ) as myślnik — and sparingly; a comma, a colon or
  brackets usually do better. More than one dash per paragraph is a smell. Never the em dash in
  visitor text. Ranges: "2–3 tygodnie" (en dash, no spaces).
- **Quotes**: Polish „…” outside, «…» inside. Never "…" or straight quotes in visitor text.
- **No bold for emphasis** in running text; bold only for a term being defined, once. No bold
  run-in labels at the start of every list item unless the list is a glossary.
- **No emoji**, no decorative bullets, no Title Case (Polish headings are sentence case anyway).
- **A one-letter word (a, i, o, u, w, z) never ends a line** in a heading or a short line:
  `&nbsp;` after it.
- Numbers: digits with units, a comma decimal and a no-break space before the unit ("0,5 l",
  "1,2 kg", "18 %"); dates in full ("14 lipca"), never "14.07" in running text.

## 5. What human text has

- Plain verbs: jest, ma, pokrój, podsmaż, zalej, gotuj, odcedź, wymieszaj.
- Concrete nouns and numbers: "1 kg ziemniaków", "0,5 l bulionu", "smaż 3 minuty".
- Ordinary connectives used normally: "bo", "więc", "ale", "a", "potem".
- An opinion or an aside when it's earned and marked as the owner's: "W moim zeszycie…" — only
  if the owner said so; never invent a personal memory.
- Variation: a question now and then, a short sentence after a long one, a list only where the
  content is a list (ingredients, steps).
- For the steps: one action per sentence, the imperative ("Posól ziemniaki"), what to see when
  it's done ("aż cebula się zeszkli"). Respectful, never patronising; no exclamation marks.

## 6. Check before committing

Read the draft against this list. Fix, then reread once aloud (in your head) as the reader:

1. Every sentence carries a fact or a step. Any that don't → cut.
2. Every fact about history, health or food safety → a source you read, listed on the page.
   Every amount → the family's recipe, or a draft's named sources.
3. Search the draft for the table in § 2 and the shapes in § 3; more than one hit per paragraph →
   rewrite the paragraph, don't swap words.
4. Dashes: count them. Quotes: „…”. Bold: none in running text.
5. Last sentence of each section: is it a summary of the section? → delete it.
6. Same noun for the same thing throughout (styling.md § Words).
7. Could someone who has never made the dish follow it, the pan in front of them? Passive voice →
   the imperative.

No check makes a text human by itself. If after the checks the text still reads like a brochure,
the problem is in step 1: there were no facts to tell.
