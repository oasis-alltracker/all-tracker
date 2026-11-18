import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { makeStyles } from "../../../theme";
import { PrimaryButton } from "../../../components/ui";
import StepLayout, { StepHeader } from "../components/StepLayout";
import AddRow from "../components/AddRow";
import { copy } from "../copy";

// Tasks setup (Building and Leveling Up only; mock #screen-tasks). Each task
// becomes a one-off to-do due "This week" (saveOnboarding).
//
// Typing is its own mode (decided 2026-11-17): the keyboard stays up so tasks
// can be added one after another, and the footer shows "Done" instead of
// Continue. Done (or reaching the cap) closes the keyboard. Text still in the
// field on Done or Continue is added rather than lost.
export const MAX_TASKS = 3; // "Start with 1–3 things"; the mock caps at 3

export default function TasksStep({
  config, // season.onboarding.tasks
  tasks,
  setTasks,
  progress,
  onBack,
  onNext,
  saving,
}) {
  const styles = useStyles();
  const [draft, setDraft] = useState("");
  const full = tasks.length >= MAX_TASKS;

  const add = (task) => {
    if (!full && !tasks.some((x) => x.toLowerCase() === task.toLowerCase())) {
      setTasks([...tasks, task]);
    }
  };

  const addPending = () => {
    const pending = draft.trim();
    if (pending) {
      add(pending);
      setDraft("");
    }
  };

  const done = () => {
    addPending();
    Keyboard.dismiss();
  };

  // Tasks is never the last setup step, so the added task is in state well
  // before anything is saved.
  const continueOn = () => {
    addPending();
    onNext();
  };

  // The field goes away at the cap, so put the keyboard away with it.
  useEffect(() => {
    if (full) Keyboard.dismiss();
  }, [full]);
  const remove = (task) => setTasks(tasks.filter((x) => x !== task));

  return (
    <StepLayout
      progress={progress}
      onBack={onBack}
      keyboardFooter={<PrimaryButton title={copy.done} onPress={done} />}
      footer={
        <PrimaryButton
          title={copy.continue}
          onPress={continueOn}
          loading={saving}
        />
      }
    >
      <StepHeader
        label={copy.tasks.label}
        question={config.question}
        guidance={config.guidance}
      />

      {tasks.length > 0 ? (
        <View style={styles.list}>
          {tasks.map((task) => (
            <View key={task} style={styles.item}>
              <View style={styles.check} />
              <Text style={styles.text}>{task}</Text>
              <Pressable
                onPress={() => remove(task)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${task}`}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.remove}>×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {!full ? (
        <AddRow
          placeholder={copy.tasks.placeholder}
          onAdd={add}
          value={draft}
          onChangeText={setDraft}
          keepKeyboardOpen
        />
      ) : null}
    </StepLayout>
  );
}

const useStyles = makeStyles((t) => ({
  list: { gap: 10, marginBottom: t.sp.lg },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.sp.md,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.item,
    paddingVertical: 14,
    paddingHorizontal: t.sp.lg,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: t.colors.border,
  },
  text: { ...t.text.onboardingTask, color: t.colors.text, flex: 1 },
  remove: { ...t.text.chipEmoji, color: t.colors.textMuted },
  pressed: { opacity: 0.5 },
}));
