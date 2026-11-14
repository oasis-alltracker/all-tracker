// Fitness Spec §7 and §9. Shared by movement and workout entries.
const ENTRY_TYPES = ["movement", "workout"];

const ACTIVITY_TYPES = [
  "walk",
  "run",
  "yoga",
  "swim",
  "stretch",
  "cycle",
  "other",
];

// "How was the effort?": Easy · Steady · Hard · Pushed it · Gentle · Exhausting
const EFFORT_DESCRIPTORS = [
  "easy",
  "steady",
  "hard",
  "pushed_it",
  "gentle",
  "exhausting",
];

// "How does your body feel after?": Energized · Strong · Tired · Sore · Clear · Calm · Depleted · Lighter
const BODY_FEEL_DESCRIPTORS = [
  "energized",
  "strong",
  "tired",
  "sore",
  "clear",
  "calm",
  "depleted",
  "lighter",
];

module.exports = {
  ENTRY_TYPES,
  ACTIVITY_TYPES,
  EFFORT_DESCRIPTORS,
  BODY_FEEL_DESCRIPTORS,
};
