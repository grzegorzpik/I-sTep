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

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function journalEntryFor(moduleId) {
    return state.getJournalEntries().find((e) => e.moduleId === moduleId) || null;
  }

  function renderBadges() {
    const grid = document.getElementById('badgeGrid');
    grid.innerHTML = '';

    content.modules.forEach((mod, i) => {
      const { doneCount, total } = moduleStats(mod);
      const bootcampDone = mod.beacon && state.isLessonDone(mod.beacon.id);
      const num = String(i).padStart(2, '0');

      const badge = document.createElement('div');
      badge.className = 'badge unlocked';
      badge.style.setProperty('--mod-color', mod.accent);
      badge.innerHTML = `
        <span class="badge-num">${num}</span>
        <div class="badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#1B1622" stroke-width="2">${BADGE_ICON}</svg></div>
        <div class="badge-name">${mod.title}</div>
        <div class="badge-date">${bootcampDone ? 'ukończony ✓' : `${doneCount}/${total} pojęć`}</div>
      `;
      badge.addEventListener('click', () => openModal(mod, i));
      grid.appendChild(badge);
    });
  }

  function openModal(mod, index) {
    const { doneCount, total } = moduleStats(mod);
    const doneLabels = mod.lessons.filter((l) => state.isLessonDone(l.id)).map((l) => l.label);
    const bootcampDone = mod.beacon && state.isLessonDone(mod.beacon.id);

    const box = document.getElementById('modalBox');
    box.style.setProperty('--mod-color', mod.accent);

    document.getElementById('modalEyebrow').textContent = bootcampDone
      ? `MODUŁ ${index} · UKOŃCZONY`
      : `MODUŁ ${index} · W TRAKCIE · ${doneCount}/${total} POJĘĆ`;
    document.getElementById('modalTitle').textContent = mod.title;

    const tags = document.getElementById('modalTags');
    tags.innerHTML = doneLabels.length
      ? doneLabels.map((label) => `<span class="concept-tag">${label}</span>`).join('')
      : '<span class="concept-tag">jeszcze żadnych — zacznij na mapie</span>';

    document.getElementById('modalDesc').textContent = bootcampDone
      ? 'Bootcamp ukończony — szczegóły tego, co zbudowałeś, zostały zwalidowane w rozmowie z Claude podczas bootcampu.'
      : mod.beacon
      ? 'Odblokuje się po ukończeniu bootcampu tego modułu.'
      : 'Bootcamp tego modułu nie jest jeszcze zaprojektowany.';

    const entry = journalEntryFor(mod.id);
    document.getElementById('modalNote').textContent = entry
      ? `„${entry.learned}”`
      : 'Pojawi się po dodaniu wpisu retrospekcji dla tego modułu.';
    document.getElementById('modalStamp').textContent = bootcampDone ? 'UKOŃCZONY' : 'W TRAKCIE';

    document.getElementById('modalOverlay').classList.add('open');
  }

  function renderPendingBanner() {
    const pendingMods = content.modules.filter(
      (mod) => mod.beacon && state.isLessonDone(mod.beacon.id) && !state.hasJournalEntryForModule(mod.id)
    );
    document.getElementById('pendingBanner').innerHTML = pendingMods
      .map(
        (mod) => `
        <div class="pending-card">
          <div class="p-label">RETROSPEKCJA CZEKA</div>
          <div class="p-title">${escapeHtml(mod.title)}</div>
          <a class="p-btn" href="retrospekcja.html?module=${encodeURIComponent(mod.id)}">Napisz retrospekcję</a>
        </div>`
      )
      .join('');
  }

  function renderEntries() {
    const entries = state.getJournalEntries();
    const entriesEl = document.getElementById('entriesList');
    const emptyEl = document.getElementById('emptyState');

    if (!entries.length) {
      entriesEl.innerHTML = '';
      emptyEl.classList.add('show');
      return;
    }
    emptyEl.classList.remove('show');

    entriesEl.innerHTML = entries
      .map((entry) => {
        const dateLabel = new Date(entry.createdAt)
          .toLocaleDateString('pl-PL', { day: '2-digit', month: 'short' })
          .toUpperCase();
        const extraLines = [
          entry.unclear && `<b>Co nadal niejasne?</b> ${escapeHtml(entry.unclear)}`,
          entry.applied && `<b>Zastosowanie:</b> ${escapeHtml(entry.applied)}`,
          entry.visualTrick && `<b>Trik wizualny:</b> ${escapeHtml(entry.visualTrick)}`,
        ]
          .filter(Boolean)
          .join('<br>');
        const blocks = [1, 2, 3, 4, 5]
          .map((n) => `<div class="block ${n <= entry.usefulness ? 'on' : 'off'}"></div>`)
          .join('');

        return `
          <div class="entry">
            <div class="entry-date"><span>${escapeHtml(entry.moduleTitle.toUpperCase())}</span><span>${dateLabel}</span></div>
            <div class="entry-title">Czego się nauczyłem?</div>
            <div class="entry-text">${escapeHtml(entry.learned)}${extraLines ? '<br><br>' + extraLines : ''}</div>
            <div class="entry-footer">
              <div class="sprawczosc">
                <span class="sprawczosc-label">Przydatność</span>
                <div class="blocks">${blocks}</div>
              </div>
              <span class="stamp">ZAPISANO</span>
            </div>
          </div>`;
      })
      .join('');
  }

  function switchTab(name) {
    document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === name));
    document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === name));
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.hasProfile()) {
      window.location.href = 'onboarding.html';
      return;
    }

    document.getElementById('xpValue').textContent = state.getProgress().xp;

    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    renderBadges();
    renderPendingBanner();
    renderEntries();

    const overlay = document.getElementById('modalOverlay');
    document.getElementById('modalClose').addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    // Deep link from the module-completion screen: ?tab=dyplomy&module=<id>
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'dyplomy') {
      switchTab('dyplomy');
      const modId = params.get('module');
      const index = content.modules.findIndex((m) => m.id === modId);
      if (index !== -1) openModal(content.modules[index], index);
    }
  });
})();
