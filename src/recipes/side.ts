// The ingredients column stays in view while the steps scroll only when it fits the window: a
// sticky column taller than the window would hide its own end. CSS can't compare the two heights,
// so this marks the column `data-fits`. Without the script the column scrolls with the page.
const side = document.querySelector<HTMLElement>('.recipe__side');

function measure(side: HTMLElement): void {
  side.toggleAttribute('data-fits', side.offsetHeight <= window.innerHeight - 32);
}

if (side) {
  new ResizeObserver(() => {
    measure(side);
  }).observe(side);
  window.addEventListener('resize', () => {
    measure(side);
  });
}
