import { getAccessToken } from "../../user/keychain";
import SeasonsAPI from "../../api/user/seasonsAPI";
import UserAPI from "../../api/user/userAPI";
import HabitsAPI from "../../api/habits/habitsAPI";
import ToDosAPI from "../../api/toDos/toDosAPI";
import JournalEntriesAPI from "../../api/journal/journalEntriesAPI";
import { endOfThisWeek, toDateStamp, toTimeString } from "../../utils/dates";
import { getSeason } from "../../theme";

// The legacy dashboard (screens/Main.js, DrawerScreen.js) reads
// user.trackingPreferences without a null check and decides which sections
// to show from it. Until the new home screen (Stream H) replaces it, new
// users still need this, with the sections the relaunch keeps switched on.
// TODO(H): remove once Main.js is gone.
const LEGACY_TRACKING_PREFERENCES = {
  habitsSelected: true,
  toDosSelected: true,
  dietSelected: true,
  fitnessSelected: true,
  moodSelected: false,
  sleepSelected: false,
};

// Saves everything the user entered, then marks setup complete (last, so a
// half-finished save never lets the user skip onboarding).
//
//   draft  { name, season, habits: [{ name, emoji }], tasks: [string], journalText }
//   saved  a Set that survives retries: each write adds its key, and a retry
//          skips keys already there, so a failed save can be retried without
//          duplicating the habits/tasks that did go through.
//
// Throws on the first failure; the caller shows an error and lets the user retry.
// Returns what was saved, for the closing screen's copy.
export async function saveOnboarding(draft, saved) {
  const token = await getAccessToken();
  const now = new Date();
  const dateStamp = toDateStamp(now);
  const { season } = draft;
  const steps = getSeason(season).onboarding.steps;

  const once = async (key, write) => {
    if (saved.has(key)) return;
    await write();
    saved.add(key);
  };
  const expectOk = ({ status }) => {
    if (status !== 200) throw new Error(`User update failed (${status})`);
  };

  await once(`season:${season}`, () =>
    SeasonsAPI.createSeason(token, season, dateStamp),
  );

  const name = draft.name.trim();
  if (name) {
    await once(`name:${name}`, async () =>
      expectOk(await UserAPI.updateName(name, token)),
    );
  }

  const habits = steps.includes("habits") ? draft.habits : [];
  for (const habit of habits) {
    await once(`habit:${habit.name}`, () =>
      HabitsAPI.createHabit(token, {
        name: habit.name,
        emoji: habit.emoji,
        isPositive: true,
        threshold: 1,
        season,
        dateStamp,
      }),
    );
  }

  const tasks = steps.includes("tasks") ? draft.tasks : [];
  const dueDateStamp = toDateStamp(endOfThisWeek(now));
  for (const task of tasks) {
    await once(`task:${task}`, () =>
      ToDosAPI.createToDo(token, {
        name: task,
        description: "",
        dateStamp: dueDateStamp,
      }),
    );
  }

  const journalText = draft.journalText.trim();
  if (journalText) {
    await once(`journal:${journalText}`, () =>
      JournalEntriesAPI.createJournalEntry(token, {
        entryType: "guided_prompt",
        season,
        dateStamp,
        time: toTimeString(now),
        promptText: getSeason(season).journalPrompt,
        bodyText: journalText,
      }),
    );
  }

  await once("setupComplete", async () =>
    expectOk(
      await UserAPI.updateUser(true, LEGACY_TRACKING_PREFERENCES, token),
    ),
  );

  return {
    habits: habits.length,
    tasks: tasks.length,
    journal: journalText !== "",
  };
}
