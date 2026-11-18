// Typography (DS-01). Source: docs/oasis_design_system.html "Typography".
//
// React Native selects custom fonts by FAMILY NAME. Android ignores
// fontWeight/fontStyle for custom fonts, and iOS may fake bold/italic, so
// every weight/style here is its own registered family and the text styles
// below never set fontWeight or fontStyle. (The HTML's RN snippet uses one
// family + fontWeight; that doesn't work reliably on device.)
//
// Text styles carry no colour. Components add colour from useOasisTheme().
import { Dimensions } from "react-native";

// Family names registered with expo-font (see fontAssets, loaded in App.js).
export const fonts = {
  serifLight: "CormorantGaramond-Light", // 300
  serif: "CormorantGaramond-Regular", // 400
  serifLightItalic: "CormorantGaramond-LightItalic", // 300 italic: seasonal copy
  serifItalic: "CormorantGaramond-Italic", // 400 italic: journal prompt
  sansLight: "DMSans-Light", // 300
  sans: "DMSans-Regular", // 400
  sansMedium: "DMSans-Medium", // 500
};

// Passed to useFonts() in App.js.
export const fontAssets = {
  [fonts.serifLight]: require("../assets/fonts/CormorantGaramond-Light.ttf"),
  [fonts.serif]: require("../assets/fonts/CormorantGaramond-Regular.ttf"),
  [fonts.serifLightItalic]: require("../assets/fonts/CormorantGaramond-LightItalic.ttf"),
  [fonts.serifItalic]: require("../assets/fonts/CormorantGaramond-Italic.ttf"),
  [fonts.sansLight]: require("../assets/fonts/DMSans-Light.ttf"),
  [fonts.sans]: require("../assets/fonts/DMSans-Regular.ttf"),
  [fonts.sansMedium]: require("../assets/fonts/DMSans-Medium.ttf"),
};

