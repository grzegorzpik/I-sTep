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
      `<div class="empty-state">${message} <a href="mapa.html">Wróć do mapy</a></div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.hasProfile()) {
      window.location.href = 'onboarding.html';
      return;
    }

    const modId = getModuleIdFromUrl();
    const mod = modId && findModule(modId);
    const exercise = mod && mod.cwiczenie;

    if (!mod || !exercise || !exercise.steps || !exercise.steps.length) {
      renderGuardState('To ćwiczenie nie jest jeszcze dostępne.');
      return;
    }

    const lessonsDone = mod.lessons.every((l) => state.isLessonDone(l.id));
    if (!lessonsDone) {
      renderGuardState('To ćwiczenie pojawia się dopiero po ukończeniu wszystkich mikrolekcji tego modułu.');
      return;
    }

    document.documentElement.style.setProperty('--module-accent', mod.accent);
    document.getElementById('eyebrow').textContent = exercise.eyebrowLesson || mod.eyebrow;
    document.getElementById('exerciseTitle').textContent = exercise.title;
    document.getElementById('instruction').textContent = exercise.instruction;

    const STEPS = exercise.steps;
    let order = []; // step ids in the order the user placed them
    let checked = false;
    let wrongAttempts = 0;

    const slotsEl = document.getElementById('orderSlots');
    slotsEl.innerHTML = STEPS.map((_, i) => `<div class="slot" data-index="${i}"></div>`).join('');
    const slotEls = Array.from(document.querySelectorAll('.slot'));

    const checkBtn = document.getElementById('checkBtn');
    const resultMsg = document.getElementById('resultMsg');

    function shuffledSteps() {
      const arr = [...STEPS];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function renderPool() {
      const pool = document.getElementById('pool');
      pool.innerHTML = '';
      shuffledSteps().forEach((step) => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = step.text;
        chip.dataset.id = step.id;
        if (order.includes(step.id)) chip.classList.add('used');
        chip.addEventListener('click', () => placeStep(step.id));
        pool.appendChild(chip);
      });
    }

    function renderSlots() {
      slotEls.forEach((slot, i) => {
        const stepId = order[i];
        slot.classList.remove('checked-ok', 'checked-bad');
        if (stepId) {
          const step = STEPS.find((s) => s.id === stepId);
          slot.classList.add('filled');
          slot.innerHTML = `<span class="slot-num">${i + 1}</span><span class="slot-text">${step.text}</span>`;
        } else {
          slot.classList.remove('filled');
          slot.innerHTML = `<span class="slot-num">${i + 1}</span><span class="slot-placeholder">${i === 0 ? 'dotknij krok poniżej' : '—'}</span>`;
        }
      });

      if (order.length === STEPS.length && !checked) {
        checkBtn.disabled = false;
        checkBtn.classList.add('ready');
        checkBtn.textContent = 'Sprawdź kolejność';
      }
    }

    function placeStep(id) {
      if (checked || order.includes(id) || order.length >= STEPS.length) return;
      order.push(id);
      renderPool();
      renderSlots();
    }

    slotEls.forEach((slot) => {
      slot.addEventListener('click', () => {
        if (checked) return;
        const i = parseInt(slot.dataset.index, 10);
        if (order[i]) {
          order.splice(i, 1);
          renderPool();
          renderSlots();
        }
      });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      order = [];
      checked = false;
      checkBtn.disabled = true;
      checkBtn.classList.remove('ready', 'done');
      checkBtn.textContent = 'Sprawdź kolejność';
      resultMsg.classList.remove('show');
      resultMsg.innerHTML = '';
      renderPool();
      renderSlots();
    });

    checkBtn.addEventListener('click', function () {
      if (this.classList.contains('retry')) {
        checked = false;
        order = [];
        this.classList.remove('retry');
        this.disabled = true;
        this.textContent = 'Sprawdź kolejność';
        resultMsg.classList.remove('show');
        resultMsg.innerHTML = '';
        renderPool();
        renderSlots();
        return;
      }

      if (!this.classList.contains('ready')) return;

      let allCorrect = true;
      slotEls.forEach((slot, i) => {
        const step = STEPS.find((s) => s.id === order[i]);
        const ok = step.correctIndex === i;
        slot.classList.add(ok ? 'checked-ok' : 'checked-bad');
        if (!ok) allCorrect = false;
      });

      checked = true;
      this.classList.remove('ready');

      if (allCorrect) {
        state.completeLesson(exercise.id, exercise.xp || 0);
        this.textContent = 'Zaliczone';
        this.disabled = true;
        this.classList.add('done');

        const toast = document.getElementById('xpToast');
        toast.textContent = `+${exercise.xp || 0} XP`;
        toast.classList.add('show');

        setTimeout(() => {
          window.location.href = 'mapa.html';
        }, 1200);
      } else {
        wrongAttempts++;
        this.textContent = 'Spróbuj jeszcze raz';
        this.classList.add('retry');

        let html = 'Niestety, ta kolejność nie jest poprawna.';
        if (wrongAttempts >= 2 && exercise.hint) {
          html += `<div class="hint">${exercise.hint}</div>`;
        }
        resultMsg.innerHTML = html;
        resultMsg.classList.add('show');
      }
    });

    renderPool();
    renderSlots();
  });
})();
