const { isClosedOn, currentStatus } = require("../../utils/habitHistory");
const {
  completedDaysBetween,
  completionsBySeasonFor,
  firstLoggedDay,
  daysBetween,
  addDays,
} = require("../../utils/habitCompletions");

// "Dot timeline: last ~44 days" (Master Spec §5, Direction A).
const TIMELINE_DAYS = 44;

class GetHabitProgress {
  constructor(db) {
    this.DB = db;
  }

  // ?habitID=&dateStamp= where dateStamp is the user's today. Everything is
  // calculated live from habitStatus rows, over the habit's whole life.
  async getHabitProgress(user, queryStringParameters) {
    const habitID = queryStringParameters?.habitID;
    const today = queryStringParameters?.dateStamp;
    if (!habitID || !/^\d{8}$/.test(today)) {
      return this.badRequest("Missing habitID or dateStamp");
    }

    try {
      const habit = await this.getHabit(user.email, habitID);
      if (!habit) {
        return this.badRequest("Habit not found");
      }

      // The create event, if the habit was made after history existed. Older
      // habits' history starts with a close instead.
      const firstEvent =
        habit.history?.[0]?.status === "active" ? habit.history[0] : undefined;
      const statuses = await this.getHabitStatuses(
        user.email,
        habitID,
        firstEvent?.dateStamp,
        today,
      );
      const seasons = await this.getSeasons(user.email);

      return {
        statusCode: 200,
        body: JSON.stringify(
          this.buildProgress(habit, statuses, seasons, firstEvent, today),
        ),
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

  buildProgress(habit, statuses, seasons, firstEvent, today) {
    // Habits from before history existed start at their first completion log.
    const startDate = firstEvent?.dateStamp ?? firstLoggedDay(statuses) ?? today;

    // Days the habit was closed don't count, even for negative habits where an
    // unlogged day would otherwise be a completion.
    const completedDays = completedDaysBetween(
      habit,
      statuses,
      startDate,
      today,
    ).filter((day) => !isClosedOn(habit, day));
    const completed = new Set(completedDays);
    const chapters = this.chapters(habit, completedDays, seasons, startDate);

    return {
      habitID: habit.SK,
      name: habit.name,
      pngURL: habit.pngURL,
      status: currentStatus(habit),
      startDate,
      seasonStarted: firstEvent?.season ?? null,
      totalCompletions: completedDays.length,
      daysSinceStart:
        startDate <= today ? daysBetween(startDate, today).length : 0,
      currentStreak: this.currentStreak(completed, today),
      longestStreak: this.longestStreak(completedDays),
      completionsBySeason: completionsBySeasonFor(completedDays, seasons),
      currentSeason: this.currentSeason(completedDays, seasons),
      // The open chapter, or null while the habit is closed.
      currentChapter: chapters.find((chapter) => chapter.endDate === null) ?? null,
      chapters,
      timeline: this.timeline(habit, completed, startDate, today),
    };
  }

  // Completions since the user's current season began (their latest season
  // row; a season ends when the next starts). null if they've never set one.
  currentSeason(completedDays, seasons) {
    const latest = [...seasons].sort((a, b) => (a.SK < b.SK ? -1 : 1)).pop();
    if (!latest) {
      return null;
    }
    const startDate = latest.SK.substring(0, 8);
    return {
      season: latest.season,
      startDate,
      completions: completedDays.filter((day) => day >= startDate).length,
    };
  }

  // One entry per create/reopen → close span of the habit's history. Closed
  // chapters use the counts saved when they were closed; the open chapter
  // (endDate null) is counted live. Habits from before history existed start
  // with a chapter from their first completion.
  chapters(habit, completedDays, seasons, startDate) {
    const chapters = [];
    var open = null;
    const openChapter = (start, season) => ({
      startDate: start,
      startSeason: season,
      endDate: null,
      endSeason: null,
    });

    for (const event of habit.history ?? []) {
      if (event.status === "active") {
        open = openChapter(event.dateStamp, event.season);
      } else if (event.status === "closed") {
        const chapter = open ?? openChapter(startDate, null);
        chapters.push({
          ...chapter,
          endDate: event.dateStamp,
          endSeason: event.season,
          completions: event.completions ?? 0,
          completionsBySeason: event.completionsBySeason ?? [],
        });
        open = null;
      }
    }

    if (currentStatus(habit) === "active") {
      open = open ?? openChapter(startDate, null);
      const chapterDays = completedDays.filter((day) => day >= open.startDate);
      chapters.push({
        ...open,
        completions: chapterDays.length,
        completionsBySeason: completionsBySeasonFor(chapterDays, seasons),
      });
    }

    return chapters;
  }

  // Consecutive completed days ending today. Today not being done yet doesn't
  // break the streak; it counts back from yesterday instead.
  currentStreak(completed, today) {
    var day = completed.has(today) ? today : addDays(today, -1);
    var streak = 0;
    while (completed.has(day)) {
      streak++;
      day = addDays(day, -1);
    }
    return streak;
  }

  longestStreak(completedDays) {
    var longest = 0;
    var run = 0;
    var previous;
    for (const day of completedDays) {
      run = previous && addDays(previous, 1) === day ? run + 1 : 1;
      longest = Math.max(longest, run);
      previous = day;
    }
    return longest;
  }

  // Oldest first. "complete" and "missed" are the filled and empty dots;
  // "inactive" days are before the habit started or while it was closed.
  timeline(habit, completed, startDate, today) {
    return daysBetween(addDays(today, -(TIMELINE_DAYS - 1)), today).map(
      (day) => ({
        dateStamp: day,
        state: completed.has(day)
          ? "complete"
          : day < startDate || isClosedOn(habit, day)
            ? "inactive"
            : "missed",
      }),
    );
  }

  badRequest(message) {
    return {
      statusCode: 400,
      body: JSON.stringify(message),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }

  async getHabit(email, habitID) {
    const response = await this.DB.getItem({
      PK: `${email}-habit`,
      SK: habitID,
    });
    return response?.Item;
  }

  async getHabitStatuses(email, habitID, startDate, endDate) {
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
      "#habitID": "habitID",
    };
    const values = {
      ":pk": `${email}-habitStatus`,
      ":startDate": startDate ?? "0",
      ":endDate": `${endDate}-~`,
      ":habitID": habitID,
    };
    return this.DB.queryAllItems(
      expression,
      names,
      values,
      "#habitID = :habitID",
    );
  }

  async getSeasons(email) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${email}-season`,
    };
    return this.DB.queryAllItems(expression, names, values);
  }
}
module.exports = GetHabitProgress;
