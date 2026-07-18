/*
 * Small pixel-art icons shared across screens (map beacon node,
 * bootcamp hero banner, ...), kept in one place so they stay identical.
 */
window.IStepIcons = {
  // Same silhouette everywhere, but the roof and window glow pick up the
  // module's own accent colors so each module's bootcamp building reads as
  // visually distinct on the map instead of all being an identical blue-lit
  // building regardless of which module they belong to.
  beacon: (mod) => {
    const roof = (mod && mod.accentDark) || '#9C6C1F';
    const glow = (mod && mod.accent) || '#4E8FC4';
    return `
    <svg class="beacon-icon" viewBox="0 0 20 14" shape-rendering="crispEdges">
      <rect x="0" y="0" width="20" height="4" fill="${roof}"/>
      <rect x="1" y="1" width="18" height="0.7" fill="#0C0910" opacity=".3"/>
      <rect x="1" y="2.4" width="18" height="0.7" fill="#0C0910" opacity=".3"/>
      <rect x="-1" y="4" width="22" height="1.2" fill="#0C0910"/>
      <rect x="1" y="5.2" width="18" height="8.8" fill="#F3E9D6" stroke="#0C0910" stroke-width="0.6"/>
      <rect x="3" y="6.8" width="4" height="3" fill="${glow}" stroke="#0C0910" stroke-width="0.4"/>
      <rect x="13" y="6.8" width="4" height="3" fill="${glow}" stroke="#0C0910" stroke-width="0.4"/>
      <rect x="8" y="6.2" width="4" height="7.8" fill="#0C0910"/>
      <rect x="8.4" y="6.8" width="3.2" height="1.4" fill="#E3A83F"/>
      <rect x="8.6" y="9.6" width="1.3" height="3.2" fill="#F3E9D6"/>
      <rect x="10.1" y="9.6" width="1.3" height="3.2" fill="#F3E9D6"/>
    </svg>`;
  },
};
