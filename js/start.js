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

    setTimeout(() => {
      window.location.href = destination;
    }, 1900);
  });
})();
