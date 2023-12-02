import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Switch from "../assets/icons/switch";

export default function SwitchComponent(props) {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setActive((pr) => !pr);
      }}
    >
      <Switch
        width={props.width ?? 40}
        height={props.height ?? 30}
        active={active}
      />
    </TouchableOpacity>
  );
}
