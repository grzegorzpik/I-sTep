(function () {
  const state = window.IStepState;
  const levels = window.IStepLevels;

  function celebrateLevelUp(info) {
    const badge = document.getElementById('levelBadge');
    badge.classList.remove('level-up');
    void badge.offsetWidth; // restart the animation
    badge.classList.add('level-up');

    const toast = document.getElementById('levelToast');
    toast.textContent = `Nowy poziom: ${info.name}!`;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function renderLevel() {
    const xp = state.getProgress().xp;
    const info = levels.getLevelInfo(xp);

    document.getElementById('levelBadge').textContent = info.level;
    document.getElementById('levelEyebrow').textContent = `Poziom ${info.level}`;
    document.getElementById('levelName').textContent = info.name;
    document.getElementById('xpNow').textContent = `${xp} XP`;
    document.getElementById('xpValue').textContent = xp;

    const fill = document.getElementById('xpFill');
    const nextLevel = document.getElementById('nextLevel');

    if (info.next) {
      const pct = Math.min(100, (info.xpIntoLevel / info.xpForLevel) * 100);
      fill.style.width = pct + '%';
      document.getElementById('xpNext').textContent = `/ ${info.xpForLevel} XP do poziomu ${info.next.level}`;
      nextLevel.innerHTML = `Kolejny poziom: <b>Poziom ${info.next.level} — ${info.next.name}</b>`;
    } else {
      fill.style.width = '100%';
      document.getElementById('xpNext').textContent = '';
      nextLevel.textContent = 'Kolejne poziomy jeszcze niezaprojektowane.';
    }

    const lastSeen = state.getLastSeenLevel();
    if (lastSeen !== null && info.level > lastSeen) {
      celebrateLevelUp(info);
    }
    state.setLastSeenLevel(info.level);
  }

  function renderCompanion() {
    const profile = state.getProfile();
    document.getElementById('companionName').textContent = profile.name;
    document.documentElement.style.setProperty('--bot-body', profile.color);
    document.querySelectorAll('.swatches-inline .swatch').forEach((sw) => {
      sw.classList.toggle('active', sw.dataset.color === profile.color);
    });
  }

  function renderAll() {
    renderCompanion();
    renderLevel();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!state.hasProfile()) {
      window.location.href = 'onboarding.html';
      return;
    }

    renderAll();

    document.getElementById('portrait').addEventListener('click', () => {
      document.getElementById('swatchesInline').classList.toggle('open');
    });

    document.querySelectorAll('.swatches-inline .swatch').forEach((sw) => {
      sw.addEventListener('click', () => {
        const profile = state.getProfile();
        state.saveProfile({ name: profile.name, color: sw.dataset.color });
        renderCompanion();

        const arm = document.querySelector('.arm-right');
        arm.classList.remove('wave');
        void arm.offsetWidth; // restart the animation
        arm.classList.add('wave');
      });
    });

    document.getElementById('devAddXp').addEventListener('click', () => {
      state.addTestXp(10);
      renderLevel();
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
      const blob = new Blob([state.exportData()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `istep-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });

    const importFile = document.getElementById('importFile');
    const importSub = document.getElementById('importSub');
    document.getElementById('importBtn').addEventListener('click', () => importFile.click());

    importFile.addEventListener('change', () => {
      const file = importFile.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const ok = state.importData(String(reader.result));
        importFile.value = '';
        if (ok) {
          renderAll();
          importSub.textContent = 'Zaimportowano ✓';
        } else {
          importSub.textContent = 'Nieprawidłowy plik kopii zapasowej';
        }
        setTimeout(() => {
          importSub.textContent = 'wczytaj kopię zapasową';
        }, 2500);
      };
      reader.readAsText(file);
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm('Zresetować całą aplikację? Postęp, imię i kolor kompana znikną bezpowrotnie.')) {
        state.resetProgress();
        window.location.href = 'onboarding.html';
      }
    });
  });
})();
