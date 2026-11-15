// Border radius scale (DS-01).
// Source: docs/oasis_design_system.html "Border Radius", plus `item: 14`
// from Master Spec §1 ("22px primary, 16px secondary, 14px items"),
// which the HTML scale leaves out.
export const radius = {
  xs: 4, // count badge
  sm: 8, // task check, food items
  md: 12, // small cards, inputs
  item: 14, // list items, recap boxes
  lg: 16, // secondary cards, meal sections, primary button
  xl: 20, // featured cards
  xxl: 22, // primary home cards
  sheet: 28, // bottom sheet top corners
  pill: 999,
};
