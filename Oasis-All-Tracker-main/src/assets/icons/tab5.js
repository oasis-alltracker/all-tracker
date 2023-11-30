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
        <G filter="url(#filter0_d_66_3114)">
          <Path
            d="M35 20.43H25c-3 0-5 2-5 5v6c0 3 2 5 5 5v2.13c0 .8.89 1.28 1.55.83L31 36.43h4c3 0 5-2 5-5v-6c0-3-2-5-5-5zM30 32.6a.749.749 0 110-1.5.749.749 0 110 1.5zm1.26-4.15c-.39.26-.51.43-.51.71v.21c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.21c0-1.16.85-1.73 1.17-1.95.37-.25.49-.42.49-.68 0-.5-.41-.91-.91-.91s-.91.41-.91.91c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-1.33 1.08-2.41 2.41-2.41s2.41 1.08 2.41 2.41c0 1.14-.84 1.71-1.15 1.92z"
            fill="#fff"
          />
        </G>
      ) : (
        <Path
          d="M17 2.43H7c-3 0-5 2-5 5v6c0 3 2 5 5 5v2.13c0 .8.89 1.28 1.55.83L13 18.43h4c3 0 5-2 5-5v-6c0-3-2-5-5-5zM12 14.6a.749.749 0 110-1.5.749.749 0 110 1.5zm1.26-4.15c-.39.26-.51.43-.51.71v.21c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.21c0-1.16.85-1.73 1.17-1.95.37-.25.49-.42.49-.68 0-.5-.41-.91-.91-.91s-.91.41-.91.91c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-1.33 1.08-2.41 2.41-2.41s2.41 1.08 2.41 2.41c0 1.14-.84 1.71-1.15 1.92z"
          fill="#fff"
          opacity={0.3}
        />
      )}
    </Svg>
  );
}

export default SvgComponent;
