// Counts a habit's completed days from its habitStatus rows. Shared by closing a
// habit (B-06) and the habit progress view (B-07).
//
// A day is complete when:
//   positive habit: that day's count >= threshold
//   negative habit: that day's count < threshold, or nothing was logged
// Each status row keeps the threshold in effect when it was logged.

function dateOf(statusOrSeason) {
  return statusOrSeason.SK.substring(0, 8);
}

function toDate(dateStamp) {
  return new Date(
    Date.UTC(
      parseInt(dateStamp.substring(0, 4)),
      parseInt(dateStamp.substring(4, 6)) - 1,
      parseInt(dateStamp.substring(6, 8)),
    ),
  );
}

function toDateStamp(date) {
  return date.toISOString().substring(0, 10).replace(/-/g, "");
}

function daysBetween(startDateStamp, endDateStamp) {
  const days = [];
  for (
    let day = toDate(startDateStamp);
    day <= toDate(endDateStamp);
    day.setUTCDate(day.getUTCDate() + 1)
  ) {
    days.push(toDateStamp(day));
  }
  return days;
}

function addDays(dateStamp, days) {
  const date = toDate(dateStamp);
  date.setUTCDate(date.getUTCDate() + days);
  return toDateStamp(date);
}

function isCompleteDay(habit, status) {
  const threshold = status?.threshold ?? habit.threshold;
  if (habit.isPositive) {
    return status?.count !== undefined && status.count >= threshold;
  }
  return status?.count === undefined || status.count < threshold;
}

// seasons: rows from the season history entity (SK starts with dateStamp).
// Returns the season the user was in on dateStamp, or null before their first.
function seasonOn(seasons, dateStamp) {
  var season = null;
  for (const row of seasons) {
    if (dateOf(row) <= dateStamp) {
      season = row.season;
    }
  }
  return season;
}

// statuses: this habit's habitStatus rows between startDate and endDate.
// First logged day of a habit, or undefined if nothing was ever logged.
function firstLoggedDay(statuses) {
  return statuses.map(dateOf).sort()[0];
}

// Sorted dateStamps of completed days between startDate and endDate.
// startDate may be undefined for habits with no history; the count then starts
// at their first logged day.
function completedDaysBetween(habit, statuses, startDate, endDate) {
  const statusByDay = new Map(statuses.map((status) => [dateOf(status), status]));

  var days;
  if (habit.isPositive) {
    days = [...statusByDay.keys()];
  } else {
    const start = startDate ?? firstLoggedDay(statuses) ?? endDate;
    days = daysBetween(start, endDate);
  }

  return days
    .filter((day) => (!startDate || day >= startDate) && day <= endDate)
    .filter((day) => isCompleteDay(habit, statusByDay.get(day)))
    .sort();
}

// [{ season, completions }] in the order seasons first appear.
function completionsBySeasonFor(completedDays, seasons) {
  const sortedSeasons = [...seasons].sort((a, b) => (a.SK < b.SK ? -1 : 1));
  const completionsBySeason = [];
  for (const day of completedDays) {
    const season = seasonOn(sortedSeasons, day);
    const bucket = completionsBySeason.find((entry) => entry.season === season);
    if (bucket) {
      bucket.completions++;
    } else {
      completionsBySeason.push({ season, completions: 1 });
    }
  }
  return completionsBySeason;
}

function countCompletions(habit, statuses, seasons, startDate, endDate) {
  const completedDays = completedDaysBetween(
    habit,
    statuses,
    startDate,
    endDate,
  );
  return {
    completions: completedDays.length,
    completionsBySeason: completionsBySeasonFor(completedDays, seasons),
  };
}

module.exports = {
  countCompletions,
  completedDaysBetween,
  completionsBySeasonFor,
  firstLoggedDay,
  daysBetween,
  addDays,
  seasonOn,
};
