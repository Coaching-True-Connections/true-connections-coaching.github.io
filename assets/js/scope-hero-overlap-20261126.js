// Maintain a quarter-panel overlap as headings and copy reflow.
(() => {
  const hero = document.querySelector('.page-scope .tc-cream-hero');
  const panel = hero?.querySelector('.tc-hero-panel');
  if (!panel) return;
  const update = () => {
    const overlap = `${panel.getBoundingClientRect().height / 4}px`;
    if (hero.style.getPropertyValue('--cream-overlap') !== overlap) {
      hero.style.setProperty('--cream-overlap', overlap);
    }
  };
  update();
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(panel);
})();
