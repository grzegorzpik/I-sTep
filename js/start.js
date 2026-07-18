(function () {
  const state = window.IStepState;

  // Render the companion in the user's own color once we already know it,
  // instead of the generic default — this is meant to feel like *their* app.
  const profile = state.getProfile();
  if (profile) {
    document.documentElement.style.setProperty('--bot-body', profile.color);
  }
  const destination = profile ? 'mapa.html' : 'onboarding.html';

  function playIntro() {
    const stage = document.getElementById('stage');
    const chevron = document.getElementById('chevron');
    const text = document.getElementById('wordmarkText');
    const flagGroup = document.getElementById('flagGroup');
    const pole = document.getElementById('pole');
    const flag = document.getElementById('flag');
    const companion = document.getElementById('companion');
    const subtitle = document.getElementById('subtitle');
    let lockedChevronTransform = '';

    // 1. wordmark appears
    text.classList.add('enter');
    chevron.classList.add('enter');

    // 2. hold, then measure real positions and send the chevron flying toward stage-center
    setTimeout(() => {
      const stageRect = stage.getBoundingClientRect();
      const chevRect = chevron.getBoundingClientRect();

      const chevCenterX = chevRect.left + chevRect.width / 2;
      const chevCenterY = chevRect.top + chevRect.height / 2;
      const targetCenterX = stageRect.left + stageRect.width / 2;
      const targetCenterY = stageRect.top + stageRect.height / 2 - 10; // slightly above dead-center

      const dx = targetCenterX - chevCenterX;
      const dy = targetCenterY - chevCenterY;
      const scale = 3.6; // how much bigger the landed mountain is vs. the small wordmark chevron

      chevron.style.setProperty('--dx', dx + 'px');
      chevron.style.setProperty('--dy', dy + 'px');
      chevron.style.setProperty('--scale', scale);
      lockedChevronTransform = `translate(${dx}px, ${dy}px) rotate(-92deg) scale(${scale})`;

      text.classList.remove('enter');
      text.classList.add('exit');
      chevron.classList.remove('enter');
      chevron.style.opacity = '1';
      chevron.classList.add('travel');
    }, 900);

    // 3. once it lands, lock its pose, then measure where it ACTUALLY ended up on screen
    setTimeout(() => {
      chevron.style.transform = lockedChevronTransform;
      chevron.classList.remove('travel');

      const stageRect = stage.getBoundingClientRect();
      const landedRect = chevron.getBoundingClientRect();
      const tipRect = document.getElementById('chevronTip').getBoundingClientRect();

      // peak = the actual visible tip block (not the invisible rotated SVG rectangle, which is bigger)
      const peakX = tipRect.left + tipRect.width / 2 - stageRect.left;
      const peakY = tipRect.top + tipRect.height / 2 - stageRect.top;
      const baseX = landedRect.left - stageRect.left - 6;
      const baseY = landedRect.top + landedRect.height - stageRect.top - 10;

      // position the flag group so its bottom-center sits exactly on the peak
      flagGroup.style.left = peakX + 'px';
      flagGroup.style.top = peakY - 26 + 'px';
      flagGroup.style.transform = 'translateX(-50%)';

      // set companion's walk path as CSS custom properties (start -> three midpoints -> peak)
      companion.style.setProperty('--startX', baseX + 'px');
      companion.style.setProperty('--startY', baseY + 'px');
      companion.style.setProperty('--p1X', baseX + (peakX - baseX) * 0.3 + 'px');
      companion.style.setProperty('--p1Y', baseY + (peakY - baseY) * 0.3 + 'px');
      companion.style.setProperty('--p2X', baseX + (peakX - baseX) * 0.6 + 'px');
      companion.style.setProperty('--p2Y', baseY + (peakY - baseY) * 0.6 + 'px');
      companion.style.setProperty('--p3X', baseX + (peakX - baseX) * 0.85 + 'px');
      companion.style.setProperty('--p3Y', baseY + (peakY - baseY) * 0.85 + 'px');
      companion.style.setProperty('--peakX', peakX - 30 + 'px');
      companion.style.setProperty('--peakY', peakY + 2 + 'px');
    }, 1700);

    // 4. companion walks up
    setTimeout(() => {
      companion.classList.add('walk-in');
    }, 1900);

    // 5. at the summit: reach down and plant the flag
    setTimeout(() => {
      companion.style.opacity = '1';
      companion.style.transform = 'translate(var(--peakX), var(--peakY))';
      companion.classList.remove('walk-in');
      companion.classList.add('planting');
      flagGroup.classList.add('show');
      pole.classList.add('grow');
    }, 3600);

    setTimeout(() => {
      flag.classList.add('unfurl');
    }, 3850);

    // 6. celebrate
    setTimeout(() => {
      companion.classList.remove('planting');
      companion.classList.add('victory');
    }, 4130);

    // subtitle fades in once the flag is fully up and the celebration begins
    setTimeout(() => {
      subtitle.classList.add('show');
    }, 4350);

    // 7. idle bob — mountain, companion, and flag all breathe gently together
    setTimeout(() => {
      chevron.classList.add('idle');
      companion.classList.add('idle');
      flagGroup.style.opacity = '1'; // lock visibility before swapping animation
      flagGroup.classList.remove('show');
      flagGroup.classList.add('idle');
    }, 4430);

    // 8. hold the moment briefly, then hand off to onboarding or the map
    setTimeout(() => {
      window.location.href = destination;
    }, 5300);
  }

  window.addEventListener('load', playIntro);
})();
