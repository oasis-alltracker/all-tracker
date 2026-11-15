import React, { Children, useCallback, useImperativeHandle, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles } from "../../theme";
import PageDots from "./PageDots";

// Pager (DS-02 addition): the horizontal pager every section uses
// (Master Spec §1 + §4–6: page 1 = Today, page 2 = Past/Upcoming, dots at the
// bottom). Source: .pager-* / .page-dots in the foundations, journal and
// nutrition mocks. Each child is one full-width page; each page draws its own
// ScreenHeader and its own vertical ScrollView, as in the mocks.
//
//   initialPage    default 0
//   onPageChange   (index) => void, after a swipe or goTo
//   ref            ref.current.goTo(index) — e.g. a "←" on the Past page
//                  that slides back to Today (as the nutrition mock does)
export default function Pager({ initialPage = 0, onPageChange, children, style, ref }) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const pages = Children.toArray(children);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(initialPage);
  const indexRef = useRef(initialPage);

  const settle = useCallback(
    (next) => {
      if (next === indexRef.current) return;
      indexRef.current = next;
      setIndex(next);
      onPageChange?.(next);
    },
    [onPageChange],
  );

  useImperativeHandle(
    ref,
    () => ({
      goTo(next, animated = true) {
        const clamped = Math.max(0, Math.min(pages.length - 1, next));
        scrollRef.current?.scrollTo({ x: clamped * width, animated });
        settle(clamped);
      },
    }),
    [pages.length, width, settle],
  );

  return (
    <View
      style={[styles.wrapper, style]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {width > 0 && (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: initialPage * width, y: 0 }}
          // Move the dots as soon as a swipe passes halfway, not only after
          // the scroll has fully stopped.
          scrollEventThrottle={32}
          onScroll={(e) => settle(Math.round(e.nativeEvent.contentOffset.x / width))}
          style={styles.track}
        >
          {pages.map((page, i) => (
            <View key={i} style={{ width }}>
              {page}
            </View>
          ))}
        </ScrollView>
      )}
      <PageDots
        count={pages.length}
        activeIndex={index}
        style={[styles.dots, { paddingBottom: Math.max(32, insets.bottom) }]}
      />
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  wrapper: { flex: 1 },
  track: { flex: 1 },
  dots: { paddingTop: 10 },
}));
