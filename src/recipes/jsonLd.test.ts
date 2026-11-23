import assert from 'node:assert/strict';
import { test } from 'node:test';
import { recipeJsonLd } from './jsonLd.ts';

const recipe = {
  title: 'Tosty <francuskie>',
  summary: 'Chleb w jajku.',
  categories: ['sniadanie' as const],
  servings: 2,
  time: { active: 15, total: 15 },
  ingredients: [{ items: [{ name: 'jajka', amount: 2 }, { name: 'sól' }] }],
  steps: [{ items: ['Roztrzep jajka.'] }],
  sources: [],
};

test('recipeJsonLd is Recipe data with times in ISO 8601 and nothing that closes the script', () => {
  const json = recipeJsonLd(
    recipe,
    'https://example.org/przepisy/tosty/',
    { name: 'A', url: 'https://a.example' },
    { name: 'S', url: 'https://example.org/' },
  );
  assert.ok(!json.includes('<'));
  const data = JSON.parse(json);
  assert.equal(data['@type'], 'Recipe');
  assert.equal(data.name, 'Tosty <francuskie>');
  assert.equal(data.totalTime, 'PT15M');
  assert.deepEqual(data.recipeCategory, ['Śniadanie']);
  assert.deepEqual(data.recipeIngredient, ['2 jajka', 'sól']);
  assert.equal(data.citation, undefined);
});
