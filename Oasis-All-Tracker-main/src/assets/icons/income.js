import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm.69 9.53c0 .39-.31.7-.7.7-.39 0-.7-.31-.7-.7v-.18l-2.72 2.72c-.15.15-.35.22-.56.2a.665.665 0 01-.51-.31l-1.02-1.52-2.38 2.38c-.14.14-.31.2-.49.2s-.36-.07-.49-.2a.706.706 0 010-.99l2.98-2.98c.15-.15.35-.22.56-.2.21.02.4.13.51.31l1.02 1.52 2.11-2.11h-.18c-.39 0-.7-.31-.7-.7 0-.39.31-.7.7-.7h1.86c.09 0 .18.02.27.05.17.07.31.21.38.38.04.09.05.18.05.27v1.86h.01z"
        fill={props.color}
      />
    </Svg>
  );
}

SvgComponent.defaultProps = {
  color: "#6ECEA4",
};

export default SvgComponent;
