import * as React from "react";
import Svg, {
  Rect,
  Path,
  G,
  RadialGradient,
  Stop,
  Defs,
  Ellipse,
} from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={props.active ? 88 : 48}
      height={props.active ? 78 : 48}
      viewBox={props.active ? "0 0 88 68" : "0 0 48 48"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.active && (
        <>
          <Defs>
            <RadialGradient
              id="grad"
              cx="44"
              cy="34"
              rx="38"
              ry="38"
              fx="44"
              fy="34"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#B2EDD3" stopOpacity="0.6" />
              <Stop offset="1" stopColor="#1C1B20" stopOpacity="0.4" />
            </RadialGradient>
          </Defs>
          <Ellipse cx="44" cy="34" rx="55" ry="55" fill="url(#grad)" />
        </>
      )}
      {props.active ? (
        <G filter="url(#filter0_d_66_2894)">
          <Rect x={20} y={10} width={48} height={48} rx={24} fill="#B2EDD3" />
          <Path
            d="M44.7 38.88h.7c1.15 0 2.09-.94 2.09-2.09v-.7H44.7v2.79zM40.51 36.79c0 1.15.94 2.09 2.09 2.09h.7v-2.79h-2.79v.7zM40.51 34v.7h2.79v-2.79h-.7c-1.15 0-2.09.94-2.09 2.09z"
            fill="#1C1B20"
          />
          <Path
            d="M52.03 28.82l-5.75-4.03c-1.57-1.1-3.97-1.04-5.48.13l-5.01 3.91c-1.01.78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.61 4.63h10.77a4.62 4.62 0 004.61-4.62V32.6c.01-1.35-.86-3.01-1.96-3.78zm-3.15 7.97a3.5 3.5 0 01-3.49 3.49H42.6c-1.92 0-3.49-1.56-3.49-3.49V34a3.5 3.5 0 013.49-3.49h2.79c1.92 0 3.49 1.56 3.49 3.49v2.79z"
            fill="#1C1B20"
          />
          <Path
            d="M45.4 31.91h-.7v2.79h2.79V34c0-1.15-.94-2.09-2.09-2.09z"
            fill="#1C1B20"
          />
        </G>
      ) : (
        <>
          <Rect width={48} height={48} rx={24} fill="#B2EDD3" />
          <Path
            d="M24.7 28.88h.7c1.15 0 2.09-.94 2.09-2.09v-.7H24.7v2.79zM20.51 26.79c0 1.15.94 2.09 2.09 2.09h.7v-2.79h-2.79v.7zM20.51 24v.7h2.79v-2.79h-.7c-1.15 0-2.09.94-2.09 2.09z"
            fill="#1C1B20"
          />
          <Path
            d="M32.03 18.82l-5.75-4.03c-1.57-1.1-3.97-1.04-5.48.13l-5.01 3.91c-1.01.78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.61 4.63h10.77a4.62 4.62 0 004.61-4.62V22.6c.01-1.35-.86-3.01-1.96-3.78zm-3.15 7.97a3.5 3.5 0 01-3.49 3.49H22.6c-1.92 0-3.49-1.56-3.49-3.49V24a3.5 3.5 0 013.49-3.49h2.79c1.92 0 3.49 1.56 3.49 3.49v2.79z"
            fill="#1C1B20"
          />
          <Path
            d="M25.4 21.91h-.7v2.79h2.79V24c0-1.15-.94-2.09-2.09-2.09z"
            fill="#1C1B20"
          />
        </>
      )}
    </Svg>
  );
}

export default SvgComponent;
