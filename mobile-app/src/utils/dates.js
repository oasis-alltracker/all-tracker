// Date helpers for the relaunch screens. The backend keys days by a local
// "YYYYMMDD" dateStamp and stores times as "HH:MM".

const pad = (n) => String(n).padStart(2, "0");

// 2026-11-15 → "20261115" (device-local day)
export function toDateStamp(date = new Date()) {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

// 2026-11-15 09:05 → "09:05"
export function toTimeString(date = new Date()) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// The "This week" due date (Master Spec §5 add-task sheet; also used for
// tasks added in onboarding): the coming Sunday, or today if today is Sunday.
// Sunday ends the week to match the backend's getDay() numbering (0 = Sunday).
export function endOfThisWeek(date = new Date()) {
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysToSunday = (7 - end.getDay()) % 7;
  end.setDate(end.getDate() + daysToSunday);
  return end;
}
