(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  if (!state.hasProfile()) {
    window.location.href = 'onboarding.html';
    return;
  }

  function getModuleIdFromUrl() {
    return new URLSearchParams(window.location.search).get('module');
  }

  function findModule(id) {
    return content.modules.find((m) => m.id === id) || null;
  }

  function isModuleUnlocked(mod) {
    const lessonsDone = mod.lessons.every((l) => state.isLessonDone(l.id));
    if (mod.quiz) return lessonsDone && state.isLessonDone(mod.quiz.id);
    return lessonsDone;
  }

  function renderEmptyState() {
    document.getElementById('app').innerHTML =
      '<div class="empty-state">Ten bootcamp nie jest jeszcze dostępny — ukończ najpierw wszystkie mikrolekcje i quiz modułu. <a href="index.html">Wróć do mapy</a></div>';
  }

  function buildStartPrompt(mod) {
    const concepts = mod.lessons.map((l) => l.label).join(', ');
    return `Zaczynam bootcamp z aplikacji "I-sTep".

Moduł: ${mod.id.replace('modul-', '')} — ${mod.title}
Bootcamp: ${mod.beacon.title}
Cel: ${mod.beacon.goal}
Pojęcia do wykorzystania: ${concepts}

Zbuduj to razem ze mną krok po kroku — tłumacz na bieżąco, co robisz i dlaczego, bez wchodzenia w zbędne szczegóły implementacji. Ja podejmuję decyzje produktowe.`;
  }

  function buildValidationPrompt(mod, fileName, comment) {
    const concepts = mod.lessons.map((l) => l.label).join(', ');
    return `Waliduję ukończenie bootcampu z aplikacji "I-sTep".

Moduł: ${mod.id.replace('modul-', '')} — ${mod.title}
Bootcamp: ${mod.beacon.title}
Cel: ${mod.beacon.goal}
Pojęcia do wykorzystania: ${concepts}

W załączniku przesyłam dowód wykonania: ${fileName}.
Mój komentarz: ${comment || '(brak komentarza)'}

Oceń, czy rozwiązanie faktycznie wykorzystuje powyższe pojęcia i wskaż, czego jeszcze nie rozumiem.`;
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // clipboard access denied/unavailable — the prompt is still visible to copy by hand
    }
  }

  function showToast(el) {
    el.classList.remove('show');
    void el.offsetWidth; // restart the fade animation
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modId = getModuleIdFromUrl();
    const mod = modId && findModule(modId);

    if (!mod || !mod.beacon || !isModuleUnlocked(mod)) {
      renderEmptyState();
      return;
    }

    const beaconDone = state.isLessonDone(mod.beacon.id);

    document.documentElement.style.setProperty('--module-accent', mod.accent);
    document.getElementById('heroIcon').innerHTML = window.IStepIcons.beacon;
    document.getElementById('heroEyebrow').textContent = mod.beacon.eyebrowLesson || mod.eyebrow;
    document.getElementById('heroTitle').textContent = mod.beacon.title;
    document.getElementById('goalText').textContent = mod.beacon.goal;
    document.getElementById('conceptTags').innerHTML = mod.lessons
      .map((l) => `<span class="tag">${l.label}</span>`)
      .join('');

    const startPromptText = buildStartPrompt(mod);
    document.getElementById('startPromptText').textContent = startPromptText;

    document.getElementById('startBtn').addEventListener('click', async () => {
      await copyToClipboard(startPromptText);
      document.getElementById('startPromptBox').classList.add('show');
      showToast(document.getElementById('startToast'));
    });

    let selectedFileName = null;
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const genBtn = document.getElementById('genBtn');

    uploadZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      selectedFileName = file.name;
      uploadZone.classList.add('filled');
      document.getElementById('uploadTitle').textContent = selectedFileName;
      document.getElementById('uploadSub').textContent = 'dotknij, aby zmienić';
      genBtn.disabled = false;
    });

    const promptBox = document.getElementById('promptBox');
    const completeBtn = document.getElementById('completeBtn');

    genBtn.addEventListener('click', () => {
      const comment = document.getElementById('commentInput').value.trim();
      document.getElementById('promptText').textContent = buildValidationPrompt(mod, selectedFileName, comment);
      promptBox.classList.add('show');
      if (!beaconDone) completeBtn.disabled = false;
    });

    document.getElementById('copyBtn').addEventListener('click', async () => {
      await copyToClipboard(document.getElementById('promptText').textContent);
      showToast(document.getElementById('toast'));
    });

    if (beaconDone) {
      completeBtn.textContent = 'Bootcamp już ukończony';
    }

    completeBtn.addEventListener('click', () => {
      if (completeBtn.disabled) return;
      state.completeLesson(mod.beacon.id, mod.beacon.xp || 0);

      const toast = document.getElementById('xpToast');
      toast.textContent = `+${mod.beacon.xp || 0} XP`;
      toast.classList.add('show');

      completeBtn.disabled = true;
      completeBtn.textContent = 'Przechodzę do retrospekcji...';

      setTimeout(() => {
        window.location.href = `retrospekcja.html?module=${encodeURIComponent(mod.id)}`;
      }, 900);
    });
  });
})();
