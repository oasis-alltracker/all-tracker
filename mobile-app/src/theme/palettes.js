// Oasis relaunch colour palettes (DS-01).
// Source: docs/oasis_design_system.html + Master Spec §1.
//
// Keys are SEMANTIC (what the colour is for), not descriptive ("cream"),
// so a dark palette can later supply different values under the same names.
// Components must read these through useOasisTheme(); never hard-code hex.
//
// The legacy app theme (src/ValueSheet.js) is separate and unchanged.

const light = {
  colors: {
    // Surfaces
    background: "#faf8f4", // "cream": primary screen background
    surface: "#ffffff", // cards, inputs, pills, badges
    surfaceWarm: "#f5f0e8", // "warm": secondary/nested surfaces
    border: "#ece7de", // dividers, card borders, sheet handle, inactive dots

    // Text
    text: "#2a2825",
    textMuted: "#9a9590",
    placeholder: "#c8c4be", // input placeholder (from mocks)

    // Primary action (dark button) and the text that sits on it
    primary: "#2a2825",
    onPrimary: "#ffffff",

    // Fulfilled / success (universal across features)
    fulfilledBg: "#e4f5ec",
    fulfilledText: "#4a9e6a",
    fulfilledBorder: "#b8e8c4",

    // Semantic accents
    overdue: "#c4724a", // muted terracotta
    accent: "#ede8f8", // lavender: progress views, season chips, soft-selected pills
    accentBorder: "#c8bef0", // border for lavender soft-selected pills (fitness mock)

    // Overlays
    scrim: "rgba(0,0,0,0.35)", // backdrop behind bottom sheets (mocks)
  },

  // Two-stop gradients, drawn top-left → bottom-right (CSS 135deg).
  gradients: {
    nutrition: ["#edfff4", "#e8f8ff"], // green/teal
    fitness: ["#fff0f8", "#f8f0ff"], // pink/purple
    journal: ["#fff8f0", "#fff0f4"], // warm pink/orange
    fulfilled: ["#f4faf4", "#f0f8f0"], // any fulfilled card
    program: ["#f0f0ff", "#f4f0ff"], // fitness active-program card (home mock only)
    completion: ["#faf8f4", "#f5f0e8"], // completion screen (drawn at 160deg)
  },

  // Daily Practice card gradient, one per season (from the home mock).
  // Decided 2026-11-14 over the spec's single lavender/blue gradient.
  // Use: <Card gradient={t.practiceGradients[user.season]} />
  practiceGradients: {
    building: ["#f0ecff", "#e8f0ff"],
    leveling_up: ["#fff4ed", "#fff0e8"],
    flowing: ["#edf4fb", "#e8f4ff"],
    understanding: ["#f5f0fa", "#ede8f8"],
    restoring: ["#f0f0f8", "#ede8f8"],
  },
};

// TODO(dark-mode): the dark-mode visual pass is parked (Master Spec §8).
// Until it is designed, dark mode deliberately renders the light palette so
// new screens never show half-themed colours. Fill this in during that pass.
const dark = light;

export const palettes = { light, dark };
