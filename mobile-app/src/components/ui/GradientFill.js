import React from "react";
import { LinearGradient } from "expo-linear-gradient";

// Converts a CSS linear-gradient angle (0deg = to top, 90deg = to right) into
// expo-linear-gradient start/end points in the 0–1 box. Close to CSS; CSS also
// stretches the line to reach the corners, which is invisible at these
// soft colours.
function pointsForAngle(deg) {
  const rad = (deg * Math.PI) / 180;
  const dx = Math.sin(rad) / 2;
  const dy = -Math.cos(rad) / 2;
  return {
    start: { x: 0.5 - dx, y: 0.5 - dy },
    end: { x: 0.5 + dx, y: 0.5 + dy },
  };
}

// The only place the app talks to the gradient library. Pass a two-stop array
// from theme gradients, e.g. <GradientFill colors={gradients.journal} />.
export default function GradientFill({ colors, angle = 135, style, children }) {
  const { start, end } = pointsForAngle(angle);
  return (
    <LinearGradient colors={colors} start={start} end={end} style={style}>
      {children}
    </LinearGradient>
  );
}
