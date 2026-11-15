// Shadows (DS-01).
//
// RN 0.76+ on the New Architecture supports the CSS-style `boxShadow` prop on
// both iOS and Android, so these match the spec exactly. The older
// shadowOpacity/elevation pair from the design-system HTML renders much
// heavier on Android (elevation ignores the 0.04 opacity), so it isn't used.
export const shadow = {
  card: { boxShadow: "0 2px 14px rgba(0,0,0,0.04)" }, // primary cards (Master Spec §1)
  sm: { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }, // buttons, avatar, menu button
  none: {},
};
