// /wybor/: keep every answer in this browser, show the progress and the message, send it through
// the phone's share sheet or copy it. Without this script the page reads but keeps nothing.
import { STORAGE_KEY } from './items';
import { EMPTY, parseAnswers, progress, progressText, summaryText, type Answers } from './summary';

const root = document.querySelector<HTMLElement>('.survey');
const send = root?.querySelector<HTMLElement>('.survey__send');
const summary = root?.querySelector<HTMLTextAreaElement>('.survey__summary');
const done = root?.querySelector<HTMLElement>('.survey__done');
const bar = root?.querySelector<HTMLElement>('.survey__progress');

function load(): Answers {
  try {
    return parseAnswers(localStorage.getItem(STORAGE_KEY));
  } catch {
    return structuredClone(EMPTY);
  }
}

function save(answers: Answers): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // Storage off (private mode): the page still works, it just won't remember.
  }
}

function run(
  root: HTMLElement,
  send: HTMLElement,
  summary: HTMLTextAreaElement,
  done: HTMLElement,
  bar: HTMLElement,
): void {
  let answers = load();
  const radios = [...root.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
  const notes = [...root.querySelectorAll<HTMLTextAreaElement>('textarea[name^="note-"]')];
  const ideas = root.querySelector<HTMLTextAreaElement>('textarea[name="ideas"]');

  function fill(): void {
    for (const radio of radios) {
      radio.checked = answers.choices[radio.name] === radio.value;
    }
    for (const note of notes) {
      const id = note.name.slice('note-'.length);
      note.value = answers.notes[id] ?? '';
      const details = note.closest('details');
      if (details && note.value) {
        details.open = true;
      }
    }
    if (ideas) {
      ideas.value = answers.ideas;
    }
  }

  function refresh(): void {
    const text = progressText(progress(answers));
    bar.textContent = text;
    summary.value = summaryText(answers, new Date());
  }

  root.addEventListener('change', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === 'radio') {
      answers.choices[target.name] = target.value;
      save(answers);
      refresh();
    }
  });

  root.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLTextAreaElement) || target === summary) {
      return;
    }
    if (target === ideas) {
      answers.ideas = target.value;
    } else {
      answers.notes[target.name.slice('note-'.length)] = target.value;
    }
    save(answers);
    refresh();
  });

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(summary.value);
      done.textContent = 'Skopiowane. Wklej Kubie w wiadomości.';
    } catch {
      summary.select();
      done.textContent = 'Tekst jest zaznaczony: skopiuj go i wklej Kubie.';
    }
  }

  root.querySelector('.survey__share')?.addEventListener('click', () => {
    const data = { title: 'Nasza kuchnia: moje wybory', text: summary.value };
    if (navigator.canShare?.(data)) {
      navigator.share(data).then(
        () => {
          done.textContent = 'Wysłane. Dziękuję!';
        },
        (error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) {
            void copy();
          }
        },
      );
    } else {
      void copy();
    }
  });

  root.querySelector('.survey__copy')?.addEventListener('click', () => {
    void copy();
  });

  root.querySelector('.survey__reset')?.addEventListener('click', () => {
    if (window.confirm('Wyczyścić wszystkie odpowiedzi? Tego nie da się cofnąć.')) {
      answers = structuredClone(EMPTY);
      save(answers);
      fill();
      refresh();
      done.textContent = 'Wyczyszczone.';
    }
  });

  fill();
  refresh();
  send.hidden = false;
  root.querySelector('.survey__nojs')?.remove();
}

if (root && send && summary && done && bar) {
  run(root, send, summary, done, bar);
}
