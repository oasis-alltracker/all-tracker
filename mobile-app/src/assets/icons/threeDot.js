import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.5} y={0.5} width={39} height={39} rx={11.5} fill="#fff" />
      <Path
        d="M19.821 20.357a.536.536 0 100-1.071.536.536 0 000 1.071zM24.821 20.357a.536.536 0 100-1.071.536.536 0 000 1.071z"
        fill="#1C1B20"
        stroke="#1C1B20"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.821 20.357a.536.536 0 100-1.071.536.536 0 000 1.071z"
        stroke="#1C1B20"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x={0.5} y={0.5} width={39} height={39} rx={11.5} stroke="#F0EEF5" />
    </Svg>
  );
}

export default SvgComponent;
