// Season config: the single source of truth for season-driven copy (DS-01).
// "Season modulates tone, not structure": screens read copy from here and
// never branch layout on season.
//
// Sources: Master Spec §2–§6 (greeting, Daily Practice title, journal prompt,
// nutrition/fitness unfulfilled copy, examples), Phase 1 Master Strategy.
// Keys match the backend `user.season` values.
//
// Copy the specs don't define yet is `null` with a TODO(copy) marker.
// Do NOT fill these in without product sign-off (see CLAUDE.md "Gaps").
// The dev gallery highlights every null so the gaps stay visible.

export const SEASON_KEYS = [
  "building",
  "leveling_up",
  "flowing",
  "understanding",
  "restoring",
];

export const seasons = {
  building: {
    key: "building",
    emoji: "🪴",
    name: "Building",
    greeting: "You're building something real.",
    practiceTitle: "My Foundations",
    journalPrompt: "Who are you building toward?",
    nutritionUnfulfilled: "Nourish what you're building.",
    fitnessUnfulfilled: "Your movement, your way.",
    journalAffirmation: "Keep showing up — that's how it's built.",
    // From the design-system HTML's season config (spec only defines
    // Restoring); adopted 2026-11-14.
    emptyTasks: "What's one thing that would make today count?",
    reflectiveNutritionQuestion: "Did this meal fuel what you're building today?",
  },
  leveling_up: {
    key: "leveling_up",
    emoji: "🔥",
    name: "Leveling Up",
    greeting: "What are you pushing toward today?",
    practiceTitle: "My Standards",
    journalPrompt: "What would leveling up actually look like for you?",
    nutritionUnfulfilled: "Nourish the effort.",
    fitnessUnfulfilled: "Bring what you've got today.",
    journalAffirmation: null, // TODO(copy): undefined in spec
    emptyTasks: null, // TODO(copy): undefined in spec
    reflectiveNutritionQuestion: null, // TODO(copy): undefined in spec
  },
  flowing: {
    key: "flowing",
    emoji: "🌊",
    name: "Flowing",
    greeting: "Let today flow.",
    practiceTitle: "My Flow",
    journalPrompt: "What does feeling in flow mean to you right now?",
    nutritionUnfulfilled: "Nourish the flow.",
    fitnessUnfulfilled: "Move however feels right.",
    journalAffirmation: null, // TODO(copy): undefined in spec
    emptyTasks: null, // TODO(copy): undefined in spec
    reflectiveNutritionQuestion: null, // TODO(copy): undefined in spec
  },
  understanding: {
    key: "understanding",
    emoji: "🔍",
    name: "Understanding",
    greeting: "What are you noticing today?",
    practiceTitle: "My Intentions",
    journalPrompt: "What pattern in your life is asking for your attention?",
    nutritionUnfulfilled: "Notice how food makes you feel.",
    fitnessUnfulfilled: "Your body knows what it needs.",
    journalAffirmation: null, // TODO(copy): undefined in spec
    emptyTasks: null, // TODO(copy): undefined in spec
    reflectiveNutritionQuestion: null, // TODO(copy): undefined in spec
  },
  restoring: {
    key: "restoring",
    emoji: "🌙",
    name: "Restoring",
    greeting: "Be gentle with yourself today.",
    practiceTitle: "Today's Essentials",
    journalPrompt:
      "What are you giving yourself permission to let go of this season?",
    nutritionUnfulfilled: "Nourish yourself gently.",
    fitnessUnfulfilled: "Move if it feels good today.",
    journalAffirmation: null, // TODO(copy): undefined in spec
    emptyTasks: "Nothing pressing. Rest well.",
    reflectiveNutritionQuestion: null, // TODO(copy): undefined in spec
  },
};

// Copy that is the same in every season (Master Spec §3–§6).
export const universalCopy = {
  journalFulfilled: "Reflected today.",
  fitnessFulfilled: "Moved today.",
  nutritionReflectiveFulfilled: "Nourished today.",
  nutritionTrackingFulfilled: (kcal) => `${kcal} kcal today.`,
  emptyHabits: "What would you like to make part of who you're becoming?",
  backToHome: "Back to home",
};

// Returns the config for a season key. An unknown or missing key falls back
// to Building (with a dev warning) so a bad value never crashes a screen.
export function getSeason(key) {
  const season = seasons[key];
  if (!season) {
    if (__DEV__) console.warn(`[theme] Unknown season "${key}", using building`);
    return seasons.building;
  }
  return season;
}
