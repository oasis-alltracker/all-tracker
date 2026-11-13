// A habit's history is an append-only list of { status, season, dateStamp, ... }
// events, one per create / close / reopen. Habits from before history existed
// have none and are treated as active.

// The status in effect on dateStamp: the last event on or before that day.
// Days before the first event fall back to active, matching how habits were
// always listed before.
function statusOn(habit, dateStamp) {
  const events = (habit?.history ?? []).filter(
    (event) => event.dateStamp <= `${dateStamp}`,
  );
  return events.length ? events[events.length - 1].status : "active";
}

function isClosedOn(habit, dateStamp) {
  return statusOn(habit, dateStamp) === "closed";
}

function currentStatus(habit) {
  return habit?.status ?? "active";
}

// dateStamp of the most recent create/reopen, or undefined for habits with no
// history (their chapter runs from their first completion).
function currentChapterStart(habit) {
  const opens = (habit?.history ?? []).filter(
    (event) => event.status === "active",
  );
  return opens.length ? opens[opens.length - 1].dateStamp : undefined;
}

module.exports = { statusOn, isClosedOn, currentStatus, currentChapterStart };
