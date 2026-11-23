// The answers of /wybor/ as they are kept in the browser, and the plain text the owner gets.
import { SECTIONS, YES_NO, type Section } from './items.ts';

export interface Answers {
  /** Item id → the chosen answer's label. */
  choices: Record<string, string>;
  /** Item id → her note. */
  notes: Record<string, string>;
  /** Her own ideas, free text. */
  ideas: string;
}

export const EMPTY: Answers = { choices: {}, notes: {}, ideas: '' };

/** Whatever the browser held, made safe: anything malformed is dropped, never thrown. */
export function parseAnswers(raw: string | null): Answers {
  try {
    const data: unknown = JSON.parse(raw ?? '');
    if (typeof data !== 'object' || data === null) {
      return structuredClone(EMPTY);
    }
    const { choices, notes, ideas } = data as Partial<Record<keyof Answers, unknown>>;
    return {
      choices: strings(choices),
      notes: strings(notes),
      ideas: typeof ideas === 'string' ? ideas : '',
    };
  } catch {
    return structuredClone(EMPTY);
  }
}

function strings(value: unknown): Record<string, string> {
  if (typeof value !== 'object' || value === null) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  );
}

/** Answered items and all items, for the progress line. */
export function progress(answers: Answers, sections: Section[] = SECTIONS): [number, number] {
  const ids = sections.flatMap((s) => s.items.map((i) => i.id));
  return [ids.filter((id) => answers.choices[id]).length, ids.length];
}

/** "12 z 47 odpowiedzi" */
export function progressText([done, all]: [number, number]): string {
  return `Odpowiedzi: ${done} z ${all}`;
}

/** A section's letter: A, B, C… so a question can be named „B3”. */
export function sectionLetter(index: number): string {
  return String.fromCodePoint(65 + index);
}

/** The message: a heading per section, a line per answered or noted item, then her ideas. */
export function summaryText(answers: Answers, date: Date, sections: Section[] = SECTIONS): string {
  const day = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  const lines = [`Nasza kuchnia: moje wybory, ${day}`];
  for (const [s, section] of sections.entries()) {
    const rows = section.items.flatMap((item, i) => {
      const choice = answers.choices[item.id];
      const note = answers.notes[item.id]?.trim();
      if (!choice && !note) {
        return [];
      }
      const answer = choice ?? 'bez odpowiedzi';
      return [
        `- ${sectionLetter(s)}${i + 1} ${item.title}: ${answer}${note ? `. Uwaga: ${note}` : ''}`,
      ];
    });
    if (rows.length > 0) {
      lines.push('', `${sectionLetter(s)}. ${section.title.toUpperCase()}`, ...rows);
    }
  }
  const ideas = answers.ideas.trim();
  if (ideas) {
    lines.push('', 'MOJE POMYSŁY', ideas);
  }
  const [done, all] = progress(answers, sections);
  if (done < all) {
    lines.push('', `Bez odpowiedzi: ${all - done} z ${all}.`);
  }
  return lines.join('\n');
}

/** The answers an item offers. */
export function optionsOf(item: { options?: readonly string[] }): readonly string[] {
  return item.options ?? YES_NO;
}
