import assert from 'node:assert/strict';
import { test } from 'node:test';
import { typeset, typesetPlugin } from './typeset.ts';

test('typeset keeps a number with the word after it, and „ok.” with the number', () => {
  assert.equal(typeset('spirytus 95 % na 250 ml wody'), 'spirytus 95\u00a0% na 250\u00a0ml wody');
  assert.equal(typeset('po ok. 9 dniach'), 'po ok.\u00a09\u00a0dniach');
  assert.equal(typeset('rok 2024, 23 sierpnia'), 'rok 2024, 23\u00a0sierpnia');
});

test('typeset keeps a one-letter word with the next', () => {
  assert.equal(
    typeset('Wlej spirytus do wody, a nie odwrotnie'),
    'Wlej spirytus do wody, a\u00a0nie odwrotnie',
  );
  assert.equal(typeset('i w słoju'), 'i\u00a0w\u00a0słoju');
  assert.equal(typeset('Z miodem (o ile jest)'), 'Z\u00a0miodem (o\u00a0ile jest)');
  assert.equal(typeset('kawa i'), 'kawa i');
});

test('typesetPlugin rewrites a text node when it changes and ids a heading from slug()', () => {
  const set: unknown[] = [];
  const ctx = {
    setField: (_node: unknown, _key: string, value: string) => set.push(value),
    setProperty: (_node: unknown, _key: string, value: string) => set.push(value),
    textContent: () => 'Owoce z\u00a0zamrażarki',
  } as never;
  typesetPlugin.text({ type: 'text', value: '0,5 l w słoju' }, ctx);
  typesetPlugin.text({ type: 'text', value: 'bez zmian' }, ctx);
  typesetPlugin.element.visit(
    { type: 'element', tagName: 'h3', properties: {}, children: [] },
    ctx,
  );
  typesetPlugin.element.visit(
    { type: 'element', tagName: 'h3', properties: { id: 'given' }, children: [] },
    ctx,
  );
  assert.deepEqual(set, ['0,5\u00a0l w\u00a0słoju', 'owoce-z-zamrazarki']);
});
