import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Size, Theme } from "../../models/theme";

export type ButtonColor =
  | typeof Theme["colors"]["button"]
  | typeof Theme["colors"]["buttonSecondary"];

export type ButtonProps = {
  size?: Size;
  weight?: Size;
  color?: ButtonColor | string;
} & React.ComponentProps<typeof TouchableOpacity>;

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...(props.style as ViewStyle),
        backgroundColor: props.color || Theme.colors.button,
        borderRadius: Theme.spacing[props.size || "sm"],
        padding: Theme.spacing[props.size || "sm"],
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
}
