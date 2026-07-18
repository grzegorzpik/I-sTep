(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  if (!state.hasProfile()) {
    window.location.href = 'onboarding.html';
    return;
  }

  const ROW_PATTERN = ['center', 'left', 'right', 'left', 'right'];

  function mascotSvg(color) {
    return `
    <svg class="mascot" viewBox="0 0 16 16" style="--bot-body:${color};" shape-rendering="crispEdges">
      <rect x="7" y="0" width="2" height="1.1" fill="var(--bot-body)"/>
      <circle cx="8" cy="0.5" r="0.85" fill="#E3A83F"/>
      <rect x="3.2" y="1.6" width="9.6" height="6.8" fill="#F3E9D6" stroke="#0C0910" stroke-width="0.5"/>
      <rect x="4.4" y="3.2" width="7.2" height="3.6" fill="#1B1622"/>
      <g class="eyes">
        <path d="M5.6,5.0 L6.2,4.4 L6.8,5.0" stroke="#6FA860" stroke-width="0.6" fill="none" stroke-linecap="square" stroke-linejoin="miter"/>
        <path d="M9.0,5.0 L9.6,4.4 L10.2,5.0" stroke="#6FA860" stroke-width="0.6" fill="none" stroke-linecap="square" stroke-linejoin="miter"/>
      </g>
      <rect x="3" y="8.6" width="10" height="5.4" fill="var(--bot-body)" stroke="#0C0910" stroke-width="0.5"/>
      <rect x="5.5" y="10.2" width="5" height="2.6" fill="#1B1622"/>
      <rect x="6.1" y="10.7" width="3.8" height="0.5" fill="#E3A83F"/>
      <rect x="6.1" y="11.5" width="2.4" height="0.5" fill="#E3A83F"/>
      <rect x="3.4" y="9" width="0.8" height="0.8" fill="#0C0910" opacity=".5"/>
      <rect x="11.8" y="9" width="0.8" height="0.8" fill="#0C0910" opacity=".5"/>
      <rect x="0.6" y="9.4" width="2.2" height="2.2" fill="#F3E9D6" stroke="#0C0910" stroke-width="0.4"/>
      <rect x="13.2" y="9.4" width="2.2" height="2.2" fill="#F3E9D6" stroke="#0C0910" stroke-width="0.4"/>
      <rect x="4" y="14" width="2.8" height="2" fill="#0C0910"/>
      <rect x="9.2" y="14" width="2.8" height="2" fill="#0C0910"/>
    </svg>`;
  }

  const BEACON_ICON = window.IStepIcons.beacon;

  function computeStatuses(lessons) {
    let currentAssigned = false;
    return lessons.map((lesson) => {
      const done = state.isLessonDone(lesson.id);
      let status;
      if (done) {
        status = 'done';
      } else if (!currentAssigned) {
        status = 'current';
        currentAssigned = true;
      } else {
        status = 'locked';
      }
      return { lesson, status };
    });
  }

  function renderModule(mod) {
    const profile = state.getProfile();

    document.documentElement.style.setProperty('--module-accent', mod.accent);
    document.documentElement.style.setProperty('--module-accent-dark', mod.accentDark || mod.accent);

    document.getElementById('greeting').textContent = `Cześć, ${profile.name}!`;
    document.getElementById('bannerEyebrow').textContent = mod.eyebrow;
    document.getElementById('bannerTitle').textContent = mod.title;

    const statuses = computeStatuses(mod.lessons);
    const doneCount = statuses.filter((s) => s.status === 'done').length;
    document.getElementById('bannerSub').textContent = `${doneCount} / ${mod.lessons.length} pojęć ukończone`;
    document.getElementById('xpValue').textContent = state.getProgress().xp;

    const nodesEl = document.getElementById('nodes');
    nodesEl.innerHTML = '';

    statuses.forEach((entry, i) => {
      const row = document.createElement('div');
      row.className = `node-row ${ROW_PATTERN[i % ROW_PATTERN.length]}`;

      const node = document.createElement('div');
      node.className = `node ${entry.status}`;
      node.setAttribute('data-point', '');
      node.innerHTML = `<div class="core">${i + 1}</div><div class="label">${entry.lesson.label}</div>`;

      const isClickable = (entry.status === 'current' || entry.status === 'done') && !!entry.lesson.question;
      if (isClickable) {
        node.addEventListener('click', () => {
          const isDone = entry.status === 'done';
          openLessonModal({
            eyebrow: mod.eyebrow,
            title: entry.lesson.title || entry.lesson.label,
            subtitle: isDone
              ? 'Ukończona mikrolekcja — możesz ją powtórzyć, ale bez dodatkowego XP.'
              : `Nowa mikrolekcja · +${entry.lesson.xp || 10} XP za zaliczenie.`,
            startLabel: isDone ? 'Przećwicz ponownie' : 'Rozpocznij',
            href: `lekcja.html?lesson=${encodeURIComponent(entry.lesson.id)}`,
          });
        });
      } else {
        node.style.cursor = 'default';
      }

      row.appendChild(node);
      if (entry.status === 'current') {
        row.insertAdjacentHTML('beforeend', mascotSvg(profile.color));
      }
      nodesEl.appendChild(row);
    });

    if (mod.quiz) {
      const allLessonsDone = statuses.every((s) => s.status === 'done');
      const quizDone = state.isLessonDone(mod.quiz.id);
      const quizStatus = quizDone ? 'done' : allLessonsDone ? 'current' : 'locked';
      const quizIndex = mod.lessons.length;

      const row = document.createElement('div');
      row.className = `node-row ${ROW_PATTERN[quizIndex % ROW_PATTERN.length]}`;

      const node = document.createElement('div');
      node.className = `node ${quizStatus}`;
      node.setAttribute('data-point', '');
      node.innerHTML = `<div class="core">?</div><div class="label">${mod.quiz.label}</div>`;

      const quizClickable = (quizStatus === 'current' || quizStatus === 'done') && !!mod.quiz.questions?.length;
      if (quizClickable) {
        node.addEventListener('click', () => {
          const isDone = quizStatus === 'done';
          openLessonModal({
            eyebrow: mod.eyebrow,
            title: mod.quiz.title || mod.quiz.label,
            subtitle: isDone
              ? 'Ukończony quiz — możesz go powtórzyć, ale bez dodatkowego XP.'
              : `Sprawdzian modułu · +${mod.quiz.xp || 20} XP za zaliczenie.`,
            startLabel: isDone ? 'Przećwicz ponownie' : 'Rozpocznij',
            href: `lekcja.html?lesson=${encodeURIComponent(mod.quiz.id)}`,
          });
        });
      } else {
        node.style.cursor = 'default';
      }

      row.appendChild(node);
      if (quizStatus === 'current') {
        row.insertAdjacentHTML('beforeend', mascotSvg(profile.color));
      }
      nodesEl.appendChild(row);
    }

    if (mod.beacon) {
      const beaconUnlocked = mod.quiz
        ? state.isLessonDone(mod.quiz.id)
        : statuses.every((s) => s.status === 'done');
      const row = document.createElement('div');
      row.className = 'node-row center';
      row.style.minHeight = '150px';
      const beaconDone = state.isLessonDone(mod.beacon.id);
      const node = document.createElement('div');
      node.className = `node beacon ${beaconDone ? 'done' : beaconUnlocked ? 'current' : 'locked'}`;
      node.setAttribute('data-point', '');
      node.innerHTML = `<div class="core">${BEACON_ICON}</div><div class="label">${mod.beacon.label}</div>`;

      if (beaconUnlocked) {
        node.addEventListener('click', () => {
          openLessonModal({
            eyebrow: mod.eyebrow,
            title: mod.beacon.title || 'Bootcamp',
            subtitle: beaconDone
              ? 'Ukończony bootcamp — możesz wrócić i przejrzeć zadanie ponownie, bez dodatkowego XP.'
              : `Bootcamp modułu · +${mod.beacon.xp || 50} XP po ukończeniu.`,
            startLabel: beaconDone ? 'Wróć do zadania' : 'Rozpocznij',
            href: `bootcamp.html?module=${encodeURIComponent(mod.id)}`,
          });
        });
      } else {
        node.style.cursor = 'default';
      }

      row.appendChild(node);
      nodesEl.appendChild(row);
    }

    requestAnimationFrame(drawTrail);
  }

  function drawTrail() {
    const wrap = document.getElementById('pathWrap');
    const svg = document.getElementById('trailSvg');
    const points = Array.from(document.querySelectorAll('[data-point] .core'));
    if (!points.length) return;

    const wrapRect = wrap.getBoundingClientRect();
    svg.setAttribute('width', wrapRect.width);
    svg.setAttribute('height', wrapRect.height);
    svg.setAttribute('viewBox', `0 0 ${wrapRect.width} ${wrapRect.height}`);

    const coords = points.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - wrapRect.left, y: r.top + r.height / 2 - wrapRect.top };
    });

    function buildPath(pts) {
      if (pts.length < 2) return '';
      return 'M ' + pts.map((p) => `${p.x} ${p.y}`).join(' L ');
    }

    let walkedEndIndex = 0;
    document.querySelectorAll('[data-point]').forEach((node, i) => {
      if (node.classList.contains('done') || node.classList.contains('current')) walkedEndIndex = i;
    });

    const walkedPts = coords.slice(0, walkedEndIndex + 1);
    const remainingPts = coords.slice(walkedEndIndex);

    svg.innerHTML = `
      <path class="remaining" d="${buildPath(remainingPts)}"></path>
      <path class="walked" d="${buildPath(walkedPts)}"></path>
    `;
  }

  function openLessonModal({ eyebrow, title, subtitle, startLabel, href }) {
    document.getElementById('modalEyebrow').textContent = eyebrow;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalSub').textContent = subtitle;

    const startBtn = document.getElementById('modalStart');
    startBtn.textContent = startLabel;
    startBtn.onclick = () => {
      window.location.href = href;
    };

    document.getElementById('lessonModal').classList.add('show');
    document.getElementById('modalBackdrop').classList.add('show');
  }

  function closeLessonModal() {
    document.getElementById('lessonModal').classList.remove('show');
    document.getElementById('modalBackdrop').classList.remove('show');
  }

  window.addEventListener('resize', () => requestAnimationFrame(drawTrail));

  document.addEventListener('DOMContentLoaded', () => {
    renderModule(content.modules[0]);

    document.getElementById('devReset').addEventListener('click', () => {
      if (confirm('Zresetować całą apkę — postęp i kompana (test)?')) {
        state.resetProgress();
        window.location.href = 'onboarding.html';
      }
    });

    document.getElementById('modalCancel').addEventListener('click', closeLessonModal);
    document.getElementById('modalBackdrop').addEventListener('click', closeLessonModal);
  });
})();
