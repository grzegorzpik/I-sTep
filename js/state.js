/*
 * Jedyne miejsce w aplikacji, które dotyka localStorage.
 * Podmiana na IndexedDB/backend w przyszłości = zmiana tylko tego pliku.
 */
(function () {
  const STORAGE_KEY = 'istep_progress_v1';
  const PROFILE_KEY = 'istep_profile_v1';

  function getProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { xp: 0, lessonsDone: {} };
    try {
      const parsed = JSON.parse(raw);
      return {
        xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
        lessonsDone: parsed.lessonsDone || {},
      };
    } catch (e) {
      return { xp: 0, lessonsDone: {} };
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function isLessonDone(lessonId) {
    return !!getProgress().lessonsDone[lessonId];
  }

  function completeLesson(lessonId, xpValue) {
    const progress = getProgress();
    if (progress.lessonsDone[lessonId]) return progress;
    progress.lessonsDone[lessonId] = true;
    progress.xp += xpValue || 0;
    saveProgress(progress);
    return progress;
  }

  // Name only changes via a full reset (see koncepcja: "imię tylko przez reset"),
  // so resetProgress() intentionally wipes both progress and profile.
  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
  }

  function getProfile() {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed && parsed.name ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function hasProfile() {
    return !!getProfile();
  }

  function saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  window.IStepState = {
    getProgress,
    isLessonDone,
    completeLesson,
    resetProgress,
    getProfile,
    hasProfile,
    saveProfile,
  };
})();
