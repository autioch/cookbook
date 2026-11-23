import assert from 'node:assert/strict';
import { test } from 'node:test';
import { countText, missingText, needed, rank, readChoice, writeChoice } from './match.ts';

const toast = {
  id: 'tosty',
  title: 'Tosty francuskie',
  products: ['chleb', 'jajka', 'mleko', 'sól', 'masło'],
  categories: ['sniadanie', 'kolacja'],
};
const shakshuka = {
  id: 'szakszuka',
  title: 'Szakszuka',
  products: ['jajka', 'pomidory', 'cebula', 'papryka', 'oliwa', 'sól'],
  categories: ['sniadanie'],
};
const soup = {
  id: 'pomidorowa',
  title: 'Zupa pomidorowa',
  products: ['rosół', 'przecier pomidorowy', 'śmietana', 'makaron'],
  categories: ['zupa', 'obiad'],
};
const all = [soup, shakshuka, toast];

test('needed leaves out the pantry and repeats', () => {
  assert.deepEqual(needed(['sól', 'jajka', 'jajka', 'olej', 'chleb']), ['jajka', 'chleb']);
});

test('rank with nothing chosen: every recipe A–Z', () => {
  assert.deepEqual(
    rank(all, { have: [], category: undefined }).map((m) => m.id),
    ['szakszuka', 'tosty', 'pomidorowa'],
  );
});

test('rank: only recipes using a chosen product, the fewest missing first', () => {
  const result = rank(all, { have: ['jajka', 'chleb', 'mleko'], category: undefined });
  assert.deepEqual(result, [
    { id: 'tosty', missing: ['masło'] },
    { id: 'szakszuka', missing: ['pomidory', 'cebula', 'papryka', 'oliwa'] },
  ]);
});

test('rank keeps to the chosen meal', () => {
  assert.deepEqual(
    rank(all, { have: [], category: 'zupa' }).map((m) => m.id),
    ['pomidorowa'],
  );
  assert.deepEqual(rank(all, { have: ['makaron'], category: 'sniadanie' }), []);
});

test('missingText and countText speak Polish', () => {
  assert.equal(missingText([]), 'Masz wszystko.');
  assert.equal(missingText(['cebula', 'czosnek']), 'Brakuje: cebula, czosnek.');
  assert.equal(countText(0), 'Żaden przepis nie pasuje.');
  assert.equal(countText(1), 'Pasuje 1 przepis.');
  assert.equal(countText(3), 'Pasują 3 przepisy.');
  assert.equal(countText(5), 'Pasuje 5 przepisów.');
  assert.equal(countText(12), 'Pasuje 12 przepisów.');
});

test('the choice round-trips through the URL, unknown values dropped', () => {
  const products = ['jajka', 'chleb', 'przecier pomidorowy'];
  const choice = { have: ['jajka', 'przecier pomidorowy'], category: 'sniadanie' };
  const query = writeChoice('', choice);
  assert.equal(query, '?mam=jajka,przecier+pomidorowy&posilek=sniadanie');
  assert.deepEqual(readChoice(query, products, ['sniadanie']), choice);
  assert.deepEqual(readChoice('?mam=jajka,kawior&posilek=bal', products, ['sniadanie']), {
    have: ['jajka'],
    category: undefined,
  });
  assert.equal(writeChoice('?mam=jajka', { have: [], category: undefined }), '');
});
