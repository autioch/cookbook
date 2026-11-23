import assert from 'node:assert/strict';
import { test } from 'node:test';
import { slug } from './slug.ts';

test('slug folds Polish letters and joins words with a hyphen', () => {
  assert.equal(slug('czerwona porzeczka'), 'czerwona-porzeczka');
  assert.equal(slug('mięta'), 'mieta');
  assert.equal(slug('czereśnie'), 'czeresnie');
  assert.equal(slug('biała czekolada'), 'biala-czekolada');
  assert.equal(slug('Źdźbło, żółć'), 'zdzblo-zolc');
});
