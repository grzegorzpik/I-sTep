(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  function getModuleIdFromUrl() {
    return new URLSearchParams(window.location.search).get('module');
  }

  function findModule(id) {
    return content.modules.find((m) => m.id === id) || null;
  }

  function renderGuardState(message) {
    document.getElementById('app').innerHTML =
      `<div class="empty-state">${message} <a href="index.html">Wróć do mapy</a></div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.hasProfile()) {
      window.location.href = 'onboarding.html';
      return;
    }

    const modId = getModuleIdFromUrl();
    const mod = modId && findModule(modId);

    if (!mod) {
      renderGuardState('Nie znaleziono modułu do retrospekcji.');
      return;
    }
    if (!mod.beacon || !state.isLessonDone(mod.beacon.id)) {
      renderGuardState('Retrospekcja pojawia się dopiero po ukończeniu bootcampu tego modułu.');
      return;
    }
    if (state.hasJournalEntryForModule(mod.id)) {
      renderGuardState(`Retrospekcję dla modułu „${mod.title}” już zapisałeś — zobacz ją w dzienniku.`);
      return;
    }

    document.documentElement.style.setProperty('--module-accent', mod.accent);
    document.getElementById('eyebrow').textContent = `${mod.eyebrow} · RETROSPEKCJA`;

    let rating = 0;
    const learnedInput = document.getElementById('learnedInput');
    const saveBtn = document.getElementById('saveBtn');

    document.querySelectorAll('.rblock').forEach((block) => {
      block.addEventListener('click', () => {
        rating = parseInt(block.dataset.val, 10);
        document.querySelectorAll('.rblock').forEach((b) => {
          b.classList.toggle('on', parseInt(b.dataset.val, 10) <= rating);
        });
        checkReady();
      });
    });

    function checkReady() {
      const hasRequired = learnedInput.value.trim().length > 0;
      if (hasRequired && rating > 0) {
        saveBtn.disabled = false;
        saveBtn.classList.add('ready');
        saveBtn.textContent = 'Zapisz w dzienniku';
      } else {
        saveBtn.disabled = true;
        saveBtn.classList.remove('ready');
        saveBtn.textContent = !hasRequired ? 'Uzupełnij wymagane pole' : 'Oceń przydatność modułu';
      }
    }

    learnedInput.addEventListener('input', checkReady);

    saveBtn.addEventListener('click', () => {
      if (!saveBtn.classList.contains('ready')) return;

      state.addJournalEntry({
        moduleId: mod.id,
        moduleTitle: mod.title,
        learned: learnedInput.value.trim(),
        unclear: document.getElementById('unclearInput').value.trim(),
        applied: document.getElementById('appliedInput').value.trim(),
        visualTrick: document.getElementById('visualInput').value.trim(),
        usefulness: rating,
      });

      saveBtn.classList.remove('ready');
      saveBtn.classList.add('saved');
      saveBtn.disabled = true;
      saveBtn.textContent = 'Zapisano';

      const toast = document.getElementById('savedToast');
      toast.classList.add('show');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1400);
    });
  });
})();
