(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  let wrongAttempts = 0;
  let selectedBtn = null;
  let submitted = false; // selection has been checked, waiting for retry
  let answeredCorrectly = false;

  function getLessonIdFromUrl() {
    return new URLSearchParams(window.location.search).get('lesson');
  }

  function findLesson(lessonId) {
    for (const mod of content.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) return { mod, lesson };
    }
    return null;
  }

  function renderEmptyState() {
    document.getElementById('app').innerHTML =
      '<div class="empty-state">Ta lekcja nie jest jeszcze gotowa. <a href="index.html">Wróć do mapy</a></div>';
  }

  function renderProgressDots(mod, lesson) {
    const index = mod.lessons.findIndex((l) => l.id === lesson.id);
    const dots = document.getElementById('progressDots');
    dots.innerHTML = mod.lessons
      .map((l, i) => {
        if (i < index) return '<div class="dot done"></div>';
        if (i === index) return '<div class="dot current"></div>';
        return '<div class="dot"></div>';
      })
      .join('');
  }

  function renderLesson(mod, lesson) {
    document.documentElement.style.setProperty('--module-accent', mod.accent);

    document.getElementById('eyebrow').textContent = lesson.eyebrowLesson || mod.eyebrow;
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('bodyText').innerHTML = lesson.body;
    document.getElementById('analogyText').textContent = lesson.analogy;
    document.getElementById('questionText').textContent = lesson.question;
    renderProgressDots(mod, lesson);

    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    lesson.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt.text;
      btn.dataset.correct = opt.correct ? 'true' : 'false';
      btn.addEventListener('click', () => handleSelect(btn));
      optionsEl.appendChild(btn);
    });

    updateFooter();
  }

  // Clicking an option only marks it as chosen — evaluation happens on
  // footer button confirm, so feedback never appears before the user commits.
  function handleSelect(btn) {
    if (answeredCorrectly || submitted) return;
    document.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
    selectedBtn = btn;
    updateFooter();
  }

  function updateFooter() {
    const nextBtn = document.getElementById('nextBtn');

    if (answeredCorrectly) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('retry');
      nextBtn.classList.add('ready');
      nextBtn.textContent = 'Zaliczone';
      return;
    }

    if (submitted) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('ready');
      nextBtn.classList.add('retry');
      nextBtn.textContent = 'Spróbuj jeszcze raz';
      return;
    }

    nextBtn.classList.remove('retry');
    if (selectedBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.add('ready');
      nextBtn.textContent = 'Sprawdź';
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.remove('ready');
      nextBtn.textContent = 'Sprawdź';
    }
  }

  function handleSubmit(lesson) {
    if (!selectedBtn) return;
    document.querySelectorAll('.option').forEach((o) => (o.disabled = true));

    const isCorrect = selectedBtn.dataset.correct === 'true';
    const fb = document.getElementById('feedback');

    if (isCorrect) {
      answeredCorrectly = true;
      selectedBtn.classList.add('correct');
      fb.innerHTML = lesson.feedbackCorrect;
      fb.classList.remove('bad');
      fb.classList.add('show', 'ok');
    } else {
      wrongAttempts++;
      submitted = true;
      selectedBtn.classList.add('wrong');
      let html = lesson.feedbackWrong;
      if (wrongAttempts >= 2 && lesson.hint) {
        html += `<div class="hint">${lesson.hint}</div>`;
      }
      fb.innerHTML = html;
      fb.classList.remove('ok');
      fb.classList.add('show', 'bad');
    }

    updateFooter();
  }

  function handleRetry() {
    document.querySelectorAll('.option').forEach((o) => {
      o.disabled = false;
      o.classList.remove('wrong', 'selected');
    });
    document.getElementById('feedback').classList.remove('show', 'bad');
    document.getElementById('feedback').innerHTML = '';

    selectedBtn = null;
    submitted = false;
    updateFooter();
  }

  function handleComplete(lesson) {
    state.completeLesson(lesson.id, lesson.xp || 0);

    const toast = document.getElementById('xpToast');
    toast.textContent = `+${lesson.xp || 0} XP`;
    toast.classList.add('show');

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.textContent = 'Wracam do mapy...';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const lessonId = getLessonIdFromUrl();
    const found = lessonId && findLesson(lessonId);

    if (!found || !found.lesson.question) {
      renderEmptyState();
      return;
    }

    renderLesson(found.mod, found.lesson);

    document.getElementById('nextBtn').addEventListener('click', function () {
      if (answeredCorrectly) {
        handleComplete(found.lesson);
        return;
      }
      if (submitted) {
        handleRetry();
        return;
      }
      handleSubmit(found.lesson);
    });
  });
})();
