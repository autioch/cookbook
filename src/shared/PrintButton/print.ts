// The print button opens the browser's print dialog; the page's print styles decide what's on paper.
document.querySelector('.print-button')?.addEventListener('click', () => {
  window.print();
});
