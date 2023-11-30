import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  RadialGradient,
  Stop,
  Ellipse,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      width={props.active ? 60 : 24}
      height={props.active ? 60 : 24}
      viewBox={props.active ? "0 0 60 60" : "0 0 24 24"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.active && (
        <>
          <Defs>
            <RadialGradient
              id="grad"
              cx="30"
              cy="30"
              rx="20"
              ry="20"
              fx="30"
              fy="30"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#fff" stopOpacity="0.4" />
              <Stop offset="1" stopColor="#1C1B20" stopOpacity="0.3" />
            </RadialGradient>
          </Defs>
          <Ellipse cx="30" cy="30" rx="20" ry="20" fill="url(#grad)" />
        </>
      )}
      {props.active ? (
        <G filter="url(#filter0_d_66_3010)">
          <Path
            d="M34.19 20h-8.38C22.17 20 20 22.17 20 25.81v8.37c0 3.65 2.17 5.82 5.81 5.82h8.37c3.64 0 5.81-2.17 5.81-5.81v-8.38C40 22.17 37.83 20 34.19 20zm-7.08 14.9c0 .28-.22.5-.5.5h-2.79c-.28 0-.5-.22-.5-.5v-4.62c0-.63.51-1.14 1.14-1.14h2.15c.28 0 .5.22.5.5v5.26zm4.78 0c0 .28-.22.5-.5.5H28.6c-.28 0-.5-.22-.5-.5v-9.16c0-.63.51-1.14 1.14-1.14h1.52c.63 0 1.14.51 1.14 1.14v9.16h-.01zm4.79 0c0 .28-.22.5-.5.5h-2.79c-.28 0-.5-.22-.5-.5v-3.55c0-.28.22-.5.5-.5h2.15c.63 0 1.14.51 1.14 1.14v2.91z"
            fill="#fff"
          />
        </G>
      ) : (
        <Path
          d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zM9.11 16.9c0 .28-.22.5-.5.5H5.82c-.28 0-.5-.22-.5-.5v-4.62c0-.63.51-1.14 1.14-1.14h2.15c.28 0 .5.22.5.5v5.26zm4.78 0c0 .28-.22.5-.5.5H10.6c-.28 0-.5-.22-.5-.5V7.74c0-.63.51-1.14 1.14-1.14h1.52c.63 0 1.14.51 1.14 1.14v9.16h-.01zm4.79 0c0 .28-.22.5-.5.5h-2.79c-.28 0-.5-.22-.5-.5v-3.55c0-.28.22-.5.5-.5h2.15c.63 0 1.14.51 1.14 1.14v2.91z"
          fill="#fff"
          opacity={0.3}
        />
      )}
    </Svg>
  );
}

export default SvgComponent;
