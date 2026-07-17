(function () {
  const state = window.IStepState;

  document.addEventListener('DOMContentLoaded', () => {
    // Already onboarded (and not here via a fresh reset) — nothing to do here.
    if (state.hasProfile()) {
      window.location.href = 'index.html';
      return;
    }

    let selectedColor = document.querySelector('.swatch.active').dataset.color;
    const nameInput = document.getElementById('botname');
    const ctaBtn = document.getElementById('ctaBtn');
    const arm = document.querySelector('.arm-right');

    function updateCta() {
      const ready = nameInput.value.trim().length > 0;
      ctaBtn.disabled = !ready;
      ctaBtn.classList.toggle('ready', ready);
    }

    nameInput.addEventListener('input', updateCta);
    updateCta();

    document.querySelectorAll('.swatch').forEach((sw) => {
      sw.addEventListener('click', () => {
        document.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
        sw.classList.add('active');
        selectedColor = sw.dataset.color;
        document.documentElement.style.setProperty('--bot-body', selectedColor);

        arm.classList.remove('wave');
        void arm.offsetWidth; // restart the animation
        arm.classList.add('wave');
      });
    });

    ctaBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) return;
      state.saveProfile({ name, color: selectedColor });
      window.location.href = 'index.html';
    });
  });
})();
