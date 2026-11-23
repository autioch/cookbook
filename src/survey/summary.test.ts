import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { Section } from './items.ts';
import { optionsOf, parseAnswers, progress, progressText, summaryText } from './summary.ts';

const sections: Section[] = [
  {
    id: 'a',
    title: 'Co jest',
    intro: '',
    items: [
      { id: 'x', title: 'Wyszukiwarka', options: ['Podoba się', 'Do poprawy'] },
      { id: 'y', title: 'Druk' },
    ],
  },
  { id: 'b', title: 'Pomysły', intro: '', items: [{ id: 'z', title: 'Lista zakupów' }] },
];
const date = new Date(2026, 10, 23);

test('parseAnswers drops anything malformed and never throws', () => {
  assert.deepEqual(parseAnswers(null), { choices: {}, notes: {}, ideas: '' });
  assert.deepEqual(parseAnswers('nie json'), { choices: {}, notes: {}, ideas: '' });
  assert.deepEqual(parseAnswers('[1]'), { choices: {}, notes: {}, ideas: '' });
  assert.deepEqual(parseAnswers('{"choices":{"x":"Tak","y":3},"notes":"zle","ideas":5}'), {
    choices: { x: 'Tak' },
    notes: {},
    ideas: '',
  });
});

test('progress counts answered items only', () => {
  const answers = { choices: { x: 'Podoba się' }, notes: { y: 'hm' }, ideas: '' };
  assert.deepEqual(progress(answers, sections), [1, 3]);
  assert.equal(progressText([1, 3]), 'Odpowiedzi: 1 z 3');
});

test('summaryText lists answers and notes per section, then ideas and what is left', () => {
  const text = summaryText(
    {
      choices: { x: 'Do poprawy', z: 'Tak' },
      notes: { x: ' za długa ', y: 'nie wiem' },
      ideas: ' przepisy babci ',
    },
    date,
    sections,
  );
  assert.equal(
    text,
    [
      'Nasza kuchnia: moje wybory, 23 listopada 2026',
      '',
      'CO JEST',
      '- Wyszukiwarka: Do poprawy. Uwaga: za długa',
      '- Druk: bez odpowiedzi. Uwaga: nie wiem',
      '',
      'POMYSŁY',
      '- Lista zakupów: Tak',
      '',
      'MOJE POMYSŁY',
      'przepisy babci',
      '',
      'Bez odpowiedzi: 1 z 3.',
    ].join('\n'),
  );
});

test('summaryText of a finished page has no leftover line', () => {
  const text = summaryText(
    { choices: { x: 'Podoba się', y: 'Nie', z: 'Tak' }, notes: {}, ideas: '' },
    date,
    sections,
  );
  assert.ok(!text.includes('Bez odpowiedzi'));
});

test('optionsOf defaults to Tak / Może / Nie', () => {
  assert.deepEqual(optionsOf({}), ['Tak', 'Może', 'Nie']);
  assert.deepEqual(optionsOf({ options: ['A'] }), ['A']);
});
