(function () {
  const state = window.IStepState;

  // Render the companion in the user's own color once we already know it,
  // instead of the generic default — this is meant to feel like *their* app.
  const profile = state.getProfile();
  if (profile) {
    document.documentElement.style.setProperty('--bot-body', profile.color);
  }
  const destination = profile ? 'mapa.html' : 'onboarding.html';

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('stage').classList.add('in');
    document.getElementById('wordmarkBottom').classList.add('in');

    // Trigger the blink explicitly rather than looping it ambiently — the
    // splash is on screen so briefly that an ambient loop might never
    // land inside the visible window.
    setTimeout(() => {
      document.querySelector('.eyes').classList.add('blink-once');
    }, 900);

    setTimeout(() => {
      window.location.href = destination;
    }, 2100);
  });
})();
