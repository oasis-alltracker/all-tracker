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
        <G filter="url(#filter0_d_66_3078)" fill="#fff">
          <Path d="M40 24.55c0 .66-.54 1.2-1.2 1.2H21.2c-.66 0-1.2-.54-1.2-1.2v-.01c0-2.29 1.85-4.14 4.14-4.14h11.71c2.29 0 4.15 1.86 4.15 4.15zM20 28.45v5.01c0 2.29 1.85 4.14 4.14 4.14h11.71c2.29 0 4.15-1.86 4.15-4.15v-5c0-.66-.54-1.2-1.2-1.2H21.2c-.66 0-1.2.54-1.2 1.2zm6 5.8h-2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75zm6.5 0h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75z" />
        </G>
      ) : (
        <G opacity={0.3} fill="#fff">
          <Path d="M22 7.55c0 .66-.54 1.2-1.2 1.2H3.2c-.66 0-1.2-.54-1.2-1.2v-.01C2 5.25 3.85 3.4 6.14 3.4h11.71C20.14 3.4 22 5.26 22 7.55zM2 11.45v5.01c0 2.29 1.85 4.14 4.14 4.14h11.71c2.29 0 4.15-1.86 4.15-4.15v-5c0-.66-.54-1.2-1.2-1.2H3.2c-.66 0-1.2.54-1.2 1.2zm6 5.8H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75zm6.5 0h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75z" />
        </G>
      )}
    </Svg>
  );
}

export default SvgComponent;