// Sizes as drawn in the mocks (375pt-wide phone frame, so 1 CSS px = 1 pt).
export const baseText = {
  // Cormorant Garamond: display, headings, ALL seasonal copy (italic)
  greetingName: { fontFamily: fonts.serif, fontSize: 22 },
  seasonalCopy: { fontFamily: fonts.serifLightItalic, fontSize: 14 },
  journalPrompt: { fontFamily: fonts.serifItalic, fontSize: 20, lineHeight: 26 },
  navTitle: { fontFamily: fonts.serif, fontSize: 20, letterSpacing: 1 },
  navBack: { fontFamily: fonts.sans, fontSize: 22 }, // "←" in the screen header
  sheetTitle: { fontFamily: fonts.serifLight, fontSize: 20 },
  completionTitle: { fontFamily: fonts.serifLight, fontSize: 30 },
  cardPrompt: { fontFamily: fonts.serifItalic, fontSize: 13, lineHeight: 19.5 }, // journal prompt on the home card
  fulfilledText: { fontFamily: fonts.serifItalic, fontSize: 12 }, // "Reflected today." on a home card
  completionAffirmation: { fontFamily: fonts.serifLightItalic, fontSize: 15, lineHeight: 24 },

  // DM Sans: UI, body, labels
  cardIcon: { fontFamily: fonts.sans, fontSize: 16 }, // ✦ 🌿 ◈ ◎ above card titles
  cardTitle: { fontFamily: fonts.sansMedium, fontSize: 13 },
  cardSub: { fontFamily: fonts.sansLight, fontSize: 11, lineHeight: 15 },
  sectionLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  body: { fontFamily: fonts.sans, fontSize: 14 },
  bodyLight: { fontFamily: fonts.sansLight, fontSize: 13 },
  small: { fontFamily: fonts.sansLight, fontSize: 11 },
  tiny: { fontFamily: fonts.sansLight, fontSize: 10 },
  // HTML's text table says 400, but every badge in the CSS and the mocks is 300.
  badge: { fontFamily: fonts.sansLight, fontSize: 10 },
  button: { fontFamily: fonts.sansMedium, fontSize: 14 },
  buttonSecondary: { fontFamily: fonts.sansLight, fontSize: 11 }, // fitness mock
  pill: { fontFamily: fonts.sansLight, fontSize: 11 },
  pillSelected: { fontFamily: fonts.sans, fontSize: 11 },
  // Habit pills on the home card (home mock: 10px 300; "+N" pill 400)
  input: { fontFamily: fonts.sansLight, fontSize: 14 }, // sheet inputs (foundations/nutrition mocks)
  habitPill: { fontFamily: fonts.sansLight, fontSize: 10 },
  habitPillMore: { fontFamily: fonts.sans, fontSize: 10 },
  habitPillBadge: { fontFamily: fonts.sansMedium, fontSize: 8 }, // counted "3/8"
  fulfilledCheck: { fontFamily: fonts.sansMedium, fontSize: 10 }, // ✓ in the 18px card check
  completionCheck: { fontFamily: fonts.sans, fontSize: 28 }, // ✓ in the 72px completion check
  habitToggleCheck: { fontFamily: fonts.sansMedium, fontSize: 12 },

  // Onboarding (oasis_onboarding_flow.html)
  welcomeWordmark: { fontFamily: fonts.serifLight, fontSize: 44, letterSpacing: 6 },
  welcomeLine1: { fontFamily: fonts.serif, fontSize: 20 },
  welcomeLine2: { fontFamily: fonts.serifLightItalic, fontSize: 16, lineHeight: 24 },
  welcomeLine3: { fontFamily: fonts.sansLight, fontSize: 12, letterSpacing: 0.5 },
  onboardingQuestion: { fontFamily: fonts.serif, fontSize: 26, lineHeight: 34 },
  onboardingLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  onboardingGuidance: { fontFamily: fonts.sansLight, fontSize: 13, lineHeight: 21 },
  onboardingHelper: { fontFamily: fonts.serifLightItalic, fontSize: 16, lineHeight: 23 },
  seasonEmoji: { fontFamily: fonts.sans, fontSize: 28 },
  seasonName: { fontFamily: fonts.sansMedium, fontSize: 15 },
  seasonDesc: { fontFamily: fonts.sansLight, fontSize: 12, lineHeight: 17 },
  chipEmoji: { fontFamily: fonts.sans, fontSize: 20 },
  chipLabel: { fontFamily: fonts.sans, fontSize: 13 },
  onboardingTask: { fontFamily: fonts.sansLight, fontSize: 14 },
  firstEntryPrompt: { fontFamily: fonts.serifItalic, fontSize: 22, lineHeight: 31 },
  closingBody: { fontFamily: fonts.sansLight, fontSize: 14, lineHeight: 24 },
  closingAlso: { fontFamily: fonts.sansLight, fontSize: 13, lineHeight: 21 },
  closingAlsoLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
};

// Multiplies every fontSize/lineHeight by `factor` (letter spacing unchanged).
export function scaleText(styles, factor) {
  const round = (n) => Math.round(n * factor * 2) / 2; // nearest 0.5pt
  return Object.fromEntries(
    Object.entries(styles).map(([name, s]) => [
      name,
      {
        ...s,
        fontSize: round(s.fontSize),
        ...(s.lineHeight ? { lineHeight: round(s.lineHeight) } : null),
      },
    ]),
  );
}

// App-wide text size: "auto" (decided 2026-11-14, may be revisited).
// Text grows with screen width relative to the mocks' 375pt phone, clamped so
// small phones never go below the mock sizes and iPads don't balloon.
// Measured once at startup; fine because the app is portrait-only.
// To switch to a fixed size later, replace TYPE_SCALE with a number (1 = mocks).
export const TYPE_SCALE_MIN = 1;
export const TYPE_SCALE_MAX = 1.2;

export function autoTypeScale(screenWidth) {
  const raw = screenWidth / 375;
  const clamped = Math.min(TYPE_SCALE_MAX, Math.max(TYPE_SCALE_MIN, raw));
  return Math.round(clamped * 100) / 100;
}

export const TYPE_SCALE = autoTypeScale(Dimensions.get("window").width);

export const text = scaleText(baseText, TYPE_SCALE);
