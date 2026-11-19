import React, { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { getSeason, makeStyles } from "../../theme";
import navigationService from "../../navigators/navigationService";
import { saveOnboarding } from "./saveOnboarding";
import { copy } from "./copy";
import WelcomeStep from "./steps/WelcomeStep";
import NameStep from "./steps/NameStep";
import SeasonStep from "./steps/SeasonStep";
import HabitsStep from "./steps/HabitsStep";
import TasksStep from "./steps/TasksStep";
import JournalStep from "./steps/JournalStep";
import ClosingStep from "./steps/ClosingStep";

// Stream O onboarding (O-01–O-07), shown after Terms for a new account:
//   Welcome → Name → Season → the season's setup steps → Closing → home
// The setup steps and their order come from the season config
// (theme/seasons.js → onboarding.steps), so there is one flow, not five.
//
// Nothing is written until the user leaves the last setup step; then
// everything is saved at once (saveOnboarding) and the closing screen shows.
// Going back and changing season simply changes which steps (and so which
// entries) are used.
export default function OnboardingFlow() {
  const styles = useStyles();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [name, setName] = useState("");
  const [seasonKey, setSeasonKey] = useState(null);
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [journalText, setJournalText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null); // counts for the closing copy
  const savedKeys = useRef(new Set()); // makes a retried save idempotent

  const season = seasonKey ? getSeason(seasonKey) : null;
  const steps = [
    "welcome",
    "name",
    "season",
    ...(season ? season.onboarding.steps : []),
    "closing",
  ];
  const step = steps[index];
  const isLastSetupStep = index === steps.length - 2 && index > 2;
  // The bar fills to 95% on the closing screen, as in the mock.
  const progress = (0.95 * index) / (steps.length - 1);

  const go = (delta) => {
    setDirection(delta > 0 ? "forward" : "back");
    setIndex((i) => i + delta);
  };

  const finish = async ({ skipHabits = false } = {}) => {
    setSaving(true);
    try {
      const result = await saveOnboarding(
        {
          name,
          season: seasonKey,
          habits: skipHabits ? [] : habits,
          tasks,
          journalText,
        },
        savedKeys.current,
      );
      setSaved(result);
      go(1);
    } catch (e) {
      console.log("[onboarding] save failed", e);
      Toast.show({
        type: "info",
        text1: copy.saveFailed.title,
        text2: copy.saveFailed.body,
      });
    } finally {
      setSaving(false);
    }
  };

  const next = () => (isLastSetupStep ? finish() : go(1));
  // No back on Welcome, Name or Season (the mock has none on Season; decided
  // 2026-11-17). The first setup step can still go back to Season.
  const back = saving || index <= 2 ? undefined : () => go(-1);

  // Understanding's and Restoring's habits screens can be skipped: drop any picks and move on.
  const skipHabits = () => {
    if (isLastSetupStep) {
      finish({ skipHabits: true });
    } else {
      setHabits([]);
      go(1);
    }
  };

  const enterApp = () => navigationService.reset("main", 0);

  // Android back steps back through the flow. It never leaves onboarding
  // (Terms sits behind it) and does nothing on Welcome, Name, Season and Closing.
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (back && step !== "closing") back();
      return true;
    });
    return () => sub.remove();
  }, [back, step]);

  const shared = { progress, onBack: back, onNext: next, saving };

  let content;
  switch (step) {
    case "welcome":
      content = <WelcomeStep onNext={() => go(1)} />;
      break;
    case "name":
      content = <NameStep {...shared} name={name} setName={setName} />;
      break;
    case "season":
      content = (
        <SeasonStep {...shared} season={seasonKey} setSeason={setSeasonKey} />
      );
      break;
    case "habits":
      content = (
        <HabitsStep
          {...shared}
          config={season.onboarding.habits}
          habits={habits}
          setHabits={setHabits}
          onSkip={skipHabits}
        />
      );
      break;
    case "tasks":
      content = (
        <TasksStep
          {...shared}
          config={season.onboarding.tasks}
          tasks={tasks}
          setTasks={setTasks}
        />
      );
      break;
    case "journal":
      content = (
        <JournalStep
          {...shared}
          prompt={season.journalPrompt}
          text={journalText}
          setText={setJournalText}
        />
      );
      break;
    case "closing":
      content = (
        <ClosingStep
          season={season}
          saved={saved}
          progress={progress}
          onDone={enterApp}
        />
      );
      break;
  }

  // Each step slides in from the side it comes from (mock: 40px + fade).
  // The leaving step just fades: Reanimated reads `exiting` from the step's
  // last render, before the direction for this move is known.
  const entering =
    index === 0
      ? FadeIn.duration(400)
      : direction === "forward"
        ? FadeInRight.duration(400)
        : FadeInLeft.duration(300);

  return (
    <View style={styles.screen}>
      <Animated.View
        key={step}
        entering={entering}
        exiting={FadeOut.duration(200)}
        style={StyleSheet.absoluteFill}
      >
        {content}
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.colors.background },
}));
