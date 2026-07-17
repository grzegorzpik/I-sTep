(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  // Placeholder until modules carry their own icon data (see README: "Ikony
  // dyplomów nawiązujące tematycznie do modułów — jeszcze nie zaprojektowane").
  const BADGE_ICON = '<path d="M4 8l8-5 8 5M4 8v8l8 5 8-5V8M4 8l8 5 8-5"/>';

  function moduleStats(mod) {
    const doneCount = mod.lessons.filter((l) => state.isLessonDone(l.id)).length;
    return { doneCount, total: mod.lessons.length };
  }

  function renderBadges() {
    const grid = document.getElementById('badgeGrid');
    grid.innerHTML = '';

    content.modules.forEach((mod, i) => {
      const { doneCount, total } = moduleStats(mod);
      const num = String(i).padStart(2, '0');

      const badge = document.createElement('div');
      badge.className = 'badge unlocked';
      badge.style.setProperty('--mod-color', mod.accent);
      badge.innerHTML = `
        <span class="badge-num">${num}</span>
        <div class="badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#1B1622" stroke-width="2">${BADGE_ICON}</svg></div>
        <div class="badge-name">${mod.title}</div>
        <div class="badge-date">${doneCount}/${total} pojęć</div>
      `;
      badge.addEventListener('click', () => openModal(mod, i));
      grid.appendChild(badge);
    });
  }

  function openModal(mod, index) {
    const { doneCount, total } = moduleStats(mod);
    const doneLabels = mod.lessons.filter((l) => state.isLessonDone(l.id)).map((l) => l.label);

    const box = document.getElementById('modalBox');
    box.style.setProperty('--mod-color', mod.accent);

    document.getElementById('modalEyebrow').textContent =
      `MODUŁ ${index} · W TRAKCIE · ${doneCount}/${total} POJĘĆ`;
    document.getElementById('modalTitle').textContent = mod.title;

    const tags = document.getElementById('modalTags');
    tags.innerHTML = doneLabels.length
      ? doneLabels.map((label) => `<span class="concept-tag">${label}</span>`).join('')
      : '';
    if (!doneLabels.length) {
      tags.innerHTML = '<span class="concept-tag">jeszcze żadnych — zacznij na mapie</span>';
    }

    document.getElementById('modalDesc').textContent =
      'Pojawi się po ukończeniu bootcampu tego modułu — ekran bootcampu nie jest jeszcze zbudowany.';
    document.getElementById('modalNote').textContent =
      'Pojawi się po dodaniu wpisu retrospekcji — ekran retrospekcji nie jest jeszcze zbudowany.';

    document.getElementById('modalOverlay').classList.add('open');
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.hasProfile()) {
      window.location.href = 'onboarding.html';
      return;
    }

    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
    });

    renderBadges();

    const overlay = document.getElementById('modalOverlay');
    document.getElementById('modalClose').addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
})();
