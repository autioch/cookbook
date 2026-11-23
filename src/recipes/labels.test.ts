import assert from 'node:assert/strict';
import { test } from 'node:test';
import { amountText, minutesText, portionsText, productOf } from './labels.ts';

test('minutesText says hours and minutes as a kitchen does', () => {
  assert.equal(minutesText(15), '15 min');
  assert.equal(minutesText(60), '1 godz.');
  assert.equal(minutesText(75), '1 godz. 15 min');
});

test('amountText writes a comma decimal and leaves out what is missing', () => {
  assert.equal(amountText({ name: 'mąka', amount: 1.5, unit: 'kg' }), '1,5 kg');
  assert.equal(amountText({ name: 'jajka', amount: 2 }), '2');
  assert.equal(amountText({ name: 'sól', unit: 'do smaku' }), 'do smaku');
  assert.equal(amountText({ name: 'pieprz' }), '');
});

test('portionsText takes the Polish plural', () => {
  assert.equal(portionsText(1), '1 porcja');
  assert.equal(portionsText(2), '2 porcje');
  assert.equal(portionsText(5), '5 porcji');
  assert.equal(portionsText(12), '12 porcji');
  assert.equal(portionsText(22), '22 porcje');
});

test('productOf falls back to the name, in lower case', () => {
  assert.equal(productOf({ name: 'Młode ziemniaki', product: 'ziemniaki' }), 'ziemniaki');
  assert.equal(productOf({ name: 'Jajka' }), 'jajka');
});
