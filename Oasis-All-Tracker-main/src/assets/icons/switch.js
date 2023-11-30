import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox={`0 0 36 21`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.active ? (
        <>
          <Rect width={36} height={21} rx={11} fill="#D7F6FF" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35 10c0-5.523-4.92-10-10.988-10H10.988C4.92 0 0 4.477 0 10s4.92 10 10.988 10h13.024C30.08 20 35 15.523 35 10zM24.012 2.222c4.72 0 8.546 3.482 8.546 7.778 0 4.296-3.826 7.778-8.546 7.778H10.988c-4.72 0-8.546-3.482-8.546-7.778 0-4.296 3.826-7.778 8.546-7.778h13.024zM25.25 15.75a6 6 0 100-12 6 6 0 000 12z"
            fill="#fff"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35 10c0-5.523-4.92-10-10.988-10H10.988C4.92 0 0 4.477 0 10s4.92 10 10.988 10h13.024C30.08 20 35 15.523 35 10zM24.012 2.222c4.72 0 8.546 3.482 8.546 7.778 0 4.296-3.826 7.778-8.546 7.778H10.988c-4.72 0-8.546-3.482-8.546-7.778 0-4.296 3.826-7.778 8.546-7.778h13.024zM25.25 15.75a6 6 0 100-12 6 6 0 000 12z"
            fill="#25436B"
          />
        </>
      ) : (
        <>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.75 10.25c0-5.523-4.92-10-10.988-10H11.738C5.67.25.75 4.727.75 10.25s4.92 10 10.988 10h13.024c6.068 0 10.988-4.477 10.988-10zM24.762 2.472c4.72 0 8.546 3.482 8.546 7.778 0 4.296-3.826 7.778-8.546 7.778H11.738c-4.72 0-8.546-3.482-8.546-7.778 0-4.296 3.826-7.778 8.546-7.778h13.024zM11 16a6 6 0 100-12 6 6 0 000 12z"
            fill="#25436B"
          />
        </>
      )}
    </Svg>
  );
}

SvgComponent.defaultProps = {
  width: 45,
  height: 28,
};

export default SvgComponent;
