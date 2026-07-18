(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  let steps = [];
  let stepIndex = 0;
  let wrongAttempts = 0;
  let selectedBtn = null;
  let submitted = false; // current step answered wrong, waiting for retry
  let stepSolved = false; // current step answered correctly, waiting to advance/finish

  let currentMod = null;
  let currentLessonLike = null;

  function getLessonIdFromUrl() {
    return new URLSearchParams(window.location.search).get('lesson');
  }

  // A "lesson-like" is either a regular mikrolekcja (single question, own
  // .body/.analogy) or a module quiz (multiple .questions, no teaching copy).
  function findLessonLike(id) {
    for (const mod of content.modules) {
      const lesson = mod.lessons.find((l) => l.id === id);
      if (lesson) return { mod, lessonLike: lesson };
      if (mod.quiz && mod.quiz.id === id) return { mod, lessonLike: mod.quiz };
    }
    return null;
  }

  function hasContent(lessonLike) {
    return !!(lessonLike.question || (lessonLike.questions && lessonLike.questions.length));
  }

  function renderEmptyState() {
    document.getElementById('app').innerHTML =
      '<div class="empty-state">Ta lekcja nie jest jeszcze gotowa. <a href="mapa.html">Wróć do mapy</a></div>';
  }

  function renderProgressIndicator() {
    const dots = document.getElementById('progressDots');
    const divider = document.getElementById('divider');

    if (steps.length > 1) {
      divider.textContent = `PYTANIE ${stepIndex + 1} Z ${steps.length}`;
      dots.innerHTML = steps
        .map((_, i) => {
          if (i < stepIndex) return '<div class="dot done"></div>';
          if (i === stepIndex) return '<div class="dot current"></div>';
          return '<div class="dot"></div>';
        })
        .join('');
      return;
    }

    divider.textContent = 'SPRAWDŹ SIĘ';
    const index = currentMod.lessons.findIndex((l) => l.id === currentLessonLike.id);
    dots.innerHTML = currentMod.lessons
      .map((l, i) => {
        if (i < index) return '<div class="dot done"></div>';
        if (i === index) return '<div class="dot current"></div>';
        return '<div class="dot"></div>';
      })
      .join('');
  }

  function renderStep() {
    const step = steps[stepIndex];
    wrongAttempts = 0;
    selectedBtn = null;
    submitted = false;
    stepSolved = false;

    document.getElementById('questionText').textContent = step.question;
    document.getElementById('feedback').classList.remove('show', 'ok', 'bad');
    document.getElementById('feedback').innerHTML = '';

    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    step.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt.text;
      btn.dataset.correct = opt.correct ? 'true' : 'false';
      btn.addEventListener('click', () => handleSelect(btn));
      optionsEl.appendChild(btn);
    });

    renderProgressIndicator();
    updateFooter();
  }

  function renderLessonLike(mod, lessonLike) {
    currentMod = mod;
    currentLessonLike = lessonLike;
    steps = lessonLike.questions || [lessonLike];
    stepIndex = 0;

    document.documentElement.style.setProperty('--module-accent', mod.accent);
    document.getElementById('eyebrow').textContent = lessonLike.eyebrowLesson || mod.eyebrow;
    document.getElementById('lessonTitle').textContent = lessonLike.title;

    const teachingSection = document.getElementById('teachingSection');
    if (lessonLike.body) {
      teachingSection.style.display = '';
      document.getElementById('bodyText').innerHTML = lessonLike.body;
      document.getElementById('analogyText').textContent = lessonLike.analogy;
    } else {
      teachingSection.style.display = 'none';
    }

    renderStep();
  }

  // Clicking an option only marks it as chosen — evaluation happens on
  // footer button confirm, so feedback never appears before the user commits.
  function handleSelect(btn) {
    if (stepSolved || submitted) return;
    document.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
    selectedBtn = btn;
    updateFooter();
  }

  function updateFooter() {
    const nextBtn = document.getElementById('nextBtn');
    const isLastStep = stepIndex === steps.length - 1;

    if (stepSolved) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('retry');
      nextBtn.classList.add('ready');
      nextBtn.textContent = isLastStep ? 'Zaliczone' : 'Następne pytanie';
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

  function handleSubmit(step) {
    if (!selectedBtn) return;
    document.querySelectorAll('.option').forEach((o) => (o.disabled = true));

    const isCorrect = selectedBtn.dataset.correct === 'true';
    const fb = document.getElementById('feedback');

    if (isCorrect) {
      stepSolved = true;
      selectedBtn.classList.add('correct');
      fb.innerHTML = step.feedbackCorrect;
      fb.classList.remove('bad');
      fb.classList.add('show', 'ok');
    } else {
      wrongAttempts++;
      submitted = true;
      selectedBtn.classList.add('wrong');
      let html = step.feedbackWrong;
      if (wrongAttempts >= 2 && step.hint) {
        html += `<div class="hint">${step.hint}</div>`;
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

  function handleComplete() {
    state.completeLesson(currentLessonLike.id, currentLessonLike.xp || 0);

    const toast = document.getElementById('xpToast');
    toast.textContent = `+${currentLessonLike.xp || 0} XP`;
    toast.classList.add('show');

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.textContent = 'Wracam do mapy...';

    setTimeout(() => {
      window.location.href = 'mapa.html';
    }, 900);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const lessonId = getLessonIdFromUrl();
    const found = lessonId && findLessonLike(lessonId);

    if (!found || !hasContent(found.lessonLike)) {
      renderEmptyState();
      return;
    }

    renderLessonLike(found.mod, found.lessonLike);

    document.getElementById('nextBtn').addEventListener('click', function () {
      if (stepSolved) {
        if (stepIndex === steps.length - 1) {
          handleComplete();
        } else {
          stepIndex++;
          renderStep();
        }
        return;
      }
      if (submitted) {
        handleRetry();
        return;
      }
      handleSubmit(steps[stepIndex]);
    });
  });
})();
