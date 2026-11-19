// Onboarding copy that is the same in every season. Season-specific copy
// (descriptions, habit questions, closing lines) lives in theme/seasons.js.
//
// Sources: Phase 1 Master Strategy Part 3 (welcome, season question);
// oasis_onboarding_flow.html where the spec is silent (journal screen header,
// closing title, buttons); name screen approved 2026-11-15 (not in the specs).
export const copy = {
  welcome: {
    line1: "Welcome to your oasis.",
    line2: "A space built around\nwho you're becoming.",
    line3: "Take it one season at a time.",
    button: "Begin",
  },
  name: {
    label: "Welcome",
    question: "What should we call you?",
    placeholder: "Your first name",
    helper: "This space is yours —\nit'll greet you by name each day.",
  },
  season: {
    question: "What is your intention for this season?",
  },
  habits: {
    label: "Habits",
    addOwn: "+ Add your own",
    addOwnTitle: "Add your own",
    addOwnPlaceholder: "Name your habit...",
    // Icon for a habit the user names themselves. Not in the specs; the
    // Daily Practice card's ✦ mark keeps it neutral and on-brand.
    customEmoji: "✦",
  },
  tasks: {
    label: "Tasks",
    placeholder: "Add a task...",
  },
  journal: {
    label: "A moment before you begin",
    question: "Take a breath. Then write.",
    boxLabel: "Your first entry",
    placeholder: "Write freely — there are no wrong answers...",
  },
  closing: {
    title: "Your oasis is ready.",
    alsoLabel: "Also available when you're ready",
    button: "Enter my oasis",
  },
  continue: "Continue",
  done: "Done", // tasks footer while typing
  skip: "Skip for now",
  saveFailed: {
    title: "Something went wrong",
    body: "Please check your connection and try again.",
  },
};

// "You're in a Building season." / "You're in an Understanding season.",
// in parts so the season name can be set in a stronger weight.
export function seasonLine(seasonName) {
  const article = /^[aeiou]/i.test(seasonName) ? "an" : "a";
  return {
    before: `You're in ${article} `,
    name: seasonName,
    after: " season.",
  };
}

// The mock's "Your habits, tasks, and first journal entry are waiting for
// you.", trimmed to what the user actually added. Null when they added nothing.
export function waitingLine({ habits, tasks, journal }) {
  const items = [];
  if (habits) items.push(habits === 1 ? "habit" : "habits");
  if (tasks) items.push(tasks === 1 ? "task" : "tasks");
  if (journal) items.push("first journal entry");
  if (items.length === 0) return null;

  const list =
    items.length === 1
      ? items[0]
      : items.length === 2
        ? `${items[0]} and ${items[1]}`
        : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  const plural = items.length > 1 || habits > 1 || tasks > 1;
  return `Your ${list} ${plural ? "are" : "is"} waiting for you.`;
}
