const {
  ACTIVITY_TYPES,
  EFFORT_DESCRIPTORS,
  BODY_FEEL_DESCRIPTORS,
} = require("../../utils/fitnessDescriptors");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

// Rules for each field a fitness entry can carry. Optional fields accept null
// so an edit can clear them.
const FIELD_RULES = {
  // Both entry types: when, and the reflection (Fitness Spec §9).
  time: (value) => value === null || typeof value === "string",
  effortDescriptor: (value) =>
    value === null || EFFORT_DESCRIPTORS.includes(value),
  bodyFeelDescriptor: (value) =>
    value === null || BODY_FEEL_DESCRIPTORS.includes(value),
  note: (value) => value === null || typeof value === "string",
  // Movement (Fitness Spec §7).
  activityType: (value) => ACTIVITY_TYPES.includes(value),
  activityLabel: (value) => value === null || isNonEmptyString(value),
  durationMinutes: (value) => Number.isFinite(value) && value > 0,
  // Workout (Fitness Spec §8).
  name: (value) => value === null || typeof value === "string",
  workoutPlanID: (value) => value === null || isNonEmptyString(value),
};

const SHARED_FIELDS = ["time", "effortDescriptor", "bodyFeelDescriptor", "note"];
const MOVEMENT_FIELDS = ["activityType", "activityLabel", "durationMinutes"];
const WORKOUT_FIELDS = ["name", "workoutPlanID"];

// The fields an entry of this type carries. Entries from before entryType
// existed are workouts.
function fieldsFor(entryType) {
  return entryType === "movement"
    ? [...SHARED_FIELDS, ...MOVEMENT_FIELDS]
    : [...SHARED_FIELDS, ...WORKOUT_FIELDS];
}

function presentFields(body, fields) {
  return fields.filter((field) => body?.[field] !== undefined);
}

function fieldsAreValid(body, fields) {
  return fields.every((field) => FIELD_RULES[field](body[field]));
}

// "Other" needs a name for the activity.
function otherHasLabel(body) {
  return body.activityType !== "other" || isNonEmptyString(body.activityLabel);
}

module.exports = {
  fieldsFor,
  presentFields,
  fieldsAreValid,
  otherHasLabel,
};
