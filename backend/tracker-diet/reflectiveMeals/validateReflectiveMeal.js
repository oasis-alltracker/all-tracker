const {
  FEELING_DESCRIPTORS,
  BODY_FEELING_DESCRIPTORS,
} = require("../../utils/nutritionDescriptors");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

// A list of distinct values from the allowed pills (empty = skipped).
function isPillList(value, allowed) {
  return (
    Array.isArray(value) &&
    value.every((pill) => allowed.includes(pill)) &&
    new Set(value).size === value.length
  );
}

// Rules for each field a reflective meal can carry. Optional text fields
// accept null so an edit can clear them.
const FIELD_RULES = {
  mealDescription: isNonEmptyString,
  feelingDescriptors: (value) => isPillList(value, FEELING_DESCRIPTORS),
  bodyFeelingDescriptors: (value) => isPillList(value, BODY_FEELING_DESCRIPTORS),
  note: (value) => value === null || typeof value === "string",
  time: (value) => value === null || typeof value === "string",
};
const EDITABLE_FIELDS = Object.keys(FIELD_RULES);

function presentFields(body) {
  return EDITABLE_FIELDS.filter((field) => body?.[field] !== undefined);
}

function fieldsAreValid(body, fields) {
  return fields.every((field) => FIELD_RULES[field](body[field]));
}

module.exports = { presentFields, fieldsAreValid };
