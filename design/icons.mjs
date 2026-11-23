// Renders the icon fallbacks into public/ with headless Chrome or Edge — no dependency. Run after
// changing public/favicon.svg, design/icon-full.svg or design/og.html:
//   node design/icons.mjs [path to chrome or msedge]
// Never part of the build; the PNGs are committed.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const browser = process.argv[2] ?? '/opt/pw-browsers/chromium';
const root = resolve(import.meta.dirname, '..');
const work = mkdtempSync(join(tmpdir(), 'icons-'));

function shoot(page, width, height, out) {
  execFileSync(browser, [
    '--headless',
    '--no-sandbox',
    '--hide-scrollbars',
    `--user-data-dir=${join(work, out)}`,
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    `--screenshot=${join(root, 'public', out)}`,
    pathToFileURL(page).href,
  ]);
}

// The SVG in a page pinned top left at its size: a bare SVG would be centred off the capture.
const touch = join(work, 'touch.html');
writeFileSync(
  touch,
  `<!doctype html><style>*{margin:0}img{display:block}</style><img src="${pathToFileURL(join(root, 'design/icon-full.svg')).href}" width="180" height="180" alt="">`,
);
shoot(touch, 180, 180, 'apple-touch-icon.png');
shoot(join(root, 'design/og.html'), 1200, 630, 'og.png');
rmSync(work, { recursive: true, force: true });
