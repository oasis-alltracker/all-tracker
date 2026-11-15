// DEV ONLY: design-system gallery (DS-01/DS-02).
// Shown instead of the app when Metro starts with EXPO_PUBLIC_DS_GALLERY=1
// (see App.js). Never reachable in production builds.
import React, { useContext, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../contexts/ThemeProvider";
import {
  makeStyles,
  useOasisTheme,
  SEASON_KEYS,
  seasons,
  universalCopy,
  baseText,
  scaleText,
  autoTypeScale,
} from "../theme";
import {
  AddButton,
  BottomSheet,
  Card,
  CompletionMoment,
  FeelPillSelector,
  FulfillmentCard,
  GradientFill,
  HabitPillRow,
  HabitToggle,
  PageDots,
  Pager,
  PrimaryButton,
  SeasonBadge,
  SecondaryTextButton,
  ScreenHeader,
  SectionLabel,
  TextField,
} from "../components/ui";

// Demo habits from the home mock. Dot colours are MOCK data: habits have no
// colour field yet (see the Habits section note). Gallery only.
const DEMO_HABITS = [
  { name: "Meditate", done: true, color: "#a8d8a8" },
  { name: "Drink water", done: false, color: "#a8c4d8", count: 3, target: 8 },
  { name: "Read", done: false, color: "#e0d8f0" },
  { name: "Walk", done: false, color: "#e0e0e0" },
  { name: "Journal", done: false, color: "#f0d8e0" },
];

// Demo option lists (from the mocks / Master Spec §6). Gallery only.
const FITNESS_EFFORT = ["Easy", "Steady", "Hard", "Pushed it", "Gentle", "Exhausting"];
const FITNESS_BODY = ["Energized", "Strong", "Tired", "Sore", "Clear", "Calm"];
const NUTRITION_BODY = ["Energized", "Sluggish", "Clear", "Bloated", "Steady", "Tired"];
const NUTRITION_FEELINGS = [
  "Nourishing", "Satisfying", "Energizing", "Light", "Heavy",
  "Rushed", "Comforting", "Indulgent", "Guilt-free",
];

export default function DesignGallery() {
  const t = useOasisTheme();
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const themeCtx = useContext(ThemeContext);
  const [seasonKey, setSeasonKey] = useState("building");
  const [taps, setTaps] = useState(0);
  // Per-card fulfilled state; tapping a feature card in the gallery toggles it.
  const [fulfilled, setFulfilled] = useState({ nutrition: false, fitness: false, journal: false });
  const toggleFulfilled = (key) => {
    tap();
    setFulfilled((f) => ({ ...f, [key]: !f[key] }));
  };
  const [dotsIndex, setDotsIndex] = useState(0);
  const tap = () => setTaps((n) => n + 1);
  const season = seasons[seasonKey];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingTop: insets.top + t.sp.lg,
        paddingBottom: insets.bottom + t.sp.xxxl,
        paddingHorizontal: t.layout.screenPaddingH,
      }}
    >
      <Text style={[t.text.greetingName, styles.text]}>Oasis design gallery</Text>
      <Text style={[t.text.small, styles.muted]}>
        Theme mode from ThemeContext: {themeCtx?.value ?? "none"} · rendering
        palette: {t.mode} (dark = light until the dark-mode pass)
      </Text>

      <SeasonSwitcher value={seasonKey} onChange={setSeasonKey} />

      {/* ───────── Components ───────── */}
      <Section title="Cards">
        <Text style={[t.text.small, styles.muted, styles.note]}>
          Tap any card: it shrinks very slightly (0.988). Tapping Nutrition,
          Fitness or Journal also switches it between its normal and green
          “done today” state (gallery only; in the app a tap opens the
          section). Taps: {taps}
        </Text>
        <Card gradient={t.practiceGradients[seasonKey]} onPress={tap} style={styles.cardGap}>
          <PracticeCardBody title={season.practiceTitle} s={t.text} />
        </Card>
        <View style={[styles.row, styles.cardGap]}>
          <FulfillmentCard
            icon="🌿"
            title="Nutrition"
            gradient="nutrition"
            fulfilled={fulfilled.nutrition}
            fulfilledText={universalCopy.nutritionReflectiveFulfilled}
            onPress={() => toggleFulfilled("nutrition")}
            style={styles.flex}
          >
            <Text style={[t.text.seasonalCopy, styles.muted]}>{season.nutritionUnfulfilled}</Text>
          </FulfillmentCard>
          <FulfillmentCard
            icon="◈"
            title="Fitness"
            gradient="fitness"
            fulfilled={fulfilled.fitness}
            fulfilledText={universalCopy.fitnessFulfilled}
            onPress={() => toggleFulfilled("fitness")}
            style={styles.flex}
          >
            <Text style={[t.text.seasonalCopy, styles.muted]}>{season.fitnessUnfulfilled}</Text>
          </FulfillmentCard>
        </View>
        <FulfillmentCard
          icon="◎"
          title="Journal"
          gradient="journal"
          fulfilled={fulfilled.journal}
          fulfilledText={universalCopy.journalFulfilled}
          onPress={() => toggleFulfilled("journal")}
          style={styles.cardGap}
        >
          <Text style={[t.text.cardPrompt, styles.muted, styles.promptGap]}>“{season.journalPrompt}”</Text>
        </FulfillmentCard>

        <Card onPress={tap} style={styles.cardGap}>
          <Text style={[t.text.cardTitle, styles.text]}>Primary · plain white (no gradient)</Text>
          <Text style={[t.text.cardSub, styles.muted]}>22px radius, card shadow</Text>
        </Card>
        <Card variant="secondary" style={styles.cardGap}>
          <Text style={[t.text.cardTitle, styles.text]}>Secondary · not tappable</Text>
          <Text style={[t.text.cardSub, styles.muted]}>16px radius, no shadow</Text>
        </Card>
      </Section>

      <Section title="Completion moment">
        <CompletionDemo seasonKey={seasonKey} />
      </Section>

      <Section title="Section label & season badge">
        <SectionLabel>Habits</SectionLabel>
        <SectionLabel>This week</SectionLabel>
        <View style={styles.spaced} />
        <SeasonBadge season={seasonKey} onPress={tap} />
        <Text style={[t.text.tiny, styles.muted, styles.spacedSm]}>
          Tappable badge for the season selected at the top (taps: {taps})
        </Text>
      </Section>

      <Section title="Habits">
        <SectionLabel>Home card pills · max 3, then +N</SectionLabel>
        <HabitPillRow habits={DEMO_HABITS} />
        <SectionLabel style={styles.spacedMd}>Every pill state</SectionLabel>
        <HabitPillRow
          max={10}
          habits={[
            { name: "Not done", color: "#e0d8f0" },
            { name: "Done", done: true },
            { name: "No colour" },
            { name: "Water", count: 3, target: 8, color: "#a8c4d8" },
            { name: "Water", count: 8, target: 8, done: true },
          ]}
        />
        <Text style={[t.text.tiny, styles.muted, styles.spacedSm]}>
          The spec describes the counted “3/8” corner badge, but no mock draws
          it, so its look is my interpretation. Habits also have no colour in
          the backend yet: the dots above use the mock's colours, and a habit
          without one gets a neutral dot.
        </Text>
        <SectionLabel style={styles.spacedMd}>Full-screen toggle · tap a row</SectionLabel>
        <ToggleDemo />
      </Section>

      <Section title="Pager, screen header & add button">
        <Text style={[t.text.small, styles.muted, styles.note]}>
          A mini Daily Practice screen. Swipe sideways; ← on Upcoming slides
          back to Today. The fitness mock has no back header at all (it opens
          with a greeting like home), unlike every other section: flagged.
        </Text>
        <PagerScreenDemo seasonKey={seasonKey} onTap={tap} />
        <SectionLabel style={styles.spacedMd}>Header without a right action</SectionLabel>
        <View style={styles.frameBare}>
          <ScreenHeader title="Journal" onBack={tap} style={styles.headerInFrame} />
        </View>
      </Section>

      <Section title="Bottom sheet & text field">
        <SheetDemo seasonKey={seasonKey} />
      </Section>

      <Section title="Buttons">
        <PrimaryButton title="Save entry" onPress={tap} />
        <SecondaryTextButton title="Not now" onPress={tap} />
        <PrimaryButton title="Disabled" disabled style={styles.spacedSm} />
        <PrimaryButton title="Loading" loading style={styles.spaced} />
        <Text style={[t.text.tiny, styles.muted, styles.spacedSm]}>Taps: {taps}</Text>
      </Section>

      <Section title="Feel pills">
        <Text style={[t.text.small, styles.muted, styles.note]}>
          Fitness questions are single-select (tap again to clear); nutrition is multi-select.
        </Text>
        <PillDemo />
      </Section>

      <Section title="Text size preview">
        <Text style={[t.text.small, styles.muted, styles.note]}>
          The app uses Auto (text grows with screen width, between 1× and 1.2×).
          Kept here so you can compare again later.
        </Text>
        <ScalePreview seasonKey={seasonKey} />
      </Section>

      <Section title="Page dots">
        <Text style={[t.text.small, styles.muted, styles.note]}>
          Swipe the pager; the dot should stretch smoothly.
        </Text>
        <PagerDemo />
        <View style={[styles.row, styles.spaced, styles.center]}>
          <PageDots count={3} activeIndex={dotsIndex} />
          <Pressable onPress={() => setDotsIndex((i) => (i + 1) % 3)} style={styles.chip}>
            <Text style={[t.text.badge, styles.text]}>Next (3 dots)</Text>
          </Pressable>
        </View>
      </Section>

      {/* ───────── Typography ───────── */}
      <Section title="Typography">
        {Object.entries(t.text).map(([name, style]) => (
          <View key={name} style={styles.specimen}>
            <Text style={[t.text.tiny, styles.muted]}>
              {name} · {style.fontFamily} · {style.fontSize}
            </Text>
            <Text style={[style, styles.text]}>
              {name.startsWith("seasonal") || name.startsWith("completionAff")
                ? season.greeting
                : name === "journalPrompt"
                  ? season.journalPrompt
                  : "The quiet work of becoming"}
            </Text>
          </View>
        ))}
      </Section>

      {/* ───────── Colours ───────── */}
      <Section title="Colours">
        <View style={styles.grid}>
          {Object.entries(t.colors).map(([name, value]) => (
            <View key={name} style={styles.swatch}>
              <View style={[styles.swatchColor, { backgroundColor: value }]} />
              <Text style={[t.text.tiny, styles.text]}>{name}</Text>
              <Text style={[t.text.tiny, styles.muted]}>{value}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* ───────── Gradients ───────── */}
      <Section title="Gradients">
        <View style={styles.grid}>
          {Object.entries(t.gradients).map(([name, colors]) => (
            <View key={name} style={styles.swatch}>
              <GradientFill
                colors={colors}
                angle={name === "completion" ? 160 : 135}
                style={styles.swatchColor}
              />
              <Text style={[t.text.tiny, styles.text]}>{name}</Text>
              <Text style={[t.text.tiny, styles.muted]}>{colors.join(" → ")}</Text>
            </View>
          ))}
        </View>
        <SectionLabel style={styles.spaced}>Daily Practice · per season</SectionLabel>
        <View style={styles.grid}>
          {SEASON_KEYS.map((key) => (
            <View key={key} style={styles.swatch}>
              <GradientFill colors={t.practiceGradients[key]} style={styles.swatchColor} />
              <Text style={[t.text.tiny, styles.text]}>
                {seasons[key].emoji} {seasons[key].name}
              </Text>
              <Text style={[t.text.tiny, styles.muted]}>
                {t.practiceGradients[key].join(" → ")}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      {/* ───────── Season copy ───────── */}
      <Section title={`Season copy · ${season.emoji} ${season.name}`}>
        {Object.entries(season)
          .filter(([field]) => !["key", "emoji", "name"].includes(field))
          .map(([field, value]) => (
            <View key={field} style={styles.copyRow}>
              <Text style={[t.text.sectionLabel, styles.muted]}>{field}</Text>
              {value == null ? (
                <Text style={[t.text.small, styles.todo]}>TODO(copy): not defined in spec</Text>
              ) : (
                <Text style={[t.text.seasonalCopy, styles.text]}>{value}</Text>
              )}
            </View>
          ))}
        <Text style={[t.text.sectionLabel, styles.muted, styles.spaced]}>
          Universal (every season)
        </Text>
        {Object.entries(universalCopy).map(([field, value]) => (
          <Text key={field} style={[t.text.small, styles.text]}>
            {field}: {typeof value === "function" ? value(1840) : value}
          </Text>
        ))}
      </Section>
    </ScrollView>
  );
}

// Daily Practice card contents in the home mock's order (Master Spec §3,
// "Option C stacked"): icon, title, progress line, HABITS + pills, divider,
// TASKS + tasks. Real habit pills / task rows come with the Home stream.
// `s` is the text style set to use (scaled in the size preview).
function PracticeCardBody({ title, s }) {
  const styles = useStyles();
  return (
    <View>
      <Text style={[s.cardTitle, styles.icon]}>✦</Text>
      <Text style={[s.cardTitle, styles.text]}>{title}</Text>
      <Text style={[s.cardSub, styles.muted]}>2 of 4 habits · 3 tasks remaining</Text>
      <Text style={[s.sectionLabel, styles.muted, styles.spacedMd]}>Habits</Text>
      <HabitPillRow habits={DEMO_HABITS} />
      <View style={styles.divider} />
      <Text style={[s.sectionLabel, styles.muted]}>Tasks</Text>
      <Text style={[s.body, styles.text]}>Clean kitchen</Text>
    </View>
  );
}

// Habit rows with the toggle: the whole row is the tap target (Master Spec §5).
function ToggleDemo() {
  const t = useOasisTheme();
  const styles = useStyles();
  const [done, setDone] = useState({ Meditate: true, Read: false });
  return (
    <View>
      {Object.keys(done).map((name) => (
        <Pressable
          key={name}
          onPress={() => setDone((d) => ({ ...d, [name]: !d[name] }))}
          style={styles.toggleRow}
        >
          <Text style={[t.text.body, styles.text, styles.flex]}>{name}</Text>
          <HabitToggle done={done[name]} />
        </Pressable>
      ))}
    </View>
  );
}

function PagerScreenDemo({ seasonKey, onTap }) {
  const t = useOasisTheme();
  const styles = useStyles();
  const pager = useRef(null);
  const [page, setPage] = useState(0);
  return (
    <View style={styles.frame}>
      <Pager ref={pager} onPageChange={setPage}>
        <View>
          <ScreenHeader
            title={seasons[seasonKey].practiceTitle}
            onBack={onTap}
            right={<AddButton accessibilityLabel="Add task" onPress={onTap} />}
            style={styles.headerInFrame}
          />
          <View style={styles.framePad}>
            <SectionLabel>Habits</SectionLabel>
            <Text style={[t.text.body, styles.text]}>Today's page</Text>
          </View>
        </View>
        <View>
          <ScreenHeader
            title="Upcoming"
            onBack={() => pager.current?.goTo(0)}
            style={styles.headerInFrame}
          />
          <View style={styles.framePad}>
            <SectionLabel>This week</SectionLabel>
            <Text style={[t.text.body, styles.text]}>Upcoming page</Text>
          </View>
        </View>
      </Pager>
      <Text style={[t.text.tiny, styles.muted, styles.frameCaption]}>
        onPageChange → {page}
      </Text>
    </View>
  );
}

// Completion moment after a journal entry and after a workout (with recap).
function CompletionDemo({ seasonKey }) {
  const t = useOasisTheme();
  const styles = useStyles();
  const season = seasons[seasonKey];
  const [open, setOpen] = useState(null); // "journal" | "workout" | null
  const close = () => setOpen(null);
  const recap = [
    ["Workout", "Full Body"],
    ["Exercises", "Bench · Squats · Jog"],
    ["Effort", "Hard"],
    ["Feeling", "Energized"],
  ];
  return (
    <View>
      <View style={styles.row}>
        <PrimaryButton
          title="After a journal entry"
          onPress={() => setOpen("journal")}
          style={styles.halfButton}
        />
        <PrimaryButton
          title="After a workout"
          onPress={() => setOpen("workout")}
          style={styles.halfButton}
        />
      </View>
      <Text style={[t.text.tiny, styles.muted, styles.spacedSm]}>
        Journal affirmation comes from the season config (only Building has
        one; other seasons show none). The workout one is the fitness mock's
        Building example.
      </Text>
      <CompletionMoment
        visible={open === "journal"}
        title={universalCopy.journalFulfilled}
        affirmation={season.journalAffirmation}
        onDone={close}
      />
      <CompletionMoment
        visible={open === "workout"}
        title={universalCopy.fitnessFulfilled}
        affirmation="“Hard effort. You're building something real — one session at a time.”"
        onDone={close}
      >
        <View style={styles.recapCard}>
          {recap.map(([label, value]) => (
            <View key={label} style={styles.recapRow}>
              <Text style={[t.text.tiny, styles.muted]}>{label}</Text>
              <Text style={[t.text.tiny, styles.text]}>{value}</Text>
            </View>
          ))}
        </View>
      </CompletionMoment>
    </View>
  );
}

// Two sheets: a short one, and the nutrition mock's meal check-in (tall,
// scrolls, has inputs so the keyboard behaviour can be checked).
function SheetDemo({ seasonKey }) {
  const t = useOasisTheme();
  const styles = useStyles();
  const season = seasons[seasonKey];
  const [open, setOpen] = useState(null); // "short" | "meal" | null
  const [meal, setMeal] = useState("");
  const [feelings, setFeelings] = useState([]);
  const [body, setBody] = useState([]);
  const [note, setNote] = useState("");
  const close = () => setOpen(null);

  return (
    <View>
      <SectionLabel>Text fields (tap to see the focus border)</SectionLabel>
      <TextField placeholder="Task name" />
      <TextField
        multiline
        placeholder="Any notes? (optional)"
        style={styles.spacedSm}
      />
      <View style={styles.spacedMd} />
      <PrimaryButton title="Open a short sheet" onPress={() => setOpen("short")} />
      <SecondaryTextButton title="Open the meal check-in sheet (tall)" onPress={() => setOpen("meal")} />
      <Text style={[t.text.tiny, styles.muted]}>
        Close by tapping the dark area, swiping down, or Android back. The
        fitness mock draws smaller inputs (1px border, radius 12, 12px text);
        these follow the foundations and nutrition mocks, which match each
        other.
      </Text>

      <BottomSheet
        visible={open === "short"}
        onClose={close}
        title="A short sheet"
        subtitle="Title, subtitle, content, button"
      >
        <TextField placeholder="Type to check the keyboard lifts the sheet" />
        <View style={styles.spacedMd} />
        <PrimaryButton title="Done" onPress={close} />
      </BottomSheet>

      <BottomSheet
        visible={open === "meal"}
        onClose={close}
        title="Log a meal"
        subtitle="What did you eat?"
        scrollable
      >
        <TextField
          multiline
          value={meal}
          onChangeText={setMeal}
          placeholder="Describe what you had — no need to be precise. 'Big salad with salmon' works perfectly."
        />
        <SectionLabel style={styles.spacedLg}>How did it feel?</SectionLabel>
        <FeelPillSelector multiple options={NUTRITION_FEELINGS} value={feelings} onChange={setFeelings} />
        <SectionLabel style={styles.spacedLg}>How did your body feel after?</SectionLabel>
        <FeelPillSelector multiple options={NUTRITION_BODY} value={body} onChange={setBody} />
        <Text style={[t.text.badge, styles.muted, styles.spacedLg]}>
          {season.emoji} {season.name} season
        </Text>
        <Text style={[t.text.seasonalCopy, styles.text]}>
          {season.reflectiveNutritionQuestion ?? "TODO: no question for this season yet"}
        </Text>
        <TextField
          multiline
          value={note}
          onChangeText={setNote}
          placeholder="Any notes? (optional)"
          style={styles.spacedMd}
        />
        <View style={styles.spacedLg} />
        <PrimaryButton title="Save meal" onPress={close} />
      </BottomSheet>
    </View>
  );
}

// Feel pills, fully interactive.
function PillDemo() {
  const t = useOasisTheme();
  const styles = useStyles();
  const [effort, setEffort] = useState("Steady");
  const [body, setBody] = useState(null);
  const [feelings, setFeelings] = useState(["Nourishing"]);
  return (
    <View>
      <SectionLabel>How hard did it feel? · fitness · single</SectionLabel>
      <FeelPillSelector options={FITNESS_EFFORT} value={effort} onChange={setEffort} />
      <SectionLabel style={styles.spacedSm}>How does your body feel? · fitness · single</SectionLabel>
      <FeelPillSelector options={FITNESS_BODY} value={body} onChange={setBody} />
      <SectionLabel style={styles.spacedSm}>How did it feel? · nutrition · multi</SectionLabel>
      <FeelPillSelector
        multiple
        options={NUTRITION_FEELINGS}
        value={feelings}
        onChange={setFeelings}
      />
      <Text style={[t.text.tiny, styles.muted, styles.spacedSm]}>
        value: {JSON.stringify({ effort, body, feelings })}
      </Text>
    </View>
  );
}

// Decision 7: a mini home screen rendered at the chosen text scale.
function ScalePreview({ seasonKey }) {
  const t = useOasisTheme();
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const auto = autoTypeScale(width);
  const choices = [
    { key: "auto", label: `Auto · in use (${auto}×)`, factor: auto },
    { key: "1", label: "1× (mocks)", factor: 1 },
    { key: "1.1", label: "1.1×", factor: 1.1 },
    { key: "1.15", label: "1.15×", factor: 1.15 },
  ];
  const [choice, setChoice] = useState("auto");
  const factor = choices.find((c) => c.key === choice).factor;
  const s = scaleText(baseText, factor);
  const season = seasons[seasonKey];

  return (
    <View>
      <View style={[styles.row, styles.wrap]}>
        {choices.map((c) => (
          <Pressable
            key={c.key}
            onPress={() => setChoice(c.key)}
            style={[styles.chip, c.key === choice && styles.chipActive]}
          >
            <Text style={[t.text.badge, c.key === choice ? styles.onPrimary : styles.text]}>
              {c.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[t.text.tiny, styles.muted, styles.spacedSm]}>
        This phone is {Math.round(width)}pt wide.
      </Text>

      <View style={[styles.preview, styles.spacedSm]}>
        <Text style={[s.greetingName, styles.text]}>Good morning, friend</Text>
        <Text style={[s.seasonalCopy, styles.muted]}>{season.greeting}</Text>
        <View style={styles.spacedSm} />
        <Card gradient={t.practiceGradients[seasonKey]} style={styles.cardGap}>
          <PracticeCardBody title={season.practiceTitle} s={s} />
        </Card>
        <View style={[styles.row, styles.cardGap]}>
          <Card gradient="nutrition" style={styles.flex}>
            <Text style={[s.cardTitle, styles.text]}>Nutrition</Text>
            <Text style={[s.seasonalCopy, styles.muted]}>{season.nutritionUnfulfilled}</Text>
          </Card>
          <Card gradient="fitness" style={styles.flex}>
            <Text style={[s.cardTitle, styles.text]}>Fitness</Text>
            <Text style={[s.seasonalCopy, styles.muted]}>{season.fitnessUnfulfilled}</Text>
          </Card>
        </View>
        <Card gradient="journal">
          <Text style={[s.cardTitle, styles.text]}>Journal</Text>
          <Text style={[s.journalPrompt, styles.text]}>“{season.journalPrompt}”</Text>
        </Card>
      </View>
    </View>
  );
}

// Two swipeable pages driving PageDots, the way every section's pager will.
function PagerDemo() {
  const t = useOasisTheme();
  const styles = useStyles();
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);
  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setPage(Math.round(e.nativeEvent.contentOffset.x / width))
          }
        >
          {["Today", "Past"].map((label) => (
            <View key={label} style={[styles.page, { width }]}>
              <Text style={[t.text.navTitle, styles.text]}>{label}</Text>
            </View>
          ))}
        </ScrollView>
      ) : null}
      <PageDots count={2} activeIndex={page} style={styles.spacedSm} />
    </View>
  );
}

function SeasonSwitcher({ value, onChange }) {
  const t = useOasisTheme();
  const styles = useStyles();
  return (
    <View style={[styles.row, styles.wrap, styles.spaced]}>
      {SEASON_KEYS.map((key) => {
        const active = key === value;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[t.text.badge, active ? styles.onPrimary : styles.text]}>
              {seasons[key].emoji} {seasons[key].name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Section({ title, children }) {
  const t = useOasisTheme();
  const styles = useStyles();
  return (
    <View style={styles.section}>
      <Text style={[t.text.navTitle, styles.text, styles.sectionTitle]}>{title}</Text>
      {children}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.colors.background },
  text: { color: t.colors.text },
  muted: { color: t.colors.textMuted },
  onPrimary: { color: t.colors.onPrimary },
  todo: { color: t.colors.overdue },
  spaced: { marginTop: t.sp.lg },
  spacedSm: { marginTop: t.sp.sm },
  spacedMd: { marginTop: t.sp.md },
  promptGap: { marginTop: 6 },
  // two PrimaryButtons side by side (it's full width by default)
  halfButton: { flex: 1, width: "auto", paddingHorizontal: t.sp.sm },
  // fitness mock .completion-recap
  recapCard: {
    backgroundColor: t.colors.surfaceWarm,
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: t.radius.item,
    paddingVertical: t.sp.md,
    paddingHorizontal: t.sp.lg,
  },
  recapRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  // Phone-ish frames for the pager / header demos. The gallery screen has its
  // own side padding, so the header's 24px padding is reduced inside them.
  frame: {
    height: 300,
    backgroundColor: t.colors.background,
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: t.radius.lg,
    overflow: "hidden",
  },
  frameBare: {
    backgroundColor: t.colors.background,
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: t.radius.lg,
    paddingBottom: 14,
  },
  headerInFrame: { paddingHorizontal: t.sp.lg },
  framePad: { padding: t.sp.lg },
  frameCaption: { position: "absolute", top: 4, right: 10 },
  spacedLg: { marginTop: t.sp.xl },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: t.colors.border,
  },
  icon: { color: t.colors.text, marginBottom: 6 },
  divider: {
    height: 1,
    backgroundColor: t.colors.border,
    marginVertical: t.sp.md,
  },
  flex: { flex: 1 },
  center: { alignItems: "center" },
  cardGap: { marginBottom: 11 }, // home mock card gap
  badgeGap: { marginBottom: t.sp.sm },
  page: {
    height: 120,
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surfaceWarm,
    alignItems: "center",
    justifyContent: "center",
  },
  row: { flexDirection: "row", gap: t.sp.md },
  wrap: { flexWrap: "wrap", gap: t.sp.sm },
  section: { marginTop: t.sp.xxxl },
  sectionTitle: { marginBottom: t.sp.md },
  chip: {
    paddingVertical: t.sp.xs,
    paddingHorizontal: t.sp.md,
    borderRadius: t.radius.pill,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
  chipActive: { backgroundColor: t.colors.primary, borderColor: t.colors.primary },
  note: { marginTop: t.sp.xs, marginBottom: t.sp.md },
  preview: {
    backgroundColor: t.colors.background,
    borderRadius: t.radius.lg,
    padding: t.sp.md,
  },
  specimen: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.item,
    padding: t.sp.md,
    marginBottom: t.sp.sm,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: t.sp.md },
  swatch: { width: "30%" },
  swatchColor: {
    height: 48,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    marginBottom: t.sp.xs,
  },
  copyRow: { marginBottom: t.sp.md },
}));
