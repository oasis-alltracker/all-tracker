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

// Onboarding habit suggestions (oasis_onboarding_flow.html). The Master Spec
// says suggestions are season-aware, but the per-season suggestion library is
// parked (§5 "Parked"), so every season uses the mock's set for now.
// TODO(copy): per-season suggestions once the library is defined.
export const DEFAULT_HABIT_SUGGESTIONS = [
  { emoji: "🧘", name: "Meditate" },
  { emoji: "💧", name: "Drink water" },
  { emoji: "📖", name: "Read" },
  { emoji: "🚶", name: "Go for a walk" },
  { emoji: "✍️", name: "Journal" },
  { emoji: "🌿", name: "Drink tea" },
  { emoji: "🛏️", name: "Sleep by 10pm" },
  { emoji: "🧠", name: "Learn something" },
];

// Onboarding tasks screen: the same in every season that has one (Phase 1).
const ONBOARDING_TASKS = {
  question: "What do you want to tackle this week?",
  guidance:
    "Start with 1–3 things that would genuinely move you forward this week.",
};

// Closing "also" lines (decided 2026-11-17): the mock's wording, shared by
// every season. Everyone journals in onboarding, so it's "deeper Journal
// features". Flowing/Understanding/Restoring add Tasks; Leveling Up adds a
// line pairing training with reflection, so it doesn't assume the growth is
// physical.
const CLOSING_ALSO_WITHOUT_TASKS =
  "Oasis also includes Tasks, Nutrition, Fitness, and deeper Journal features. You can set those up anytime from the app.";

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
    reflectiveNutritionQuestion:
      "Did this meal fuel what you're building today?",
    onboarding: {
      // Season card line: the mock's one-liner (decided 2026-11-15 over
      // Phase 1's longer descriptions).
      description: "Establishing new foundations and patterns",
      steps: ["habits", "tasks", "journal"],
      habits: {
        question: "What would you like to make part of who you're becoming?",
        guidance:
          "The best habits to start with are small, specific, and meaningful to you. Pick 2–3 that feel genuinely exciting — not just impressive.",
        suggestions: DEFAULT_HABIT_SUGGESTIONS,
        skippable: false,
      },
      tasks: ONBOARDING_TASKS,
      closingAlso:
        "Oasis also includes Nutrition, Fitness, and deeper Journal features. You can set those up anytime from the app.",
    },
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
    onboarding: {
      description: "Already in motion, ready to push further",
      steps: ["habits", "tasks", "journal"],
      habits: {
        question: "What would you like to make part of who you're becoming?",
        guidance:
          "You're ready to push further. Choose habits that challenge you — but stay specific and keep it to 2–3 to start.",
        suggestions: DEFAULT_HABIT_SUGGESTIONS,
        skippable: false,
      },
      tasks: ONBOARDING_TASKS,
      closingAlso:
        "Oasis also includes Nutrition, Fitness, and deeper Journal features. Log a workout when you're ready to train, or go deeper in your journal when you're ready to reflect. You can set those up anytime from the app.",
    },
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
    onboarding: {
      description: "Maintaining what works, without pressure",
      // No tasks: Flowing users aren't primarily task-driven (Phase 1).
      steps: ["habits", "journal"],
      habits: {
        question: "What practices are already working for you?",
        guidance:
          "Flowing isn't about doing more. It's about staying connected to what already serves you. Add 2–3 habits you want to keep showing up for.",
        suggestions: DEFAULT_HABIT_SUGGESTIONS,
        skippable: false,
      },
      tasks: null,
      closingAlso: CLOSING_ALSO_WITHOUT_TASKS,
    },
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
    onboarding: {
      description: "Going inward, seeking clarity and patterns",
      // Journal leads, as in Restoring (Phase 1).
      steps: ["journal", "habits"],
      habits: {
        question: "What practices help you feel more like yourself?",
        guidance:
          "In a season of understanding, the best habits are the ones that create space — for stillness, reflection, and noticing.",
        suggestions: DEFAULT_HABIT_SUGGESTIONS,
        // Skippable (decided 2026-11-17): a noticing season, no pressure to commit.
        skippable: true,
      },
      tasks: null,
      closingAlso: CLOSING_ALSO_WITHOUT_TASKS,
    },
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
    onboarding: {
      description: "A quieter chapter — rest, care, and release",
      steps: ["journal", "habits"],
      habits: {
        question:
          "Is there one small thing you'd like to do for yourself each day?",
        guidance:
          "It doesn't have to be ambitious. Even the smallest act of care counts. And if now isn't the right time — that's okay too. You can always come back to this.",
        suggestions: DEFAULT_HABIT_SUGGESTIONS,
        // "One small thing" (decided 2026-11-17): picking another swaps it.
        max: 1,
        // Skippable per Phase 1 ("practicing what the season preaches").
        skippable: true,
      },
      tasks: null,
      closingAlso: CLOSING_ALSO_WITHOUT_TASKS,
    },
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
    if (__DEV__)
      console.warn(`[theme] Unknown season "${key}", using building`);
    return seasons.building;
  }
  return season;
}
