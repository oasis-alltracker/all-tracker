import React from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, useOasisTheme } from "../../theme";

// BottomSheet (DS-02): the sheet used for tasks, nutrition check-ins, fitness
// logging and the season change. Built on react-native-modal (decided
// 2026-11-14), which the legacy screens already use.
// Source: oasis_design_system.html "Bottom Sheet" + the sheets in the
// foundations / nutrition mocks: cream, 28px top corners, 24px side padding,
// 36×4 handle, rgba(0,0,0,0.35) scrim.
//
//   visible     show / hide
//   onClose     called on backdrop tap, swipe down and Android back
//   title       optional Cormorant title; subtitle optional muted line
//   scrollable  true for tall content (e.g. a meal check-in): the body
//               scrolls and the sheet stops at 90% of the screen height
//   onHidden    optional, after the close animation (e.g. to open the next
//               sheet or a completion moment without the two overlapping)
export default function BottomSheet({
  visible,
  onClose,
  title,
  subtitle,
  scrollable = false,
  onHidden,
  children,
  style,
}) {
  const t = useOasisTheme();
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  // The mocks pad the bottom by 48 to clear the home indicator; use the real
  // inset where it's larger.
  const bottomPad = Math.max(48, insets.bottom + t.sp.xxl);

  const header = (
    <>
      {title ? (
        <Text style={[styles.title, !subtitle && styles.titleAlone]}>{title}</Text>
      ) : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </>
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      onModalHide={onHidden}
      swipeDirection="down"
      propagateSwipe={scrollable}
      avoidKeyboard
      backdropColor={t.colors.scrim}
      backdropOpacity={1}
      animationInTiming={400}
      animationOutTiming={300}
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      style={styles.modal}
    >
      <View
        style={[styles.sheet, { maxHeight: height * 0.9 }, style]}
        accessibilityViewIsModal
      >
        <View style={styles.handle} accessibilityLabel="Swipe down to close" />
        {scrollable ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottomPad }}
          >
            {header}
            {children}
          </ScrollView>
        ) : (
          <View style={{ paddingBottom: bottomPad }}>
            {header}
            {children}
          </View>
        )}
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((t) => ({
  modal: { margin: 0, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: t.colors.background,
    borderTopLeftRadius: t.radius.sheet,
    borderTopRightRadius: t.radius.sheet,
    paddingHorizontal: t.sp.xxl,
    paddingTop: t.sp.md,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: t.colors.border,
    alignSelf: "center",
    marginBottom: t.sp.xl,
  },
  title: { ...t.text.sheetTitle, color: t.colors.text, marginBottom: t.sp.xs },
  titleAlone: { marginBottom: t.sp.lg + 2 }, // fitness mock: 18 below a lone title
  subtitle: { ...t.text.small, color: t.colors.textMuted, marginBottom: t.sp.xl },
}));
