import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { ValueSheet } from "../../ValueSheet";

function SvgComponent(props) {
  const theme = React.useContext(ThemeContext).value;
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.checked ? (
        <>
          <Rect
            width={28}
            height={28}
            rx={10}
            fill={ValueSheet.colours[theme].secondaryColour}
          />
          <Path
            d="M10 14.42l2.41 2.42L17.24 12"
            stroke="#1C1B20"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <Rect x={0.5} y={0.5} width={27} height={27} rx={9.5} fill="#fff" />
          <Rect
            x={0.5}
            y={0.5}
            width={27}
            height={27}
            rx={9.5}
            strokeWidth={2}
            stroke="#CCCCCC"
          />
        </>
      )}
    </Svg>
  );
}

export default SvgComponent;
