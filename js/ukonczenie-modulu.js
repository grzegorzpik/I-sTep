(function () {
  const state = window.IStepState;
  const content = window.IStepContent;

  const COLORS = ['#4E8FC4', '#E3A83F', '#F3E9D6'];

  function getModuleIdFromUrl() {
    return new URLSearchParams(window.location.search).get('module');
  }

  function findModuleWithIndex(id) {
    const index = content.modules.findIndex((m) => m.id === id);
    return index === -1 ? null : { mod: content.modules[index], index };
  }

  function moduleTotalXp(mod) {
    const lessonsXp = mod.lessons.reduce((sum, l) => sum + (l.xp || 0), 0);
    const exerciseXp = mod.cwiczenie ? mod.cwiczenie.xp || 0 : 0;
    const quizXp = mod.quiz ? mod.quiz.xp || 0 : 0;
    const beaconXp = mod.beacon ? mod.beacon.xp || 0 : 0;
    return lessonsXp + exerciseXp + quizXp + beaconXp;
  }

  function renderGuardState(message) {
    document.getElementById('app').innerHTML =
      `<div class="empty-state">${message} <a href="mapa.html">Wróć do mapy</a></div>`;
  }

  function spawnConfetti() {
    const layer = document.getElementById('confettiLayer');
    layer.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const size = 5 + Math.random() * 4;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = Math.random() * 100 + '%';
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      const duration = 1.6 + Math.random() * 1.2;
      const delay = Math.random() * 0.5;
      el.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;
      layer.appendChild(el);
    }
  }

  function countXp(target) {
    const el = document.getElementById('xpVal');
    let current = 0;
    const step = () => {
      current += Math.max(1, Math.round(target / 20));
      if (current >= target) {
        el.textContent = '+' + target + ' XP';
        return;
      }
      el.textContent = '+' + current + ' XP';
      requestAnimationFrame(step);
    };
    setTimeout(step, 1150);
  }

  function playSequence(targetXp) {
    const flash = document.getElementById('flash');
    flash.classList.remove('go');

    ['eyebrow', 'headline', 'modName', 'botShadow', 'botVictory', 'xpPanel', 'actions'].forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove('in');
      void el.offsetWidth; // restart the animation
    });
    document.querySelector('.bot-victory').classList.remove('walk');

    spawnConfetti();
    void flash.offsetWidth;
    flash.classList.add('go');

    requestAnimationFrame(() => {
      ['eyebrow', 'headline', 'modName', 'botShadow', 'botVictory', 'xpPanel', 'actions'].forEach((id) => {
        document.getElementById(id).classList.add('in');
      });
      document.querySelector('.bot-victory').classList.add('walk');
    });

    document.getElementById('xpVal').textContent = '+0 XP';
    countXp(targetXp);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.hasProfile()) {
      window.location.href = 'onboarding.html';
      return;
    }

    const modId = getModuleIdFromUrl();
    const found = modId && findModuleWithIndex(modId);

    if (!found || !state.hasJournalEntryForModule(found.mod.id)) {
      renderGuardState('Ten ekran pojawia się dopiero po zapisaniu retrospekcji dla ukończonego modułu.');
      return;
    }

    const { mod, index } = found;
    const profile = state.getProfile();

    document.documentElement.style.setProperty('--module-accent', mod.accent);
    document.documentElement.style.setProperty('--bot-body', profile.color);
    document.getElementById('eyebrow').textContent = `MODUŁ ${index} · ZAMKNIĘTY`;
    document.getElementById('modName').textContent = mod.title;

    document.getElementById('diplomaBtn').addEventListener('click', () => {
      window.location.href = `dziennik.html?tab=dyplomy&module=${encodeURIComponent(mod.id)}`;
    });
    document.getElementById('replay').addEventListener('click', () => playSequence(moduleTotalXp(mod)));

    playSequence(moduleTotalXp(mod));
  });
})();
