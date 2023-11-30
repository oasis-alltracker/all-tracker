import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={30}
      viewBox="0 0 60 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 41h54.86M3 25h54.86M3 9h54.86"
        stroke="#25436B"
        strokeWidth={3}
        strokeMiterlimit={0}
        strokeLinecap="round"
        strokeLinejoin="bevel"
      />
    </Svg>
  );
}

export default SvgComponent;
