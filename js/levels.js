/*
 * Nazwane poziomy — tylko te, które faktycznie zaprojektowano (zasada
 * "nie projektuj na zapas"). Kolejne nazwy poza ostatnim wpisem świadomie
 * nie istnieją, żeby nie zdradzać progresji z góry.
 */
window.IStepLevels = (function () {
  const LEVELS = [
    { level: 1, name: 'Nowicjusz Sieci', minXp: 0 },
    { level: 2, name: 'Odkrywca Danych', minXp: 50 },
    { level: 3, name: 'Architekt Przepływów', minXp: 150 },
  ];

  function getLevelInfo(xp) {
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
      if (xp >= lvl.minXp) current = lvl;
    }
    const next = LEVELS[LEVELS.indexOf(current) + 1] || null;

    return {
      level: current.level,
      name: current.name,
      xpIntoLevel: xp - current.minXp,
      xpForLevel: next ? next.minXp - current.minXp : null,
      next: next ? { level: next.level, name: next.name } : null,
    };
  }

  return { getLevelInfo };
})();
