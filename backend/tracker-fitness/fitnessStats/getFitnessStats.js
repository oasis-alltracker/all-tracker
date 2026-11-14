const { addDays, daysBetween } = require("../../utils/habitCompletions");

// Fitness Spec §5: the rhythm label stays through 1-2 days without logging and
// quietly disappears after 3+.
const RHYTHM_GRACE_DAYS = 2;

class GetFitnessStats {
  constructor(db) {
    this.DB = db;
  }

  // ?dateStamp= is the user's today. Returns every stat; which ones show in
  // each season (e.g. no streak in Understanding or Restoring) is up to the app.
  async getFitnessStats(user, queryStringParameters) {
    const today = queryStringParameters?.dateStamp;
    if (!/^\d{8}$/.test(today)) {
      return {
        statusCode: 400,
        body: JSON.stringify("Missing dateStamp"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      const userInfo = await this.getUser(user.email);
      const entries = await this.getEntries(user.email, today);

      return {
        statusCode: 200,
        body: JSON.stringify(this.buildStats(entries, userInfo, today)),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify("Request failed"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }
  }

  buildStats(entries, userInfo, today) {
    const dateOf = (entry) => entry.SK.substring(0, 8);
    // Entries from before entryType existed are workouts.
    const isMovement = (entry) => entry.entryType === "movement";

    // "This season" runs from the user's current season start. Without a
    // season, it covers everything logged.
    const seasonStartedAt = userInfo?.seasonStartedAt ?? null;
    const seasonEntries = entries.filter(
      (entry) => !seasonStartedAt || dateOf(entry) >= seasonStartedAt,
    );

    const loggedDays = [...new Set(entries.map(dateOf))].sort();
    const lastLoggedDate = loggedDays[loggedDays.length - 1] ?? null;
    // Full days without logging between the last log and today (today itself
    // isn't over yet, so it doesn't count). Logged today or yesterday: 0.
    var daysWithoutLogging = null;
    if (lastLoggedDate !== null) {
      daysWithoutLogging =
        lastLoggedDate >= today
          ? 0
          : daysBetween(lastLoggedDate, today).length - 2;
    }

    return {
      season: userInfo?.season ?? null,
      seasonStartedAt,
      sessionsThisSeason: seasonEntries.length,
      workoutsThisSeason: seasonEntries.filter((entry) => !isMovement(entry))
        .length,
      movementsThisSeason: seasonEntries.filter(isMovement).length,
      movementMix: this.movementMix(seasonEntries.filter(isMovement)),
      currentStreak: this.currentStreak(new Set(loggedDays), today),
      longestStreak: this.longestStreak(loggedDays),
      lastLoggedDate,
      daysWithoutLogging,
      inRhythm:
        daysWithoutLogging !== null && daysWithoutLogging <= RHYTHM_GRACE_DAYS,
    };
  }

  // [{ activityType, count }] for this season's movements, most logged first.
  movementMix(movements) {
    const counts = new Map();
    for (const movement of movements) {
      counts.set(
        movement.activityType,
        (counts.get(movement.activityType) ?? 0) + 1,
      );
    }
    return [...counts.entries()]
      .map(([activityType, count]) => ({ activityType, count }))
      .sort((a, b) => b.count - a.count);
  }

  // Consecutive days with any movement or workout. Today not logged yet
  // doesn't break it; a full day without logging resets it to zero.
  currentStreak(loggedDays, today) {
    var day = loggedDays.has(today) ? today : addDays(today, -1);
    var streak = 0;
    while (loggedDays.has(day)) {
      streak++;
      day = addDays(day, -1);
    }
    return streak;
  }

  longestStreak(loggedDays) {
    var longest = 0;
    var run = 0;
    var previous;
    for (const day of loggedDays) {
      run = previous && addDays(previous, 1) === day ? run + 1 : 1;
      longest = Math.max(longest, run);
      previous = day;
    }
    return longest;
  }

  async getUser(email) {
    const response = await this.DB.getItem({ PK: email, SK: email });
    return response?.Item;
  }

  // Every movement and workout up to today. Streaks need the full history.
  async getEntries(email, today) {
    const expression = "#pk = :pk AND #sk <= :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${email}-workoutEntry`,
      ":endDate": `${today}-~`,
    };
    return this.DB.queryAllItems(expression, names, values);
  }
}
module.exports = GetFitnessStats;
