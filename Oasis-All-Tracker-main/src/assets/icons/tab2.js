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
        <G filter="url(#filter0_d_66_3046)" fill="#fff">
          <Path d="M29.25 26.08v2.86l-1.01-.35c-.51-.18-.82-.35-.82-1.22 0-.71.53-1.29 1.18-1.29h.65zM32.58 32.63c0 .71-.53 1.29-1.18 1.29h-.65v-2.86l1.01.35c.51.18.82.35.82 1.22z" />
          <Path d="M34.19 20h-8.38C22.17 20 20 22.17 20 25.81v8.38c0 3.64 2.17 5.81 5.81 5.81h8.38c3.64 0 5.81-2.17 5.81-5.81v-8.38c0-3.64-2.17-5.81-5.81-5.81zm-1.93 10c.78.27 1.82.84 1.82 2.63 0 1.54-1.2 2.79-2.68 2.79h-.65V36c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.58h-.36c-1.64 0-2.97-1.39-2.97-3.09a.749.749 0 111.5 0c0 .88.66 1.59 1.47 1.59h.36v-3.39L27.74 30c-.78-.27-1.82-.84-1.82-2.63 0-1.54 1.2-2.79 2.68-2.79h.65V24c0-.41.34-.75.75-.75s.75.34.75.75v.58h.36c1.64 0 2.97 1.39 2.97 3.09a.749.749 0 11-1.5 0c0-.88-.66-1.59-1.47-1.59h-.36v3.39l1.51.53z" />
        </G>
      ) : (
        <G opacity={0.3} fill="#fff">
          <Path d="M11.25 8.08v2.86l-1.01-.35c-.51-.18-.82-.35-.82-1.22 0-.71.53-1.29 1.18-1.29h.65zM14.58 14.63c0 .71-.53 1.29-1.18 1.29h-.65v-2.86l1.01.35c.51.18.82.35.82 1.22z" />
          <Path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.38C2 19.83 4.17 22 7.81 22h8.38c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm-1.93 10c.78.27 1.82.84 1.82 2.63 0 1.54-1.2 2.79-2.68 2.79h-.65V18c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.58h-.36c-1.64 0-2.97-1.39-2.97-3.09a.749.749 0 111.5 0c0 .88.66 1.59 1.47 1.59h.36v-3.39L9.74 12c-.78-.27-1.82-.84-1.82-2.63 0-1.54 1.2-2.79 2.68-2.79h.65V6c0-.41.34-.75.75-.75s.75.34.75.75v.58h.36c1.64 0 2.97 1.39 2.97 3.09a.749.749 0 11-1.5 0c0-.88-.66-1.59-1.47-1.59h-.36v3.39l1.51.53z" />
        </G>
      )}
    </Svg>
  );
}

export default SvgComponent;
