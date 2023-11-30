import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.077 24.383H9.73c-.793 0-1.785-.548-2.205-1.225l-4.877-7.793c-.466-.758-.42-1.948.117-2.66l6.043-8.05c.432-.572 1.366-1.038 2.077-1.038h12.192c2.041 0 3.278 2.24 2.205 3.978l-3.232 5.168c-.431.689-.431 1.809 0 2.497l3.232 5.168c1.073 1.715-.175 3.955-2.205 3.955z"
        fill="#1C1B20"
      />
      <Path
        d="M11.914 16.364l4.488-5.03M16.402 16.364l-4.488-5.03"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
