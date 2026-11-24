/* Actual panel height controls its quarter overlap, including wrapping/font changes. */
(() => {
  const hero = document.querySelector('.tc-nov13 .tc-cream-hero');
  const panel = hero?.querySelector('.tc-hero-panel');
  if (!hero || !panel) return;
  const update = () => {
    const height = panel.getBoundingClientRect().height;
    if (height > 0) hero.style.setProperty('--tc-panel-height', `${height}px`);
  };
  update();
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(panel);
  window.addEventListener('resize', update, { passive: true });
  document.fonts?.ready.then(update);
  document.querySelectorAll('.tc-availability-row').forEach(row => {
    const section = row.closest('.ready, .scope-cta');
    const paragraph = section?.querySelector('.copy > p, .inner > p');
    if (paragraph) row.style.setProperty('--tc-availability-cream', getComputedStyle(paragraph).color);
  });
})();
