// The list's finder: rank the recipes by what's ticked, say what each still lacks, keep the choice
// in the URL. Without this script the finder stays hidden and the whole list shows A–Z.
import { countText, missingText, rank, readChoice, writeChoice, type Choice } from './match';

const finder = document.querySelector<HTMLElement>('.finder');
const list = document.querySelector<HTMLElement>('.recipe-list');
const status = finder?.querySelector('[role="status"]');
const clear = finder?.querySelector('.finder__clear');
const boxes = [...(finder?.querySelectorAll<HTMLInputElement>('input[name="mam"]') ?? [])];
const radios = [...(finder?.querySelectorAll<HTMLInputElement>('input[name="posilek"]') ?? [])];
const items = new Map(
  [...document.querySelectorAll<HTMLElement>('.recipe-list > li')].map((item) => [
    item.dataset.id ?? '',
    item,
  ]),
);
const candidates = [...items].map(([id, item]) => ({
  id,
  title: item.querySelector('a')?.textContent ?? '',
  products: JSON.parse(item.dataset.products ?? '[]') as string[],
  categories: JSON.parse(item.dataset.categories ?? '[]') as string[],
}));

function current(): Choice {
  return {
    have: boxes.filter((b) => b.checked).map((b) => b.value),
    category: radios.find((r) => r.checked)?.value || undefined,
  };
}

function show(list: HTMLElement, status: Element, choice: Choice): void {
  const matches = rank(candidates, choice);
  for (const item of items.values()) {
    item.hidden = true;
  }
  for (const { id, missing } of matches) {
    const item = items.get(id);
    const note = item?.querySelector<HTMLElement>('.recipe-list__missing');
    if (item && note) {
      item.hidden = false;
      note.hidden = choice.have.length === 0;
      note.textContent = missingText(missing);
      list.append(item);
    }
  }
  status.textContent = countText(matches.length);
}

if (finder && list && status && clear) {
  const choice = readChoice(
    location.search,
    boxes.map((b) => b.value),
    radios.map((r) => r.value).filter(Boolean),
  );
  for (const box of boxes) {
    box.checked = choice.have.includes(box.value);
  }
  for (const radio of radios) {
    radio.checked = radio.value === (choice.category ?? '');
  }
  show(list, status, choice);
  finder.hidden = false;

  finder.addEventListener('change', () => {
    const next = current();
    show(list, status, next);
    history.replaceState(null, '', `${location.pathname}${writeChoice(location.search, next)}`);
  });
  clear.addEventListener('click', () => {
    for (const box of boxes) {
      box.checked = false;
    }
    finder.dispatchEvent(new Event('change'));
  });
}
