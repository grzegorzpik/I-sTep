(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  let wrongAttempts = 0;
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
      btn.addEventListener('click', () => handleAnswer(btn, lesson));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(opt, lesson) {
    if (answeredCorrectly) return;
    document.querySelectorAll('.option').forEach((o) => (o.disabled = true));

    const nextBtn = document.getElementById('nextBtn');
    const fb = document.getElementById('feedback');
    const isCorrect = opt.dataset.correct === 'true';

    if (isCorrect) {
      answeredCorrectly = true;
      opt.classList.add('correct');
      fb.innerHTML = lesson.feedbackCorrect;
      fb.classList.remove('bad');
      fb.classList.add('show', 'ok');

      nextBtn.disabled = false;
      nextBtn.classList.remove('retry');
      nextBtn.classList.add('ready');
      nextBtn.textContent = 'Zaliczone';
    } else {
      wrongAttempts++;
      opt.classList.add('wrong');
      let html = lesson.feedbackWrong;
      if (wrongAttempts >= 2 && lesson.hint) {
        html += `<div class="hint">${lesson.hint}</div>`;
      }
      fb.innerHTML = html;
      fb.classList.remove('ok');
      fb.classList.add('show', 'bad');

      nextBtn.disabled = false;
      nextBtn.classList.remove('ready');
      nextBtn.classList.add('retry');
      nextBtn.textContent = 'Spróbuj jeszcze raz';
    }
  }

  function handleRetry() {
    document.querySelectorAll('.option').forEach((o) => {
      o.disabled = false;
      o.classList.remove('wrong', 'selected');
    });
    const fb = document.getElementById('feedback');
    fb.classList.remove('show', 'bad');
    fb.innerHTML = '';

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.classList.remove('retry');
    nextBtn.textContent = 'Zaliczone';
  }

  function handleComplete(lesson) {
    const nextBtn = document.getElementById('nextBtn');
    if (!nextBtn.classList.contains('ready')) return;

    state.completeLesson(lesson.id, lesson.xp || 0);

    const toast = document.getElementById('xpToast');
    toast.textContent = `+${lesson.xp || 0} XP`;
    toast.classList.add('show');

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
      if (this.classList.contains('retry')) {
        handleRetry();
        return;
      }
      handleComplete(found.lesson);
    });
  });
})();
